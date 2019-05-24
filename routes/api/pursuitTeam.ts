import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import PursuitTeam = require("../../models/pursuitTeam");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await PursuitTeam.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id_pursuit_team = parseInt(req.query["id_pursuit_team"]);
    res.json(isNaN(id_pursuit_team) ? null : await PursuitTeam.obter(id_pursuit_team));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let p = req.body as PursuitTeam;
    jsonRes(res, 400, p ? await PursuitTeam.criar(p) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let p = req.body as PursuitTeam;
    if (p)
        p.id_pursuit_team = parseInt(req.body.id_pursuit_team);
    jsonRes(res, 400, (p && !isNaN(p.id_pursuit_team)) ? await PursuitTeam.alterar(p) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id_pursuit_team = parseInt(req.query["id_pursuit_team"]);
    jsonRes(res, 400, isNaN(id_pursuit_team) ? "Dados inválidos!" : await PursuitTeam.excluir(id_pursuit_team));
}));

export = router;

