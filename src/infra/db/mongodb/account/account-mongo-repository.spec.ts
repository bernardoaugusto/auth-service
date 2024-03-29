import { Collection } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account-mongo-repository";
import env from "../../../../main/config/env";

let accountCollection: Collection;

describe("Account Mongo Repository", () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.mongoJustUrl);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        accountCollection = await MongoHelper.getCollection("accounts");
        await accountCollection.deleteMany({});
    });

    const makeSut = (): AccountMongoRepository => {
        return new AccountMongoRepository();
    };

    it("Should return an account on success", async () => {
        const sut = makeSut();
        const account = await sut.add({
            name: "any_name",
            email: "any_email@mail.com",
            password: "any_password",
        });

        expect(account).toBeTruthy();
        expect(account.id).toBeTruthy();
        expect(account.name).toBe("any_name");
        expect(account.email).toBe("any_email@mail.com");
        expect(account.password).toBe("any_password");
    });

    it("Should return an account on loadByEmail success", async () => {
        const sut = makeSut();
        await accountCollection.insertOne({
            name: "any_name",
            email: "any_email@mail.com",
            password: "any_password",
        });

        const account = await sut.loadByEmail("any_email@mail.com");

        expect(account).toBeTruthy();
        expect(account?.id).toBeTruthy();
        expect(account?.name).toBe("any_name");
        expect(account?.email).toBe("any_email@mail.com");
        expect(account?.password).toBe("any_password");
    });

    it("Should return null if loadByEmail fails", async () => {
        const sut = makeSut();
        const account = await sut.loadByEmail("any_email@mail.com");

        expect(account).toBeFalsy();
    });

    it("Should update the account accessToken on updateAccessToken success", async () => {
        const sut = makeSut();
        const result = await accountCollection.insertOne({
            name: "any_name",
            email: "any_email@mail.com",
            password: "any_password",
        });

        let account = await accountCollection.findOne({
            _id: result.insertedId,
        });

        expect(account!.accessToken).toBeFalsy();

        await sut.updateAccessToken(
            result.insertedId.toHexString(),
            "any_token"
        );

        account = await accountCollection.findOne({
            _id: result.insertedId,
        });

        expect(account).toBeTruthy();
        expect(account!.accessToken).toBe("any_token");
    });
});
