import {Request, Response} from "express";

export class HelpController {
    public getHelp(req: Request, res: Response): void {
        res.json({message: "Sorry can't help you"});
    }
}
