"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = require("cors");
var multer_1 = require("multer");
var dotenv = require("dotenv");
var uuid_1 = require("uuid");
var express_1 = require("express");
var lang_script_1 = require("./lang_script");
dotenv.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
var PORT = 9004;
app.use((0, cors_1.default)());
var storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var fileExtension = path.extname(file.originalname);
        if (!fileExtension.includes('.pdf')) {
            callback(new Error('Only pdfs ara allowed'));
        }
        callback(null, true);
    }
});
var openai_1 = require("openai");
var path = require("path");
var configuration = new openai_1.Configuration({
    apiKey: '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'
});
var openai = new openai_1.OpenAIApi(configuration);
var generatePrompt = function (numberToConvert) {
    return " Tu tienes un rol de convertidor binario y requiero que conviertes este numero ".concat(numberToConvert, " a  binario");
};
var names = [
    {
        id: (0, uuid_1.v4)(),
        firstName: 'javier',
        lastName: 'catucuago'
    },
    {
        id: (0, uuid_1.v4)(),
        firstName: 'Lea',
        lastName: 'Rolfes'
    }
];
app.get("/ping", function (req, res) {
    console.log("alguien ha dado pin!!");
    res.setHeader("Content-Type", "application/json");
    res.send("pong");
});
app.post('/upload', upload.single('file'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!req.file || !((_a = req.body) === null || _a === void 0 ? void 0 : _a.question)) {
                    return [2 /*return*/, res.status(400).send()];
                }
                return [4 /*yield*/, (0, lang_script_1.process_doc)((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename, req.body.question)];
            case 1:
                response = _c.sent();
                res.send(response);
                return [2 /*return*/];
        }
    });
}); });
app.get("/hola/:nombre/:apellido", function (req, res) {
    console.log("alguien ha dado pin!!");
    res.setHeader("Content-Type", "application/json");
    var nombre = req.params.nombre;
    var apellido = req.params.apellido;
    console.log("alguien ha ingresado su nombre");
    res.send({ nombre: nombre, apellido: apellido });
});
app.get('/nombres', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(names);
});
app.post('/nombres', function (req, res) {
    var item = __assign(__assign({}, req.body), { id: (0, uuid_1.v4)() });
    names.push(item);
    res.send(item);
});
app.post('/openapi', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prompt, completion;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prompt = req.body.prompt;
                return [4 /*yield*/, openai.createCompletion({
                        model: 'gpt-3.5-turbo',
                        prompt: generatePrompt(prompt),
                        temperature: 0.1
                    })
                    // @ts-ignore
                ];
            case 1:
                completion = _a.sent();
                // @ts-ignore
                res.send({ result: completion.data.choices[0].text.trim(), token: completion.data.usage.total_tokens });
                return [2 /*return*/];
        }
    });
}); });
app.delete('/nombres/:id', function (req, res) {
    names = names.filter(function (n) { return n.id !== req.params.id; });
    res.status(204).end();
});
app.get('/nombres/:id', function (req, res) {
    var searchedName = names.find(function (n) { return n.id === req.params.id; });
    if (!searchedName)
        res.status(400).end();
    res.send(searchedName);
});
app.put('/nombres/:id', function (req, res) {
    var index = names.findIndex(function (n) { return n.id === req.params.id; });
    if (index === -1)
        res.status(404).end();
    names[index] = __assign(__assign({}, req.body), { id: req.params.id });
    res.status(204).end();
});
app.listen(PORT, function () {
    console.log("running application ".concat(PORT));
});
