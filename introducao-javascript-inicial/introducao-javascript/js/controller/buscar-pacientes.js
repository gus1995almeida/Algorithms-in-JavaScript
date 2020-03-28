let botaoBuscar = document.querySelector("#buscar-pacientes");

botaoBuscar.addEventListener("click", function(){

	let xhr = new XMLHttpRequest();
	xhr.open("GET","https://api-pacientes.herokuapp.com/pacientes");
	xhr.send();
	xhr.addEventListener("load", function(){
		if(xhr.status == 200){
			let pacientes = JSON.parse(xhr.responseText);
			pacientes.forEach(paciente=>{
				let tabela = document.querySelector("#tabela-pacientes");
				tabela.appendChild(createTr(paciente,"paciente"));
			});
		}else{
			alert(xhr.responseText);
		}
		
	});
	xhr.close;
});