const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const qContainerEl = document.getElementById('questionContainer')
const questionEl = document.getElementById('question')
const answerBtnEl = document.getElementById('answers')
var timeEl = document.querySelector(".timer")
var mainEl = document.getElementById("main")
var optionEl = document.getElementsByClassName('option')

var secondsLeft = 30

let shuffleQuestion, currentQuestionIndex

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex ++
    nextQuestion()
})

function startQuiz() {
    startButton.classList.add('hide')
    qContainerEl.classList.remove('hide')
    shuffleQuestion = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    
    setTime()
    nextQuestion()
}

function result() {
    if(correct === true) {
        optionEl = document.body.style.backgroundColor = 'green'
    }
    else {
        optionEl = document.body.style.backgroundColor = 'red'
    }
}

function nextQuestion() {
    resetState()
    showQuestion(shuffleQuestion[currentQuestionIndex])
}

function showQuestion(questions) {
    questionEl.innerText = questions.question
    questions.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('option')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerBtnEl.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtnEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestion.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }
    else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'How many siblings do I have?',
        answers: [
            {text: '2', correct: true},
            {text: '1', correct: false},
            {text: '4', correct: false},
            {text: '3', correct: false}
        ]
    },

    {
        question: "What is my dog's name?",
            answers: [
                {text: 'Table', correct: false},
                {text: 'Cookie', correct: false},
                {text: 'Potato', correct: false},
                {text: 'Luna', correct: true}
            ]
    },

    {
        question: "What is my favorite season?",
        answers: [
            {text: 'Spring', correct: false},
            {text: 'Summer', correct: true},
            {text: 'Fall', correct: false},
            {text: 'Winter', correct: false}
        ]
    },

    {
        question: "How old am I?",
        answers: [
            {text: '21', correct: false},
            {text: '19', correct: false},
            {text: '18', correct: true},
            {text: '20', correct: false}
        ]
    },

    {
        question: "What is 1+1?",
        answers: [
            {text: 'window', correct: false},
            {text: '2', correct: true},
            {text: '4', correct: false},
            {text: '24', correct: false}
        ]
    }
]

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--
    timeEl.textContent = secondsLeft + " seconds left"

    if(secondsLeft === 0) {
      clearInterval(timerInterval)
      timeUp()
    }

  }, 1000)
}

function timeUp() {
  timeEl.textContent = 'Out of time'
}