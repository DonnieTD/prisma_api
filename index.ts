import { PrismaClient } from "@prisma/client";
import express, { Express } from "express";
import {
    AuthRoutes,
    UserRoutes,
    EnquiriesRoutes,
    InitRoutes,
    PostsRoutes,
} from "./Routes";
import { authorize } from "./middleware/authorize";
import helmet from "helmet";
import * as TE from "fp-ts/lib/TaskEither";
import { ErrorToText } from "./lib";
import { logging } from "./middleware/logging";
import { fold } from "fp-ts/lib/Either";
import cors from "cors";
import expressJSDocSwagger from "express-jsdoc-swagger";
import { SwaggerOptions } from "./lib/Swagger";
import axios from "axios";

export const accessTokenSecret = "youraccesstokensecret";
export const prisma = new PrismaClient();

const server = async () => {
    const App: Express = express();
    expressJSDocSwagger(App)(SwaggerOptions);

    App.use([
        cors(),
        helmet(),
        express.json(),
        express.urlencoded({
            extended: true,
        }),
    ]);

    App.get("/realtime", async (req, res) => {
        var d = new Date();

        d.setMinutes(d.getMinutes() - 5);

        let { data }: any = await axios.get(
            `http://34.247.217.116:5000/getFlowData?IMEI=083af24bc50c&fromDate=${d
                .toISOString()
                .substr(0, 16)}&limit=100`
        );

        let one = data.flowdata.filter((x: any) => x.tap_position === 1);
        let two = data.flowdata.filter((x: any) => x.tap_position === 2);

        res.status(200).json({
            "0": one[one.length - 1]?.temperature || "No data",
            "0.1": one[one.length - 1]?.ml || "No data",
            "1": two[two.length - 1]?.temperature || "No data",
            "1.1": two[two.length - 1]?.ml || "No data",
        });
    });

    App.get("/", logging, (_, res) => {
        res.status(200).json({ message: "Welcome to the api" });
    });
    App.use("/users", logging, authorize, UserRoutes);
    App.use("/init", logging, authorize, InitRoutes);
    App.use("/posts", logging, authorize, PostsRoutes);

    // Auth and Rate limits in route definition
    App.use("/enquiries", logging, EnquiriesRoutes);
    App.use("/auth", logging, AuthRoutes);
    App.listen(5000, () =>
        console.log(`App listening at http://localhost:${5000}`)
    );
};

(async () => {
    const ServerEither = await TE.tryCatch(server, (err) => err as Error)();

    const Server = fold<Error, void, Error | void>(
        (e) => e,
        (x) => x
    )(ServerEither);

    if (Server instanceof Error) console.log(ErrorToText(Server));
})();
