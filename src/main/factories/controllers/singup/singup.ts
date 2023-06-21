import { SignUpController } from "../../../../presentation/controllers/singup/signup-controller";
import { Controller } from "../../../../presentation/protocols";
import { makeSingUpValidation } from "./singup-validation-factory";
import { makeDbAuthentication } from "../../usecases/authentication/db-authentication-factory";
import { makeDbAddAccount } from "../../usecases/add-account/add-account-factory";
import { makeLogControllerDecorator } from "../../decorators/log-controller-decorator-factory";

export const makeSignUpController = (): Controller => {
    const signUpController = new SignUpController(
        makeDbAddAccount(),
        makeSingUpValidation(),
        makeDbAuthentication()
    );

    return makeLogControllerDecorator(signUpController);
};
