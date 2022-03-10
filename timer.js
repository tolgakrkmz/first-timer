const startButtonElement = document.getElementById('start-button').addEventListener('click', handleStartButton)
const stopButtonElement = document.getElementById('stop-button').addEventListener('click', handleStopButton)
const pauseButtonElement = document.getElementById('pause-button').addEventListener('click', handlePauseButton)
const saveButtonElement = document.getElementById('save-button').addEventListener('click', handleSaveButton)
const listElement = document.getElementById('list') 
const timeElement = document.getElementById('time'); 
const titleInputElement = document.getElementById('title-input'); 

let seconds = 1;
let intervalID;

timeElement.innerText = formatHours(seconds);

function handleSecondsInterval() {
    seconds++;
    timeElement.innerText = formatHours(seconds);
}

function handleStartButton() {
    clearInterval(intervalID);
    intervalID = setInterval(handleSecondsInterval, 1000);
}

function handleStopButton() {
    seconds = 1;
    timeElement.innerText = formatHours(seconds);
    clearInterval(intervalID);
}

function handlePauseButton() {
    clearInterval(intervalID);
    timeElement.innerText = formatHours(seconds);
}

function formatHours(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((totalSeconds % 3600) % 60);

    return String(hours).padStart(2, '0') + ':'
         + String(minutes).padStart(2, '0') + ':'
         + String(seconds).padStart(2, '0');
}

function handleSaveButton() {
    // STEP 1: Create list item.
    const listItemElement = document.createElement('li');

    // STEP 2: Create list item text.
    const currentTime = formatHours(seconds);
    const titleText = titleInputElement.value;
    let listItemText = currentTime;

    if (titleText.length > 0) {
        listItemText = `${titleText} - ${currentTime}`;
        titleInputElement.value = '';
    }

    listItemElement.appendChild(document.createTextNode(listItemText));

    // STEP 3: Create remove button.
    const handleRemoveButton = document.createElement('button');

    handleRemoveButton.innerText = 'Remove';
    handleRemoveButton.addEventListener('click', function () {
        listItemElement.remove();
    });

    listItemElement.appendChild(handleRemoveButton);

    // STEP 4: Add list item to list.
    listElement.appendChild(listItemElement);
};

titleInputElement.addEventListener('keyup', function (event) {
    event.preventDefault();

    if (event.code === 'Enter') {
        handleSaveButton()
    }
})