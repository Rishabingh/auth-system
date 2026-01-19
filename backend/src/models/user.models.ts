import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { IUser } from "../types/User.types.js";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  refreshToken: String,
  accessToken: String
}, {
  timestamps: true
});

userSchema.pre('save', async function(this: IUser) {
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

userSchema.methods.verifyPassword = async function(
  this: IUser,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

userSchema.methods.generateRefreshToken = function (this: IUser): string {
  const payload = {
    username: this.username
  }
  let secret: string;
  if(process.env.REFRESH_SECRET) {
    secret = process.env.REFRESH_SECRET
  } else {
    secret = "secretnotprovided";
  }

  const refreshToken = jwt.sign(payload, secret, {expiresIn: "10m"})
  this.refreshToken = refreshToken;
  return refreshToken;
}

userSchema.methods.generateAccessToken = function (this: IUser): string {
  const payload = {
    username: this.username
  }
  let secret: string;
  if(process.env.ACCESS_SECRET) {
    secret = process.env.ACCESS_SECRET
  } else {
    secret = "secretnotprovided";
  }

  const AccessToken = jwt.sign(payload, secret, {expiresIn: '2m'})
  return AccessToken;
}

export const User = mongoose.model<IUser>("User", userSchema);