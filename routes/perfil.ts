import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Perfil = require("../models/perfil");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("perfil/alterar", {
            titulo: "Criar Perfil",
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
        let id = parseInt(req.query["id"]);
        let item: Perfil = null;
        if (isNaN(id) || !(item = await Perfil.obter(id)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("perfil/alterar", {
                titulo: "Editar Perfil",
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
        res.render("perfil/listar", {
            titulo: "Gerenciar Perfis",
            usuario: u,
            lista: JSON.stringify(await Perfil.listar())
        });
    }
}));

export = router;
