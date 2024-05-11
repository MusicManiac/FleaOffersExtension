import { DependencyContainer } from "tsyringe";
import { Ilogger } from "@spt-aki/models/spt/utils/Ilogger";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

import { VFS } from "@spt-aki/utils/VFS";
import { jsonc } from "jsonc";
import path from "path";

class FleaOffersExtension implements IPostDBLoadMod
{

	public mod: string;
    public modShortName: string;

	constructor() {
        this.mod = "MusicManiac - Flea Offers Extension";
        this.modShortName = "FleaOffersExtension";
	}

	public postDBLoad(container: DependencyContainer): void 
	{
		const logger = container.resolve<Ilogger>("WinstonLogger");

		logger.info(`[${this.modShortName}] ${this.mod} Loading`);

		const db = container.resolve<DatabaseServer>("DatabaseServer");
		const tables = db.getTables();

		const vfs = container.resolve<VFS>("VFS");
		const config = jsonc.parse(vfs.readFile(path.resolve(__dirname, "../config.jsonc")));

		tables.globals.config.RagFair.maxActiveOfferCount = config.maxActiveOfferCount;

		logger.success(`[${this.modShortName}] ${this.mod} Loaded`);
	}
}

module.exports = { mod: new FleaOffersExtension() }