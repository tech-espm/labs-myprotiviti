import Sql = require("../infra/sql");

export = class PursuitTeam {
    public id_pursuit_team: number;
    public nome_pursuit_team: string;

    private static validar(s: PursuitTeam): string {
		s.nome_pursuit_team = (s.nome_pursuit_team || "").trim();
        if (s.nome_pursuit_team.length < 3 || s.nome_pursuit_team.length > 255) {
            return "Nome do time inválido!";
        }

        return null;
    }

    public static async listar(): Promise<PursuitTeam[]> {
        let lista: PursuitTeam[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_pursuit_team, nome_pursuit_team from pursuit_team order by nome_pursuit_team asc") as PursuitTeam[];
        });

        return (lista || []);
    }

    public static async obter(id_pursuit_team: number): Promise<PursuitTeam> {
        let lista: PursuitTeam[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_pursuit_team, nome_pursuit_team from pursuit_team where id_pursuit_team = ?", [id_pursuit_team]) as PursuitTeam[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(p: PursuitTeam): Promise<string> {
        let res: string;
        if ((res = PursuitTeam.validar(p)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query(`insert into pursuit_team (nome_pursuit_team) values (?)`, [p.nome_pursuit_team]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "O time já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(p: PursuitTeam): Promise<string> {
        let res: string;
        if ((res = PursuitTeam.validar(p)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update pursuit_team set nome_pursuit_team = ? where id_pursuit_team = " + p.id_pursuit_team, [p.nome_pursuit_team]);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "O time já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id_pursuit_team: number): Promise<string> {
        let res: string = null;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("delete from pursuit_team where id_pursuit_team = " + id_pursuit_team);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && (e.code === "ER_ROW_IS_REFERENCED" || e.code === "ER_ROW_IS_REFERENCED_2"))
                    res = "O time está em uso em outros formulários!";
                else
                    throw e;
            }
            
        });

        return res;
    }

}