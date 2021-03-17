$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);
var tempoInicial = $("#tempo-digitacao").text();

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();

    
    var numPalavras = $("#contador-palavras").text();
    var tempoRestante = $("#tempo-digitacao").text();
    var tempoDivisao = tempoInicial - tempoRestante;

    console.log(numPalavras + " / " + tempoDivisao)
    var ppm = numPalavras / tempoDivisao;


    var frase = $(".frase").text();
    var digitado = campoDigitacao.val();

    if(digitado == frase)
    {
        var linha = novaLinha(usuario, ppm.toFixed(2));
        linha.find(".botao-remover").click(removeLinha);

        corpoTabela.append(linha);
        $(".placar").slideDown(500);
        scrollPlacar(); 
    }
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("html, body").animate(
    {
        scrollTop: posicaoPlacar
    }, 500);
}

function novaLinha(usuario, numPalavras){
    
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras)
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").addClass("purple-text").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(){

    event.preventDefault();
    var linha =  $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove(); 
    }, 1000); 


}

function mostraPlacar(){
    $(".placar").stop().slideToggle(600);
    scrollPlacar();
}

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score ={
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });
    var dados = {
        placar: placar
    };

    $.post("/placar", dados , function() {
        $("#botao-sync").tooltipster("open"); 
    }).fail(function(){
        $("#botao-sync").tooltipster("open").tooltipster("content", "Falha ao sincronizar"); 
    }).always(function(){ //novo
        setTimeout(function() {
        $("#botao-sync").tooltipster("close"); 
    }, 1200);
    });
}

function atualizaPlacar(){

    $.get("/placar", function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        })
        
    })
}