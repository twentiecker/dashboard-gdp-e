export const formatNumber = (value, digit = 2) => {
  return Number(value || 0).toLocaleString("id-ID", {
    minimumFractionDigits: digit,
    maximumFractionDigits: digit,
  });
};

export const formatInteger = (value) => {
  return Number(value || 0).toLocaleString("id-ID");
};

export const formatPercent = (value, digit = 2) => {
  return `${Number(value || 0).toLocaleString("id-ID", {
    minimumFractionDigits: digit,
    maximumFractionDigits: digit,
  })}%`;
};
