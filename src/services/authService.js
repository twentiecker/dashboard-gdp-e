import api from "@/services/api";

export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await api.post("/api/v1/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const refreshToken = async (refresh_token) => {
  const response = await api.post("/api/v1/auth/refresh", {
    refresh_token,
  });

  return response.data;
};
