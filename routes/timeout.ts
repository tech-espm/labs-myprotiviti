import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import TipoLocal = require("../models/tipoLocal");
import Timeout = require("../models/timeout");

const router = express.Router();

router.all("/mapa", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u) {
		res.redirect("/");
    } else {
        res.render("timeout/mapa", { titulo: "Mapa de Time Out", usuario: u, msg: null, timeouts: JSON.stringify(await Timeout.listar()) });
	}
}));

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u) {
        res.redirect("/");
    } else {
        let lat = parseFloat(req.query['lat']);
        let lng = parseFloat(req.query['lng']);
        if (isNaN(lat) || isNaN(lng)) {
            res.redirect("/timeout/mapa");
        } else {
            res.render("timeout/alterar", { titulo: "Criar Time Out", usuario: u, lat: lat, lng: lng, item: null, tipoLocal: await TipoLocal.listar() });
        }
    }
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u) {
		res.redirect("/");
    } else {
        let id_localizacao = parseInt(req.query["id_localizacao"]);
        let item: Timeout = null;
        if (isNaN(id_localizacao) || !(item = await Timeout.obter(id_localizacao)))
            res.render("shared/nao-encontrado");
        else
            res.render("timeout/alterar", {
                titulo: "Editar Time Out",
                usuario: u,
                lat: item.latitude_localizacao,
                lng: item.longitude_localizacao,
                item: item,
                tipoLocal: await TipoLocal.listar()
            });
    }
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u) {
		res.redirect("/");
	} else {
        res.render("timeout/listar", { titulo: "Gerenciar Time Out", usuario: u, lista: JSON.stringify(await Timeout.listar())});
	}
}));

export = router;
