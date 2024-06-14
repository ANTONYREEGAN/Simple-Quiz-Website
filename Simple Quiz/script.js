const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    if (correct) {
        quizScore++;
    }
    document.getElementById('right-answers').innerText = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Who is making the web standards?',
        answers: [
            { text: "a) Microsoft", correct: false },
            { text: "b) Google", correct: false },
            { text: "c) Mozilla", correct: false },
            { text: "d) The World Wide Web Consortium", correct: true }
        ],
    },
    {
        question: 'What is HTML?',
        answers: [
            { text: "a) HTML describes the structure of a webpage", correct: false },
            { text: "b) HTML is the standard markup language mainly used to create web pages", correct: false },
            { text: "c) HTML consists of a set of elements that helps the browser how to view the content", correct: false },
            { text: "d) All the above", correct: true }
        ],
    },
    {
        question: 'Who is the father of HTML?',
        answers: [
            { text: "a) Rasmus Lerdorf", correct: false },
            { text: "b) Tim Berners-Lee", correct: true },
            { text: "c) Mozilla", correct: false },
            { text: "d) The World Wide Web Consortium", correct: false }
        ],
    },
    {
        question: 'HTML stands for __',
        answers: [
            { text: "a) HyperText Markup Language", correct: true },
            { text: "b) HyperText Machine Language", correct: false },
            { text: "c) HyperText Marking Language", correct: false },
            { text: "d) HighText Markup Language", correct: false }
        ],
    },
    {
        question: 'Which of the following is used to read an HTML page and render it?',
        answers: [
            { text: "a) Web server", correct: false },
            { text: "b) Web network", correct: false },
            { text: "c) Web browser", correct: true },
            { text: "d) Web matrix", correct: false }
        ],
    },
    {
        question: 'Which of the following tag is used for inserting the largest heading in HTML?',
        answers: [
            { text: "a) head", correct: false },
            { text: "b) <h1>", correct: true },
            { text: "c) header", correct: false },
            { text: "d) <h6>", correct: false }
        ],
    },
    {
        question: 'In which part of the HTML metadata is contained?',
        answers: [
            { text: "a) body tag", correct: false },
            { text: "b) title tag", correct: false },
            { text: "c) html tag", correct: false },
            { text: "d) head tag", correct: true }
        ],
    },
    {
        question: 'Which of the following is not a HTML5 tag?',
        answers: [
            { text: "a) <track>", correct: false },
            { text: "b) <track>", correct: false },
            { text: "c) <slicer>", correct: false },
            { text: "d) <slider>", correct: true }
        ],
    },
    {
        question: 'Which of the following elements in HTML5 defines video or movie content?',
        answers: [
            { text: "a) <video>", correct: true },
            { text: "b) <movie>", correct: false },
            { text: "c) <audio>", correct: false },
            { text: "d) <media>", correct: false }
        ],
    },
    {
        question: 'Which element is used for or styling HTML5 layout?',
        answers: [
            { text: "a) CSS", correct: true },
            { text: "b) Javascript", correct: false },
            { text: "c) PHP", correct: false },
            { text: "d) Python", correct: false }
        ],
    }
];
