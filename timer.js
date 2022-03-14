const startButtonElement = document.getElementById('start-button').addEventListener('click', handleStartButton);
const stopButtonElement = document.getElementById('stop-button').addEventListener('click', handleStopButton);
const pauseButtonElement = document.getElementById('pause-button').addEventListener('click', handlePauseButton);
const saveButtonElement = document.getElementById('save-button').addEventListener('click', handleSaveButton);
const listElement = document.getElementById('list');
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

    // STEP 2: Create list item title.
    let titleText = titleInputElement.value;
    let titleSpanElement = document.createElement('span');
    let separatorSpanElement = document.createElement('span');

    titleSpanElement.appendChild(document.createTextNode(titleText));
    listItemElement.appendChild(titleSpanElement);
    listItemElement.appendChild(separatorSpanElement);

    // STEP 3: Create list item time.
    const currentTime = formatHours(seconds);
    let listItemText = currentTime;

    if (titleText.length > 0) {
        listItemText = ` - ${currentTime}`
        titleInputElement.value = '';
    }

    listItemElement.appendChild(document.createTextNode(listItemText));

    // STEP 4: Create 'Input' field for title.
    const textInputBox = document.createElement('input');
    textInputBox.setAttribute('type', 'text');

    // STEP 5: Create 'Edit' button.  
    const titleEditButton = document.createElement('button');
    titleEditButton.innerText = 'Edit';
    titleEditButton.addEventListener('click', function () {
        textInputBox.value = titleSpanElement.innerText;
        titleSpanElement.replaceWith(textInputBox);

        if (textInputBox.value.length === 0) {
            separatorSpanElement.innerText = ' - ';
        }

        titleEditButton.replaceWith(titleSaveButton);
    });

    listItemElement.appendChild(titleEditButton);

    // STEP 6: Create 'Save' button.
    const titleSaveButton = document.createElement('button');
    titleSaveButton.innerText = 'Save';
    titleSaveButton.addEventListener('click', function () {
        titleSpanElement.innerText = textInputBox.value;
        textInputBox.replaceWith(titleSpanElement);

        if (textInputBox.value.length === 0) {
            separatorSpanElement.innerText = '';
        }

        titleSaveButton.replaceWith(titleEditButton);
    });

    // STEP 7: Create 'Remove' button.
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', function () {
        listItemElement.remove();
    });

    listItemElement.appendChild(removeButton);

    // STEP 8: Add list item to list.
    listElement.appendChild(listItemElement);
};

// Press Enter to Submit input.
titleInputElement.addEventListener('keyup', function (event) {
    event.preventDefault();

    if (event.code === 'Enter') {
        handleSaveButton()
    }
});