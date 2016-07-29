"use strict";

$(document).ready(function() {
	gerarPickerTipoGrafico();
	atribuirBarrasRolagem();
	menuAtribuirCapitulo();
	var data = getDadosUsuario();
	var data2 = getDadosUsuario();
	carregarGrafico(data);
	carregarTodosFiltros(data2);
	filtrosChange();
	botoesGrupo();
    voltarGrafico();
    atribuirEventosModal();
});

function gerarPickerTipoGrafico() {
	$("#tipo_grafico_picker").click(function(event) {
		event.stopPropagation();
		$(this).toggleClass("picker_expanded");
	});

	$(".tipo_grafico_picker_opcoes").children("div").click(function() {
		toggleGrafico(this);
	});

	$("body").click(function() {
		$("#tipo_grafico_picker").removeClass("picker_expanded");
	});
}

function atribuirBarrasRolagem () {
	$(".listagem_perfis_graficos").mCustomScrollbar({
		axis: "y",
		scrollButtons:{
			enable:true
		}
	});
}

function toggleGrafico(item)
{
	var texto = $(item).html();

	$("#tipo_grafico_picker").removeClass("picker_expanded");
	if (texto != $("#tipo_grafico_picker").html){
		$(".tipo_grafico_picker_opcoes").children("div").not(item).removeClass("option_selected");
		$(item).addClass("option_selected");
		$("#tipo_grafico_picker").html(texto);
		carregarGrafico(getDadosUsuario());
	}
	
};

function menuAtribuirCapitulo () {
	$("#liberarCapitulosTable").find("span").click(function() {
		if ($(this).is(".cap_nao_liberado")) {
			$(this).addClass("cap_liberado");
			$(this).removeClass("cap_nao_liberado");
		} else if ($(this).is(".cap_liberado")) {
			$(this).removeClass("cap_liberado");
			$(this).addClass("cap_nao_liberado");
		}
	});
}

function voltarGrafico()
{
    $("#btn_voltar").click(function() {
        $('.lista_itens_grafico').empty();
        if ($('#box_perfil_selected').length > 0) {
            if($('#professor_id').length > 0 ) {
                var escolaId = $('#escola_id').attr('id_escola');
                $('#box_perfil_selected').remove();
                $.ajax({
                    url: 'ajax/RelatoriosAjax.php',
                    type: 'GET',
                    data: {
                        'acao' : 'escolaPorId',
                        'id'   : escolaId
                    },
                    dataType: 'json',
                    success: function(escola) {
                        $("#grafInfoPerfisListados").text("Professores");
                        viewEscola(escola);
                        carregarGrafico(getDadosUsuario());
                    }
                });
            } else {
                $("#grafInfoPerfisListados").text("Escolas");
                $('#box_perfil_selected').remove();
                carregarGrafico(getDadosUsuario());
            }
        }
    });
}

function filtrosChange () {

	$(".filtrosSelect").change(function() {
		carregarGrafico(getDadosUsuario());

		var data = getDadosUsuario();
		$(".filtrosSelect").not(this).each(function() {
			carregaFiltro(data, this);
		});
	});
}

function carregarGrafico (data) {
	var d = data
	
	$('.lista_itens_grafico').html("Carregando...");
	d.acao = "carregaGrafico";
	d.grafico = $('.option_selected ').attr('id');
	
	$.ajax({
		url: 'ajax/RelatoriosAjax.php',
		type: 'GET',
		data: d,
                beforeSend: function() {
                    $("#grafInfoCountPerfisListados").text("(Carregando...)");
                },
		success: function(dados) {
			$('.lista_itens_grafico').html(dados);
			return false;
		},
                complete: function() {
                    countPerfisListados();
                    animateCharts();
                }
	});
	return false;
}

