import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import FormaContato = require("../../models/formaContato");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await FormaContato.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id_forma_contato = parseInt(req.query["id_forma_contato"]);
    res.json(isNaN(id_forma_contato) ? null : await FormaContato.obter(id_forma_contato));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let o = req.body as FormaContato;
    jsonRes(res, 400, o ? await FormaContato.criar(o) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let o = req.body as FormaContato;
    if (o)
        o.id_forma_contato = parseInt(req.body.id_forma_contato);
    jsonRes(res, 400, (o && !isNaN(o.id_forma_contato)) ? await FormaContato.alterar(o) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id_forma_contato = parseInt(req.query["id_forma_contato"]);
    jsonRes(res, 400, isNaN(id_forma_contato) ? "Dados inválidos!" : await FormaContato.excluir(id_forma_contato));
}));

export = router;
