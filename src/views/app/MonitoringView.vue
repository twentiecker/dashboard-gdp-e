<script setup>
import { ref, onMounted, watch } from "vue";
import { getMonitoringProgress, getProgress } from "@/services/monitorService";
import { formatPercent, formatNumber } from "@/utils/format";
import Arrow from "@/components/Arrow.vue";

const loading = ref(false);

const selectedYear = ref(null);
const years = ref([]);

const selectedQuarter = ref({ name: "Triwulan I", code: "1" });
const quarters = ref([
  { name: "Triwulan I", code: "1" },
  { name: "Triwulan II", code: "2" },
  { name: "Triwulan III", code: "3" },
  { name: "Triwulan IV", code: "4" },
]);

const chartDataPie = ref();
const chartOptionsPie = ref();
const chartData = ref();
const chartOptions = ref();
const chartDataTop = ref();
const chartOptionsTop = ref();
const chartDataBottom = ref();
const chartOptionsBottom = ref();

const persenEksternal = ref(0);
const persenInternal = ref(0);
const totalTarget = ref(0);
const totalPemasukan = ref(0);

onMounted(async () => {
  chartOptionsPie.value = setChartOptionsPie();
  chartOptions.value = setChartOptions();
  chartOptionsTop.value = setChartOptionsTop();
  chartOptionsBottom.value = setChartOptionsBottom();

  await initData();
});

// function pisah internal / eksternal
const splitChartData = (data) => {
  const eksternal = {
    labels: [],
    datasets: [
      {
        label: data.datasets[0].label,
        data: [],
      },
    ],
  };

  const internal = {
    labels: [],
    datasets: [
      {
        label: data.datasets[0].label,
        data: [],
      },
    ],
  };

  data.labels.forEach((label, index) => {
    const value = data.datasets[0].data[index];

    if (label.startsWith("Eksternal")) {
      eksternal.labels.push(label.replace("Eksternal - ", ""));
      eksternal.datasets[0].data.push(value);
    }

    if (label.startsWith("Internal")) {
      internal.labels.push(label.replace("Internal - ", ""));
      internal.datasets[0].data.push(value);
    }
  });

  return {
    eksternal,
    internal,
  };
};

const transformChartData = (source) => {
  const newOrder = [
    "PKRT",
    "PKLNPRT",
    "PKP",
    "PMTB",
    "PI",
    "EKSPOR",
    "IMPOR",
    "INDEKS HARGA",
  ];

  const oldLabels = source.labels;
  const oldData = source.datasets[0].data;

  // ambil data sesuai urutan label baru
  const newData = newOrder.map((label) => {
    const index = oldLabels.findIndex(
      (item) => item.toUpperCase() === label.toUpperCase(),
    );

    return index !== -1 ? oldData[index] : 0;
  });

  return {
    labels: newOrder,
    datasets: [
      {
        ...source.datasets[0],
        data: newData,
      },
    ],
  };
};

const initData = async () => {
  const progress = await getProgress({
    group_by: "tahun",
    triwulan: selectedQuarter.value.code,
  });

  years.value = progress.map((el) => ({
    name: el.tahun,
    code: parseInt(el.tahun),
  }));

  if (!selectedYear.value) {
    selectedYear.value = years.value[years.value.length - 1];
  }
};

const loadChart = async () => {
  try {
    loading.value = true;

    const progress = await getProgress({
      group_by: "tahun",
      triwulan: selectedQuarter.value.code,
    });

    const intex = await getProgress({
      group_by: "internal_external",
      triwulan: selectedQuarter.value.code,
    });

    const intexPjk = await getMonitoringProgress({
      group_by: "internal_external,pjk_neraca",
      triwulan: selectedQuarter.value.code,
    });

    const result = splitChartData(intexPjk);

    const rows = await getMonitoringProgress({
      group_by: "komponen",
      triwulan: selectedQuarter.value.code,
    });

    buildCardTotal(progress);
    buildChartPie(progress);
    buildCardIntex(intex);
    buildChartTop(result.eksternal);
    buildChartBottom(result.internal);
    buildChart(transformChartData(rows));
  } catch (error) {
    console.error("Gagal load monitoring progress:", error);
  } finally {
    loading.value = false;
  }
};

