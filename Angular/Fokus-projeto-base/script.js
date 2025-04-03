const html = document.querySelector("html");
const focoBt =document.querySelector('.app__card-button--foco');
const curtoBt =document.querySelector('.app__card-button--curto');
const longoBt =document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const somTempoEsgotado = new Audio('sons/beep.mp3');
const somPause = new Audio('sons/pause.mp3');
const somPlay = new Audio('sons/play.wav');
let tempoDecorridoEmSegundos = 1500; // 25 minutos
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change',() =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500; // 25 minutos
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300; // 5 minutos
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})
longoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900; // 15 minutos
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto){
    mostrarTempo();
    zerar();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);

    switch(contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?,<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.,<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        
        default:
            console.error('Contexto inválido');
            break;
    }
}

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos <= 0){
        //somTempoEsgotado.play();
        alert('Tempo esgotado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -=1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        somPause.play();
        zerar();
        return;
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtIcone.setAttribute('src', 'imagens/pause.png');
    iniciarOuPausarBt.textContent = "Pausar";
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBtIcone.setAttribute('src', 'imagens/play_arrow.png');
    iniciarOuPausarBt.textContent = "Começar";
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br',{minute:'2-digit', second:'2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
