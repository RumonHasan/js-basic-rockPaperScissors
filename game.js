const gameBoard = document.querySelector('[data-gameBoard]');
const humanChoiceElement = document.querySelector('[data-humanChoice]');
const computerChoiceElement = document.querySelector('[data-computer]');
const gameHeaderElement = document.querySelector('[data-gameHeader]');
const scoreElement = document.querySelector('[data-score]');

// globals 
let computerChoice;
let humanChoice;
let score = 0;
const emojis = [
    {
        text:'rock',
        icon: '🗿'
    },
    {
        text:'scissors',
        icon: '✂'
    },
    {
        text:'paper',
        icon: '📄'
    }
];

const scoreNumber = document.createElement('h1');
scoreNumber.classList.add('score-number');
scoreNumber.innerHTML = score;
scoreElement.appendChild(scoreNumber);

// fill the human choice
function displayHumanChoices(){
    emojis.forEach((emoji, index)=>{
        const {text, icon} = emoji;
        const emojiButton = document.createElement('button');
        emojiButton.textContent = icon;
        emojiButton.addEventListener('click', ()=>handleClickChoice(text, icon))
        emojiButton.classList.add('human-options');
        humanChoiceElement.appendChild(emojiButton);
    })
}
displayHumanChoices();

function generateComputerChoiceIndex(){
    return Math.floor(Math.random() * emojis.length);
}

function handleClickChoice(optionText, icon){
    const emojiButtons = document.querySelectorAll('.human-options');
    setActiveClasses(emojiButtons, icon);

    const computerChoiceIndex = generateComputerChoiceIndex();
    const computerChoice = emojis[computerChoiceIndex];
    displayComputerChoice(computerChoice);
    checkChoice(computerChoice, optionText);
}

// controlling active classes color
function setActiveClasses(emojiButtons, icon){
    emojiButtons.forEach((element)=>{
       if(element.textContent === icon){
           element.classList.add('active');
       }
       setTimeout(()=>{
           element.classList.remove('active');
       }, 2000);
    })
}

function displayComputerChoice(computerChoiceObject){
    while(computerChoiceElement.firstChild){
        computerChoiceElement.removeChild(computerChoiceElement.firstChild);
    }
    const computerChoice = document.createElement('div');
    computerChoice.textContent = computerChoiceObject.icon;
    computerChoice.classList.add('computer-emoji');
    computerChoiceElement.appendChild(computerChoice);
}

function increaseScore(){
    score += 10;
    const scoreElement = document.querySelector('.score-number');
    scoreElement.textContent = score;
}

function checkChoice(computerChoice, humanChoice){
    if(computerChoice.text === humanChoice){
        showGameMessage('Draw');
    }
    if(computerChoice.text === 'scissors' && humanChoice === 'rock'){
        showGameMessage('Winner');
        increaseScore();
    }
    if(computerChoice.text === 'scissors' && humanChoice === 'paper'){
        showGameMessage('Fuck You Loser');
    }
    if(computerChoice.text === 'paper' && humanChoice === 'rock'){
        showGameMessage('Fuck You Loser');
    }

    if(computerChoice.text === 'paper' && humanChoice === 'scissors'){
        showGameMessage('Winner');
        increaseScore();
    }
    if(computerChoice.text === 'rock' && humanChoice === 'scissors'){
        showGameMessage('Fuck You Loser');
    }

    if(computerChoice.text === 'rock' && humanChoice === 'paper'){
        showGameMessage('Winner');
        increaseScore();
    }
}

function showGameMessage(message){
    const gameHeaderTextElement = document.createElement('h1');
    gameHeaderTextElement.textContent = message;
    gameHeaderElement.appendChild(gameHeaderTextElement);
    setTimeout(()=>{
        gameHeaderElement.innerHTML = '';

    },2000);
}





