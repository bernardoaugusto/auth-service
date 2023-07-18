/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import app from "../config/app";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import { Collection } from "mongodb";
import { hash } from "bcrypt";
import env from "../config/env";

let accountCollection: Collection;

describe("Login Routes", () => {
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

    describe("POST /signup", () => {
        test("Should return 200 on singup", async () => {
            await request(app)
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

    describe("POST /login", () => {
        test("Should return 200 on login", async () => {
            const password = await hash("123", 12);
            await accountCollection.insertOne({
                name: "Bernardo",
                email: "bernardo@mail.com",
                password,
            });

            await request(app)
                .post("/api/login")
                .send({
                    email: "bernardo@mail.com",
                    password: "123",
                })
                .expect(200);
        });

        test("Should return 401 on login", async () => {
            await request(app)
                .post("/api/login")
                .send({
                    email: "bernardo@mail.com",
                    password: "123",
                })
                .expect(401);
        });
    });
});
