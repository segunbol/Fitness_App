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
  height: string;
  age: number;
  currentWeight: number;
  targetWeight: number;
  focusArea: string;
  goals: string;
  bmi: number;
  image: string;
  level: string;
  difficulty: string;
  gymSubscribed: { gymId: ObjectId; name: string }[];
  images: string[];
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
  contactPersonUserName: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
  phoneNo: number;
  verified: boolean;
  email: string;
  password: string;
  country: string;
  gymImage: string;
  listOfSubsribers: { userId: ObjectId; username: string }[];
  subscriptionTypeAndAmount: { subType: string; amount: number }[];
  currency: string;
  gymImages: string;
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
  subscriptionAmount: number;
  subscriptionVariation: string;
  subscriptionTypeCount: number;
  createdBy: ObjectId;
  createdByUsername: string;
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
  difficulty: string;
  level: string;
}

export interface IToken {
  usedId: ObjectId;
  token: string;
}

export interface IGymActivity {
  gymId: ObjectId;
  gymName: string;
  name: string;
  description: string;
  day: string[];
  sessionStart: string;
  sessionEnd: string;
  image: string;
  images: string[];
  videos: string[];
  equipments: string[];
}

export interface IProduct {
  gymId: ObjectId;
  gymName: string;
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
}

export interface IInflow {
  customerUserId: ObjectId;
  productId: ObjectId;
  gymId: ObjectId;
  quantity: number;
  price: number;
  totalAmount: number;
  paid: boolean;
  createdBy: ObjectId;
}

export interface IExpense {
  gymId: ObjectId;
  gymName: string;
  item: string;
  expenseType: string;
  itemDescription: string;
  quantity: number;
  unitCost: number;
  unitDescription: string;
  purchaseDate: Date;
  lifeSpan: number;
  period: string;
}
