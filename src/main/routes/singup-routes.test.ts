/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import app from "../config/app";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
describe("SingUp Routes", () => {
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
    test("Should return an account on success", async () => {
        const response = await request(app).post("/api/signup").send({
            name: "Bernardo",
            email: "bernardo@mail.com",
            password: "12345678",
            passwordConfirmation: "12345678",
        });

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
        expect(response.body.id).toBeTruthy();
        expect(response.body.name).toBe("Bernardo");
        expect(response.body.email).toBe("bernardo@mail.com");
        expect(response.body.password).toBeTruthy();
    });
});
