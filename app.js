const btnContainer = document.querySelector('.buttons-container');
// btnContainer.style.cssText = ' display: flex; justify-content:center; align-items-center;';
btnContainer.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'flex-wrap');
const audioPing = document.querySelector('.audio-ping');
const audioPong = document.querySelector('.audio-pong');
const scoreDisplay = document.querySelector('.score-display');
const playSound = document.querySelector('.play-sound');
const teacher = document.querySelector('.nadav-avatar');
const instructions = document.querySelector('.instructions');
const gotItBtn = document.querySelector('.got-it-btn');
const playC = document.querySelector('.c-reference');
const closeInstructions = document.querySelector('.close-instructions');
const instructionContainer = document.querySelector('.instructions-container');
const pointingFinger = document.querySelector('.finger');
let sounds = ['a','b','c','d','e','f','g'];
let soundButtons = [];
let randomSound = sounds[Math.floor(Math.random()*7)];
score = 0;
questionsCounter = 0;
scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;


function createSoundButtons(){
    for(let i=0; i<sounds.length; i++){
        let soundBtn = document.createElement('button');
        soundBtn.textContent = sounds[i];
        soundBtn.setAttribute('id', sounds[i]);
        soundBtn.classList.add('btn', 'btn-blue', 'mx-3', 'mt-3');
        soundButtons.push(soundBtn);
        btnContainer.appendChild(soundBtn);
    }
}

createSoundButtons();


//Proceed from initial instructions to play C
gotItBtn.addEventListener('click', ()=>{
    instructions.classList.add('d-none');
    gotItBtn.classList.add('d-none');
    playC.classList.remove('d-none');
    playC.classList.add('d-block');
    closeInstructions.classList.remove('d-none');
    closeInstructions.classList.add('d-block');

// PLay c and initialize training
closeInstructions.addEventListener('click', ()=>{
    audioPing.src= 'music/c.mp3';
    audioPing.play();
    setTimeout(initializeTraining, 2000);
    
});
});

//Close instructions container and point to strat training btn
function initializeTraining(){
    instructionContainer.classList.remove('d-flex');
    instructionContainer.classList.add('d-none');
    pointingFinger.classList.remove('d-none');
    pointingFinger.classList.add('d-block');

        //Start training
        playSound.addEventListener('click', playRandomSound);
        playSound.classList.add('scale-btn');
};


function playRandomSound(){

    //remove pointing finger
    pointingFinger.classList.remove('d-block');
    pointingFinger.classList.add('d-none');

    //Event listeners for buttons and keys are initialized only after 'start training' btn was pressed
    createEventListeners();
    document.addEventListener('keydown', control);

    //Generate random sound
    let randomSound = sounds[Math.floor(Math.random()*7)];
    console.log(randomSound);

    // set default avatar
    teacher.src = 'images/neutral.png';

    // play random sound
    audioPing.src = `music/${randomSound}.mp3`;
    audioPing.play();

    // Set default btn color
    for(let i=0; i<soundButtons.length; i++){
        soundButtons[i].classList.remove('btn-success', 'btn-danger');
        soundButtons[i].classList.add('btn-blue');
    }
    
    //set dynamic display of user score
    questionsCounter++
    scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;
}

// declare the event listeners for btns
function createEventListeners(){
    for(let i=0; i< soundButtons.length; i++){
        soundButtons[i].addEventListener('click', checkBtnAnswer);
    }

}

// Check user's answer submitted from buttons
function checkBtnAnswer(e){
    
    //Get and parse the source of the played sound
    let audioPingSplit = audioPing.src.split("");
    let playedSound = audioPingSplit.splice(audioPingSplit.length -5, 1).join("");

    //Get the user's answer
    let answer = e.target.innerText;
    let correspondingBtn = document.getElementById(answer);


    //Check if the sound played and user's answer match and react accordingly
    if(answer == playedSound){
        score++;
        scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;
        console.log('correct!');
        correspondingBtn.classList.remove('btn-blue');
        correspondingBtn.classList.add('btn-success');
        audioPong.src = "music/success.mp3";
        audioPong.play();

    }else{
        console.log('Wrong answer');
        correspondingBtn.classList.remove('btn-blue');
        correspondingBtn.classList.add('btn-danger');
        teacher.src = 'images/angry.png';
        audioPong.src = "music/fail.mp3";
        audioPong.play();
    }
    
    //After 1 second play another random sound
    setTimeout(playRandomSound, 1000);

}

//setting keycodes for the user to submit answer with the keybaord
function control(e){
    if(e.keyCode === 65){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 66){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 66){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 67){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 68){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 69){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 70){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 71){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
}

//Check the user's answer submitted through the keyboard. Works the same as checkBtnAnswer()
function checkKeyAnswer(answer){
    let audioPingSplit = audioPing.src.split("");
    let playedSound = audioPingSplit.splice(audioPingSplit.length -5, 1).join("");
    let correspondingBtn = document.getElementById(answer);
    if(answer == playedSound){
        score++;
        scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;
        console.log('correct!');
        correspondingBtn.classList.remove('btn-blue');
        correspondingBtn.classList.add('btn-success');
        audioPong.src = "music/success.mp3";
        audioPong.play();
    }else{
        console.log('Wrong answer');
        correspondingBtn.classList.remove('btn-blue');
        correspondingBtn.classList.add('btn-danger');
        teacher.src="images/angry.png";
        audioPong.src = "music/fail.mp3";
        audioPong.play();
    }
    setTimeout(playRandomSound, 1000);
}
