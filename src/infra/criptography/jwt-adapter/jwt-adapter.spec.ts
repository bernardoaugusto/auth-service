import jwt from "jsonwebtoken";
import { JwtAdapter } from "./jwt-adapter";

jest.mock("jsonwebtoken", () => ({
    async sign(): Promise<string> {
        return new Promise((resolve) => resolve("any_token"));
    },
}));

describe("Jwt Adapter", () => {
    it("Should call sign with correct values", async () => {
        const sut = new JwtAdapter("secret");
        const signSpy = jest.spyOn(jwt, "sign");

        await sut.encrypt("any_id");
        expect(signSpy).toHaveBeenCalledWith({ id: "any_id" }, "secret");
    });

    it("Should return a token on sing success", async () => {
        const sut = new JwtAdapter("secret");

        const accessToken = await sut.encrypt("any_id");
        expect(accessToken).toBe("any_token");
    });
});
