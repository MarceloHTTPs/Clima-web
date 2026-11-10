const key = "8169e0417e6393370a7f98964c0fd890"

function colocarDadosNaTela(dados) {
    document.querySelector("h2").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".previsao").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"
    document.querySelector(".imagem-nuvem").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
    console.log(dados)
}


async function buscarCidade(cidade){

    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=${key}&lang=pt_br&units=metric`).then(resposta=> resposta.json())
    
     colocarDadosNaTela(dados)
    
    
}

function cliqueiNoBotao(){

  const Cidade = document.querySelector(".input-cidade").value

buscarCidade(Cidade)

}