
export function printDrawMsg(){ alert("Deu velha -_-"); }

export function printWinnerMsg(winner){
    alert("Vencedor: " + winner.toUpperCase());
}

export function defineMode(){
    return prompt(`Selecione o tipo de jogo
        1 - para jogar contra a ia 2 - para 2 jogadores`);
}
