import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingType, User } from "../../types/types";
import { fetchUsers } from "../services/userServices";

type UserSliceState = {
  loading: LoadingType;
  users: User[];
};

const initialState: UserSliceState = {
  loading: LoadingType.pending,
  users: [],
};

// AsyncThunk
export const asyncFetchUsers = createAsyncThunk<User[]>("users/fetchUsers", async () => {
  // errors here will be catched by axiosInstance
  const response = await fetchUsers();
  return response.data;
});

const userSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    setUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncFetchUsers.pending, (state) => {
      state.loading = LoadingType.pending;
    });
    builder.addCase(asyncFetchUsers.fulfilled, (state, { payload }) => {
      state.loading = LoadingType.fulfilled;
      state.users = payload;
    });
    builder.addCase(asyncFetchUsers.rejected, (state) => {
      state.loading = LoadingType.rejected;
    });
  },
});

export default userSlice.reducer;
