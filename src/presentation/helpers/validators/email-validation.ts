import { InvalidParamError, MissingParamError } from "../../errors";
import { EmailValidator } from "../../protocols/email-validator";
import { Validation } from "../../protocols/validation";

export class EmailValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly emailValidator: EmailValidator
    ) {}

    validate(input: { [key: string]: unknown }): Error | undefined {
        const isValid = this.emailValidator.isValid(
            input[this.fieldName] as string
        );

        if (!isValid) {
            return new InvalidParamError(this.fieldName);
        }
    }
}
