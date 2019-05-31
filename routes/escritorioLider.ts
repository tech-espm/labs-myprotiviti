import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import EscritorioLider = require("../models/escritorioLider");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/escritorioLider/alterar", {
            titulo: "Criar Escritório Líder",
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
        let id_escritorio_lider = parseInt(req.query["id_escritorio_lider"]);
        let item: EscritorioLider = null;
        if (isNaN(id_escritorio_lider) || !(item = await EscritorioLider.obter(id_escritorio_lider)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("controle/escritorioLider/alterar", {
                titulo: "Editar Escritório Líder",
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
        res.render("controle/escritorioLider/listar", {
            titulo: "Gerenciar Escritório Líder",
            usuario: u,
            lista: JSON.stringify(await EscritorioLider.listar())
        });
    }
}));

export = router;
