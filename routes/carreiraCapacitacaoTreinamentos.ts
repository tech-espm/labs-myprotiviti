﻿import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import CarreiraCapacitacaoTreinamentos = require("../models/carreiraCapacitacaoTreinamentos");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("tutorial/alterar", {
			titulo: "Criar Tutorial de Capacitação & Treinamentos",
			usuario: u,
			rota: "carreiraCapacitacaoTreinamentos",
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
		let item: CarreiraCapacitacaoTreinamentos = null;
		if (isNaN(id) || !(item = await CarreiraCapacitacaoTreinamentos.obter(id)))
			res.render("shared/nao-encontrado");
		else
			res.render("tutorial/alterar", {
				titulo: "Editar Tutorial de Capacitação & Treinamentos",
				usuario: u,
				rota: "carreiraCapacitacaoTreinamentos",
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
			titulo: "Visualizar Tutoriais de Capacitação & Treinamentos",
			usuario: u,
			rota: "carreiraCapacitacaoTreinamentos",
			lista: JSON.stringify(await CarreiraCapacitacaoTreinamentos.listar()),
			caminhoAbsolutoPastaExterno: CarreiraCapacitacaoTreinamentos.caminhoAbsolutoPastaExterno(),
			extensaoMiniatura: CarreiraCapacitacaoTreinamentos.extensaoMiniatura,
			extensaoVideo: CarreiraCapacitacaoTreinamentos.extensaoVideo
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
