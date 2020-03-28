$("#botao-placar").click(mostrarPlacar);
$("#botao-sync").click(salvarPlacar);

function inserirPlacar(){
	let tabela = $(".placar").find("tbody");

	let usuario = $("#usuarios").val();
	let placar = $("#quantidade-palavra-digitada").text();
	let linha = criarLinha(usuario,placar);
	linha.find(".botao-remover").click(removerPlacar);
	tabela.prepend(linha);
	$(".placar").slideDown(500);
	scrollPlacar();
}

function scrollPlacar(){
	let posicao = $(".placar").offset().top;
	$("html,body").animate({
		scrollTop: posicao +"px"
	},1000);
}

function criarLinha(usuario,placar){
	
	let linha = $("<tr>");
	let colunaUsuario = $("<td>").text(usuario);
	let colunaPlacar = $("<td>").text(placar);
	let colunaRemover = $("<td>");

	let iconeRemover = $("<i>").addClass("small").addClass("material-icons").text("delete");
	let link = $("<a>").addClass("botao-remover").attr("href","#");

	link.append(iconeRemover);
	colunaRemover.append(link);

	linha.append(colunaUsuario);
	linha.append(colunaPlacar);
	linha.append(colunaRemover);

	return linha;
}

function removerPlacar(){
	event.preventDefault();
	$(this).parent().parent().fadeOut(1000);
	setTimeout(function(){
		$(this).parent().parent().remove();
	},1000);
}

function mostrarPlacar(){
	$(".placar").stop().slideToggle(500);
}

function salvarPlacar(){
	let placar = [];
	let linhas = $("tbody>tr");
	linhas.each(function(){
		let usuario = $(this).find("td:nth-child(1)").text();
		let resultado = $(this).find("td:nth-child(2)").text();
		
		let score = {
			usuario:usuario,
			pontos:resultado
		};

		placar.push(score);
	});

	let dados = {
		placar:placar
	};

	$.post("http://localhost:3000/placar",dados,function(){
		$(".tooltip").tooltipster("open");
	}).fail(function(){
		$(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar"); 
	}).always(function(){
		setTimeout(function() {
		    $(".tooltip").tooltipster("close"); 
		}, 1200);
	});
}

function atualizaPlacar(){
	$.get("http://localhost:3000/placar",function(dados){
		$(dados).each(function(){
			let linha = criarLinha(this.usuario,this.pontos);
			linha.find(".botao-remover").click(removerPlacar);
			$(".placar").find("tbody").append(linha);
		});
	});
}