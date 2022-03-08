const startButtonElement = document.getElementById('start-button').addEventListener('click', handleStartButton)
const stopButtonElement = document.getElementById('stop-button').addEventListener('click', handleStopButton)
const pauseButtonElement = document.getElementById('pause-button').addEventListener('click', handlePauseButton)
const numberElement = document.getElementById('number');
const listsElement = document.querySelector('lists');

let seconds = 1;
let intervalID;

numberElement.innerText = seconds;

function handleSecondsInterval() {
    seconds++;
    numberElement.innerText = seconds;
}

function handleStartButton() { 
    clearInterval(intervalID);
    intervalID = setInterval(handleSecondsInterval, 1000);
}

function handleStopButton() {
    seconds = 1;
    numberElement.innerText = seconds;
    clearInterval(intervalID);
}

function handlePauseButton() {
    clearInterval(intervalID);
    numberElement.innerText = seconds;
}

// TODO: will be used for list
// function timeToList() {
//     let firstNumber = document.createElement('li');

//     if (document.getElementById('stop-button').clicked == true) {
//         firstNumber.innerText = numbers;
//     }
// }



