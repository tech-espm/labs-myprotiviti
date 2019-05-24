import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Segmento = require("../models/segmento");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/segmento/alterar", {
            titulo: "Criar Segmento",
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
        let id_segmento = parseInt(req.query["id_segmento"]);
        let item: Segmento = null;
        if (isNaN(id_segmento) || !(item = await Segmento.obter(id_segmento)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("controle/segmento/alterar", {
                titulo: "Editar Segmento",
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
        res.render("controle/segmento/listar", {
            titulo: "Gerenciar Segmento",
            usuario: u,
            lista: JSON.stringify(await Segmento.listar())
        });
    }
}));

export = router;
