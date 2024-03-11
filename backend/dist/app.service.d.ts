/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
export declare class AppService {
    constructor();
    process_docs: (files: Express.Multer.File[] | undefined, question: string) => Promise<string | any[]>;
    convertToPDF: (inputFilePath: string, outputFilePath: string) => Promise<void>;
    openaiRequest: (prompt: string, messageContent: string) => Promise<string | {
        text: string;
        tokens: number;
    }>;
    convert_to_binary: (prompt: string) => Promise<string | {
        text: string;
        tokens: number;
    }>;
    count_vowels: (prompt: string) => Promise<string | {
        text: string;
        tokens: number;
    }>;
}
