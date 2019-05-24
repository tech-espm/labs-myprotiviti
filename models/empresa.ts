import Sql = require("../infra/sql");

export = class Empresa {
    public id_empresa: number;
    public nome_empresa: string;

    private static validar(e: Empresa): string {
        e.nome_empresa = (e.nome_empresa || "").trim().toUpperCase();
        if (e.nome_empresa.length < 3 || e.nome_empresa.length > 255) {
            return "Nome da empresa inválida!";
        }

        return null;
    }

    public static async listar(): Promise<Empresa[]> {
        let lista: Empresa[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_empresa, nome_empresa from empresa order by nome_empresa asc") as Empresa[];
        });

        return (lista || []);
    }

    public static async obter(id_empresa: number): Promise<Empresa> {
        let lista: Empresa[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_empresa, nome_empresa from empresa where id_empresa = ? order by nome_empresa asc", [id_empresa]) as Empresa[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(e: Empresa): Promise<string> {
        let res: string;
        if ((res = Empresa.validar(e)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query(`insert into empresa (nome_empresa) values (?)`, [e.nome_empresa]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "A empresa já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(e: Empresa): Promise<string> {
        let res: string;
        if ((res = Empresa.validar(e)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update empresa set nome_empresa = ? where id_empresa = " + e.id_empresa, [e.nome_empresa]);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "A empresa já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id_empresa: number): Promise<string> {
        let res: string = null;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("delete from empresa where id_empresa = " + id_empresa);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && (e.code === "ER_ROW_IS_REFERENCED" || e.code === "ER_ROW_IS_REFERENCED_2"))
                    res = "A empresa está em uso em outros formulários!";
                else
                    throw e;
            }
            
        });

        return res;
    }

}