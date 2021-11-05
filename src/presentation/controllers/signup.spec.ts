import { SignUpController } from "./signup";

describe("SingUP Controller", () => {
    it("Should return 400 if no name is provided", () => {
        const sut = new SignUpController();
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email",
                password: "any_password",
                passwordConfirmation: "any_password",
            },
        };

        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse).toBe(400);
    });
});