function carregaFiltro(data, filtro) {
	var valor = $(filtro).val();
	$(filtro).html("<option>Carregando...</option>");
	data.filtro = filtro.id
	data.acao = "carregaFiltro";
	$.ajax({
		url: "ajax/RelatoriosAjax.php",
		type: "GET",
		data: data,
		success: function(d) {
			$(filtro).html(d);
		},
		complete: function() {
			if (valor != null)
				$(filtro).val(valor);
		}
	});
}

function carregarTodosFiltros(data) {
	$('.filtrosSelect').each(function() {
		carregaFiltro(data, this);
	})
}

function getDadosUsuario () {
	var perfil = 3;//Padrão
	var id;
	if ($('#box_perfil_selected').length > 0){
		if ($('#professor_id').length > 0)
		{
			perfil = 2;
			id = $('#professor_id').attr('id_professor');
		}
		else
		{
			perfil = 4;
			id = $('#escola_id').attr('id_escola');
		}
	}
	else
	{
		perfil = usuario.perfil;
		if (perfil != 4)
			id = usuario.id;
		else
			id = usuario.escola;
	}
	
	
	
	var data = {
		'livro' : $('#filtroLivro').val(),
		'capitulo' : $('#filtroCapitulo').val(),
		'sala' : $('#filtroSala').val(),
		'perfil' : perfil,
		'id' : id,
	};

	if (data.livro == null)
		data.livro = 0;
	if (data.capitulo == null)
		data.capitulo = 0;
	if (data.sala == null)
		data.sala = 0;

	return data;
}

function viewEscola(escola)
{
	var htmlEscSelected = "";	

	htmlEscSelected +=	'<div id="box_perfil_selected" class="box_perfil_selected ficha_dados">';
	htmlEscSelected +=		'<div class="foto_perfil_selected"></div>';
	htmlEscSelected += 		'<input type="hidden" id="escola_id" id_escola="'+escola.id+'"/>';
	htmlEscSelected +=		'<div class="info_perfil_selected">';
	htmlEscSelected +=			'<div class="nome_perfil_selected">'+escola.nome+'</div>';
	htmlEscSelected +=			'<div class="razaoSocial_perfil_selected">Razão social: '+escola.razao_social+'</div>';
	htmlEscSelected += 			'<div class="dados_perfil_selected">Tipo: '+escola.tipo_escola+' | Administração: '+escola.administracao+'</div>';
	htmlEscSelected +=			'<div class="dados_perfil_selected">Cidade: '+escola.endereco.cidade+' | Estado: '+escola.endereco.uf+' | Site: '+escola.site+'</div>';
	htmlEscSelected +=			'<div class="dados_perfil_selected">Diretor: '+escola.diretor.nome+' | E-mail: '+escola.diretor.email+'</div>';
	htmlEscSelected +=			'<div class="acoes_perfil_selected"><a href="cadastro.php"><span>Ver dados cadastrais</span></a> | <span class="lib_cap" id="lib_cap_'+escola.id+'" onclick="getCapitulosByEscola('+escola.id+')">Liberar capítulos</span></div>';
	htmlEscSelected +=		'</div>';
	htmlEscSelected +=	'</div>';

	$(".tipo_grafico_picker_opcoes").after(htmlEscSelected);
}

