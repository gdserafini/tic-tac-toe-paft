
let currentPlayer;
let end = false;
const IA_MODE = 1; 
const TWOP_MODE = 2;
const X_PLAYER = "x"; 
const O_PLAYER = "o";
const IA_PLAYER = X_PLAYER;
const PLAYER = O_PLAYER;
let plays = ["","","","","","","","",""];
const winPositions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];
const divElem = document.querySelectorAll(".div-elem");
const finalMsg = document.querySelector("#finalmsg");

//mensagens finais
function drawMsg(player){ 
    finalMsg.textContent = "Deu velha -_-"; 
} 

function winnerMsg(player){
    finalMsg.textContent = `Vencedor: ${player}`;
}

//definiçoes de jogo
function defineMode(){
    return prompt(`Selecione o tipo de jogo
        1 - para jogar contra a ia 2 - para 2 jogadores`);
}

function swapPlayer(){
    if(currentPlayer === X_PLAYER) currentPlayer = O_PLAYER;
    else currentPlayer = X_PLAYER;
}

function definePlayer(mode){    
    if(mode === 1) currentPlayer = PLAYER;
    else{
        if(Math.floor(Math.random() * 2) === 1) currentPlayer = X_PLAYER;
        else currentPlayer = O_PLAYER;
    }
}

//verificações de vitório ou empate
function getCountPlays(list, compare, size){
    let count = 0;
    for(let i = 0; i < size; i++){
        if(compare(list, i)) count++;
    }
    return count;
}

function isDraw(list){
    if(getCountPlays(list, (list, i) => {
        return list[i] !== ""}, list.length) === 9) return true;
    return false;
}

function isWinPosition(base, list, item, occurrences = 3){
    if(getCountPlays(list, (list, i) => {
        return list[base[i]] === item
    }, base.length) === occurrences) return true;
    else return false;
}

function isWin(base, list, item, occurrences = 3){
    for(let i = 0; i < base.length; i++){
        if(isWinPosition(base[i], list, item, occurrences)) return true;
    }
    return false;
}

function printFinalMsg(functionMsg, player = currentPlayer){
    functionMsg(player);
    end = true;
    return true;
}

function checksEnd(player = currentPlayer){
    if(isDraw(plays)) return printFinalMsg(drawMsg);
    if(isWin(winPositions, plays, player, 3)) return printFinalMsg(winnerMsg, player);
    return false;
}

function getIndexOf(element){
    let id = element.target.id;
    return parseInt(id.slice(1)) - 1;
}

//loop de jogo
//2 jogadores
function playTP(element){
    if(end) return;
    playerPlay(element);
    if(!checksEnd()) swapPlayer();
}

//ia
function getRandomPosition(){
    let count = 0;
    while(true){
        const id = Math.floor(Math.random() * 9);
        if(plays[id] === "") return id;
        count++;
        if(count === 9) break;
    }
}

function iaPlay(){
    const idIa = getRandomPosition();
    divElem[idIa].textContent = IA_PLAYER;
    plays[idIa] = IA_PLAYER;
}

function playerPlay(element, player = currentPlayer){
    element.target.textContent = player;
    plays[getIndexOf(element)] = player;
}

function playIa(element){
    if(end) return;
    if(!checksEnd(IA_PLAYER)) { playerPlay(element, PLAYER); }
    if(!checksEnd(PLAYER)) { iaPlay(); }
    if(end) return;
}

function playGame(play){
    divElem.forEach(elem => {
        elem.addEventListener("click", play, {once: true});
    });
}  

function startGame(){ 
    while(true){
        const mode = defineMode();

        if(mode == IA_MODE){
            definePlayer(mode);
            playGame(playIa);
            break;
        }
        else if(mode == TWOP_MODE){
            definePlayer(mode);
            playGame(playTP);
            break;
        }
        else{
            alert("Número inválido, digite 1 ou 2.");
        }
    }
}

startGame();
