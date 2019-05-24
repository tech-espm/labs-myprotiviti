import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Empresa = require("../models/empresa");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/empresa/alterar", {
            titulo: "Criar Empresa",
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
        let id_empresa = parseInt(req.query["id_empresa"]);
        let item: Empresa = null;
        if (isNaN(id_empresa) || !(item = await Empresa.obter(id_empresa)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("controle/empresa/alterar", {
                titulo: "Editar Empresa",
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
        res.render("controle/empresa/listar", {
            titulo: "Gerenciar Empresas",
            usuario: u,
            lista: JSON.stringify(await Empresa.listar())
        });
    }
}));

export = router;
