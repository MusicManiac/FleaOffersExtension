"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonc_1 = require("C:/snapshot/project/node_modules/jsonc");
const path_1 = __importDefault(require("path"));
class FleaOffersExtension {
    mod;
    modShortName;
    constructor() {
        this.mod = "MusicManiac - Flea Offers Extension";
        this.modShortName = "FleaOffersExtension";
    }
    postDBLoad(container) {
        const logger = container.resolve("WinstonLogger");
        logger.info(`[${this.modShortName}] ${this.mod} Loading`);
        const db = container.resolve("DatabaseServer");
        const tables = db.getTables();
        const vfs = container.resolve("VFS");
        const config = jsonc_1.jsonc.parse(vfs.readFile(path_1.default.resolve(__dirname, "../config.jsonc")));
        tables.globals.config.RagFair.maxActiveOfferCount = config.maxActiveOfferCount;
        logger.success(`[${this.modShortName}] ${this.mod} Loaded`);
    }
}
module.exports = { mod: new FleaOffersExtension() };
//# sourceMappingURL=mod.js.map