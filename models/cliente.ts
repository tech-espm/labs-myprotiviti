import Sql = require("../infra/sql");

export = class Cliente {
    public id_cliente: number;
    public nome_cliente: string;

    private static validar(c: Cliente): string {
        c.nome_cliente = (c.nome_cliente || "").trim();
        if (c.nome_cliente.length < 3 || c.nome_cliente.length > 255) {
            return "Nome do cliente inválido!";
        }

        return null;
    }

    public static async listar(): Promise<Cliente[]> {
        let lista: Cliente[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_cliente, nome_cliente from cliente order by nome_cliente asc") as Cliente[];
        });

        return (lista || []);
    }

    public static async obter(id_cliente: number): Promise<Cliente> {
        let lista: Cliente[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_cliente, nome_cliente from cliente where id_cliente = ?", [id_cliente]) as Cliente[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(c: Cliente): Promise<string> {
        let res: string;
        if ((res = Cliente.validar(c)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query(`insert into cliente (nome_cliente) values (?)`, [c.nome_cliente]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "O cliente já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(c: Cliente): Promise<string> {
        let res: string;
        if ((res = Cliente.validar(c)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update cliente set nome_cliente = ? where id_cliente = ?", [c.nome_cliente, c.id_cliente]);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "O cliente já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id_cliente: number): Promise<string> {
        let res: string = null;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("delete from cliente where id_cliente = ?", [id_cliente]);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && (e.code === "ER_ROW_IS_REFERENCED" || e.code === "ER_ROW_IS_REFERENCED_2"))
                    res = "O cliente está em uso em outros formulários!";
                else
                    throw e;
            }
        });

        return res;
    }

}