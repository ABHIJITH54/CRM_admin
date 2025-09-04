
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// Login with email/password; backend returns { access, refresh, user }
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await API.post("auth/login/", { email, password });
      const { access, refresh, user } = res.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(user || null));

      // Also set header immediately for current runtime
      API.defaults.headers.common.Authorization = `Bearer ${access}`;

      return res.data; // includes user
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Login failed. Check credentials."
      );
    }
  }
);

// Logout: clear tokens and axios header, then optional redirect
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ({ navigate } = {}, { dispatch }) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    delete API.defaults.headers.common.Authorization;

    dispatch(logout());

    if (typeof navigate === "function") {
      navigate("/login", { replace: true });
    }

    return true;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    access: localStorage.getItem("access_token") || null,
    refresh: localStorage.getItem("refresh_token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.user = action.payload.user || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.access = null;
        state.refresh = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
