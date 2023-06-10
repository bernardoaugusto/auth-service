/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AccountModel,
    AddAccountModel,
    Encrypter,
    AddAccountRepository,
} from "./db-add-accounts-protocols";
import { DbAddAccount } from "./db-add-account";

const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt(value: string): Promise<string> {
            return new Promise((resolve) => resolve("hashed_password"));
        }
    }

    return new EncrypterStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add(accountData: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: "valid_id",
                name: "valid_name",
                email: "valid_email@mail.com",
                password: "hashed_password",
            };

            return new Promise((resolve) => resolve(fakeAccount));
        }
    }

    return new AddAccountRepositoryStub();
};

interface SutTypes {
    sut: DbAddAccount;
    encrypterStub: Encrypter;
    addAccountRepositoryStub: AddAccountRepository;
}

const makeSut = (): SutTypes => {
    const encrypterStub = makeEncrypter();
    const addAccountRepositoryStub = makeAddAccountRepository();

    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);

    return { sut, encrypterStub, addAccountRepositoryStub };
};

describe("DbAddAccount Usecase", () => {
    it("Should call Encrypter with correct password", async () => {
        const { sut, encrypterStub } = makeSut();
        const encryptSpy = jest.spyOn(encrypterStub, "encrypt");

        const accountData = {
            name: "valid_name",
            email: "valid_email@mail.com",
            password: "valid_password",
        };

        await sut.add(accountData);
        expect(encryptSpy).toHaveBeenCalledWith("valid_password");
    });

    it("Should throw if Encrypter throws", async () => {
        const { sut, encrypterStub } = makeSut();
        jest.spyOn(encrypterStub, "encrypt").mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        );

        const accountData = {
            name: "valid_name",
            email: "valid_email@mail.com",
            password: "valid_password",
        };

        const promisse = sut.add(accountData);
        await expect(promisse).rejects.toThrow();
    });

    it("Should call AddAccountRepository with correct values", async () => {
        const { sut, addAccountRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(addAccountRepositoryStub, "add");

        const accountData = {
            name: "valid_name",
            email: "valid_email@mail.com",
            password: "valid_password",
        };

        await sut.add(accountData);

        expect(addSpy).toHaveBeenCalledWith({
            name: "valid_name",
            email: "valid_email@mail.com",
            password: "hashed_password",
        });
    });

    it("Should throw if AddAccountRepository throws", async () => {
        const { sut, addAccountRepositoryStub } = makeSut();
        jest.spyOn(addAccountRepositoryStub, "add").mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        );

        const accountData = {
            name: "valid_name",
            email: "valid_email@mail.com",
            password: "valid_password",
        };

        const promisse = sut.add(accountData);
        await expect(promisse).rejects.toThrow();
    });

    it("Should return an account on success", async () => {
        const { sut } = makeSut();

        const accountData = {
            name: "valid_name",
            email: "valid_email@mail.com",
            password: "valid_password",
        };

        const account = await sut.add(accountData);
        expect(account).toEqual({
            id: "valid_id",
            name: "valid_name",
            email: "valid_email@mail.com",
            password: "hashed_password",
        });
    });
});