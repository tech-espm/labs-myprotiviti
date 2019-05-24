import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import MatrizServico = require("../models/matrizServico");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/matrizServico/alterar", {
            titulo: "Criar Matriz de Forma",
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
        let id_matriz_servico = parseInt(req.query["id_matriz_servico"]);
        let item: MatrizServico = null;
        if (isNaN(id_matriz_servico) || !(item = await MatrizServico.obter(id_matriz_servico)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("controle/matrizServico/alterar", {
                titulo: "Editar Matriz de Servico",
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
        res.render("controle/matrizServico/listar", {
            titulo: "Gerenciar Matriz de Servico",
            usuario: u,
            lista: JSON.stringify(await MatrizServico.listar())
        });
    }
}));

export = router;
