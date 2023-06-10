import {
    AccountModel,
    AddAccount,
    AddAccountModel,
    Encrypter,
    AddAccountRepository,
} from "./db-add-accounts-protocols";

export class DbAddAccount implements AddAccount {
    private readonly encryper: Encrypter;

    private readonly addAccountRepository: AddAccountRepository;

    constructor(
        encryper: Encrypter,
        addAccountRepository: AddAccountRepository
    ) {
        this.encryper = encryper;
        this.addAccountRepository = addAccountRepository;
    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.encryper.encrypt(
            accountData.password
        );

        await this.addAccountRepository.add({
            ...accountData,
            password: hashedPassword,
        });

        return new Promise((resolve) => resolve(null as any));
    }
}
