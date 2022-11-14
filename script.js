
let currentPlayer;
const IA_MODE = 1; 
const TWOP_MODE = 2;
const X_PLAYER = "x"; 
const O_PLAYER = "o";
let plays = ["","","","","","","","",""];
const winPositions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];
const divElem = document.querySelectorAll(".div-elem");
const buttomRestart = document.querySelector("#buttom-restart");
const finalMsg = document.querySelector("#finalmsg");

//mensagens finais
function printDrawMsg(){ 
    finalMsg.textContent = "Deu velha -_-"; 
}

function printWinnerMsg(){
    finalMsg.textContent = `Vencedor: ${currentPlayer}`;
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

function checksEnd(){
    if(isDraw(plays)) printDrawMsg();
    if(win(winPositions, plays, currentPlayer, 3)) printWinnerMsg();
}

function getIndexOf(element){
    let id = element.target.id;
    return parseInt(id.slice(1)) - 1;
}

//loop de jogo
//2 jogadores
function click(element){
    element.target.textContent = currentPlayer;
    plays[getIndexOf(element)] = currentPlayer;
    console.log(plays);
    checksEnd();
    swapPlayer();
}

function play(element){
    element.addEventListener("click", click, {once: true});
}

function playTwoPlayers(){
    divElem.forEach(elem => { play(elem); });
}

function clearPosition(element){
    element.textContent = "";
}
//ia
function playWithIa(){

}

//restart

function clearPlays(){
    for(let i = 0; i < plays.length; i++){
        plays[i] = "";
    }
}

function restartClick(){
    divElem.forEach(d => clearPosition(d));
    clearPlays();
    finalMsg.textContent = "";
    startGame();
}

function restartGame(){
    buttomRestart.addEventListener("click", restartClick);
}

function startGame(){ 
    while(true){
        const mode = defineMode();

        if(mode == IA_MODE){
            //playWithIa();
            break;
        }
        else if(mode == TWOP_MODE){
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
restartGame();
