import { createSlice } from "@reduxjs/toolkit";
import { fetchSignInRequest, fetchSignUpRequest } from "./asyncActions";


export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}
export interface IUser {
  firstname: string
  lastname: string
  email: string
  password: string
  role: string
}

interface AuthState {
  user: IUser | null
  isAuth: boolean
  status: Status
}

const initialState: AuthState = {
  user: null,
  status: Status.LOADING,
  isAuth: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {

    builder.addCase(fetchSignUpRequest.pending, (state) => {

    })
    builder.addCase(fetchSignUpRequest.fulfilled, (state, action) => {
      alert('User Created Sucessfully')
    })
    builder.addCase(fetchSignUpRequest.rejected, (state, action) => {
      alert('User is not availble in out Database')
    });

    builder
      .addCase(fetchSignInRequest.pending, (state, action) => {
        state.status = Status.LOADING;
      })

    builder.addCase(fetchSignInRequest.fulfilled, (state, action) => {
      const { meta: { arg }, payload } = action;

      const user = payload.find(({ email, password }: IUser) => email === arg["email"] && password === arg["password"])
      if (user) {
        alert('Login Sucessfully')
        state.user = user;
        state.isAuth = true;
        state.status = Status.SUCCESS;
      } else {
        alert('User is not availble in out Database')
        state.status = Status.ERROR;
      }
    })
    builder.addCase(fetchSignInRequest.rejected, (state, action) => {
      alert('Getting Server Side Error')
      state.status = Status.ERROR;
    })
  },
})

export const { } = authSlice.actions;


export default authSlice.reducer;