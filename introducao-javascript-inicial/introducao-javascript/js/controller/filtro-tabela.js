let filtro = document.querySelector("#filtro-tabela");

filtro.addEventListener("input",function(){

	let pacientes = document.querySelectorAll(".paciente");

	if(this.value.length > 0){

		let nomePesquisado = this.value;
		let expressao = new RegExp(nomePesquisado,"i");		//Expressao Regular => Posso comparar parte do texto

		pacientes.forEach(paciente=>{

			if(expressao.test(paciente.querySelector(".info-nome").textContent)){
				paciente.classList.remove("invisivel");
			}else{
				paciente.classList.add("invisivel");
			}
		});
	}else{

		pacientes.forEach(paciente=>{
			paciente.classList.remove("invisivel");
		});
		
	}
});