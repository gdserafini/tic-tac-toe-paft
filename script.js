
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
function printDrawMsg(){ 
    finalMsg.textContent = "Deu velha -_-"; 
} 

function printWinnerMsg(player){
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

function definePlayer(){    
    if(Math.floor(Math.random() * 2) === 1) currentPlayer = X_PLAYER;
    else currentPlayer = O_PLAYER;
}

//verificações de vitório ou empate

function checksDraw(){
    let count = 0;
    for(let i = 0; i < 9; i++){
        if(plays[i] !== "") count++;
    }

    if(count >= 8) return true;
    else return false;
}

function isDraw(list){
    let count = 0;
    for(let i = 0; i < list.length; i++){
        if(list[i] !== "") count++;
    }
    if(count === 9) return true;
    return false;
}

function isWinPosition(base, list, item, occurrences){
    let count = 0;
    for(let i = 0; i < base.length; i++){
        if(list[base[i]] === item) count++;
    }
    if(count === occurrences) return true;
    else return false;
}

function win(base, list, item, occurrences = 3){
    for(let i = 0; i < base.length; i++){
        if(isWinPosition(base[i], list, item, occurrences)) return true;
    }
    return false;
}

function checksEnd(player = currentPlayer){
    if(isDraw(plays)) {
        printDrawMsg();
        end = true;
        return true;
    }
    if(win(winPositions, plays, player, 3)) {
        printWinnerMsg(player);
        end = true;
        return true;
    }
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
    element.target.textContent = currentPlayer;
    plays[getIndexOf(element)] = currentPlayer;
    if(!checksEnd()){
        swapPlayer();
    }
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

function playIa(element){
    if(end) return;
    if(!checksEnd(IA_PLAYER)){
        element.target.textContent = PLAYER;
        plays[getIndexOf(element)] = PLAYER;
    }

    if(!checksEnd(PLAYER)){
        const idIa = getRandomPosition();
        divElem[idIa].textContent = IA_PLAYER;
        plays[idIa] = IA_PLAYER;
    }
    if(end) return;
}

function playGame(click){
    divElem.forEach(elem => {
        elem.addEventListener("click", click, {once: true});
    });
}   

function startGame(){ 
    while(true){
        const mode = defineMode();

        if(mode == IA_MODE){
            currentPlayer = PLAYER;
            playGame(playIa);
            break;
        }
        else if(mode == TWOP_MODE){
            definePlayer();
            playGame(playTP);
            break;
        }
        else{
            alert("Número inválido, digite 1 ou 2.");
        }
    }
}

startGame();
