import Permissao = require("./permissao");

export = class PerfilPermissao {

	public static Lista: [Permissao] = [] as any;

    public static Permissoes = {
        CriarAdministrativo: { id: 1, nome: 'Tutoriais Administrativo - Criar' },
        VisualizarAdministrativo: { id: 2, nome: 'Tutoriais Administrativo - Visualizar' },
        EditarAdministrativo: { id: 3, nome: 'Tutoriais Administrativo - Editar' },
        ExcluirAdministrativo: { id: 4, nome: 'Tutoriais Administrativo - Excluir' },

        CriarCapacitacaoTreinamentos: { id: 5, nome: 'Capacitação & Treinamentos - Criar' },
        VisualizarCapacitacaoTreinamentos: { id: 6, nome: 'Capacitação & Treinamentos - Visualizar' },
        EditarCapacitacaoTreinamentos: { id: 7, nome: 'Capacitação & Treinamentos - Editar' },
        ExcluirCapacitacaoTreinamentos: { id: 8, nome: 'Capacitação & Treinamentos - Excluir' },

        CriarMentoring: { id: 9, nome: 'Mentoring - Criar' },
        VisualizarMentoring: { id: 10, nome: 'Mentoring - Visualizar' },
        EditarMentoring: { id: 11, nome: 'Mentoring - Editar' },
        ExcluirMentoring: { id: 12, nome: 'Mentoring - Excluir' },

        CriarCurriculo: { id: 13, nome: 'Currículo - Criar' },
        VisualizarCurriculo: { id: 14, nome: 'Currículo - Visualizar' },
        EditarCurriculo: { id: 15, nome: 'Currículo - Editar' },
        ExcluirCurriculo: { id: 16, nome: 'Currículo - Excluir' },

        CriarAlocacao: { id: 17, nome: 'Alocação - Criar' },
        VisualizarAlocacao: { id: 18, nome: 'Alocação - Visualizar' },
        EditarAlocacao: { id: 19, nome: 'Alocação - Editar' },
        ExcluirAlocacao: { id: 20, nome: 'Alocação - Excluir' },

        CriarPec: { id: 21, nome: 'PEC - Criar' },
        VisualizarPec: { id: 22, nome: 'PEC - Visualizar' },
        EditarPec: { id: 23, nome: 'PEC - Editar' },
        ExcluirPec: { id: 24, nome: 'PEC - Excluir' },

        CriarProjeto: { id: 25, nome: 'Projetos - Criar' },
        VisualizarProjeto: { id: 26, nome: 'Projetos - Visualizar' },
        EditarProjeto: { id: 27, nome: 'Projetos - Editar' },
        ExcluirProjeto: { id: 28, nome: 'Projetos - Excluir' },

        CriarParceria: { id: 29, nome: 'Parcerias - Criar' },
        VisualizarParceria: { id: 30, nome: 'Parcerias - Visualizar' },
        EditarParceria: { id: 31, nome: 'Parcerias - Editar' },
        ExcluirParceria: { id: 32, nome: 'Parcerias - Excluir' },

        CriarOportunidade: { id: 33, nome: 'Indicação de Oportunidade - Criar' },
        VisualizarOportunidade: { id: 34, nome: 'Indicação de Oportunidade - Visualizar' },
        EditarOportunidade: { id: 35, nome: 'Indicação de Oportunidade - Editar' },
        ExcluirOportunidade: { id: 36, nome: 'Indicação de Oportunidade - Excluir' },

        CriarLideranca: { id: 37, nome: 'Liderença - Criar' },
        VisualizarLideranca: { id: 38, nome: 'Liderença - Visualizar' },
        EditarLideranca: { id: 39, nome: 'Liderença - Editar' },
        ExcluirLideranca: { id: 40, nome: 'Liderença - Excluir' },

        CriarTimeout: { id: 41, nome: 'Time Out - Criar' },
        VisualizarTimeout: { id: 42, nome: 'Time Out - Visualizar' },
        EditarTimeout: { id: 43, nome: 'Time Out - Editar' },
        ExcluirTimeout: { id: 44, nome: 'Time Out - Excluir' },

        CriarInovacao: { id: 45, nome: 'Inovação - Criar' },
        VisualizarInovacao: { id: 46, nome: 'Inovação - Visualizar' },
        EditarInovacao: { id: 47, nome: 'Inovação - Editar' },
        ExcluirInovacao: { id: 48, nome: 'Inovação - Excluir' },

		// As permissões abaixo pertencem apenas ao perfil administrador!
		/*
		CriarSolucao: { id: 49, nome: 'Solução - Criar' },
        VisualizarSolucao: { id: 50, nome: 'Solução - Visualizar' },
        EditarSolucao: { id: 51, nome: 'Solução - Editar' },
        ExcluirSolucao: { id: 52, nome: 'Solução - Excluir' },

        CriarEmpresa: { id: 53, nome: 'Empresa - Criar' },
        VisualizarEmpresa: { id: 54, nome: 'Empresa - Visualizar' },
        EditarEmpresa: { id: 55, nome: 'Empresa - Editar' },
        ExcluirEmpresa: { id: 56, nome: 'Empresa - Excluir' },

        CriarCliente: { id: 57, nome: 'Cliente - Criar' },
        VisualizarCliente: { id: 58, nome: 'Cliente - Visualizar' },
        EditarCliente: { id: 59, nome: 'Cliente - Editar' },
        ExcluirCliente: { id: 60, nome: 'Cliente - Excluir' },

        CriarSegmento: { id: 61, nome: 'Segmento - Criar' },
        VisualizarSegmento: { id: 62, nome: 'Segmento - Visualizar' },
        EditarSegmento: { id: 63, nome: 'Segmento - Editar' },
        ExcluirSegmento: { id: 64, nome: 'Segmento - Excluir' },

        CriarFormaContato: { id: 65, nome: 'Forma de Contato - Criar' },
        VisualizarFormaContato: { id: 66, nome: 'Forma de Contato - Visualizar' },
        EditarFormaContato: { id: 67, nome: 'Forma de Contato - Editar' },
        ExcluirFormaContato: { id: 68, nome: 'Forma de Contato - Excluir' },

        CriarMatrizServico: { id: 69, nome: 'Matriz de Serviço - Criar' },
        VisualizarMatrizServico: { id: 70, nome: 'Matriz de Serviço - Visualizar' },
        EditarMatrizServico: { id: 71, nome: 'Matriz de Serviço - Editar' },
        ExcluirMatrizServico: { id: 72, nome: 'Matriz de Serviço - Excluir' },

        CriarEscritorioLider: { id: 73, nome: 'Escritório Líder - Criar' },
        VisualizarEscritorioLider: { id: 74, nome: 'Escritório Líder - Visualizar' },
        EditarEscritorioLider: { id: 75, nome: 'Escritório Líder - Editar' },
        ExcluirEscritorioLider: { id: 76, nome: 'Escrirório Líder - Excluir' },

        CriarCcLider: { id: 77, nome: 'CC Líder - Criar' },
        VisualizarCcLider: { id: 78, nome: 'CC Líder - Visualizar' },
        EditarCcLider: { id: 79, nome: 'CC Líder - Editar' },
        ExcluirCcLider: { id: 80, nome: 'CC Líder - Excluir' },

        CriarPursuitTeam: { id: 81, nome: 'Pursuit Team - Criar' },
        VisualizarPursuitTeam: { id: 82, nome: 'Pursuit Team - Visualizar' },
        EditarPursuitTeam: { id: 83, nome: 'Pursuit Team - Editar' },
        ExcluirPursuitTeam: { id: 84, nome: 'Pursuit Team - Excluir' },

        CriarResponsavelProposta: { id: 85, nome: 'Responsável pela Proposta - Criar' },
        VisualizarResponsavelProposta: { id: 86, nome: 'Responsável pela Proposta - Visualizar' },
        EditarResponsavelProposta: { id: 87, nome: 'Responsável pela Proposta - Editar' },
        ExcluirResponsavelProposta: { id: 88, nome: 'Responsável pela Proposta - Excluir' },

        CriarTipoLocal: { id: 89, nome: 'Tipo de Local - Criar' },
		VisualizarTipoLocal: { id: 90, nome: 'Tipo de Local - Visualizar' },
		EditarTipoLocal: { id: 91, nome: 'Tipo de Local - Editar' },
		ExcluirTipoLocal: { id: 92, nome: 'Tipo de Local - Excluir' },

        CriarUsuario: { id: 93, nome: 'Usuário - Criar' },
        VisualizarUsuario: { id: 94, nome: 'Usuário - Visualizar' },
        EditarUsuario: { id: 95, nome: 'Usuário - Editar' },
		ExcluirUsuario: { id: 96, nome: 'Usuário - Excluir' },
		*/
    };

    public static criarLista(): void {
        for (let k in PerfilPermissao.Permissoes) {
			let p = PerfilPermissao.Permissoes[k] as Permissao;
            PerfilPermissao.Lista.push(p);
        }

        PerfilPermissao.Lista.sort((a, b) => a.nome < b.nome ? -1 : 1);
    }
}