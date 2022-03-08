//create html file and connect with js - done
//create a button 'start' // eventListener - done
//create a function which count a numbers- done
//connect func with button in DOM - done

 let startButton = document.getElementById('start-button').addEventListener('click', start)
 let stopButton = document.getElementById('stop-button').addEventListener('click', stop)
 let pauseButton = document.getElementById('pause-button').addEventListener('click', pause)
 let countNumber = document.getElementById('number');
 let allLists = document.querySelector('lists');

 var numbers = 0;
 var counted;

function seconds() {
    numbers++;
    countNumber.innerText = numbers;
}

function start() {
    counted = setInterval(seconds, 1500);
}

function stop() {
    countNumber.innerText = "0";
    clearInterval(counted);
    numbers = 0;
}

function pause() {
    clearInterval(counted);
    countNumber.innerText = numbers;
    

}

// function timeToList() {
//     let firstNumber = document.createElement('li');

//     if (document.getElementById('stop-button').clicked == true) {
//         firstNumber.innerText = numbers;
//     }
// }



