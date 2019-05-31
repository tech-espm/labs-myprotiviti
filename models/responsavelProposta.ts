import Sql = require("../infra/sql");

export = class ResponsavelProposta {
    public id_responsavel_proposta: number;
    public nome_responsavel_proposta: string;

    private static validar(s: ResponsavelProposta): string {
        s.nome_responsavel_proposta = (s.nome_responsavel_proposta || "").trim().toUpperCase();
        if (s.nome_responsavel_proposta.length < 3 || s.nome_responsavel_proposta.length > 255) {
            return "Nome do responsavel pela proposta inválido!";
        }

        return null;
    }

    public static async listar(): Promise<ResponsavelProposta[]> {
        let lista: ResponsavelProposta[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_responsavel_proposta, nome_responsavel_proposta from responsavel_proposta order by nome_responsavel_proposta asc") as ResponsavelProposta[];
        });

        return (lista || []);
    }

    public static async obter(id_responsavel_proposta: number): Promise<ResponsavelProposta> {
        let lista: ResponsavelProposta[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_responsavel_proposta, nome_responsavel_proposta from responsavel_proposta where id_responsavel_proposta = ?", [id_responsavel_proposta]) as ResponsavelProposta[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(s: ResponsavelProposta): Promise<string> {
        let res: string;
        if ((res = ResponsavelProposta.validar(s)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query(`insert into responsavel_proposta (nome_responsavel_proposta) values (?)`, [s.nome_responsavel_proposta]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "O responsavel pela proposta já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(s: ResponsavelProposta): Promise<string> {
        let res: string;
        if ((res = ResponsavelProposta.validar(s)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update responsavel_proposta set nome_responsavel_proposta = ? where id_responsavel_proposta = " + s.id_responsavel_proposta, [s.nome_responsavel_proposta]);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "O responsavel pela proposta já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id_responsavel_proposta: number): Promise<string> {
        let res: string = null;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from responsavel_proposta where id_responsavel_proposta = " + id_responsavel_proposta);
            res = sql.linhasAfetadas.toString();
        });

        return res;
    }

}