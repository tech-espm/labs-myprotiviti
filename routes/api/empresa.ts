import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import Empresa = require("../../models/empresa");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await Empresa.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id_empresa = parseInt(req.query["id_empresa"]);
    res.json(isNaN(id_empresa) ? null : await Empresa.obter(id_empresa));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let e = req.body as Empresa;
    jsonRes(res, 400, e ? await Empresa.criar(e) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let e = req.body as Empresa;
    if (e)
        e.id_empresa = parseInt(req.body.id_empresa);
    jsonRes(res, 400, (e && !isNaN(e.id_empresa)) ? await Empresa.alterar(e) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id_empresa = parseInt(req.query["id_empresa"]);
    jsonRes(res, 400, isNaN(id_empresa) ? "Dados inválidos!" : await Empresa.excluir(id_empresa));
}));

export = router;
