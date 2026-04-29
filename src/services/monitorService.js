import api from "@/services/api";

/**
 * Upload file excel monitoring
 *
 * contoh:
 * const file = files[0]
 *
 * uploadMonitoringExcel({
 *   file,
 *   uploaded_by: "Lukman"
 * })
 *
 * hasil request:
 * POST /api/v1/monitoring/upload
 * body: form-data
 * - file
 * - uploaded_by
 */
export const uploadMonitoringExcel = async ({
  file,
  uploaded_by,
  onProgress,
}) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("uploaded_by", uploaded_by);

  const { data } = await api.post("/api/v1/monitoring/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress(percent);
      }
    },
  });

  return data;
};

/**
 * Ambil data progress monitoring
 *
 * contoh:
 * getMonitoringProgress({
 *   group_by: "komponen",
 *   triwulan: 1
 * })
 *
 * hasil request:
 * /api/v1/monitoring/chart?group_by=komponen&triwulan=1
 */
export const getMonitoringProgress = async (params = {}) => {
  const { data } = await api.get("/api/v1/monitoring/chart", {
    params: {
      group_by: params.group_by,
      triwulan: params.triwulan,
    },
  });

  return data;
};

/**
 * Ambil data progress
 *
 * contoh:
 * getProgress({
 *   group_by: "tahun",
 *   triwulan: 1
 * })
 *
 * hasil request:
 * /api/v1/monitoring/progress?group_by=tahun&triwulan=1
 */
export const getProgress = async (params = {}) => {
  const { data } = await api.get("/api/v1/monitoring/progress", {
    params: {
      group_by: params.group_by,
      triwulan: params.triwulan,
    },
  });

  return data;
};
