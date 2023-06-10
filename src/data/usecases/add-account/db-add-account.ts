import { AccountModel } from "../../../domain/models/account";
import {
    AddAccount,
    AddAccountModel,
} from "../../../domain/usecases/add-account";
import { Encrypter } from "../../protocols/encrypter";

export class DbAddAccount implements AddAccount {
    private readonly encryper: Encrypter;

    constructor(encryper: Encrypter) {
        this.encryper = encryper;
    }

    async add(account: AddAccountModel): Promise<AccountModel> {
        this.encryper.encrypt(account.password);
        return new Promise((resolve) => resolve(null as any));
    }
}
