import { DbAddAccount } from "../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account";
import { SignUpController } from "../../presentation/controllers/singup/signup";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";

export const makeSignUpController = (): SignUpController => {
    const salt = 12;
    const emailValidatorAdapter = new EmailValidatorAdapter();
    const encryper = new BcryptAdapter(salt);
    const addAccountRepository = new AccountMongoRepository();
    const addAccount = new DbAddAccount(encryper, addAccountRepository);

    return new SignUpController(emailValidatorAdapter, addAccount);
};
