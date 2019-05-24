import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import FormaContato = require("../models/formaContato");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/formaContato/alterar", {
            titulo: "Criar Forma de Contato",
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
        let id_forma_contato = parseInt(req.query["id_forma_contato"]);
        let item: FormaContato = null;
        if (isNaN(id_forma_contato) || !(item = await FormaContato.obter(id_forma_contato)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("controle/formaContato/alterar", {
                titulo: "Editar Forma de Contato",
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
        res.render("controle/formaContato/listar", {
            titulo: "Gerenciar Forma de Contato",
            usuario: u,
            lista: JSON.stringify(await FormaContato.listar())
        });
    }
}));

export = router;
