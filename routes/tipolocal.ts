import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import TipoLocal = require("../models/tipolocal");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/tipolocal/alterar", {
            titulo: "Criar Locacl",
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
        let id_tipo_local = parseInt(req.query["id_tipo_local"]);
        let item: TipoLocal = null;
        if (isNaN(id_tipo_local) || !(item = await TipoLocal.obter(id_tipo_local)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("controle/solucao/alterar", {
                titulo: "Editar Local",
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
        res.render("controle/tipolocal/listar", {
            titulo: "Gerenciar Locais",
            usuario: u,
            lista: JSON.stringify(await TipoLocal.listar())
        });
    }
}));

export = router;
