import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

// export const admin_login = createAsyncThunk(
//   "auth/admin_login",
//   async (info, { rejectWithValue }) => {
//     console.log(info);
//     try {
//       const { data } = await api.post("/admin-login", info, {
//         withCredentials: true,
//       });
//       localStorage.setItem("accessToken", data.token);
//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : { error: "Something went wrong" }
//       );
//     }
//   }
// );

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const { data } = await api.post("/seller-register", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller-login", info, {
        withCredentials: true,
      });
      console.log(data);
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-user", { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const returnRole = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token);
    console.log(decodeToken);
    const expireTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      console.log(decodeToken.role);
      return decodeToken.role;
    }
  } else {
    return "";
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
    role: returnRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
  },
  reducers: {
    messageClear: (state, action) => {
      state.errorMessage = "";
      state.successMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(admin_login.fulfilled, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
        state.successMessage = action.payload.message;
      })
      .addCase(admin_login.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload
          ? action.payload.error
          : "An error occurred";
      })
      .addCase(seller_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(seller_login.fulfilled, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
        state.successMessage = action.payload.message;
      })
      .addCase(seller_login.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload
          ? action.payload.error
          : "An error occurred";
      })
      .addCase(seller_register.pending, (state) => {
        state.loader = true;
      })
      .addCase(seller_register.fulfilled, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
        state.successMessage = action.payload.message;
      })
      .addCase(seller_register.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload
          ? action.payload.error
          : "An error occurred";
      })
      .addCase(get_user_info.fulfilled, (state, action) => {
        state.loader = false;
        // state.userInfo = action.payload.user;
        state.userInfo = action.payload.userInfo;
        // state.token = action.payload.token;
        // state.role = returnRole(action.payload.token);
        state.successMessage = action.payload.message;
      });
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
