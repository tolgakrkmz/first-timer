const startButtonElement = document.getElementById('start-button').addEventListener('click', handleStartButton)
const stopButtonElement = document.getElementById('stop-button').addEventListener('click', handleStopButton)
const pauseButtonElement = document.getElementById('pause-button').addEventListener('click', handlePauseButton)
const time = document.getElementById('time');
const listsElement = document.querySelector('lists');

let number = 3600;
let intervalID;

time.innerText = formatSecondsToHHMMSS();

function handleSecondsInterval() {
    number++;
    time.innerText = formatSecondsToHHMMSS(number);
}

function handleStartButton() { 
    clearInterval(intervalID);
    intervalID = setInterval(handleSecondsInterval, 1000);
}

function handleStopButton() {
    number = 1;
    time.innerText = formatSecondsToHHMMSS(number);
    clearInterval(intervalID);
}

function handlePauseButton() {
    clearInterval(intervalID);
    time.innerText = formatSecondsToHHMMSS(number);
}

function formatSecondsToHHMMSS(time) {
    d = Number(number);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    if (h < 10) {h = "0"+h;}
    if (m < 10) {m = "0"+m;}
    if (s < 10) {s = "0"+s;}

    return h+':'+m+':'+s;
}






    




// TODO: will be used for list
// function timeToList() {
//     let firstNumber = document.createElement('li');

//     if (document.getElementById('stop-button').clicked == true) {
//         firstNumber.innerText = numbers;
//     }
// }



