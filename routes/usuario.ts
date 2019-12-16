import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Perfil = require("../models/perfil");
import PerfilPermissao = require("../models/perfilPermissao");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("usuario/alterar", { 
			titulo: "Criar Usuário", 
			usuario: u, 
			item: null,
			perfis: Perfil.cachePerfis
		});
	}
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		let id = parseInt(req.query["id"]);
		let item: Usuario = null;
		if (isNaN(id) || !(item = await Usuario.obter(id)))
			res.render("home/nao-encontrado", { usuario: u });
		else
			res.render("usuario/alterar", { 
				titulo: "Editar Usuário", 
				usuario: u, 
				item: item,
				perfis: Perfil.cachePerfis
			});
	}
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("usuario/listar", { titulo: "Gerenciar Usuários", usuario: u, lista: JSON.stringify(await Usuario.listar()) });
	}
}));

export = router;
