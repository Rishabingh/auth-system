import { IUser } from "./User.types.js";
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: IUser;
}