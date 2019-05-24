import Sql = require("../infra/sql");

export = class Segmento {
    public id_segmento: number;
    public nome_segmento: string;

    private static validar(s: Segmento): string {
        s.nome_segmento = (s.nome_segmento || "").trim().toUpperCase();
        if (s.nome_segmento.length < 3 || s.nome_segmento.length > 255) {
            return "Nome da Segmento inválida!";
        }

        return null;
    }

    public static async listar(): Promise<Segmento[]> {
        let lista: Segmento[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_segmento, nome_segmento from segmento order by nome_segmento asc") as Segmento[];
        });

        return (lista || []);
    }

    public static async obter(id_segmento: number): Promise<Segmento> {
        let lista: Segmento[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_segmento, nome_segmento from segmento where id_segmento = ?", [id_segmento]) as Segmento[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(s: Segmento): Promise<string> {
        let res: string;
        if ((res = Segmento.validar(s)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query(`insert into segmento (nome_segmento) values (?)`, [s.nome_segmento]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "O segmento já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(s: Segmento): Promise<string> {
        let res: string;
        if ((res = Segmento.validar(s)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update segmento set nome_segmento = ? where id_segmento = " + s.id_segmento, [s.nome_segmento]);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "O segmento já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id_segmento: number): Promise<string> {
        let res: string = null;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from segmento where id_segmento = " + id_segmento);
            res = sql.linhasAfetadas.toString();
        });

        return res;
    }

}