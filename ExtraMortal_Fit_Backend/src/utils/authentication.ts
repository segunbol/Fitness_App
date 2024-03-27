// import jwt from 'jsonwebtoken';
// import NodeCache from 'node-cache';
// import { Info, IUserTokenData } from './types';
// import { Users } from '../models';
// import { ObjectId } from 'mongoose';
// // import PasswordResetToken from '../models/passwordResetTokenModel';

// export class CacheClient {
//   client: NodeCache;

//   constructor() {
//     this.client = new NodeCache();
//   }

//   async set(token: string, time: number) {
//     return this.client.set(token, true, time);
//   }

//   async get(token: string) {
//     return this.client.get(token);
//   }
// }