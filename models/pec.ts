import TipoTutorial = require("./enums/tipoTutorial");
import Tutorial = require("./tutorial");

export = class Pec extends Tutorial {
	public static readonly tabela = "pec";

	public static caminhoAbsolutoPastaExterno(): string {
		return Tutorial.caminhoAbsolutoPastaExternoPorTipo(TipoTutorial.Pec);
	}

	public static caminhoRelativoMiniatura(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.Pec, id, Tutorial.extensaoMiniatura);
	}

	public static caminhoAbsolutoMiniaturaExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.Pec, id, Tutorial.extensaoMiniatura);
	}

	public static caminhoRelativoVideo(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.Pec, id, Tutorial.extensaoVideo);
	}

	public static caminhoAbsolutoVideoExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.Pec, id, Tutorial.extensaoVideo);
	}

	public static validar(a: Pec): string {
		return Tutorial.validarPorTipo(a);
	}

	public static async listar(): Promise<Pec[]> {
		// ******************************************************************************
		// Essa técnica só funciona porque os objetos não têm métodos de instância.
		//
		// Se os objetos tivessem métodos de instância, o retorno de sql.query() jamais
		// poderia ser convertido para Tutorial e depois para essa classe, porque
		// sql.query() retorna objetos criados em tempo real, similar a criar objetos
		// usando JSON convencional.
		//
		// Se quiséssemos que os objetos retornados fossem efetivamente da nossa classe,
		// precisaríamos instanciar objeto por objeto, em vez de simplesmente repassar
		// a lista retornada por sql.query().
		// ******************************************************************************
		return await Tutorial.listarPorTipo(Pec.tabela) as Pec[];
	}

	public static async obter(id: number): Promise<Pec> {
		// Ver comentário em listar();
		return await Tutorial.obterPorTipo(Pec.tabela, id) as Pec;
	}

	public static async criar(a: Pec, arquivo: any): Promise<string> {
		return await Tutorial.criarPorTipo(Pec.tabela, TipoTutorial.Pec, a, arquivo);
	}

	public static async uploadVideo(id: number, arquivo: any): Promise<string> {
		return await Tutorial.uploadVideoPorTipo(TipoTutorial.Pec, id, arquivo);
	}

	public static async alterar(a: Pec): Promise<string> {
		return await Tutorial.alterarPorTipo(Pec.tabela, a);
	}

	public static async excluir(id: number): Promise<string> {
		return await Tutorial.excluirPorTipo(Pec.tabela, TipoTutorial.Pec, id);
	}
}
