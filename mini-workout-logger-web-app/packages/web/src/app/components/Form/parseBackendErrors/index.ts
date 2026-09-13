export type FormErrors = Record<string, string>;

/**
 * Parses backend validation errors from the format "fieldName -> error message"
 * into a Record<string, string> keyed by field name.
 */
export const parseBackendErrors = (errors: string[]): FormErrors => {
    const result: FormErrors = {};

    errors.forEach(error => {
        const separatorIndex = error.indexOf(' -> ');
        if (separatorIndex !== -1) {
            const field = error.slice(0, separatorIndex).trim();
            const message = error.slice(separatorIndex + 4).trim();
            result[field] = message;
        }
    });

    return result;
};

export default parseBackendErrors;
