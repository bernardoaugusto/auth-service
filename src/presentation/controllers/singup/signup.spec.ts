/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
import { rejects } from "assert";
import {
    MissingParamError,
    InvalidParamError,
    ServerError,
} from "../../errors";
import { SignUpController } from "./signup";
import {
    EmailValidator,
    AccountModel,
    AddAccount,
    AddAccountModel,
} from "./singup-protocols";

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true;
        }
    }

    return new EmailValidatorStub();
};

const makeAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        async add(account: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: "valid_id",
                name: "valid_name",
                email: "valid_email@mail.com",
                password: "valid_password",
            };

            return new Promise((resolve) => resolve(fakeAccount));
        }
    }

    return new AddAccountStub();
};

interface SutTypes {
    sut: SignUpController;
    emailValidatorStub: EmailValidator;
    addAccountStub: AddAccount;
}

const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator();
    const addAccountStub = makeAddAccount();

    const sut = new SignUpController(emailValidatorStub, addAccountStub);

    return { sut, emailValidatorStub, addAccountStub };
};

describe("SingUP Controller", () => {
    it("Should return 400 if no name is provided", async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                email: "any_email@mail.com",
                password: "any_password",
                passwordConfirmation: "any_password",
            },
        };

        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("name"));
    });

    it("Should return 400 if no email is provided", async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: "any_name",
                password: "any_password",
                passwordConfirmation: "any_password",
            },
        };

        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("email"));
    });

    it("Should return 400 if no password is provided", async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@mail.com",
                passwordConfirmation: "any_password",
            },
        };

        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("password"));
    });

    it("Should return 400 if no password confirmation is provided", async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@mail.com",
                password: "any_password",
            },
        };

        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(
            new MissingParamError("passwordConfirmation")
        );
    });

    it("Should return 400 if password confirmation fails", async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@mail.com",
                password: "any_password",
                passwordConfirmation: "invalid_password",
            },
        };

        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(
            new InvalidParamError("passwordConfirmation")
        );
    });

    it("Should return 400 if an invalid email is provided", async () => {
        const { sut, emailValidatorStub } = makeSut();
        jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

        const httpRequest = {
            body: {
                name: "any_name",
                email: "invalid_email@mail.com",
                password: "any_password",
                passwordConfirmation: "any_password",
            },
        };

        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError("email"));
    });

    it("Should call EmailValidator with correct email", async () => {
        const { sut, emailValidatorStub } = makeSut();
        const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@mail.com",
                password: "any_password",
                passwordConfirmation: "any_password",
            },
        };

        await sut.handle(httpRequest);
        expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
    });

    it("Should return 500 if EmailValidaotr throws", async () => {
        const { sut, emailValidatorStub } = makeSut();
        jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
            throw new Error();
        });

        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@mail.com",
                password: "any_password",
                passwordConfirmation: "any_password",
            },
        };

        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });

    it("Should return 500 if AddAccount throws", async () => {
        const { sut, addAccountStub } = makeSut();
        jest.spyOn(addAccountStub, "add").mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()));
        });

        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@mail.com",
                password: "any_password",
                passwordConfirmation: "any_password",
            },
        };

        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });

    it("Should call AddAccount with correct values", async () => {
        const { sut, addAccountStub } = makeSut();
        const addSpy = jest.spyOn(addAccountStub, "add");

        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@mail.com",
                password: "any_password",
                passwordConfirmation: "any_password",
            },
        };

        await sut.handle(httpRequest);
        expect(addSpy).toHaveBeenCalledWith({
            name: "any_name",
            email: "any_email@mail.com",
            password: "any_password",
        });
    });

    it("Should return 200 if valid data is provided", async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: "valid_name",
                email: "valid_email@mail.com",
                password: "valid_password",
                passwordConfirmation: "valid_password",
            },
        };

        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual({
            id: "valid_id",
            name: "valid_name",
            email: "valid_email@mail.com",
            password: "valid_password",
        });
    });
});