const buildCardTotal = (rows) => {
  totalTarget.value = formatNumber(rows[0].jumlah_target);
  totalPemasukan.value = formatNumber(rows[0].jumlah_data_masuk);
};

const buildChartPie = (rows) => {
  const documentStyle = getComputedStyle(document.documentElement);

  const labels = ["Tersedia", "Belum Tersedia"];
  const data = [rows[0].progress_persen, 100 - rows[0].progress_persen];

  chartDataPie.value = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ["#004aad", "#ffbd59"],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--p-blue-600"),
          documentStyle.getPropertyValue("--p-orange-600"),
        ],
      },
    ],
  };
};

const setChartOptionsPie = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");

  return {
    elements: {
      arc: {
        borderWidth: 0,
        borderColor: "transparent",
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          cutout: "60%",
          color: textColor,
          font: {
            size: 11,
          },
          boxWidth: 10,
          boxHeight: 10,
          padding: 10,
        },
      },
      datalabels: {
        color: (context) => {
          return context.dataIndex === 0 ? textColor : "#ffffff";
        },

        /* 🔥 posisi beda tiap index */
        anchor: (context) => {
          return context.dataIndex === 0 ? "start" : "center";
        },
        align: (context) => {
          return context.dataIndex === 0 ? "start" : "left";
        },
        offset: (context) => {
          return context.dataIndex === 0 ? 20 : 0;
        },

        font: (context) => {
          const index = context.dataIndex;

          return {
            weight: "bold",
            size: index === 0 ? 22 : 14,
          };
        },

        formatter: (value) => {
          return value === 0 ? "" : formatPercent(value);
        },
      },
    },
  };
};

const buildCardIntex = (rows) => {
  persenEksternal.value = formatPercent(rows[0].progress_persen);
  persenInternal.value = formatPercent(rows[1].progress_persen);
};

const buildChartTop = (rows) => {
  const documentStyle = getComputedStyle(document.documentElement);

  const labels = rows.labels;
  const tersedia = rows.datasets[0].data;
  const belum = rows.datasets[0].data.map((el) => 100 - el);

  chartDataTop.value = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Tersedia",
        backgroundColor: "#004aad",
        data: tersedia,
      },
      {
        type: "bar",
        label: "Belum Tersedia",
        backgroundColor: "#ffbd59",
        data: belum,
      },
    ],
  };
};

const setChartOptionsTop = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color",
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color",
  );

  return {
    indexAxis: "y",
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          font: {
            size: 11,
          },
          boxWidth: 10,
          boxHeight: 10,
          padding: 10,
        },
      },
      datalabels: {
        color: "#ffffff",
        anchor: (context) => {
          return context.datasetIndex === 0 ? "start" : "end";
        },
        align: (context) => {
          return context.datasetIndex === 0 ? "end" : "start";
        },
        font: {
          size: 10,
        },
        formatter: (value) => {
          return value === 0 ? "" : formatPercent(value);
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          display: false,
          color: textColorSecondary,
        },
        grid: {
          display: false,
          color: surfaceBorder,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const buildChartBottom = (rows) => {
  const documentStyle = getComputedStyle(document.documentElement);

  const labels = rows.labels;
  const tersedia = rows.datasets[0].data;
  const belum = rows.datasets[0].data.map((el) => 100 - el);

  chartDataBottom.value = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Tersedia",
        backgroundColor: "#004aad",
        data: tersedia,
      },
      {
        type: "bar",
        label: "Belum Tersedia",
        backgroundColor: "#ffbd59",
        data: belum,
      },
    ],
  };
};

