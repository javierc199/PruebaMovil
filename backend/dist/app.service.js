"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("@langchain/openai");
const pdf_1 = require("langchain/document_loaders/fs/pdf");
const memory_1 = require("langchain/vectorstores/memory");
const chains_1 = require("langchain/chains");
const openai_2 = require("openai");
const pdf_lib_1 = require("pdf-lib");
const promises_1 = require("fs/promises");
const process = require("node:process");
let AppService = class AppService {
    constructor() {
        this.process_docs = async (files, question) => {
            try {
                const openAIApiKey = process.env.OPENAI_API_KEY;
                const model = new openai_1.OpenAI({ openAIApiKey: openAIApiKey });
                const responses = [];
                for (const file of files) {
                    if (file.mimetype !== 'application/pdf') {
                        await this.convertToPDF(file.path, file.path);
                    }
                    const loader = new pdf_1.PDFLoader(file.path, { splitPages: false });
                    const doc = await loader.load();
                    const vectorStore = await memory_1.MemoryVectorStore.fromDocuments(doc, new openai_1.OpenAIEmbeddings({ openAIApiKey: openAIApiKey }));
                    const vectorStoreRetriever = vectorStore.asRetriever();
                    const chain = chains_1.RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
                    const response = await chain.call({ query: question });
                    responses.push(response);
                }
                return responses;
            }
            catch (error) {
                return `Error inesperado: ${error}`;
            }
        };
        this.convertToPDF = async (inputFilePath, outputFilePath) => {
            try {
                const inputData = await promises_1.default.readFile(inputFilePath);
                const pdfDoc = await pdf_lib_1.PDFDocument.create();
                const page = pdfDoc.addPage();
                page.drawText(inputData.toString());
                const pdfBytes = await pdfDoc.save();
                await promises_1.default.writeFile(outputFilePath, pdfBytes);
                console.log(`El archivo se ha convertido a PDF y se ha guardado en: ${outputFilePath}`);
            }
            catch (error) {
                console.error('Error al convertir el archivo a PDF:', error);
            }
        };
        this.openaiRequest = async (prompt, messageContent) => {
            try {
                const openAIApiKey = process.env.OPENAI_API_KEY;
                const openai = new openai_2.OpenAI({
                    apiKey: openAIApiKey,
                });
                const completion = await openai.chat.completions.create({
                    messages: [
                        {
                            role: 'assistant',
                            content: messageContent + prompt,
                        },
                    ],
                    model: 'gpt-3.5-turbo',
                });
                return {
                    text: completion.choices[0].message.content,
                    tokens: completion.usage.total_tokens,
                };
            }
            catch (error) {
                return `Error inesperado: ${error}`;
            }
        };
        this.convert_to_binary = async (prompt) => {
            return await this.openaiRequest(prompt, '¿Cuál es el equivalente binario de ');
        };
        this.count_vowels = async (prompt) => {
            return await this.openaiRequest(prompt, 'Cuenta el numero de vocales en esta frase: ');
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
//# sourceMappingURL=app.service.js.map