var header = document.querySelector('header');
var highScoresButton = document.querySelector('#high-scores-button');
var timer = document.querySelector('#timer');
var home = document.querySelector('#home');
var startButton = document.querySelector('#start');
var quiz = document.querySelector('#quiz');
var questionContainer = document.querySelector('#question');
var optionA1 = document.querySelector('#a1');
var optionA2 = document.querySelector('#a2');
var optionA3 = document.querySelector('#a3');
var optionA4 = document.querySelector('#a4');
var result = document.querySelector('#result');
var initialsInput = document.querySelector('#initials');
var highScoreForm = document.querySelector('#high-score-form');
var finalScore = document.querySelector('#final-score');
var submitButton = document.querySelector('#submit');
var scoreSheet = document.querySelector('#score-sheet');
var clearScoresButton = document.querySelector('#clear-scores');
var playAgainButton = document.querySelector('#play-again');
var highScoresList = document.querySelector('#high-scores');

var questions = [
    {
        question: 'JavaScript is a ________ Side Scripting Language.',
        a1: 'Server',
        a2: 'ISP',
        a3: 'Browser',
        a4: 'None of the above',
        answer: 'a3'
    },
    {
        question:"Which operator is used to assign a value to a variable?",
        a1: '-',
        a2: 'x',
        a3: '*',
        a4: '=', 
        answer: 'a4'
    },
    {
        question: 'What is the HTML tag under which one can write the JavaScript code?',
        a1: '<javascript>',
        a2: '<scripted>',
        a3: '<script>',
        a4: '<js>',
        answer: 'a3'
    },
        {
        question: 'What is the correct syntax for referring to an external script called “myjavascript.js”?',
        a1: '<script src=”myscript.js”>',
        a2: '<script href=”myscript.js”>',
        a3: '<script ref=”myscript.js”>',
        a4: '<script name=”myscript.js”>',
        answer: 'a1'
    },
    {
        question: 'What is the syntax for creating a function in JavaScript named as funkyFunc?',
        a1: 'function = funkyFunc()',
        a2: 'function funkyFunc()',
        a3: 'function := funkyFunc()',
        a4: 'function : funkyFunc()',
        answer: 'a2'
    },
    {
        question: ' What is the function that can be used to check if the number is an integer or not?',
        a1: 'Integer(value)',
        a2: 'ifInteger(value)',
        a3: 'isInteger(value)',
        a4: 'ifinteger(value',
        answer: 'a3'
    },

];


var secondsLeft = 50;
var qIndex = 0;
var highScoresArray = [];
var timerInterval;


function setTime() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if(secondsLeft <= 0) {
        secondsLeft = 0;
        timer.textContent = secondsLeft;
        gameOver();
        }
    }, 1000);
}

init();



function renderHighScores() {
    highScoresList.innerHTML = '';
    highScoresArray.sort();
    highScoresArray.reverse();
    for (var i = 0; i < highScoresArray.length; i++) {
        var highScore = highScoresArray[i];
    
        var li = document.createElement("li");
        li.textContent = highScore;
    
        highScoresList.appendChild(li);
    }
}


function init() {
    timer.textContent = secondsLeft;
    var storedHighScores = JSON.parse(localStorage.getItem('high-scores'));

    if (storedHighScores !== null) {
        highScoresArray = storedHighScores;
    }
    renderHighScores();
}


function storeHighScores() {
    localStorage.setItem('high-scores', JSON.stringify(highScoresArray));
}  


function popQuestion() {
    questionContainer.textContent = questions[qIndex].question;
    optionA1.textContent = questions[qIndex].a1;
    optionA2.textContent = questions[qIndex].a2;
    optionA3.textContent = questions[qIndex].a3;
    optionA4.textContent = questions[qIndex].a4;
}


function startQuiz() {
    qIndex = 0;
    secondsLeft = 50;
    home.style.display = 'none';
    quiz.style.display = 'block';
    setTime();
    popQuestion();
}


function rightOrWrong(event) {
    if (event.target.id === questions[qIndex].answer) {
        result.style.color = 'rgb(0, 250, 0)';
        result.textContent = 'Correct!';
    } else {
        result.style.color = 'rgb(250, 0, 0)';
        result.textContent = 'Wrong!';
        secondsLeft = secondsLeft - 5;
    }
    setTimeout(function() {
        result.textContent = '';
    }, 750);
}


function clickAnswer(event) {
    rightOrWrong(event);
    qIndex++;
    if (qIndex >= questions.length) {
        setTimeout(gameOver, 500);
    } else {
        setTimeout(popQuestion, 500);
    }
}


function gameOver() {
    clearInterval(timerInterval);
    quiz.style.display = 'none';
    finalScore.textContent = `Your score is: ${secondsLeft}`;
    highScoreForm.style.display = 'block';
}


function submitScore (event) {
    event.preventDefault();
    var userInitials = initialsInput.value.trim();
    if (userInitials === "") {
        return;
    }
    initialsInput.value = '';
    var userScore = `${secondsLeft} - ${userInitials}`;
    highScoresArray.push(userScore);
    renderHighScores();
    storeHighScores();
    highScoreForm.style.display = 'none';
    scoreSheet.style.display = 'block';
    header.style.display = 'none';
}


function playAgain() {
    qIndex = 0;
    secondsLeft = 60;
    timer.textContent = secondsLeft;
    scoreSheet.style.display = 'none';
    home.style.display = 'block';
    header.style.display = 'flex';
}

function clearScores() {
    highScoresList.innerHTML = '';
    highScoresArray = [];
    storeHighScores();
}

function seeHighScores() {
    clearInterval(timerInterval);
    home.style.display = 'none';
    quiz.style.display = 'none';
    highScoreForm.style.display = 'none';
    scoreSheet.style.display = 'block';
    header.style.display = 'none';
}

startButton.addEventListener('click', startQuiz);
optionA1.addEventListener('click', clickAnswer);
optionA2.addEventListener('click', clickAnswer);
optionA3.addEventListener('click', clickAnswer);
optionA4.addEventListener('click', clickAnswer);
submitButton.addEventListener('click', submitScore);
playAgainButton.addEventListener('click', playAgain);
clearScoresButton.addEventListener('click', clearScores);
highScoresButton.addEventListener('click', seeHighScores);
