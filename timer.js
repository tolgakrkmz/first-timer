const startButtonElement = document.getElementById('start-button').addEventListener('click', handleStartButton)
const stopButtonElement = document.getElementById('stop-button').addEventListener('click', handleStopButton)
const pauseButtonElement = document.getElementById('pause-button').addEventListener('click', handlePauseButton)
const saveButtonElement = document.getElementById('save-button').addEventListener('click', handleSaveButton) 
const ulElement = document.getElementById("ulElement")
const time = document.getElementById('time');
const inputElement = document.getElementById('getTittle');

let seconds = 1;
let intervalID;

time.innerText = formatHours(seconds);

function handleSecondsInterval() {
    seconds++;
    time.innerText = formatHours(seconds);
}

function handleStartButton() { 
    clearInterval(intervalID);
    intervalID = setInterval(handleSecondsInterval, 1000);
}

function handleStopButton() {
    seconds = 1;
    time.innerText = formatHours(seconds);
    clearInterval(intervalID);
}

function handlePauseButton() {
    clearInterval(intervalID);
    time.innerText = formatHours(seconds);
}

function formatHours(totalSeconds) { 
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((totalSeconds % 3600) % 60);

    return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(totalSeconds).padStart(2, '0');
}

function handleSaveButton() {
    const catchTextFromInput = inputElement.value;
    const listElement  = document.createElement('li');
    listElement.appendChild(document.createTextNode(formatHours(seconds)));
    listElement.prepend(document.createTextNode(catchTextFromInput));
    ulElement.appendChild(listElement);
    inputElement.value = '';


}
