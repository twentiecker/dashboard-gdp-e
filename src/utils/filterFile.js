const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const filterByFileName = (items, keyword) => {
  if (!keyword) return items;

  const safeKeyword = escapeRegex(keyword);
  const regex = new RegExp(`\\b${safeKeyword}\\b`, "i");

  return items.filter((item) => {
    const name = item.file_name || "";
    return regex.test(name);
  });
};

export { filterByFileName };
