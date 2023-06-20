import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";
import { makeSignUpController } from "../factories/singup/singup";
import { makeLoginController } from "../factories/login/login-factory";

export default (router: Router): void => {
    router.post("/signup", adaptRoute(makeSignUpController()));
    router.post("/login", adaptRoute(makeLoginController()));
};
