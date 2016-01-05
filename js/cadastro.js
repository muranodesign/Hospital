var tabs = $('.tab_cadastro');
var containers = $('.conteudo_tab');
var btns = $('.btns_tabs');

$(document).ready(function() {
	$('.conteudo_tab').mCustomScrollbar({
		axis:"y",
		scrollButtons:{
			enable:true
		}
	});

    for ( var i = 0; i < tabs.length; i++ )
    {
        $($(tabs).get(i)).click(function() {
            tabNavigation(this)
        });
    }

    tabNavigation(tabs[0]);


    $("#cadastroAluno").click(function(){
        var nomeAluno = $("#inputNomeAluno").val();
        var professor = $("#selectProfessorAluno").val();
        var periodoAluno = $("#selectPeriodoAluno").val();
        var escolaAluno = $("#selectEscolaAluno").val();
        var serieAluno = $("#selectSerieAluno").val();
        var turmaAluno = $("#inputTurmaAluno").val();
        var nascimentoAluno = $("#inputNascimentoAluno").val();
        var rgAluno = $("#inputRgAluno").val();
        var cpfAluno = $("#inputCpfAluno").val();
        var ruaAluno = $("#inputRuaAluno").val();
        var bairroAluno = $("#inputBairroAluno").val();
        var cidadeAluno = $("#inputCidadeAluno").val();
        var numCasaAluno = $("#inputNumCasaAluno").val();
        var estadoAluno = $("#inputEstadoAluno").val();
        var cepAluno = $("#inputCepAluno").val();
        var telefoneAluno = $("#inputTelefoneAluno").val();
        var emailAluno = $("#inputEmailAluno").val();
        var nomeRespAluno = $("#inputNomeRespAluno").val();
        var nascRespAluno = $("#inputNascRespAluno").val();
        var rgRespAluno = $("#inputRgRespAluno").val();
        var cpfRespAluno = $("#inputCpfRespAluno").val();
        var telRespAluno = $("#inputTelRespAluno").val();
        var emailRespAluno = $("#inputEmailRespAluno").val();
        var loginAluno = $("#inputUsuarioAluno").val();
        var senhaAluno = $("#inputSenhaAluno").val();

        $.ajax({
            url:'ajax/cadastroAjax.php',
            type:'post',
            dataType:'json',
            data: {
                'acao': 'novoAluno',
                'nomeAluno': nomeAluno,
                'professor': professor,
                'periodoAluno': periodoAluno,
                'escolaAluno': escolaAluno,
                'serieAluno': serieAluno,
                'turmaAluno': turmaAluno,
                'nascimentoAluno': nascimentoAluno,
                'rgAluno': rgAluno,
                'cpfAluno': cpfAluno,
                'ruaAluno': ruaAluno,
                'bairroAluno': bairroAluno,
                'cidadeAluno':cidadeAluno,
                'numCasaAluno': numCasaAluno,
                'estadoAluno': estadoAluno,
                'cepAluno': cepAluno,
                'telefoneAluno': telefoneAluno,
                'emailAluno': emailAluno,
                'nomeRespAluno': nomeRespAluno,
                'nascRespAluno': nascRespAluno,
                'rgRespAluno': rgRespAluno,
                'cpfRespAluno': cpfRespAluno,
                'telRespAluno': telRespAluno,
                'emailRespAluno': emailRespAluno,
                'loginAluno':loginAluno,
                'senhaAluno':senhaAluno
            },
            success:function(data){

                /*if(data.erro){
                    $(".result").removeClass('texte');
                }else{
                    $("#result").html(data.msg);
                }*/
            }
        });
        return false;
    });

    $("#cadastroProfessor").click(function(){
    	
    	var nomeProfessor = $("#inputNomeProf").val();
    	var dataNascimentoProfessor = $("#inputNascimentoProf").val();
    	var rgProfessor = $("#inputRgProf").val();
    	var cpfProfessor = $("#inputCpfProf").val();
    	var enderecoProfessor = $("#inputRuaProf").val();
    	var bairroProfessor = $("#inputBairroProf").val();
    	var numeroCasaProfessor = $("#inputNumCasaProf").val();
    	var cidadeProfessor = $("#inputCidadeProf").val();
    	var ufProfessor = $("#inputEstadoProf").val();
    	var cepProfessor = $("#inputCepProf").val();
    	var telefoneProfessor = $("#inputTelefoneProf").val();
    	var emailProfessor = $("#inputEmailProf").val();
    	var loginProfessor = $("#inputUsuarioProf").val();
    	var senhaProfessor = $("#inputSenhaProf").val();
    	var confirmaSenha = $("#inputSenhaConfirmProf").val();
    	if(senhaProfessor != confirmaSenha){
    		alert("A senha não está igual!!!");
    	}else{
    		$.ajax({
        		url:'ajax/cadastroAjax.php',
        		type:'post',
        		dataType:'json',
        		data:{'acao':'cadastroProfessor',
        			'nomeProfessor':nomeProfessor,
        			'dataNascimentoProfessor':dataNascimentoProfessor,
        			'rgProfessor':rgProfessor,
        			'cpfProfessor':cpfProfessor,
        			'enderecoProfessor':enderecoProfessor,
        			'bairroProfessor':bairroProfessor,
        			'numeroCasaProfessor':numeroCasaProfessor,
        			'cidadeProfessor':cidadeProfessor,
        			'ufProfessor':ufProfessor,
        			'cepProfessor':cepProfessor,
        			'telefoneProfessor':telefoneProfessor,
        			'emailProfessor':emailProfessor,
        			'loginProfessor':loginProfessor,
        			'senhaProfessor':senhaProfessor},
        			success:function(data){
        				if(data.erro){
        					alert(data.msg);
        				}else{
        					alert(data.msg);
        					$(".value_p").val('');
        				}
        			}
        	});	
    	}
    	return false;    	
    });
    
    $("#cadastroEscola").click(function(){
    	
    	var nomeEscola = $("#inputNomeEscola").val();
    	var codigoEscola = $("#inputCodigoEscola").val();
    	var enderecoEscola = $("#inputRuaEscola").val();
    	var bairroEscola = $("#inputBairroEscola").val();
    	var numeroEnderecoEscola = $("#inputNumCasaEscola").val();
    	var cidadeEscola = $("#inputCidadeEscola").val();
    	var ufEscola = $("#inputEstadoEscola").val();
    	var cepEscola = $("#inputCepEscola").val();
    	var telefoneEscola = $("#inputTelefoneEscola").val();
    	var emailEscola = $("#inputEmailEscola").val();
    	var loginEscola = $("#inputUsuarioEscola").val();
    	var senhaEscola = $("#inputSenhaEscola").val();
    	var confirmaSenha = $("#inputSenhaConfirmEscola").val();
    	if(senhaEscola != confirmaSenha){
    		alert("A senha não esta igual!");
    	}else{
    		$.ajax({
    			url:'ajax/cadastroAjax.php',
    			type:'post',
    			dataType:'json',
    			data:{'acao':'cadastraEscola',
    				'nomeEscola':nomeEscola,
    				'codigoEscola':codigoEscola,
    				'enderecoEscola':enderecoEscola,
    				'bairroEscola':bairroEscola,
    				'numeroEnderecoEscola':numeroEnderecoEscola,
    				'cidadeEscola':cidadeEscola,
    				'ufEscola':ufEscola,
    				'cepEscola':cepEscola,
    				'telefoneEscola':telefoneEscola,
    				'emailEscola':emailEscola,
    				'loginEscola':loginEscola,
    				'senhaEscola':senhaEscola},
    				success:function(data){
    					if(data.erro){
        					alert(data.msg);
        				}else{
        					alert(data.msg);
        					$(".value_p").val('');
        				}
    				}
    		});    		
    	}
    	return false;
    });

});

function tabNavigation(tabToShow)
{
	for ( var i = 0; i < tabs.length; i++ )
	{
		if ( tabs[i] == tabToShow )
		{
			$($(containers).get(i)).show();
			$($(btns).get(i)).show();

			$($(tabs).get(i)).addClass('tab_cadastro_ativo');
		}
		else
		{
			$($(containers).get(i)).hide();
			$($(btns).get(i)).hide();

			$($(tabs).get(i)).removeClass('tab_cadastro_ativo');
		}
	}
}