function viewProfessorSelected(professor)
{
	var htmlProfSelected = "";
	var data_nascimento = professor.data_nascimento.split("-")[2]+"/"+professor.data_nascimento.split("-")[1]+"/"+professor.data_nascimento.split("-")[0];
	var data_entrada = professor.data_entrada_escola.split("-")[2]+"/"+professor.data_entrada_escola.split("-")[1]+"/"+professor.data_entrada_escola.split("-")[0];
	var rg = professor.rg.slice(0,2)+"."+professor.rg.slice(2,5)+"."+professor.rg.slice(5,8)+"-"+professor.rg.slice(8);
	var cpf = professor.cpf.slice(0,3)+"."+professor.cpf.slice(3,6)+"."+professor.cpf.slice(6,9)+"-"+professor.cpf.slice(9);
	$("#box_perfil_selected").remove();

	htmlProfSelected +=	'<div id="box_perfil_selected" class="box_perfil_selected ficha_dados">';
	htmlProfSelected +=		'<div class="foto_perfil_selected"></div>';
	htmlProfSelected +=		'<div clas="info_perfil_selected">';
	htmlProfSelected += 	'<input type="hidden" id="professor_id" id_professor="'+professor.id+'"/>';
	htmlProfSelected += 	'<input type="hidden" id="escola_id" id_escola="'+professor.escola+'"/>';
	htmlProfSelected +=			'<div class="nome_perfil_selected">'+professor.nome+'</div>';
	htmlProfSelected +=			'<div class="dados_perfil_selected">Escola: '+professor.escola_nome+' | Entrada na escola: '+data_entrada+'</div>';
	htmlProfSelected +=			'<div class="dados_perfil_selected">RG: '+rg+' | CPF: '+cpf+' | Data de nascimento: '+data_nascimento+'</div>';
	htmlProfSelected +=			'<div class="acoes_perfil_selected"><a href="cadastro.php"><span>Ver dados cadastrais</span></a> | <span id="editar_grupos">Editar grupos</span></div>';
	htmlProfSelected +=		'</div>';
	htmlProfSelected +=	'</div>';

	$(".tipo_grafico_picker_opcoes").after(htmlProfSelected);
	$('#editar_grupos').click(function() {
		abrirEdicaoGrupo(professor.id);
	});
}

function viewEscolaSelected(escola)
{
	var htmlEscSelected = "";
	$("#box_perfil_selected").remove();

	htmlEscSelected +=	'<div id="box_perfil_selected" class="box_perfil_selected ficha_dados">';
	htmlEscSelected +=		'<div class="foto_perfil_selected"></div>';
	htmlEscSelected +=		'<div class="info_perfil_selected">';
	htmlEscSelected += 		'<input type="hidden" id="escola_id" id_escola="'+escola.id+'"/>';
	htmlEscSelected +=			'<div class="nome_perfil_selected">'+escola.nome+'</div>';
	htmlEscSelected +=			'<div class="razaoSocial_perfil_selected">Razão social: '+escola.razao_social+'</div>';
	htmlEscSelected += 			'<div class="dados_perfil_selected">Tipo: '+escola.tipo_escola+' | Administração: '+escola.administracao+'</div>';
	htmlEscSelected +=			'<div class="dados_perfil_selected">Cidade: '+escola.endereco.cidade+' | Estado: '+escola.endereco.uf+' | Site: '+escola.site+'</div>';
	htmlEscSelected +=			'<div class="dados_perfil_selected">Diretor: '+escola.diretor.nome+' | E-mail: '+escola.diretor.email+'</div>';
	htmlEscSelected +=			'<div class="acoes_perfil_selected"><a href="cadastro.php"><span>Ver dados cadastrais</span></a> | <span class="lib_cap" id="lib_cap_'+escola.id+'" onclick="getCapitulosByEscola('+escola.id+')">Liberar capítulos</span></div>';
	htmlEscSelected +=		'</div>';
	htmlEscSelected +=	'</div>';

	$(".tipo_grafico_picker_opcoes").after(htmlEscSelected);
}

function professorGetById(idProfessor) {
	$.ajax({
		url: "ajax/RelatoriosAjax.php",
		type: "GET",
		data: "acao=usuarioPorId&id="+idProfessor,
		dataType: "json",
		success: function(d) {
                        $("#grafInfoPerfisListados").text("Alunos");
			viewProfessorSelected(d);
			carregarGrafico(getDadosUsuario());
		}	
	});
}

function escolaGetById(idEscola) {
	$.ajax({
		url: "ajax/RelatoriosAjax.php",
		type: "GET",
		data: "acao=escolaPorId&id="+idEscola,
		dataType: "json",
		success: function(d) {
                        $("#grafInfoPerfisListados").text("Professores");
			viewEscolaSelected(d);
			carregarGrafico(getDadosUsuario());
		}		
	});
}

