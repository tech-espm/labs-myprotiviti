import Sql = require("../infra/sql");

export = class Perfil {
    public id: number;
    public nome: string;
    public permissoes: any;

    private static validar(p: Perfil): string {
        p.nome = (p.nome || "").trim().toUpperCase();
        if (p.nome.length < 3 || p.nome.length > 255) {
            return "Nome de perfil inválido!";
        }

        return null;
    }

    public static async listar(): Promise<Perfil[]> {
        let lista: Perfil[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id, nome from perfil order by nome asc") as Perfil[];
        });

        return (lista || []);
    }

    public static async obter(id: number): Promise<Perfil> {
        let perfil: Perfil = null;

        await Sql.conectar(async (sql: Sql) => {
            let lista: Perfil[] = await sql.query("select id, nome from perfil where id = ?", [id]) as Perfil[];
            if (lista && lista[0]) {
                perfil = lista[0];
                let permissoes = await sql.query("select id_feature from perfil_feature where id_perfil = ?", [id]);
                perfil.permissoes = {};
                for (let i = 0; i < permissoes.length; i++) {
                    let id_feature = permissoes[i].id_feature;
                    perfil.permissoes[id_feature] = 1;
                }
            }
        });

        return perfil;
    }

    public static async criar(p: Perfil): Promise<string> {
        let res: string;
        if ((res = Perfil.validar(p)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query(`insert into perfil (nome) values (?)`, [p.nome]);

                p.id = await sql.scalar("select last_insert_id()") as number;

                if (p.permissoes && p.permissoes.length) {
                    for (let i = 0; i < p.permissoes.length; i++) {
                        await sql.query(`insert into perfil_feature (id_perfil, id_feature) values (?, ?)`, [p.id, parseInt(p.permissoes[i])]);
                    }
                }

            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "O perfil já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(p: Perfil): Promise<string> {
        let res: string;
        if ((res = Perfil.validar(p)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update perfil set nome = ? where id = ?", [p.nome, p.id]);
                res = sql.linhasAfetadas.toString();

                if (res) {
                    await sql.query("delete from perfil_feature where id_perfil = ?", [p.id]);

                    if (p.permissoes && p.permissoes.length) {
                        for (let i = 0; i < p.permissoes.length; i++) {
                            await sql.query(`insert into perfil_feature (id_perfil, id_feature) values (?, ?)`, [p.id, parseInt(p.permissoes[i])]);
                        }
                    }
                }
           } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "O perfil já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id: number): Promise<string> {
        let res: string = null;

		await Sql.conectar(async (sql: Sql) => {
			try {
				await sql.query("delete from perfil where id = ?", [id]);
				res = sql.linhasAfetadas.toString();
			} catch (e) {
				if (e.code && (e.code === "ER_ROW_IS_REFERENCED" || e.code === "ER_ROW_IS_REFERENCED_2"))
                    res = "O perfil está em uso em outros formulários!";
				else
					throw e;
			}
        });

        return res;
    }

}