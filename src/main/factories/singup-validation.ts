import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/required-field-validation";

export const makeSingUpValidation = (): ValidationComposite => {
    return new ValidationComposite([
        new RequiredFieldValidation("name"),
        new RequiredFieldValidation("email"),
        new RequiredFieldValidation("password"),
        new RequiredFieldValidation("passwordConfirmation"),
    ]);
};
