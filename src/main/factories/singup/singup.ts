import env from "../../config/env";
import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { AccountMongoRepository } from "../../../infra/db/mongodb/account/account-mongo-repository";
import { SignUpController } from "../../../presentation/controllers/singup/signup-controller";
import { Controller } from "../../../presentation/protocols";
import { LogControllerDecorator } from "../../decorators/log-controller-decorator";
import { LogMongoRepository } from "../../../infra/db/mongodb/log/log-mongo-repository";
import { makeSingUpValidation } from "./singup-validation-factory";
import { JwtAdapter } from "../../../infra/criptography/jwt-adapter/jwt-adapter";
import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication";

export const makeSignUpController = (): Controller => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const addAccountRepository = new AccountMongoRepository();
    const addAccount = new DbAddAccount(bcryptAdapter, addAccountRepository);
    const jwtAdapter = new JwtAdapter(env.jwtSecret);

    const dbAuthentication = new DbAuthentication(
        addAccountRepository,
        bcryptAdapter,
        jwtAdapter,
        addAccountRepository
    );

    const signUpController = new SignUpController(
        addAccount,
        makeSingUpValidation(),
        dbAuthentication
    );

    const logMongoRepository = new LogMongoRepository();

    return new LogControllerDecorator(signUpController, logMongoRepository);
};
