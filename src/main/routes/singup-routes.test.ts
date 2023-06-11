/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import app from "../config/app";

describe("SingUp Routes", () => {
    test("Should return an account on success", async () => {
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
