const key = "8169e0417e6393370a7f98964c0fd890"

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function normalizar(texto) {
    return removerAcentos(texto).toLowerCase().trim()
}

function colocarDadosNaTela(dados) {
    document.querySelector("h2").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".previsao").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"
    document.querySelector(".imagem-nuvem").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
    console.log(dados)
  }  

async function geocodificar(nome, limite = 1) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(nome)},BR&limit=${limite}&appid=${key}`
    return fetch(url).then(r => r.json())
}

async function achaCidade(cidade) {
    let geo = await geocodificar(cidade)
    if (geo.length) return geo[0]

    geo = await geocodificar(removerAcentos(cidade))
    if (geo.length) return geo[0]

    const palavras = cidade.split(/\s+/)
    const tentativas = [
        palavras.slice(-2).join(" "),
        palavras.slice(0, 2).join(" ")
    ]

    for (const termo of tentativas) {
        const resultados = await geocodificar(termo, 5)
        const achou = resultados.find(r => normalizar(r.name) === normalizar(cidade))
        if (achou) return achou
    }

    return null
}

async function buscarCidade(cidade) {
    cidade = cidade.trim()
    if (!cidade) return

    const local = await achaCidade(cidade)

    if (!local) {
        alert("Cidade não encontrada!")
        return
    }

    const { lat, lon, name } = local

    const dados = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=pt_br&units=metric`
    ).then(r => r.json())

    dados.name = name
    colocarDadosNaTela(dados)
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value
    buscarCidade(cidade)
}

// Script.js antigo: ele validava nome com ou sem (Acento) caso a cidade tivesse mais de 1 acento e o cliente colocasse uma palavra com e a outra 
//sem dava o erro pois a cidade não era encontrada com a ajuda da IA e lando, entendo que se adicionar outras condições resolveria esté problema.

//Exemplo: (São Luís)
//----------São Luis-------Com isso gera o erro, outra questão foi Maisuscula é Minuscula, resolvida nesse no Script.js

//const key = "8169e0417e6393370a7f98964c0fd890"

//function removerAcentos(texto){
    //return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}



//function colocarDadosNaTela(dados) {
  //  document.querySelector("h2").innerHTML = "Tempo em " + dados.name
  //  document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C"
  //  document.querySelector(".previsao").innerHTML = dados.weather[0].description
  //  document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"
  //  document.querySelector(".imagem-nuvem").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
  //  console.log(dados)}


//async function buscarCidade(cidade){

  //  const cidadeCodificada = encodeURIComponent(cidade.trim())

    //const dados = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cidadeCodificada},BR&appid=${key}&lang=pt_br&units=metric`).then(resposta=> resposta.json())
    
    //colocarDadosNaTela(dados)}

//function cliqueiNoBotao(){

  //const Cidade = document.querySelector(".input-cidade").value

//buscarCidade(Cidade)}