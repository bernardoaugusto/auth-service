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
        const account = await this.loadAccountByEmailRepository.loadByEmail(
            accountData.email
        );

        if (!account) {
            const hashedPassword = await this.hasher.hash(accountData.password);
            return this.addAccountRepository.add({
                ...accountData,
                password: hashedPassword,
            });
        }

        return null;
    }
}
