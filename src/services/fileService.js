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
  return import.meta.env.VITE_API_BASE_URL + path;
};
