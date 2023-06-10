/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Document, WithId } from "mongodb";
import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { AccountModel } from "../../../../domain/models/account";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = MongoHelper.getCollection("accounts");
        const result = await accountCollection.insertOne(accountData);
        const account = (await accountCollection.findOne({
            _id: result.insertedId,
        })) as WithId<Document>;

        return {
            id: account._id.toHexString(),
            name: account.name,
            email: account.email,
            password: account.password,
        };
    }
}
