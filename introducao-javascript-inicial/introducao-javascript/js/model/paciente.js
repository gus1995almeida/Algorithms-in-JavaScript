class Paciente{

	constructor(nome,peso,altura,gordura){
		this.nome = nome;
		this.peso = peso;
		this.altura = altura;
		this.gordura = gordura;
		this.imc = calculoImc(peso,altura);
	}
}