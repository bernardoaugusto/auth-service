import { InvalidParamError, MissingParamError } from "../../errors";
import { EmailValidator } from "../../protocols/email-validator";
import { Validation } from "./validation";

export class EmailValidation implements Validation {
    private readonly fieldName: string;
    private readonly emailValidator: EmailValidator;

    constructor(fieldName: string, emailValidator: EmailValidator) {
        this.fieldName = fieldName;
        this.emailValidator = emailValidator;
    }

    validate(input: { [key: string]: unknown }): Error | undefined {
        const isValid = this.emailValidator.isValid(
            input[this.fieldName] as string
        );

        if (!isValid) {
            return new InvalidParamError(this.fieldName);
        }
    }
}
