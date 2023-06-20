/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import app from "../config/app";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
describe("Login Routes", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        const accountCollection = await MongoHelper.getCollection("accounts");
        await accountCollection.deleteMany({});
    });

    describe("POST /signup", () => {
        test("Should return 200 on singup", async () => {
            const response = await request(app)
                .post("/api/signup")
                .send({
                    name: "Bernardo",
                    email: "bernardo@mail.com",
                    password: "12345678",
                    passwordConfirmation: "12345678",
                })
                .expect(200);
        });
    });
});
