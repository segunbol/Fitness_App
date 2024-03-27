import { Method } from "axios";
import { ObjectId } from "mongoose";

export interface Info {
  [key: string]: string | boolean | ObjectId | undefined;
}

export interface IUser {
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  userImg: string;
  password: string;
  email: string;
  phoneNo: string;
  isAdmin?: boolean | null;
  state: string;
  city: string;
  verified?: boolean | null;
  createdAt: Date | null;
  deletedAt?: Date | null;
}

export interface IGym {
  gymName: string;
  address: string;
  city: string;
  state: string;
  contactPersonId: ObjectId;
  contactPersonName: string;
  phoneNo: number;
}

export interface ISubscription {
  id: ObjectId;
  userId: ObjectId;
  gymId: ObjectId;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface IExercises {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string;
  instructions: string;
}

export interface IToken {
  usedId: ObjectId;
  token: string;
}

export interface UserInfo {
  _id: string;
  userName: string;
  email: string;
  password?: string; // <-- Make password optional
}