import { createAsyncThunk } from "@reduxjs/toolkit";

import { IUser } from "./type";
import axios from "../../utils";

export const fetchSignInRequest:any  = createAsyncThunk<IUser[], {email: string, password: string}>(
  'auth/employee',
  async (_payload): Promise<IUser[]> => {
    const { data } = await axios.get<IUser[]>(`/employee`);
    return data;
  },
);


export const fetchSignUpRequest:any  = createAsyncThunk<IUser, IUser>(
  'auth/employeeregistration',
  async (payload): Promise<IUser> => {
    const { data } = await axios.post<IUser>(`/employee`, payload);
    return data;
  },
);