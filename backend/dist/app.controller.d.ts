/// <reference types="multer" />
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    uploadFiles(files: Express.Multer.File[], question: string): Promise<string | any[] | {
        error: string;
    }>;
    convertToBinary(prompt: string): Promise<string | {
        text: string;
        tokens: number;
    } | {
        error: string;
    }>;
    countVowels(prompt: string): Promise<string | {
        text: string;
        tokens: number;
    } | {
        error: string;
    }>;
}
