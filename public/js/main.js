var tempoInicial = $("#tempo-digitacao").text();
var campoDigitacao = $(".campo-digitacao");
campoDigitacao.val("");

$(document).ready(function(){

    var ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        vKey = 86,
        cKey = 67;

    $(document).keydown(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
    }).keyup(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
    });

    campoDigitacao.keydown(function(e) {
        if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) return false;
    });
    
    // Document Ctrl + C/V 
    $(document).keydown(function(e) {
        if (ctrlDown && (e.keyCode == cKey)) alert("Sem rataria, minha vida");
        if (ctrlDown && (e.keyCode == vKey)) alert("Sem rataria, minha vida");
    });

    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();

    inicializaMarcadores();
    atualizaPlacar();
    
    $("#botao-reiniciar").click(reiniciaJogo);
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
    $(".tooltip").tooltipster();
})


function atualizaTamanhoFrase () {

    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    
    tamanhoFrase.text(numPalavras);
}


function inicializaContadores(){

    campoDigitacao.on("input", function(){
        var conteudo = campoDigitacao.val();
        var qtdConteudo = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdConteudo);
    
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}


function inicializaCronometro() {

    campoDigitacao.one("focus", function(){
        var tempoRestante = $("#tempo-digitacao").text();
        var frase = $(".frase").text();
        
        
        $("#botao-reiniciar").attr("disabled",true);
        $("#botao-frase").attr("disabled", true);
        $("#botao-frase-id").attr("disabled", true);

        

        var cronometroID = setInterval(function(){
            var digitado = campoDigitacao.val();
            console.log(digitado + " <- DIGITADO FRASE -> " + frase)
            if(digitado === frase)
            {
                $("#botao-reiniciar").attr("disabled",false);
                $("#botao-frase").attr("disabled", false);
                $("#botao-frase-id").attr("disabled", false);
                clearInterval(cronometroID);
                console.log("TTERMINOU")
            }

            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);                
                
            if(tempoRestante < 1)
            {
                $("#botao-reiniciar").attr("disabled",false);
                $("#botao-frase").attr("disabled", false);
                $("#botao-frase-id").attr("disabled", false);
                clearInterval(cronometroID);
                finalizaJogo();
            }
            
        }, 1000)
    });
}

function finalizaJogo(){

    campoDigitacao.attr("disabled", true); 
    campoDigitacao.removeClass("campo-errado");
    campoDigitacao.removeClass("campo-correto");          
    campoDigitacao.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {

    campoDigitacao.on("input", function() {
        var frase = $(".frase").text();
        var digitado = campoDigitacao.val();
        var comparavel = frase.substr(0 , digitado.length);

        if(digitado == comparavel) {
            campoDigitacao.addClass("campo-correto");
            campoDigitacao.removeClass("campo-errado");
        } 
        else {
            campoDigitacao.addClass("campo-errado");
            campoDigitacao.removeClass("campo-correto");
        }

        if(digitado == frase)
        finalizaJogo();
    });
}

function atualizaTempoInicial(tempo){

    $("#tempo-digitacao").text(tempo)
    tempoInicial = tempo;

}



function reiniciaJogo() {

    campoDigitacao.attr("disabled", false);
    campoDigitacao.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaContadores();
    inicializaCronometro();
    campoDigitacao.toggleClass("campo-desativado");
    campoDigitacao.removeClass("campo-errado");
    campoDigitacao.removeClass("campo-correto");
}