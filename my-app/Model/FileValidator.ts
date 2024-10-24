class FileValidator {
    private allowedFileTypes: string[];
    private errorMessage: string;

    constructor(allowedFileTypes: string[], errorMessage: string) {
        this.allowedFileTypes = allowedFileTypes;
        this.errorMessage = errorMessage;
    }

    public validate(file: File): void {
        if (!this.allowedFileTypes.includes(file.type)) {
            throw new Error(this.errorMessage);
        }
    }
}

export default FileValidator;