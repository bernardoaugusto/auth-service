import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adapter";
import { AccountMongoRepository } from "../../../infra/db/mongodb/account-repository/account";
import { SignUpController } from "../../../presentation/controllers/singup/signup";
import { Controller } from "../../../presentation/protocols";
import { LogControllerDecorator } from "../../decorators/log";
import { LogMongoRepository } from "../../../infra/db/mongodb/log-repository/log";
import { makeSingUpValidation } from "./singup-validation";

export const makeSignUpController = (): Controller => {
    const salt = 12;
    const encryper = new BcryptAdapter(salt);
    const addAccountRepository = new AccountMongoRepository();
    const addAccount = new DbAddAccount(encryper, addAccountRepository);

    const signUpController = new SignUpController(
        addAccount,
        makeSingUpValidation()
    );

    const logMongoRepository = new LogMongoRepository();

    return new LogControllerDecorator(signUpController, logMongoRepository);
};