function abrirEdicaoGrupo(idProfessor) {
	$("#criarGrupoContainer").show();
	$("#conteudoPrincipal").hide();
	$('#alunosContainer').html("Carregando...");
	$.ajax({
		url: "ajax/SerieAjax.php",
		data: {	'acao' : 'listarDisponiveisProfessor',
				'idProfessor' : idProfessor},
		dataType: "json",
		success: function(dataSeries) {
			var htmlSeries = "";
			for (var i = 0; i < dataSeries.length; i++)
				htmlSeries += '<option value="'+dataSeries[i].id+'">'+dataSeries[i].serie+'ª Série</option>';
			$('#grp_serie').html(htmlSeries);
			carregarPeriodosSerie(idProfessor);
		}
	});
	$('#grp_serie').change(function() {
		$('#alunosContainer').html("Carregando...");
		carregarPeriodosSerie(idProfessor);
	});

}

function carregarPeriodosSerie(idProfessor) {
	$('#grp_periodo').html('<option>Carregando...</option>');
	$.ajax({
		url: "ajax/PeriodoAjax.php",
		data: {	'acao' : 'listarDisponiveisProfessorSerie',
				'idProfessor' : idProfessor,
				'serie' : $('#grp_serie').val()},
		dataType: "json",
		success: function(dataPeriodos){
			var htmlPeriodos = "";
			for (var i = 0; i < dataPeriodos.length; i++){
				htmlPeriodos += '<option value="'+dataPeriodos[i].id+'">'+dataPeriodos[i].periodo+'</option>'
			}
			$('#grp_periodo').html(htmlPeriodos);
			carregarAluno();
			$('#grp_periodo').change(function() {
				carregarAluno();
			})
		}
	});
}

function carregarAluno() {
	$.ajax({
		url: "ajax/UsuarioAjax.php",
		data: {	'acao' : 'buscaAlunoSemGrupoBySerieEscola',
				'serie' : $('#grp_serie').val(),
				'idEscola' : $('#escola_id').attr('id_escola')},
		dataType: 'json',
		success: function(dataAlunos){
			var htmlAlunos = '';
			for (var i = 0; i < dataAlunos.length; i++){
				htmlAlunos += 	'<input name="usr_id" value="'+dataAlunos[i].idVariavel+'" type="checkbox" class="aluno_grupo" id="aluno_'+dataAlunos[i].idUsuario+'">';
				htmlAlunos += 	'<label for="aluno_'+dataAlunos[i].idUsuario+'" class="checkbox-list-item checkbox-block">';
				htmlAlunos += 		'<img src="'+dataAlunos[i].imagem+'">';
				htmlAlunos += 		dataAlunos[i].nome;
				htmlAlunos += 	'</label>';
			}
			$('#alunosContainer').html(htmlAlunos);
		}
	});
}

function botoesGrupo() {
	$('#cancelarGrupo').click(function() {
		$('#grp_periodo').html('<option>Carregando...</option>');
		$('#grp_serie').html('<option>Carregando...</option>');
		$("#criarGrupoContainer").hide();
		$("#conteudoPrincipal").show();
	});

	$('#salvarGrupo').click(function(e) {
		e.preventDefault();
		adicionarAlunosGrupo();
	});
}

function adicionarAlunosGrupo() {
	 var alunos = "";
	$('.aluno_grupo:checked').each(function() {
		if (alunos === "")
			alunos = "(" + $(this).val();
		else
			alunos += ", " + $(this).val();
	});
	alunos += ")";
	$.ajax({
		url: "ajax/RelatoriosAjax.php",
		data: {	'acao' : 'adicionarGrupoProfessorSeriePeriodo',
				'alunos' : alunos,
				'idProfessor' : $('#professor_id').attr('id_professor'),
				'serie' : $('#grp_serie').val(),
				'periodo' : $('#grp_periodo').val()},
		type: "POST",
		success: function() {
		}
	});

	$('#tipoMensagem').removeClass();
    $('#tipoMensagem').addClass("sucesso");
    $("#modalTexto").html('Alunos atribuidos ao grupo!');
    $('.modal').show();
    $('.modal-backdrop').show();
    $('#cancelarGrupo').trigger('click');
}

