
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

//exibe a mensagem de vitória ou velha
function printFinalMsg(msg){
    finalMsg.textContent = msg;
    end = true;
    return true;
}

//define o modo
function defineMode(){
    return prompt(`Selecione o tipo de jogo
        1 - para jogar contra a ia 2 - para 2 jogadores`);
}

//compara e troca
function swapPlayer(){
    if(currentPlayer === X_PLAYER) currentPlayer = O_PLAYER;
    else currentPlayer = X_PLAYER;
}

//define no modo 2 players
function definePlayer(){    
    if(Math.floor(Math.random() * 2) === 1) currentPlayer = X_PLAYER;
    else currentPlayer = O_PLAYER;
}

/*  
    função genérica para verificar o número de ocorrências 
    de um item em uma lista com determinada comparação
*/
function getCountPlays(list, compare, size){
    let count = 0;
    for(let i = 0; i < size; i++){
        if(compare(list, i)) count++;
    }
    return count;
}

//verifica se o número máximo de jogada foi feito(antes verifica se alguem venceu)
function isDraw(list){
    if(getCountPlays(list, (list, i) => {
        return list[i] !== ""}, list.length) === 9) return true;
    return false;
}

//verifica se o número de posições do player nas posições de vitória somam 3
function isWinPosition(base, list, item, occurrences = 3){
    if(getCountPlays(list, (list, i) => {
        return list[base[i]] === item
    }, base.length) === occurrences) return true;
    else return false;
}

//verifica se cada lista da lista de posições de vitória da match
function isWin(base, list, item, occurrences = 3){
    for(let i = 0; i < base.length; i++){
        if(isWinPosition(base[i], list, item, occurrences)) return true;
    }
    return false;
}

//verifica se o jogo terminou dando velha ou algum vencedor
function checksEnd(player = currentPlayer){
    //confere se alguma combinação de vitória foi feita pelo player
    if(isWin(winPositions, plays, player)) {
        return printFinalMsg(`Vencedor: ${player.toUpperCase()}`);
    }
    if(isDraw(plays)) return printFinalMsg("Deu velha -_-");
    return false;
}

//retorna index de um elemeto de node list
function getIndexOf(element){
    //pega último digito da string id e retorna como int-1
    return parseInt(element.target.id.slice(1)) -1;
}

//verifica se acabou e joga
function playTP(element){
    if(end) return;
    playerPlay(element);
    if(!checksEnd()) swapPlayer();
}

//retorna um id de uma posição não jogada
function getRandomPosition(){
    let count = 0;
    while(true){
        const id = Math.floor(Math.random() * 9);
        if(plays[id] === "") return id;
        count++;
        if(count === 9) break;
    }
}

//jogada "tipo" ia
function iaPlay(){
    const idIa = getRandomPosition();
    divElem[idIa].textContent = IA_PLAYER;
    plays[idIa] = IA_PLAYER;
}

//jogada "tipo" jogador
function playerPlay(element, player = currentPlayer){
    //coloca texto no html
    element.target.textContent = player;
    //coloca texto nas posições jogadas
    plays[getIndexOf(element)] = player;
}

/*
    em cada iteração do laço 1° verifica se acabou para não poder jogar mais
    depois verifica se o currentPlayer venceu ou deu velha, se não o outro jogador joga
*/
function playIa(element){
    if(end) return;
    if(!checksEnd(IA_PLAYER)) { playerPlay(element, PLAYER); }
    if(!checksEnd(PLAYER)) { iaPlay(); }
    if(end) return;
}

/*
    passa por todos os elementos do (campos) - divs - adicionando clicks
    com o click é executado o "tipo" de click - ia ou 2 players
*/
function playGame(play){
    divElem.forEach(elem => {
        elem.addEventListener("click", play, {once: true});
    });
}  

/*
    starta o jogo selecionando o modo de jogo
    1 = ia, 2 = 2 players
    primeiro é definido o jogador para cada modo
    edepois xecuta playGame passando como parâmetro o modo de jogo
    também verifica se o número digitado está correto (1 ou 2)
*/
function startGame(){ 
    while(true){
        const mode = defineMode();

        if(mode == IA_MODE){
            //jogador começa
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
