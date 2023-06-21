import {
    AccountModel,
    AddAccount,
    AddAccountModel,
    Hasher,
    AddAccountRepository,
    LoadAccountByEmailRepository,
} from "./db-add-accounts-protocols";

export class DbAddAccount implements AddAccount {
    constructor(
        private readonly hasher: Hasher,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    ) {}

    async add(accountData: AddAccountModel): Promise<AccountModel | null> {
        const hashedPassword = await this.hasher.hash(accountData.password);

        await this.loadAccountByEmailRepository.loadByEmail(accountData.email);

        return this.addAccountRepository.add({
            ...accountData,
            password: hashedPassword,
        });
    }
}
