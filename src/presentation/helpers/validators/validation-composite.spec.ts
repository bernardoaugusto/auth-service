import { ValidationComposite } from "./validation-composite";
import { MissingParamError } from "../../errors";
import { Validation } from "./validation";

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error | undefined {
            return undefined;
        }
    }

    return new ValidationStub();
};

interface SutTypes {
    sut: ValidationComposite;
    validationStubs: Validation[];
}

const makeSut = (): SutTypes => {
    const validationStubs = [makeValidation(), makeValidation()];
    const sut = new ValidationComposite(validationStubs);

    return { sut, validationStubs };
};

describe("Validation Composite", () => {
    it("Should return an error if any validation is fails", () => {
        const { sut, validationStubs } = makeSut();
        jest.spyOn(validationStubs[0], "validate").mockReturnValueOnce(
            new MissingParamError("field")
        );

        const error = sut.validate({ field: "any_value" });
        expect(error).toEqual(new MissingParamError("field"));
    });

    it("Should return the first error if more then one validation fails", () => {
        const { sut, validationStubs } = makeSut();
        jest.spyOn(validationStubs[0], "validate").mockReturnValueOnce(
            new Error()
        );
        jest.spyOn(validationStubs[1], "validate").mockReturnValueOnce(
            new MissingParamError("field")
        );

        const error = sut.validate({ field: "any_value" });
        expect(error).toEqual(new Error());
    });
});
