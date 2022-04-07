const startButtonElement = document.getElementById('start-button').addEventListener('click', handleStartButton);
const stopButtonElement = document.getElementById('stop-button').addEventListener('click', handleStopButton);
const pauseButtonElement = document.getElementById('pause-button').addEventListener('click', handlePauseButton);
const saveButtonElement = document.getElementById('save-button').addEventListener('click', handleSaveButton);
const listElement = document.getElementById('list');
const timeElement = document.getElementById('time');
const titleInputElement = document.getElementById('title-input');
const descriptionField = document.getElementById('textArea-input');

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

let listState = [];
let detailsContainer;

if (localStorage.getItem('list')) {
    listState = JSON.parse(localStorage.getItem('list'));

    // Setup initial list items.
    for (const listItem of listState) {
        addItemToDOM(listItem);
    }
}

function addItemToDOM(listItem) {
    // STEP 1: Reset value of input elements.
    descriptionField.value = '';
    titleInputElement.value = '';

    // STEP 2: Create list item.
    const listItemElement = document.createElement('li');

    // STEP 3: Create list item title.
    const titleSpanElement = document.createElement('span');
    const separatorSpanElement = document.createElement('span');

    titleSpanElement.appendChild(document.createTextNode(listItem.title));
    listItemElement.appendChild(titleSpanElement);
    listItemElement.appendChild(separatorSpanElement);

    if (listItem.title.length > 0) {
        separatorSpanElement.innerText = ' - ';
    }

    // STEP 4: Create list item time.
    listItemElement.appendChild(document.createTextNode(formatHours(seconds)))

    // STEP 5: Create 'Input' field for title.
    const textInputBox = document.createElement('input');
    textInputBox.setAttribute('type', 'text');

    // STEP 6: Create 'Edit' button.
    const titleEditButton = document.createElement('button');
    titleEditButton.innerText = 'Edit';
    titleEditButton.addEventListener('click', function () {
        textInputBox.value = listItem.title;
        titleSpanElement.replaceWith(textInputBox);

        if (textInputBox.value.length === 0) {
            separatorSpanElement.innerText = ' - ';
        }

        titleEditButton.replaceWith(titleSaveButton);
    });

    listItemElement.appendChild(titleEditButton);

    // STEP 7: Create 'Save' button in Edit state.
    const titleSaveButton = document.createElement('button');
    titleSaveButton.innerText = 'Save';
    titleSaveButton.addEventListener('click', function () {
        listItem.title = textInputBox.value;
        localStorage.setItem('list', JSON.stringify(listState));

        titleSpanElement.innerText = listItem.title;

        if (listItem.title === 0) {
            separatorSpanElement.innerText = '';
        }

        textInputBox.replaceWith(titleSpanElement);
        titleSaveButton.replaceWith(titleEditButton);
    });

    // STEP 8: Create a 'Details' button.
    const detailsButton = document.createElement('button');
    detailsButton.innerText = 'Details';

    detailsButton.addEventListener('click', function () {
        // STEP 1: Handle already shown item.
        const shownItem = listState.find(listItem => listItem.isDetailsShown);

        if (shownItem !== undefined && shownItem !== listItem) {
            detailsContainer.remove();
            shownItem.isDetailsShown = false;
        }

        // STEP 2: Handle currently clicked item.
        if (!listItem.isDetailsShown) {
            detailsContainer = document.createElement('div');

            const lineSeparator = document.createElement('hr');
            detailsContainer.appendChild(lineSeparator);

            const titleParagraphElement = document.createElement('p');
            titleParagraphElement.innerText = `Title: ${listItem.title}`;
            detailsContainer.appendChild(titleParagraphElement);

            const descriptionParagraphElement = document.createElement('p');
            descriptionParagraphElement.innerText = `Description: ${listItem.description}`;
            detailsContainer.appendChild(descriptionParagraphElement);

            const timeParagraphElement = document.createElement('p');
            timeParagraphElement.innerText = `Time: ${formatHours(listItem.time)}`;
            detailsContainer.appendChild(timeParagraphElement);

            document.body.appendChild(detailsContainer);

        } else {
            detailsContainer.remove();
        }

        listItem.isDetailsShown = !listItem.isDetailsShown;
    });

    listItemElement.appendChild(detailsButton);

    // STEP 9: Create 'Remove' button.
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', function () {
        const idx = listState.indexOf(listItem);

        if (idx > -1) {
            listState.splice(idx, 1);
            localStorage.setItem('list', JSON.stringify(listState));
        }

        listItemElement.remove();
    });

    listItemElement.appendChild(removeButton);

    // STEP 10: Add list item to list.
    listElement.appendChild(listItemElement);
}

function handleSaveButton() {
    // STEP 1: Apply to State.
    let listItem = {
        title: titleInputElement.value,
        time: seconds,
        description: descriptionField.value,
        isDetailsShown: false,
    };

    listState.push(listItem);

    // STEP 2: Persist to localStorage.
    localStorage.setItem('list', JSON.stringify(listState));

    // STEP 3: Add list item to DOM.
    addItemToDOM(listItem);
}

// Press Enter to Submit input.
titleInputElement.addEventListener('keyup', function (event) {
    event.preventDefault();

    if (event.code === 'Enter') {
        handleSaveButton();
    }
});

descriptionField.addEventListener('keyup', function (event) {
    event.preventDefault();

    if (event.code === 'Enter') {
        handleSaveButton();
    }
});