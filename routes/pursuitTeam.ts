import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import PursuitTeam = require("../models/pursuitTeam");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/pursuitTeam/alterar", {
            titulo: "Criar Time",
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
        let id_pursuit_team = parseInt(req.query["id_pursuit_team"]);
        let item: PursuitTeam = null;
        if (isNaN(id_pursuit_team) || !(item = await PursuitTeam.obter(id_pursuit_team)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("controle/pursuitTeam/alterar", {
                titulo: "Editar Time",
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
        res.render("controle/pursuitTeam/listar", {
            titulo: "Gerenciar Times",
            usuario: u,
            lista: JSON.stringify(await PursuitTeam.listar())
        });
    }
}));

export = router;
