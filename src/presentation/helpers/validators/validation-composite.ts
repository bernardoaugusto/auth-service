import { Validation } from "../../protocols/validation";

export class ValidationComposite implements Validation {
    private readonly validations: Validation[];

    constructor(validations: Validation[]) {
        this.validations = validations;
    }

    validate(input: { [key: string]: unknown }): Error | undefined {
        for (const validation of this.validations) {
            const error = validation.validate(input);
            if (error) {
                return error;
            }
        }
    }
}
