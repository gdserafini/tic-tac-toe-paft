
import {
    printDrawMsg, 
    printWinnerMsg,
    defineMode
} from './functions.mjs';

let currentPlayer;
const ia = 1; //modos
const twoPlayers = 2;
const Xplayer = "x"; //joadores
const Oplayer = "o";
const winPositions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];
const player = Xplayer;
const iaPlayer = Oplayer;
//9 divElem do campo
const divElem = document.querySelectorAll("[div-elem]");
const gameBoard = document.querySelector("[board]");
const buttomRestart = document.querySelector("[buttom]");

function swapPlayer(){
    if(currentPlayer === Xplayer) currentPlayer = Oplayer;
    else currentPlayer = Xplayer;
}

function isDraw(){
    return [...divElem].every(elem => {
        return elem.classList.contains(Xplayer) || 
            elem.classList.contains(Oplayer);
    });
}

function win(currentPlayer){
    return winPositions.some(c => {
        return c.every(i => {
            return divElem[i]
                .classList
                .contains(currentPlayer);
        });
    });
}

//se o modo for 2 jogadores define o primeiro aleatóriamente
function definePlayer(){    
    if(Math.floor(Math.random() * 2) === 1) currentPlayer = Xplayer;
    else currentPlayer = Oplayer;
}

function checksEnd(){
    if(isDraw()) printDrawMsg();
    else if(win(currentPlayer)) printWinnerMsg(currentPlayer);
}

//coloca o "desenho" do jogador no campo
function click(element){
    element.target.classList.add(currentPlayer);
    checksEnd();
    swapPlayer();
}

function play(element){
    element.addEventListener("click", click, {once: true});
}

//cada iteração do forEach executa uma jogada de um jogador
//e altera o jogador
function playTwoPlayers(){
    divElem.forEach(elem => { play(elem); });
}

function restartClick(){
    //limpa o campo
    startGame();
}

//se precionar o botão o campo é limpo e é possível jogar novamente
function restartGame(){
    buttomRestart.addEventListener("click", restartClick);
}

function iaClick(){
    //algoritmo de jogada da ia
    checksEnd();
    swapPlayer();
}

function playIaMode(){
    element.addEventListener(/* outros parâmentros, iaClicl */);
}

function playIa(element){
    if(currentPlayer === player){ play(element); }
    else{ playIaMode(element); }
}

//jogadas do jogador e ia alternadas
function playWithIa(){
    currentPlayer = player;
    divElem.forEach(elem => { playIa(elem); });
}

function startGame(){ 
    while(true){
        const mode = defineMode();

        if(mode == ia){
            //playWithIa();
            break;
        }
        else if(mode == twoPlayers){
            definePlayer();
            playTwoPlayers();
            break;
        }
        else{
            alert("Número inválido, digite 1 ou 2.");
        }
    }
}

startGame();
//restartGame();
