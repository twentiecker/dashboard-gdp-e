const getFileType = (filename) => {
  if (!filename) return;

  const ext = filename.split(".").pop()?.toLowerCase();

  if (["xls", "xlsx"].includes(ext)) return "xls";
  if (ext === "pdf") return "pdf";
  if (["doc", "docx"].includes(ext)) return "doc";
  if (["ppt", "pptx"].includes(ext)) return "ppt";
};

export { getFileType };
