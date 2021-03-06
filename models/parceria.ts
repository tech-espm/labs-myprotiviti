﻿import Sql = require("../infra/sql");

export = class Parceria {
    public id_parceria: number;
    public id_empresa: number;
    public id_solucao: number;
    public id_pursuit_team: number;
    public valor_agregado_parceria: string;

    private static validar(p: Parceria): string {
        if (p.id_solucao < 1) {
            return "Solução inválida!";
        }
        if (p.id_empresa < 1) {
            return "Empresa parceira inválida!";
        }
        if (p.id_pursuit_team < 1) {
            return "Responsável pela parceria inválido!";
        }
        return null;
    }

    public static async listar(): Promise<Parceria[]> {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select parceria.id_parceria, empresa.id_empresa, solucao.id_solucao, pursuit_team.id_pursuit_team, empresa.nome_empresa, solucao.nome_solucao, pursuit_team.nome_pursuit_team, parceria.valor_agregado_parceria"
                + " from parceria inner join empresa on empresa.id_empresa = parceria.id_empresa"
                + " inner join solucao on solucao.id_solucao = parceria.id_solucao"
                + " inner join pursuit_team on pursuit_team.id_pursuit_team = parceria.id_pursuit_team");
        });
        return (lista || []);
    }

    public static async obter(id_parceria: number): Promise<Parceria> {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select parceria.id_parceria, empresa.id_empresa, solucao.id_solucao, pursuit_team.id_pursuit_team, empresa.nome_empresa, solucao.nome_solucao, pursuit_team.nome_pursuit_team, parceria.valor_agregado_parceria"
                + " from parceria inner join empresa on empresa.id_empresa = parceria.id_empresa"
                + " inner join solucao on solucao.id_solucao = parceria.id_solucao"
                + " inner join pursuit_team on pursuit_team.id_pursuit_team = parceria.id_pursuit_team where parceria.id_parceria = ?", [id_parceria]);
        });
        return ((lista && lista[0]) || null);
    }

    public static async criar(p: Parceria): Promise<string> {
        let res;
        if ((res = Parceria.validar(p)))
            return res;
        await Sql.conectar(async (sql) => {
            await sql.query("insert into parceria (id_empresa, id_solucao, id_pursuit_team, valor_agregado_parceria) values (?, ?, ?, ?)", [p.id_empresa, p.id_solucao, p.id_pursuit_team, p.valor_agregado_parceria]);
        });

        return res;
    }

    public static async alterar(p: Parceria): Promise<string> {
        let res;
        if ((res = Parceria.validar(p)))
            return res;
        await Sql.conectar(async (sql) => {
            await sql.query("update parceria set id_empresa = ?, id_solucao = ?, id_pursuit_team = ?, valor_agregado_parceria = ? where id_parceria = ?", [p.id_empresa, p.id_solucao, p.id_pursuit_team, p.valor_agregado_parceria, p.id_parceria]);
            if (!sql.linhasAfetadas)
				res = "Parceria inexistente";
        });
    }

    public static async excluir(id_parceria: number): Promise<string> {
        let res = null;
        await Sql.conectar(async (sql) => {
            await sql.query("delete from parceria where id_parceria = ?", [id_parceria]);
            if (!sql.linhasAfetadas)
                res = "Parceria inexistente";
        });

        return res;
    }

}