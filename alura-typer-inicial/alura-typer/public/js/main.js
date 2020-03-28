let campoDigitacao = $(".campo-digitacao");
let tempoInicial = $("#tempo-digitacao").text();

$(function(){
	quantidadePalavraFrase();
	atualizarCampoDigitacao();
	marcacaoBordaCampoDigitacao();
	contagemTempoDigitacao();
	reiniciarJogo();
	atualizaPlacar();
	$("#usuarios").selectize({
	    create: true,
	    sortField: 'text'
	});
	
	$(".tooltip").tooltipster({
	    trigger: "custom"
	});
});

/* Or $(document).ready(function(){
	quantidadePalavraFrase();
	atualizarCampoDigitacao();
	contagemTempoDigitacao();
	reiniciarJogo();
});*/


function quantidadePalavraFrase(){
	var quantidadePalavra = $(".frase").text().split(" ").length;
	$("#quantidade-palavra").text(quantidadePalavra);
}

function atualizarVariavelTempoInicial(novoTempo){
	tempoInicial = novoTempo;
}

function atualizarCampoDigitacao(){
	campoDigitacao.on("input",function(){
		let quantidadePalavraDigitacao = campoDigitacao.val().split(/\S+/).length - 1; 
		/*Expressao Regular que considera apenas palavras separadas com espaço. 
		Caso não tiver esssa expressao, o usuario pode apenas clicar no espaço
		e irá contar como se estivesse digitando uma palavra*/
		let quantidadeCaracterDigitacao = campoDigitacao.val().length;
		$("#quantidade-palavra-digitada").text(quantidadePalavraDigitacao);
		$("#quantidade-caracter-digitado").text(quantidadeCaracterDigitacao);
	});
}

function contagemTempoDigitacao(){
	campoDigitacao.one("focus",event=>{
		let tempoRestante = tempoInicial;
		$("#botao-reiniciar").attr("disabled",true);
		let cronometroID = setInterval(function(){
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			if(tempoRestante < 1){
				clearInterval(cronometroID);
				finalizaJogo();
				//campoDigitacao.css("background-color","ligthgray"); -> Outra Opcao
			}
		},1000);
	});
}

function marcacaoBordaCampoDigitacao(){
	campoDigitacao.on("input",function(){
		let fraseDigitadaUsuario = campoDigitacao.val();
		let parteFrase = $(".frase").text().substr(0,fraseDigitadaUsuario.length);
		if(fraseDigitadaUsuario == parteFrase){
			campoDigitacao.removeClass("borda-vermelha");
			campoDigitacao.addClass("borda-verde");
		}else{
			campoDigitacao.removeClass("borda-verde");
			campoDigitacao.addClass("borda-vermelha");
		}
	});	
}

function finalizaJogo(){
	campoDigitacao.attr("disabled", true);
	$("#botao-reiniciar").attr("disabled",false);
	campoDigitacao.addClass("campo-desativado");
	inserirPlacar();
}

function reiniciarJogo(){
	let botaoReniciar = $("#botao-reiniciar").click(function(){
		campoDigitacao.attr("disabled", false);
		campoDigitacao.val("");
		campoDigitacao.removeClass("campo-desativado");
		campoDigitacao.removeClass("borda-verde");
		campoDigitacao.removeClass("borda-vermelha");
		$("#tempo-digitacao").text(tempoInicial);
		$("#quantidade-palavra-digitada").text("0");
		$("#quantidade-caracter-digitado").text("0");
		contagemTempoDigitacao();
	});
}