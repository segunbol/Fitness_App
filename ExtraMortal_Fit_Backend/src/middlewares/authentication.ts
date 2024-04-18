import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import { IUser } from '../utils/types';

declare module "express" {
  interface Request {
    user?: any;
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  // console.log(req)
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.SECRET!, (err, decode) => {
      if (err) {
        res.status(403).send({ success: false, message: "Invalid Token" });
      } else {
        req.user = decode;
        console.log(124567890);
        console.log(req.user);
        next();
      }
    });
  } else {
    res.status(403).send({ success: false, message: "No Token" });
  }
};

export const checkGym = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.gymid) {
    if (req.params.gymid === req.user.gymid) {
      next();
    } else {
      console.log("here")
      res.status(401).send({ message: "Not Permitted" });
    }
  } else {
    res.status(401).send({ message: "Not Permitted" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

// export const verifyAccess = async (
//   req: Request,
//   access: string[]
// ): Promise<Boolean> => {
//   if (req.user) {
//     // allow access if user is a super admin
//     // allow access if user trying to perform the action is not an admin but is a company
//     if (req.user.isAdmin || req.user.isCompanyAdmin) {
//       return true;
//     }
//     // Allow riders to view, start and stop adhocs
//     if (req.user.userType.toLowerCase() === "rider") {
//       const adhocsArray = ['view_adhocs', 'start_adhocs', 'end_adhocs'];
//       return adhocsArray.some(item => access.includes(item));
//     }

//     const { role_id } = req.user!;
//     if (role_id) {
//       const { permissions } = role_id as IRoleInfo;
//       if (permissions && permissions.length) {
//         return access.some((key) => permissions.includes(key));
//       }
//     }
//   }

//   return false;
// };
