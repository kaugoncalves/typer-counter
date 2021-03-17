$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);



//requisição no backend para pegar as frases
function fraseAleatoria() {
    $("#spinner").toggle();
    $(".frase").toggle();
    $.get("/frases/", trocaFraseAleatoria).
    fail(function(){ //se der erro

        $("#erro").toggle();
        setTimeout(() => {
            $("#erro").toggle();
        }, 5000);
        
    }).always(function(){ //pega depois que termina a requisição
        $(".frase").toggle();
        $("#spinner").toggle();
    });
}


function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

//arquivo frase.js
function buscaFrase() {

    $("#spinner").toggle();
    $(".frase").toggle();
    var fraseId = $("#frase-id").val();

    var dados = {id : fraseId}; //criacao do objeto JS que guarda a id

    //passando objeto como segundo parâmetro
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },2000);
    })
    .always(function(){
        $("#spinner").toggle();
        $(".frase").toggle();
    });
}

//arquivo frase.js
function trocaFrase(data) {

    console.log(data);

    var frase = $(".frase");
    frase.text(data.texto); //cuidado, texto com "o" no final 
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}
