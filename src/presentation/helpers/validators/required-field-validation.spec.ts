import { MissingParamError } from "../../errors";
import { RequiredFieldValidation } from "./required-field-validation";
describe("RequiredFieldValidation", () => {
    it("Should return a MissingParamError if validation fails", () => {
        const sut = new RequiredFieldValidation("field");
        const error = sut.validate({ name: "any_name" });

        expect(error).toEqual(new MissingParamError("field"));
    });

    it("Should not return if validation succeeds", () => {
        const sut = new RequiredFieldValidation("field");
        const error = sut.validate({ field: "any_field" });

        expect(error).toBeFalsy();
    });
});