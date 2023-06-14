import { Express, Router } from "express";
import fg from "fast-glob";
import env from "./env";

export default (app: Express): void => {
    const extention = env.nodeEnv === "production" ? "js" : "ts";
    const router = Router();
    app.use("/api", router);

    fg.sync(`**/main/routes/**routes.${extention}`).forEach(async (file) =>
        (await import(`../../../${file}`)).default(router)
    );
};
