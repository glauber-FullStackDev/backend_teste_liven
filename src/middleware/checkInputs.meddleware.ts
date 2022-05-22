import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { checkEmailAlreadyExist } from "../Controllers/Users.ctrl";

//----------------Create User Check-------------------------//

export const checkBodyCreateUser = [
  body("email", "invalid email").isEmail(),
  body("password", "invalid email").isLength({ min: 6 }),
  body("firstname", "invalid firstname").exists().isLength({ min: 4 }),
  body("lastname", "invalid lastname").exists().isLength({ min: 4 }),
  body("age").exists().isInt(),
  body("gender").custom((value, { req }) => {
    return value == "M" || value == "F";
  }),
];

export const checkResultInputsCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      let emailAlreadyExist = await checkEmailAlreadyExist(req.body.email);

      if (emailAlreadyExist) {
        return res.status(400).json({ errors: "email already in use" });
      } else {
        next();
      }
    } catch (error: any) {
      return res.status(400).json({ errors: error.message });
    }
  }
};

//----------------------------Sign-In---------------------------//

export const checkBodyInputsSignin = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

export const checkResultInputsSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

//-------------------Create Address check----------------//

export const checkBodyAddAddress = [
  body("street", "street is a mandatory field").exists(),
  body("number", "number is a mandatory field").exists(),
  body("neighborhood", "neighborhood is a mandatory field").exists(),
  body("city", "city is a mandatory field").exists(),
  body("state", "state is a mandatory field").exists(),
  body("country", "country is a mandatory field").exists(),
];

export const checkResultInputsCreateAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next()
  }
};
