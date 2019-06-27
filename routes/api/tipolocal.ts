import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import TipoLocal = require("../../models/tipoLocal");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await TipoLocal.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id_tipo_local = parseInt(req.query["id_tipo_local"]);
    res.json(isNaN(id_tipo_local) ? null : await TipoLocal.obter(id_tipo_local));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let s = req.body as TipoLocal;
    jsonRes(res, 400, s ? await TipoLocal.criar(s) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let s = req.body as TipoLocal;
    if (s)
        s.id_tipo_local = parseInt(req.body.id_solucao);
    jsonRes(res, 400, (s && !isNaN(s.id_tipo_local)) ? await TipoLocal.alterar(s) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id_tipo_local = parseInt(req.query["id_tipo_local"]);
    jsonRes(res, 400, isNaN(id_tipo_local) ? "Dados inválidos!" : await TipoLocal.excluir(id_tipo_local));
}));

export = router;
