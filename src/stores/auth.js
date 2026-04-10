import { defineStore } from "pinia";
import { login as loginAPI, refreshToken } from "@/services/authService";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("access_token") || null,
    refreshToken: localStorage.getItem("refresh_token") || null,
    user: null,
  }),

  actions: {
    init() {
      if (this.accessToken) {
        this.setUserFromToken(this.accessToken);

        if (!this.user) {
          this.logout(); // 🔥 auto cleanup kalau token invalid
        }
      }
    },

    async login(username, password) {
      const res = await loginAPI(username, password);

      this.accessToken = res.access_token;
      this.refreshToken = res.refresh_token;

      this.setUserFromToken(res.access_token); // 🔥 penting

      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);
    },

    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null; // 🔥 reset user

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },

    async refresh() {
      const res = await refreshToken(this.refreshToken);

      this.accessToken = res.access_token;
      this.refreshToken = res.refresh_token;

      this.setUserFromToken(res.access_token); // 🔥 update user

      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);
    },

    setUserFromToken(token) {
      try {
        const decoded = jwtDecode(token);

        // 🔥 cek expired
        if (decoded.exp * 1000 < Date.now()) {
          throw new Error("Token expired");
        }

        this.user = {
          email: decoded.sub,
          role: decoded.role,
        };
      } catch (err) {
        console.error("Invalid token");
        this.user = null;
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    isAdmin: (state) => state.user?.role === "admin",
    isUser: (state) => state.user?.role === "user",
  },
});
