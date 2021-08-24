var questions; 
var count, score, scorePercentage, answer; 
var correctAnswer, prevFlag; 
var choices, question, resultsPara, choicesPara; 
var resetButton, prevButton; 
var progress, progressPercentage;

questions = [
    {
        number: 0,
        question: '¿Cuál es la película protagonizada por Keanue Reeves donde lucha contra el código informático?',
        choices: ['MadMan', 'Suicide Squad', 'Matrix', 'CyberPunk'],
        answer: 2
        //Respuesta: Matrix
    },
    {
        number: 1,
        question: '¿Cuál es la película en la que Will Smith lucha contra los robots?',
        choices: ['I robot', 'Pixel', 'Bad Boys', 'Focus'],
        answer: 0
        //Respuesta: I Robot
    },
    {
        number: 2,
        question: '¿Puedes nombrar el programa de televisión en el que Desmond usa una computadora para salvar la isla y, en última instancia, el mundo?',
        choices: ['Lost', 'Lupin', 'Back to the future', 'Suits'],
        answer: 0
        //Respuesta: Lost
    },
    {
        number: 3,
        question: '¿Puedes nombrar el videojuego en el que pirateas el mundo para cometer varios delitos?',
        choices: ['CyberPunk', ' God of war', 'Watch Dogs', 'Rust'],
        answer: 2
        //Respuesta: Watch Dogs
    },
    {
        number: 4,
        question: '¿Cuál es la película que más Oscars ha ganado en la historia?',
        choices: ['Titanic', 'Ben Hur', 'El señor de los anillos', 'Todas las anteriores'],
        answer: 3
        //Respuesta: Todas las anteriores
    },
    {
        number: 5,
        question: '¿Cuántas estatuillas Oscar tiene la película más premiada?',
        choices: ['15', '12', '11', '16'],
        answer: 2
        //Respuesta: 11
    },
    {
        number: 6,
        question: ' ¿En qué película de la Saga de Star Wars la princesa Leia empieza a usar la fuerza?',
        choices: ['Episodio V', 'Episodio VI', 'Episodio VII', 'Episodio III'],
        answer: 1
        //Respuesta: Episodio VI
    },
    {
        number: 7,
        question: '¿Cuál fue la primera directora en ganar un Oscar de la Academia?',
        choices: ['Kathryn Bigelow', 'Gale Anne Hurd', 'Linda Hamilton', 'Leslie Hamilton'],
        answer: 0
        //Respuesta: Kathryn Bigelow
    },
    {
        number: 8,
        question: '¿Cuál es la película más taquilllera de la historia?',
        choices: ['Titanic', 'Avengers: Endgame', 'Rescatando al Soldado Ryan', 'Matrix'],
        answer: 1
        //Respuesta: Avengers: Endgame
    },
    {
        number: 9,
        question: '¿Quién dirigió la película Origen en el 2010?',
        choices: ['Steven Spielberg', 'Ninguno de estos', 'Peter Jackson', 'Christopher Nolan'],
        answer: 3
        //Respuesta: Christopher Nolan
    },
    {
        number: 10,
        question: '¿Quién dirigió la película Parque Jurásico en el año 1993?',
        choices: ['Steven Spielberg', 'Ninguno de estos', 'Peter Jackson', 'Christopher Nolan'],
        answer: 0
        //Respuesta: Steven Spielberg
    },
    {
        number: 11,
        question: '¿Por qué película ganó Leonardo DiCaprio su primer Óscar? ',
        choices: ['Titanic', 'El Renacido', 'El Origen', 'Django'],
        answer: 1
        //Respuesta: El Renacido
    },
    {
        number: 12,
        question: '¿Quién protagonizó la película El Pianista?',
        choices: ['Tom Hardy', 'Christian Bale', 'Thomas Kretschmann', 'Adrien Brody'],
        answer: 3
        //Respuesta: Adrien Brody
    },

];

count = 0;
score = 0;
correctAnswer = false;
prevFlag = false;

choices = document.querySelectorAll('.choices');
question = document.getElementsByTagName('h2')[0];
resultsPara = document.getElementsByTagName('p')[0];
choicesPara = document.getElementsByTagName('p')[1];

resetButton = document.getElementsByClassName('reset')[0];
prevButton = document.getElementsByClassName('prev')[0];
progress = document.getElementsByClassName('progress-bar')[0];


window.onload = renderQuestion();

prevButton.addEventListener('click', prevQuestion);
resetButton.addEventListener('click', resetQuiz);
choices.forEach(function(choice) {
    choice.addEventListener('click', scoring);
});

function scoring() {
    
    answer = questions[count].answer;
    
    prevFlag = true;
    
    if (this.innerText === questions[count].choices[answer]) {
       
        correctAnswer = true;
        score++;
    } else {
        correctAnswer = false;
    }
    
    nextQuestion();
}

function nextQuestion() {
    
    count++;
    
    if (count > 12) {
        count = 12;
    } else if (count !== 12) {
       
        renderQuestion();
    } else if (count === 12) {
        
        renderCompletion();
    }
}

function prevQuestion() {
   
    prevFlag = false;
    
    if (correctAnswer) {
        correctAnswer = false;
        score--;
    }
    
    count--;
    renderQuestion();
}


function renderQuestion() {
    
    if (!prevFlag) {
        prevButton.classList.add('hide');
    } else if (prevButton.classList.contains('hide')) {
        prevButton.classList.remove('hide');
    }
    
    
    question.innerText = questions[count].question;
    
    
    choices.forEach(function(choice, i) {
        choice.innerText = questions[count].choices[i];
    });
    
    updateProgress();
}

function renderCompletion() {
    updateProgress();
    scorePercentage = Math.round(score/12 * 100) + '%';
    
    
    question.innerText = 'Gracias por completar este Quiz!';
    resultsPara.innerText = 'Tu puntuación es: ' + scorePercentage;
    
    
    choicesPara.classList.add('hide');
    prevButton.classList.add('hide');
    resetButton.classList.remove('hide');
}


function updateProgress() {
    
    progressPercentage = Math.round((count/12) * 100);
    progress.style.width = progressPercentage + '%';
}

function resetQuiz() {
    
    count = 0;
    score = 0;
    correctAnswer = false;
    prevFlag = false;
    
    resultsPara.innerText = '';
    
    choicesPara.classList.remove('hide');
    resetButton.classList.add('hide');
    
    renderQuestion();
}