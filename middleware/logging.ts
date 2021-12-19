import morgan, { StreamOptions } from "morgan";

import { Logger } from "../lib";

const stream: StreamOptions = {
    write: (message: string) => Logger.http(message),
};

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

export const logging = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
);
