var tabela = document.querySelector("#tabela-pacientes");

tabela.addEventListener("dblclick", event=>{
	event.target.parentNode.classList.add("fadeOut");
	setTimeout(function(){
		event.target.parentNode.remove();
	}, 1000);
});