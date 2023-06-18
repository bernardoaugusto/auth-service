import {
    AccountModel,
    AddAccount,
    AddAccountModel,
    Hasher,
    AddAccountRepository,
} from "./db-add-accounts-protocols";

export class DbAddAccount implements AddAccount {
    private readonly hasher: Hasher;

    private readonly addAccountRepository: AddAccountRepository;

    constructor(hasher: Hasher, addAccountRepository: AddAccountRepository) {
        this.hasher = hasher;
        this.addAccountRepository = addAccountRepository;
    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.hasher.hash(accountData.password);

        return this.addAccountRepository.add({
            ...accountData,
            password: hashedPassword,
        });
    }
}
