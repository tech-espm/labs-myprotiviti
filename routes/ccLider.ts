import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import CcLider = require("../models/ccLider");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/ccLider/alterar", {
            titulo: "Criar CC de Líder",
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
        let id_cc_lider = parseInt(req.query["id_cc_lider"]);
        let item: CcLider = null;
        if (isNaN(id_cc_lider) || !(item = await CcLider.obter(id_cc_lider)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("controle/ccLider/alterar", {
                titulo: "Editar CC de Lider",
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
        res.render("controle/ccLider/listar", {
            titulo: "Gerenciar CC de Lider",
            usuario: u,
            lista: JSON.stringify(await CcLider.listar())
        });
    }
}));

export = router;
