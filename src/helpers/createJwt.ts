import jwt from "jsonwebtoken";
import { userTokenPayload } from "../ts/types";

//function that creates JWT token
export const createJwt = (user: userTokenPayload) => {
  return new Promise((resolve, reject) => {
    const payload = { id: user.id, email: user.email };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_SEED,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.warn(error);
          reject("No se generó el token");
        }
        resolve(token);
      }
    );
  });
};
