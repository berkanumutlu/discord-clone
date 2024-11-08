import { Server as NetServer } from "http";
import { Socket as NetSocket } from "net";
import { Server as ServerIOServer } from "socket.io";
import { NextApiResponse as OriginalNextApiResponse } from "next";

declare module "next" {
    type NextApiResponseWithSocket<T = any> = OriginalNextApiResponse<T> & {
        socket: NetSocket & {
            server: NetServer & {
                io?: ServerIOServer;
            };
        };
    };

    export type NextApiResponse<T = any> = NextApiResponseWithSocket<T>
}
