import express, { Request, Response } from "express";
import si from "systeminformation";
import type { ISystemInformation } from "./object";
// import { createServer, IncomingMessage, ServerResponse } from "http";
// import { helloWorld } from './hello-world';

const port = process.env.PORT || 8000;
const app = express();

app.get("/api/v1/sysinfo", async (req: Request, res: Response) => {
    const [
        cpu,
        system,
        mem,
        os,
        currentLoad,
        processes,
        diskLayout,
        networkInterfaces
    ] = await Promise.all([
        si.cpu(),
        si.system(),
        si.mem(),
        si.osInfo(),
        si.currentLoad(),
        si.processes(),
        si.diskLayout(),
        si.networkInterfaces()
    ]);

    const sysinfo: ISystemInformation = {
        cpu,
        system,
        mem,
        os,
        currentLoad,
        processes,
        diskLayout,
        networkInterfaces
    };
    res.status(200).json(sysinfo);
});


app.use((req: Request, res: Response): void => {
    res.status(404).json({
        error: "Not Found",
        path: req.path
    });
});

app.listen(port, () => {
    console.log(`Serveur Démarré sur http://localhost:${port}`);
})

export default app;


