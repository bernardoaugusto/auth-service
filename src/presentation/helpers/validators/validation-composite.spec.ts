import { ValidationComposite } from "./validation-composite";
import { MissingParamError } from "../../errors";
import { Validation } from "./validation";

describe("Validation Composite", () => {
    it("Should return an error if any validation is fails", () => {
        class ValidationStub implements Validation {
            validate(input: any): Error | undefined {
                return new MissingParamError("field");
            }
        }

        const validationStub = new ValidationStub();
        const sut = new ValidationComposite([validationStub]);
        const error = sut.validate({ field: "any_value" });
        expect(error).toEqual(new MissingParamError("field"));
    });
});