const setChartOptionsBottom = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color",
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color",
  );

  return {
    indexAxis: "y",
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: textColor,
          font: {
            size: 11,
          },
          boxWidth: 10,
          boxHeight: 10,
          padding: 10,
        },
      },
      datalabels: {
        color: "#ffffff",
        anchor: (context) => {
          return context.datasetIndex === 0 ? "start" : "end";
        },
        align: (context) => {
          return context.datasetIndex === 0 ? "end" : "start";
        },
        font: {
          size: 10,
        },
        formatter: (value) => formatPercent(value),
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          display: false,
          color: textColorSecondary,
        },
        grid: {
          display: false,
          color: surfaceBorder,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
          font: {
            size: 11, // kecilin tulisan label X
          },
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const buildChart = (rows) => {
  const documentStyle = getComputedStyle(document.documentElement);

  const labels = rows.labels;
  const tersedia = rows.datasets[0].data;
  const belum = rows.datasets[0].data.map((el) => 100 - el);

  chartData.value = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Tersedia",
        backgroundColor: "#004aad",
        data: tersedia,
        barThickness: 50,
      },
      {
        type: "bar",
        label: "Belum Tersedia",
        backgroundColor: "#ffbd59",
        data: belum,
        barThickness: 50,
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color",
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color",
  );

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        position: "bottom",
        labels: {
          color: textColor,
          font: {
            size: 11,
          },
          boxWidth: 10,
          boxHeight: 10,
          padding: 10,
        },
      },
      datalabels: {
        color: "#ffffff",
        anchor: (context) => {
          return context.datasetIndex === 0 ? "start" : "end";
        },
        align: (context) => {
          return context.datasetIndex === 0 ? "end" : "start";
        },
        font: {
          size: 12,
        },
        formatter: (value) => {
          return value === 0 ? "" : formatPercent(value);
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
          font: {
            size: 11, // kecilin tulisan label X
          },
        },
        grid: {
          display: false,
          color: surfaceBorder,
        },
      },
      y: {
        stacked: true,
        ticks: {
          display: false,
          color: textColorSecondary,
        },
        grid: {
          display: false,
          color: surfaceBorder,
        },
      },
    },
  };
};

watch(
  () => [selectedYear.value?.code, selectedQuarter.value?.code],
  ([year, quarter]) => {
    if (year && quarter) {
      loadChart();
    }
  },
);
</script>

<template>
  <div class="app-container">
    <h1>Monitoring</h1>
    <Panel header="Informasi Umum">
      <div class="flex gap-4">
        <Select
          v-model="selectedYear"
          :options="years"
          optionLabel="name"
          placeholder="Select a Year"
          class="w-full md:w-56"
        />
        <Select
          v-model="selectedQuarter"
          :options="quarters"
          optionLabel="name"
          placeholder="Select a Quarter"
          class="w-full md:w-56"
        />
      </div>

      <div class="flex gap-4 items-center">
        <div class="flex-1">
          <Fieldset legend="Target Pemasukan Data">
            <h1>{{ totalTarget }}</h1>
          </Fieldset>
        </div>
        <div class="flex-1">
          <Fieldset legend="Total Pemasukan Data">
            <h1>{{ totalPemasukan }}</h1>
          </Fieldset>
        </div>
      </div>
    </Panel>
    <Panel header="Pemasukan Indikator PDB">
      <div class="flex justify-center gap-4">
        <div class="flex items-center">
          <Chart
            type="doughnut"
            :data="chartDataPie"
            :options="chartOptionsPie"
            class="h-50 w-full"
          />
          <div class="flex flex-col gap-9">
            <Arrow rotate-arrow="rotate-[-30deg]" width-arrow="w-20" />
            <Arrow rotate-arrow="rotate-[30deg]" width-arrow="w-20" />
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-4">
            <div class="bg-[#ffbd59] px-3 py-1 w-32 rounded">
              <p class="font-semibold">Eksternal</p>
              <h1>{{ persenEksternal }}</h1>
            </div>
            <Arrow />
            <div>
              <Chart
                type="bar"
                :data="chartDataTop"
                :options="chartOptionsTop"
                class="h-25"
              />
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="bg-[#ffbd59] px-3 py-1 w-32 rounded">
              <p class="font-semibold">Internal</p>
              <h1>{{ persenInternal }}</h1>
            </div>
            <Arrow />
            <div>
              <Chart
                type="bar"
                :data="chartDataBottom"
                :options="chartOptionsBottom"
                class="h-25"
              />
            </div>
          </div>
        </div>
      </div>
    </Panel>
    <Panel header="Persentase Pemasukan Data PDB">
      <div class="flex">
        <Chart
          type="bar"
          :data="chartData"
          :options="chartOptions"
          class="h-80 w-full"
        />
      </div>
    </Panel>
  </div>
</template>
