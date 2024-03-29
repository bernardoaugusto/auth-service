import { InvalidParamError } from "../../errors";
import { Validation } from "../../protocols/validation";

export class CompareFieldsValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly fieldToCompareName: string
    ) {}

    validate(input: { [key: string]: unknown }): Error | undefined {
        if (input[this.fieldName] !== input[this.fieldToCompareName]) {
            return new InvalidParamError(this.fieldToCompareName);
        }
    }
}
