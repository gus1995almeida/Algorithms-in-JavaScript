var pacientes = document.querySelectorAll(".paciente");

pacientes.forEach(paciente=>{
	var peso = paciente.querySelector(".info-peso").textContent;
	var altura = paciente.querySelector(".info-altura").textContent;

	if(validacaoPeso(peso)){
		if(validacaoAltura(altura)){
			paciente.querySelector(".info-imc").textContent = calculoImc(peso,altura);
		}else{
			paciente.querySelector(".info-imc").textContent = "Altura incorreta!";
			paciente.classList.add("dados-paciente-incorreto"); //Posso adicionar uma classe que está noarquivo CSS
		}
	}else{
			paciente.querySelector(".info-imc").textContent = "Peso incorreto!";
			paciente.style.background = "#CC2345"; // Ou posso adicionar diretamente no javaScript
			paciente.style.color = "#FFFFFF";
	}

});

function calculoImc(peso,altura){
	return (peso / (altura * altura)).toFixed(2);
}

function validacaoPeso(peso){
	return (peso > 0 && peso < 400) ? true : false;
}

function validacaoAltura(altura){
	return (altura > 0 && altura < 3.00) ? true : false;
}