import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import ResponsavelProposta = require("../models/responsavelProposta");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/responsavelProposta/alterar", {
            titulo: "Criar Responsável Pela Proposta",
            usuario: u,
            item: null
        });
    }
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        let id_responsavel_proposta = parseInt(req.query["id_responsavel_proposta"]);
        let item: ResponsavelProposta = null;
        if (isNaN(id_responsavel_proposta) || !(item = await ResponsavelProposta.obter(id_responsavel_proposta)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("controle/responsavelProposta/alterar", {
                titulo: "Editar Responsável Pela Proposta",
                usuario: u,
                item: item
            });
    }
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/responsavelProposta/listar", {
            titulo: "Gerenciar Responsáveis Pelas Propostas",
            usuario: u,
            lista: JSON.stringify(await ResponsavelProposta.listar())
        });
    }
}));

export = router;