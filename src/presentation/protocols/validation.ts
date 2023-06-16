export interface Validation {
    validate(input: { [key: string]: unknown }): Error | undefined;
}
