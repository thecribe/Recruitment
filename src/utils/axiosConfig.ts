import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config({ path: ".env.local" });

const baseURL = process.env.NEXT_PUBLIC_API_REQUEST_BASE_URL;
if (!baseURL) {
  throw new Error("NEXT_PUBLIC_API_REQUEST_BASE_URL is not defined");
}

export const instance = axios.create({
  baseURL,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// 🔥 Add interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If no response → network error
    if (!error.response) {
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // Check for expired or missing access token
    if (
      status === 401 &&
      (data?.message === "ACCESS_TOKEN_EXPIRED" ||
        data?.message === "ACCESS_TOKEN_MISSING") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint
        await instance.post("/auth/refresh-token");

        // Retry original request
        return instance(originalRequest);
      } catch (refreshError) {
        console.log(refreshError);
        // Refresh failed → force logout
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
