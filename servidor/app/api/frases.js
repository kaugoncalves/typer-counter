var api = {};

//Músicas ou memes legais em 06/03/2021
var frases = [
	{_id: 0, texto:'A vingança nunca é plena, mata a alma e a envenena.', tempo: 16 },
	{_id: 1, texto:'Quando eu era pequena não gostava de apanhar, mas depois que a gente cresce tudo muda.',tempo: 21 },
	{_id: 2, texto:'Só os loucos sabem.', tempo: 7 },
	{_id: 3, texto:'Olha pro meu time trajado de grife.', tempo: 12 },
	{_id: 4, texto:'E eu que era careta, não bebia nada, e quando bebia fazia careta.', tempo: 23 },
	{_id: 5, texto:'E os que manda mensagem ta sumido né, engraçado é que sempre estive aqui.', tempo: 20 },
	{_id: 6, texto:'Cortando de giro, faz o sinal da gang, não pago de bandido, mas nós tem o bem.', tempo: 24 },
	{_id: 7, texto:'O dia não é noite, um copo não é garrafa.', tempo: 15},
	{_id: 8, texto:'Fiz uma promessa para mim mesmo, nunca mais comer torresmo.', tempo: 15},
	{_id: 9, texto:'Eu não vo fala mais nada - Leo.', tempo: 15},
	{_id: 10, texto:'Passando mó sufoco parado, pobre louco a marmita era 15 não tinha um real no bolso.', tempo: 20},

	];

api.lista = function(req, res) {

	setTimeout(function(){
		if(req.query.id) return res.json(frases[req.query.id]);

		res.json(frases);
	},1500);

};

module.exports = api;
