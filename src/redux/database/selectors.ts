import { RootState } from "..";

export const isauth = (state: RootState) => state.database.isauth;



export const userList = (state: RootState) => state.database.users;
