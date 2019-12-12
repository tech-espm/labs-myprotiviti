﻿import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import CarreiraCurriculo = require("../models/carreiraCurriculo");


const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("tutorial/alterar", {
			titulo: "Criar Tutorial de Curriculo",
			usuario: u,
			rota: "carreiraCurriculo",
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
		let item: CarreiraCurriculo = null;
		if (isNaN(id) || !(item = await CarreiraCurriculo.obter(id)))
			res.render("shared/nao-encontrado");
		else
			res.render("tutorial/alterar", {
				titulo: "Editar Tutorial de Curriculos",
				usuario: u,
				rota: "carreiraCurriculo",
				item: item
			});
	}
}));

async function listar(grid: boolean, req: express.Request, res: express.Response): Promise<void> {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render(grid ? "tutorial/grid" : "tutorial/listar", {
			titulo: "Visualizar Tutoriais de Curriculos",
			usuario: u,
			rota: "carreiraCurriculo",
			lista: JSON.stringify(await CarreiraCurriculo.listar()),
			caminhoAbsolutoPastaExterno: CarreiraCurriculo.caminhoAbsolutoPastaExterno(),
			extensaoMiniatura: CarreiraCurriculo.extensaoMiniatura,
			extensaoVideo: CarreiraCurriculo.extensaoVideo
		});
	}
}

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	return listar(false, req, res);
}));

router.get("/grid", wrap(async (req: express.Request, res: express.Response) => {
	return listar(true, req, res);
}));

export = router;
