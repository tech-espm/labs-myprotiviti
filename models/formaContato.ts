import Sql = require("../infra/sql");

export = class FormaContato {
    public id_forma_contato: number;
    public nome_forma_contato: string;

    private static validar(o: FormaContato): string {
        o.nome_forma_contato = (o.nome_forma_contato || "").trim().toUpperCase();
        if (o.nome_forma_contato.length < 3 || o.nome_forma_contato.length > 255) {
            return "Nome da forma de contato inválida!";
        }

        return null;
    }

    public static async listar(): Promise<FormaContato[]> {
        let lista: FormaContato[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_forma_contato, nome_forma_contato from forma_contato order by nome_forma_contato asc") as FormaContato[];
        });

        return (lista || []);
    }

    public static async obter(id_forma_contato: number): Promise<FormaContato> {
        let lista: FormaContato[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_forma_contato, nome_forma_contato from forma_contato where id_forma_contato = ? order by nome_forma_contato asc", [id_forma_contato]) as FormaContato[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(o: FormaContato): Promise<string> {
        let res: string;
        if ((res = FormaContato.validar(o)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query(`insert into forma_contato (nome_forma_contato) values (?)`, [o.nome_forma_contato]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "A Forma de Contato já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(o: FormaContato): Promise<string> {
        let res: string;
        if ((res = FormaContato.validar(o)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update forma_contato set nome_forma_contato = ? where id_forma_contato = " + o.id_forma_contato, [o.nome_forma_contato]);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "A Forma de Contato já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id_forma_contato: number): Promise<string> {
        let res: string = null;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from forma_contato where id_forma_contato = " + id_forma_contato);
            res = sql.linhasAfetadas.toString();
        });

        return res;
    }

}