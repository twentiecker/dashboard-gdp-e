import api from "@/services/api";

export const getFiles = (category) => {
  return api.get(`/api/v1/files/${category}`);
};

export const downloadFileUrl = (path) => {
  return (
    import.meta.env.VITE_API_BASE_URL +
    "/api/v1/files/download" +
    path.replace("/files", "")
  );
};

export const viewFileUrl = (path) => {
  return (
    import.meta.env.VITE_API_BASE_URL +
    "/api/v1/files/view" +
    path.replace("/files", "")
  );
};

// export const viewFileUrl = (path) => {
//   return import.meta.env.VITE_API_BASE_URL + path;
// };

export const uploadFile = (formData, onProgress) => {
  return api.post("/api/v1/files/upload", formData, {
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
};
