import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import MatrizServico = require("../../models/matrizServico");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await MatrizServico.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id_matriz_servico = parseInt(req.query["id_matriz_servico"]);
    res.json(isNaN(id_matriz_servico) ? null : await MatrizServico.obter(id_matriz_servico));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let o = req.body as MatrizServico;
    jsonRes(res, 400, o ? await MatrizServico.criar(o) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let o = req.body as MatrizServico;
    if (o)
        o.id_matriz_servico = parseInt(req.body.id_forma_contato);
    jsonRes(res, 400, (o && !isNaN(o.id_matriz_servico)) ? await MatrizServico.alterar(o) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id_matriz_servico = parseInt(req.query["id_matriz_servico"]);
    jsonRes(res, 400, isNaN(id_matriz_servico) ? "Dados inválidos!" : await MatrizServico.excluir(id_matriz_servico));
}));

export = router;
