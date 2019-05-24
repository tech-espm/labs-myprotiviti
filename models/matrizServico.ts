import Sql = require("../infra/sql");

export = class MatrizServico {
    public id_matriz_servico: number;
    public nome_matriz_servico: string;

    private static validar(m: MatrizServico): string {
        m.nome_matriz_servico = (m.nome_matriz_servico || "").trim().toUpperCase();
        if (m.nome_matriz_servico.length < 3 || m.nome_matriz_servico.length > 255) {
            return "Nome da matriz de serviço inválida!";
        }

        return null;
    }

    public static async listar(): Promise<MatrizServico[]> {
        let lista: MatrizServico[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_matriz_servico, nome_matriz_servico from matriz_servico order by nome_matriz_servico asc") as MatrizServico[];
        });

        return (lista || []);
    }

    public static async obter(id_matriz_servico: number): Promise<MatrizServico> {
        let lista: MatrizServico[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_matriz_servico, nome_matriz_servico from matriz_servico where id_matriz_servico = ? order by nome_matriz_servico asc", [id_matriz_servico]) as MatrizServico[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(o: MatrizServico): Promise<string> {
        let res: string;
        if ((res = MatrizServico.validar(o)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query(`insert into matriz_servico (nome_matriz_servico) values (?)`, [o.nome_matriz_servico]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "A Matriz de Serviço já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(o: MatrizServico): Promise<string> {
        let res: string;
        if ((res = MatrizServico.validar(o)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update matriz_servico set nome_matriz_servico = ? where id_matriz_servico = " + o.id_matriz_servico, [o.nome_matriz_servico]);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "A Matriz de Serviço já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id_matriz_servico: number): Promise<string> {
        let res: string = null;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from matriz_servico where id_matriz_servico = " + id_matriz_servico);
            res = sql.linhasAfetadas.toString();
        });

        return res;
    }

}