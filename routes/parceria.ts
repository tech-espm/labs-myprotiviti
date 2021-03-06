﻿import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Parceria = require("../models/parceria");
import Empresa = require("../models/empresa");
import Solucao = require("../models/solucao");
import PursuitTeam = require("../models/pursuitTeam");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    }
    else {
        res.render("negocios/parceria/alterar", {
            titulo: "Criar Parceria",
            usuario: u,
            item: null,
            empresas: await Empresa.listar(),
            solucoes: await Solucao.listar(),
            times: await PursuitTeam.listar()
        });
    }
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    }
    else {
        let id_parceria = parseInt(req.query["id_parceria"]);
        let item = null;
        if (isNaN(id_parceria) || !(item = await Parceria.obter(id_parceria)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("negocios/parceria/alterar", {
                titulo: "Editar Parceria",
                usuario: u,
                item: item,
                empresas: await Empresa.listar(),
                solucoes: await Solucao.listar(),
                times: await PursuitTeam.listar()
            });
    }
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    }
    else {
        res.render("negocios/parceria/listar", {
            titulo: "Gerenciar Parceria",
            usuario: u,
            lista: JSON.stringify(await Parceria.listar())
        });
    }
}));

export = router;
