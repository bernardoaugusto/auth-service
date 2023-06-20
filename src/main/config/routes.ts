import { Express, Router } from "express";
import env from "./env";
import { readdirSync } from "fs";

export default (app: Express): void => {
    const extention = env.nodeEnv === "production" ? "js" : "ts";
    const router = Router();
    app.use("/api", router);

    readdirSync(`${__dirname}/../routes`).map(async (file) => {
        if (!file.includes(".test.")) {
            (await import(`../routes/${file}`)).default(router);
        }
    });
};