function getDadosDoUsuario(idusr) {   
    $("#userInfoModalBg").fadeIn(400);
    $("#userInfoModal").animate({top: "20%"}, 400);

    $.ajax({
        url: "ajax/UsuarioAjax.php",
        type: "GET",
        dataType: "json",
        crossDomain: false,
        data: "acao=dadosGenericos&id=" + idusr,
        success: function(data) { viewUserBasicInfo(data); },
        error: function(e) { console.error("Erro" + " /// " + e.txtStatus); }
    });
}

function viewUserBasicInfo(userData) {
    $("#userInfoModal").html(gerarHtmlUserBasicInfo(userData))
}

function gerarHtmlUserBasicInfo(userData) {
    var htmlInfos = "";
    
    // Cabeçalho
    htmlInfos += "<div class='user-info-modal-header'>";
    htmlInfos +=    "<h2>" + userData.perfil.tipo + "</h2>";
    htmlInfos +=    "<span class='glyphicon glyphicon-remove ic-close-user-info-modal' onclick='closeUserInfoModal()'></span>";
    htmlInfos += "</div>";

    // Corpo
    htmlInfos += "<div class='user-info-modal-body'>";
    htmlInfos +=    "<div class='row'>";
    htmlInfos +=        "<div class='col-md-8'>";
    htmlInfos +=            "<p class='user-info'>";
    htmlInfos +=                "<span class='user-info-label'>Nome: </span>";
    htmlInfos +=                "<span class='user-info-value'>" + userData.nome + "</span>";
    htmlInfos +=            "</p>";

    if (userData.perfil.id == 1) {
        htmlInfos += "<p class='user-info'>";
        htmlInfos +=    "<span class='user-info-label'>Escola: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.escola.nome + "</span>";
        htmlInfos += "</p>";
        htmlInfos += "<p class='user-info'>";
        htmlInfos +=    "<span class='user-info-label'>Localização: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.endereco.cidade + " - " + userData.endereco.uf + "</span>";
        htmlInfos += "</p>";
        htmlInfos += "<p class='user-info'>";
        htmlInfos +=    "<span class='user-info-label'>Grupo: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.grupo.nome + "</span><br />";
        htmlInfos +=    "<span class='user-info-label'>Professor: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.grupo.professor + "</span> <br />";
        htmlInfos +=    "<span class='user-info-label'>Período: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + (userData.grupo.periodo == 1 ? "Manhã" : "Tarde") + "</span> | ";
        htmlInfos +=    "<span class='user-info-label'>Série: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.grupo.serie + "&#170; série</span>";
        htmlInfos += "</p>";
        
        $("#userInfoModal").find(".user-info-modal-header > h2").text("Aluno");
    } else if (userData.perfil.id == 2) {
        htmlInfos += "<p class='user-info'>";
        htmlInfos +=    "<span class='user-info-label'>Escola: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.escola.nome + "</span>";
        htmlInfos += "</p>";
        htmlInfos += "<p class='user-info'>";
        htmlInfos +=    "<span class='user-info-label'>Localização: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.endereco.cidade + " - " + userData.endereco.uf + "</span>";
        htmlInfos += "</p>";
        htmlInfos += "<p class='user-info'>";
        htmlInfos +=    "<span class='user-info-label'>Grupo: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.grupo.nome + "</span> <br />";
        htmlInfos +=    "<span class='user-info-label'>Período: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + (userData.grupo.periodo == 1 ? "Manhã" : "Tarde") + "</span> | ";
        htmlInfos +=    "<span class='user-info-label'>Série: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.grupo.serie + "&#170; série</span>";
        htmlInfos += "</p>";

        $("#userInfoModal").find(".user-info-modal-header > h2").text("Professor");
    } else if (userData.perfil.id == 4) {
        htmlInfos += "<p class='user-info'>";
        htmlInfos +=    "<span class='user-info-label'>NSE: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.nse + "</span>";
        htmlInfos += "</p>";
        htmlInfos += "<p class='user-info'>";
        htmlInfos +=    "<span class='user-info-label'>Localização: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.endereco.cidade + " - " + userData.endereco.uf + "</span>";
        htmlInfos += "</p>";
        htmlInfos += "<p class='user-info'>";
        htmlInfos +=    "<span class='user-info-label'>Professores: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.numero_professores + "</span> | ";
        htmlInfos +=    "<span class='user-info-label'>Alunos: </span>";
        htmlInfos +=    "<span class='user-info-value'>" + userData.numero_alunos + "</span>";
        htmlInfos += "</p>";

        $("#userInfoModal").find(".user-info-modal-header > h2").text("Escola");
    } else {
        console.info("Usuário NEC");
    }
    
    htmlInfos +=        "</div>";
    htmlInfos +=        "<div class='col-md-4'>";
    htmlInfos +=            "<div class='user-info-foto'>";
    htmlInfos +=                "<img src='imgp/" + userData.imagem + "' title='" + userData.nome + "' alt='" + userData.nome + "' height='auto' max-width='80px' />";
    htmlInfos +=            "</div>";
    htmlInfos +=        "</div>";
    htmlInfos +=        "<div class='user-info-btns'>";
    htmlInfos +=            "<button type='button' class='btn_primary'>Ver dados cadastrais</button>";
    htmlInfos +=        "</div>";
    htmlInfos +=    "</div>";
    htmlInfos += "</div>";

    return htmlInfos;
}

