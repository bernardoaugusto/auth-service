import { DbAddAccount } from "../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account";
import { SignUpController } from "../../presentation/controllers/singup/signup";
import { Controller } from "../../presentation/protocols";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";
import { LogControllerDecorator } from "../decorators/log";

export const makeSignUpController = (): Controller => {
    const salt = 12;
    const emailValidatorAdapter = new EmailValidatorAdapter();
    const encryper = new BcryptAdapter(salt);
    const addAccountRepository = new AccountMongoRepository();
    const addAccount = new DbAddAccount(encryper, addAccountRepository);

    const signUpController = new SignUpController(
        emailValidatorAdapter,
        addAccount
    );

    return new LogControllerDecorator(signUpController);
};
