let form = document.querySelector("form");

form.addEventListener("submit",event=>{
	event.preventDefault();

	if(form.nome.value && form.altura.value && form.gordura.value && form.peso.value){

		if(validacaoPeso(form.peso.value)){
			if(validacaoAltura(form.altura.value)){
				let paciente = new Paciente(form.nome.value,
								form.peso.value,
								form.altura.value,
								form.gordura.value);

				let tabela = document.querySelector("#tabela-pacientes");
				tabela.appendChild(createTr(paciente,"paciente"));
				form.reset();
			}else{
				alert("Valor do campo Altura inválido!");
				form.reset();
			}
		}else{
			alert("Valor do campo Peso inválido!");
			form.reset();
		}
		
	}else{
		alert("Todos os campos do formulário devem ser preenchidos!");
	}
	
});

function createTr(paciente,classe){
	let newTr = document.createElement("tr");
	newTr.classList.add(classe);
	newTr.appendChild(createTd(paciente.nome,"info-nome"));
	newTr.appendChild(createTd(paciente.peso,"info-peso"));
	newTr.appendChild(createTd(paciente.altura,"info-altura"));
	newTr.appendChild(createTd(paciente.gordura,"info-gordura"));
	newTr.appendChild(createTd(paciente.imc,"info-imc"));
	return newTr;
}

function createTd(dado,classe){
	let newTd = document.createElement("td");
	newTd.classList.add(classe);
	newTd.textContent = dado;
	return newTd;
}