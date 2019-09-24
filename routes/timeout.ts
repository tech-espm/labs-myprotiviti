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
            res.render("timeout/mapa", { titulo: "Mapa de Time Out", usuario: u, msg: null, timeouts: JSON.stringify(await Timeout.listar()) });
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
        let lat = parseFloat(req.query['lat']);
        let lng = parseFloat(req.query['lng']);
        if (isNaN(lat) || isNaN(lng)) {
            res.render("timeout/mapa", { titulo: "Mapa de Time Out", usuario: u, msg: null, timeouts: JSON.stringify(await Timeout.listar()) });
        } else if (lat > -19.714009 ||
            lat < -25.360810 ||
            lng > -44.153793 ||
            lng < -53.170575) {
            res.render("timeout/mapa", { titulo: "Mapa de Time Out", usuario: u, msg: "Por favor, especifique um ponto dentro do Estado de SP.", timeouts: JSON.stringify(await Timeout.listar()) });
        } else {
            res.render("timeout/alterar", { titulo: "Criar Time Out", usuario: u, lat: lat, lng: lng, item: null, tipoLocal: await TipoLocal.listar() });
        }
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