function closeUserInfoModal() {
    $("#userInfoModal").animate({top: "10%"}, 400);
    $("#userInfoModal").parent().fadeOut(400, function() {
        $("#userInfoModal").html("<p class='text-center'>Carregando...</p>");
    });
}

function atribuirEventosModal() {
    document.onkeyup = function(evt) {
        if (evt.keyCode == 27)
            closeUserInfoModal();
    };

    document.getElementById("userInfoModalBg")
            .onclick = closeUserInfoModal;

    document.getElementById("userInfoModal")
            .onclick = function(evt) {
                evt.stopPropagation() 
    };
}

function countPerfisListados() {
    var perfis = $(".lista_itens_grafico")
                    .filter(":visible")
                    .children("div");
    
    $("#grafInfoCountPerfisListados").text("(" + perfis.length + ")");
            
}

function animateCharts() {
    document.querySelectorAll(".chart").forEach(function(chart) {
        var chart1 = chart.children[0];
        var chart2 = chart.children[0];
        var animation;
 
        function start() {
            var s1o = parseFloat(chart1.getAttribute("width").slice(0, chart1.getAttribute("width").indexOf("%")));
            var s1 = parseFloat(chart1.getAttribute("data-value"));
            var s2o = parseFloat(chart1.getAttribute("width").slice(0, chart1.getAttribute("width").indexOf("%")));
            var s2 = parseFloat(chart1.getAttribute("data-value"));

            chart1.setAttribute("width", calc(s1, s1o));
            chart2.setAttribute("width", calc(s2, s2o));

            s1o = parseFloat(chart1.getAttribute("width").slice(0, chart1.getAttribute("width").indexOf("%")));
            s2o = parseFloat(chart2.getAttribute("width").slice(0, chart2.getAttribute("width").indexOf("%")));
            
            if (s1o >= s1 && s2o >= s2) {
                chart1.setAttribute("width", chart1.getAttribute("data-value") + "%");
                chart1.setAttribute("width", chart2.getAttribute("data-value") + "%");
                window.cancelAnimationFrame(animation);
            }
        }
        
        function calc(s, s0) {
            return (s + ((s - s0) / Math.pow(10, 5))) + "%";
        }

        animation = window.requestAnimationFrame(start);
    });
}