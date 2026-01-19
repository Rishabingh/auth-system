import { Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  username: string;
  password: string;
  isLoggedIn?: boolean;
  refreshToken?: string;
  accessToken?: string;

  verifyPassword(password: string): Promise<boolean>;
  generateRefreshToken(): string;
  generateAccessToken(): string;
}

export interface IUserResponse {
  id: string;
  name?: string;
  email: string;
  username: string;
  accessToken: string;
}


export interface RegisterInput {
  email: string;
  username: string;
  password: string;
}