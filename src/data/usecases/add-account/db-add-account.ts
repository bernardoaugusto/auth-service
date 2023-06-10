import {
    AccountModel,
    AddAccount,
    AddAccountModel,
    Encrypter,
} from "./db-add-accounts-protocols";

export class DbAddAccount implements AddAccount {
    private readonly encryper: Encrypter;

    constructor(encryper: Encrypter) {
        this.encryper = encryper;
    }

    async add(account: AddAccountModel): Promise<AccountModel> {
        await this.encryper.encrypt(account.password);
        return new Promise((resolve) => resolve(null as any));
    }
}
