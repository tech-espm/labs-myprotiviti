import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import Perfil = require("../../models/perfil");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await Perfil.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id = parseInt(req.query["id"]);
    res.json(isNaN(id) ? null : await Perfil.obter(id));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let p = req.body as Perfil;
    jsonRes(res, 400, p ? await Perfil.criar(p) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let p = req.body as Perfil;
    if (p)
        p.id = parseInt(req.body.id);
    jsonRes(res, 400, (p && !isNaN(p.id)) ? await Perfil.alterar(p) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id = parseInt(req.query["id"]);
    jsonRes(res, 400, isNaN(id) ? "Dados inválidos!" : await Perfil.excluir(id));
}));

export = router;
