import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import Segmento = require("../../models/segmento");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await Segmento.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id_segmento = parseInt(req.query["id_segmento"]);
    res.json(isNaN(id_segmento) ? null : await Segmento.obter(id_segmento));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let s = req.body as Segmento;
    jsonRes(res, 400, s ? await Segmento.criar(s) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let s = req.body as Segmento;
    if (s)
        s.id_segmento = parseInt(req.body.id_segmento);
    jsonRes(res, 400, (s && !isNaN(s.id_segmento)) ? await Segmento.alterar(s) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id_segmento = parseInt(req.query["id_segmento"]);
    jsonRes(res, 400, isNaN(id_segmento) ? "Dados inválidos!" : await Segmento.excluir(id_segmento));
}));

export = router;
