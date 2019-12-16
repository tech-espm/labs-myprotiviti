import Sql = require("../infra/sql");

export = class EscritorioLider {
    public id_escritorio_lider: number;
    public nome_escritorio_lider: string;

    private static validar(es: EscritorioLider): string {
        es.nome_escritorio_lider = (es.nome_escritorio_lider || "").trim();
        if (es.nome_escritorio_lider.length < 3 || es.nome_escritorio_lider.length > 255) {
            return "Nome do escritório líder inválido!";
        }

        return null;
    }

    public static async listar(): Promise<EscritorioLider[]> {
        let lista: EscritorioLider[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_escritorio_lider, nome_escritorio_lider from escritorio_lider order by nome_escritorio_lider asc") as EscritorioLider[];
        });

        return (lista || []);
    }

    public static async obter(id_escritorio_lider: number): Promise<EscritorioLider> {
        let lista: EscritorioLider[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_escritorio_lider, nome_escritorio_lider from escritorio_lider where id_escritorio_lider = ? ", [id_escritorio_lider]) as EscritorioLider[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(es: EscritorioLider): Promise<string> {
        let res: string;
        if ((res = EscritorioLider.validar(es)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query(`insert into escritorio_lider (nome_escritorio_lider) values (?)`, [es.nome_escritorio_lider]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "O escritório líder já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(es: EscritorioLider): Promise<string> {
        let res: string;
        if ((res = EscritorioLider.validar(es)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update escritorio_lider set nome_escritorio_lider = ? where id_escritorio_lider = " + es.id_escritorio_lider, [es.nome_escritorio_lider]);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "O escritório líder já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id_escritorio_lider: number): Promise<string> {
        let res: string = null;

		await Sql.conectar(async (sql: Sql) => {
			try {
                await sql.query("delete from solucao where id_solucao = " + id_escritorio_lider);
				res = sql.linhasAfetadas.toString();
			} catch (e) {
				if (e.code && (e.code === "ER_ROW_IS_REFERENCED" || e.code === "ER_ROW_IS_REFERENCED_2"))
                    res = "O escritório líder está em uso em outros formulários!";
				else
					throw e;
			}
        });

        return res;
    }

}