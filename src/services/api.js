import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false, // karena pakai JWT, bukan cookie
  // timeout: 10000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// REQUEST
api.interceptors.request.use((config) => {
  const auth = useAuthStore();

  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }

  return config;
});

// RESPONSE → handle expired token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const auth = useAuthStore();

    // kalau bukan 401 → langsung reject
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // ❗ SKIP kalau request refresh itu sendiri gagal
    if (originalRequest.url.endsWith("/auth/refresh")) {
      logout();
      return Promise.reject(error);
    }

    // kalau sudah pernah retry → logout
    if (originalRequest._retry) {
      logout();
      return Promise.reject(error);
    }

    if (!auth.refreshToken) {
      logout();
      return Promise.reject(error);
    }

    // tandai request ini sudah retry
    originalRequest._retry = true;

    if (isRefreshing) {
      // antrian request saat refresh berlangsung
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      await auth.refresh();
      processQueue(null, auth.accessToken);

      originalRequest.headers.Authorization = `Bearer ${auth.accessToken}`;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      logout();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

// logout helper
const logout = () => {
  const auth = useAuthStore();
  auth.logout();
  router.push({ name: "Login" }); // ✅ clean SPA redirect
};

export default api;
