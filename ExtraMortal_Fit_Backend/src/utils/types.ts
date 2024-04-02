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

export interface UserInfo {
  _id: string;
  userName: string;
  email: string;
  password?: string; // <-- Make password optional
}
export interface IGym {
  gymName: string;
  address: string;
  city: string;
  state: string;
  contactPersonUserName: String;
  contactPersonFirstName: string;
  contactPersonLastName: string;
  phoneNo: number;
  verified: boolean;
  gymImg: string;
  email: string;
  password: string;
  subscriptionTypeAndAmount: string;
  
}

export interface GymInfo {
  _id: string;
  gymName: string;
  email: string;
  password?: string; // <-- Make password optional
}
export interface ISubscription {
  id: ObjectId;
  customerUserId: ObjectId;
  customerUsername: string;
  gymId: ObjectId;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  subscriptionType: string;
  subscriptionTypeCount: number;
  createdBy:ObjectId;
  createdByUsername:string;
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




