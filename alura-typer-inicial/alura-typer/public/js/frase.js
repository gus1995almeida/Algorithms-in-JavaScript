$("#botao-frase").click(function(){
	$("#spinner").show();
	$.get("http://localhost:3000/frases",trocarFraseAleatoria)
	.fail(function(){
		$("#erro").show();
		setTimeout(function(){
			$("#erro").hide();
		},3000);
	})
	.always(function(){
		$("#spinner").toggle();
	});
});

function trocarFraseAleatoria(data){
	let posicao = Math.floor(Math.random() * data.length);
	let fraseAleatoria = data[posicao].texto;
	$(".frase").text(fraseAleatoria);
	quantidadePalavraFrase();
	let novoTempo = data[posicao].tempo;
	$("#tempo-digitacao").text(novoTempo);
	atualizarVariavelTempoInicial(novoTempo);
}

$("#botao-frase-id").click(function(){
	$("#spinner").show();

	let dado = {
		id: $("#frase-id").val()
	};

	$.get("http://localhost:3000/frases",dado,buscarFrase)
	.fail(function(){
		$("#erro").show();
		setTimeout(function(){
			$("#erro").hide();
		},3000);
	})
	.always(function(){
		$("#spinner").toggle();
	});

})

function buscarFrase(dados){
	let frase = dados.texto;
	$(".frase").text(frase);
	quantidadePalavraFrase();
	let novoTempo = dados.tempo;
	$("#tempo-digitacao").text(novoTempo);
	atualizarVariavelTempoInicial(novoTempo);
}