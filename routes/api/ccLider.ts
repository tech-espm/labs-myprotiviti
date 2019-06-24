import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import Cclider = require("../../models/ccLider");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await Cclider.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id_cc_lider = parseInt(req.query["id_cc_lider"]);
    res.json(isNaN(id_cc_lider) ? null : await Cclider.obter(id_cc_lider));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let o = req.body as Cclider;
    jsonRes(res, 400, o ? await Cclider.criar(o) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let o = req.body as Cclider;
    if (o)
        o.id_cc_lider = parseInt(req.body.id_forma_contato);
    jsonRes(res, 400, (o && !isNaN(o.id_cc_lider)) ? await Cclider.alterar(o) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id_cc_lider = parseInt(req.query["id_cc_lider"]);
    jsonRes(res, 400, isNaN(id_cc_lider) ? "Dados inválidos!" : await Cclider.excluir(id_cc_lider));
}));

export = router;
