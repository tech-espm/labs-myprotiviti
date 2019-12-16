# labs-myprotiviti
MyProtiviti

Instruções para fazer deploy do projeto em um ambiente real (seja de desenvolvimento, homologação ou produção):

- Criar as pastas abaixo:
  - `/public/dados`
  - `/public/dados/tutoriais`
  - `/public/dados/tutoriais/1`
  - `/public/dados/tutoriais/2`
  - `/public/dados/tutoriais/3`
  - `/public/dados/tutoriais/4`
  - `/public/dados/tutoriais/5`
  - `/public/dados/tutoriais/6`
  - `/public/dados/tutoriais/<uma pasta a mais para cada novo valor em /models/enums/tipoTutorial>`

- Criar um banco de dados MySql conforme o arquivo `/scripts_sql/script.sql`

- Criar o arquivo `/infra/sqlPool.ts` conforme mostrado abaixo:
``` JavaScript
import mysql = require("mysql");

export = class SqlPool {
	// https://www.npmjs.com/package/mysql
	public static readonly pool = mysql.createPool({
		connectionLimit: 30,
		host: "127.0.0.1", // Endereço do servidor de banco de dados real
		port: 3306,
		user: "usuario_mysql",
		password: "senha",
		database: "nome_do_schema"
	});
}
```
