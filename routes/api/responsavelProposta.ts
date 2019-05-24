import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import ResponsavelProposta = require("../../models/responsavelProposta");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await ResponsavelProposta.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id_responsavel_proposta = parseInt(req.query["id_responsavel_proposta"]);
    res.json(isNaN(id_responsavel_proposta) ? null : await ResponsavelProposta.obter(id_responsavel_proposta));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let s = req.body as ResponsavelProposta;
    jsonRes(res, 400, s ? await ResponsavelProposta.criar(s) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let s = req.body as ResponsavelProposta;
    if (s)
        s.id_responsavel_proposta = parseInt(req.body.id_responsavel_proposta);
    jsonRes(res, 400, (s && !isNaN(s.id_responsavel_proposta)) ? await ResponsavelProposta.alterar(s) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id_responsavel_proposta = parseInt(req.query["id_responsavel_proposta"]);
    jsonRes(res, 400, isNaN(id_responsavel_proposta) ? "Dados inválidos!" : await ResponsavelProposta.excluir(id_responsavel_proposta));
}));

export = router;
