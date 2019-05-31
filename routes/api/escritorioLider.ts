import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import EscritorioLider = require("../../models/escritorioLider");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await EscritorioLider.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id_escritorio_lider = parseInt(req.query["id_escritorio_lider"]);
    res.json(isNaN(id_escritorio_lider) ? null : await EscritorioLider.obter(id_escritorio_lider));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let es = req.body as EscritorioLider;
    jsonRes(res, 400, es ? await EscritorioLider.criar(es) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let es = req.body as EscritorioLider;
    if (es)
        es.id_escritorio_lider = parseInt(req.body.id_solucao);
    jsonRes(res, 400, (es && !isNaN(es.id_escritorio_lider)) ? await EscritorioLider.alterar(es) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id_escritorio_lider = parseInt(req.query["id_escritorio_lider"]);
    jsonRes(res, 400, isNaN(id_escritorio_lider) ? "Dados inválidos!" : await EscritorioLider.excluir(id_escritorio_lider));
}));

export = router;
