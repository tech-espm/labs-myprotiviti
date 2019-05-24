import Sql = require("../infra/sql");

export = class CcLider {
    public id_cc_lider: number;
    public nome_cc_lider: string;

    private static validar(c: CcLider): string {
        c.nome_cc_lider = (c.nome_cc_lider || "").trim().toUpperCase();
        if (c.nome_cc_lider.length < 3 || c.nome_cc_lider.length > 255) {
            return "Nome da Cc Líder inválida!";
        }

        return null;
    }

    public static async listar(): Promise<CcLider[]> {
        let lista: CcLider[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_cc_lider, nome_cc_lider from cc_lider order by nome_cc_lider asc") as CcLider[];
        });

        return (lista || []);
    }

    public static async obter(id_cc_lider: number): Promise<CcLider> {
        let lista: CcLider[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_cc_lider, nome_cc_lider from cc_lider where id_cc_lider = ? ", [id_cc_lider]) as CcLider[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(c: CcLider): Promise<string> {
        let res: string;
        if ((res = CcLider.validar(c)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query(`insert into cc_lider (nome_cc_lider) values (?)`, [c.nome_cc_lider]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "A CC de Líder já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(c: CcLider): Promise<string> {
        let res: string;
        if ((res = CcLider.validar(c)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update cc_lider set nome_cc_lider = ? where id_cc_lider = " + c.id_cc_lider, [c.nome_cc_lider]);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "A CC de Líder já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id_cc_lider: number): Promise<string> {
        let res: string = null;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from cc_lider where id_cc_lider = " + id_cc_lider);
            res = sql.linhasAfetadas.toString();
        });

        return res;
    }

}