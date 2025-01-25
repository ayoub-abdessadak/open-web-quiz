

let questions = [
    {
        "question":"Dit is een vraag, hierheb je iets staan?",
        "answers":["antwoord 1", "antwoord 2", "antwoord 3"],
        "answer":"antwoord 1"
    },
    {
        "question":"Dit is een vraag2, hierheb je iets staan?",
        "answers":["antwoord 1", "antwoord 2", "antwoord 3"],
        "answer":"antwoord 2"
    },
    {
        "question":"Dit is een vraag2, hierheb je iets staan?",
        "answers":["antwoord 1", "antwoord 2", "antwoord 3"],
        "answer":"antwoord 2"
    },
    {
        "question":"Dit is een vraag2, hierheb je iets staan?",
        "answers":["antwoord 1", "antwoord 2", "antwoord 3"],
        "answer":"antwoord 2"
    },
    {
        "question":"Dit is een vraag2, hierheb je iets staan?",
        "answers":["antwoord 1", "antwoord 2", "antwoord 3"],
        "answer":"antwoord 2"
    },
    {
        "question":"Dit is een vraag2, hierheb je iets staan?",
        "answers":["antwoord 1", "antwoord 2", "antwoord 3"],
        "answer":"antwoord 2"
    },
    {
        "question":"Dit is een vraag2, hierheb je iets staan?",
        "answers":["antwoord 1", "antwoord 2", "antwoord 3"],
        "answer":"antwoord 2"
    },
    {
        "question":"Dit is een vraag2, hierheb je iets staan?",
        "answers":["antwoord 1", "antwoord 2", "antwoord 3"],
        "answer":"antwoord 2"
    },
]
let checkDirectly = false;
let index = -1;
let questionAnswered = {}
let currentChoice;
const navigate = (index) => {
    index = index;
    loadQuestions(questions[index]);
}
function getAllLowercaseLetters() {
    const letters = [];
    for (let i = 97; i <= 122; i++) { // ASCII values for 'a' (97) to 'z' (122)
        letters.push(String.fromCharCode(i));
    }
    return letters;
}
const selectAnswer = (choice) => {
    if (choice)
    document.getElementById("answers").querySelectorAll("input").forEach((element)=>{
        if(element.id == choice){
            element.checked = true;
        }else{
            element.checked = false;
        };
    }) 
    currentChoice = choice;
}
const loadQuestions = (question) => {
    let givenAnswer;
    let answers = JSON.parse(document.getElementById("storedAnswers").value);
    if (Object.keys(answers).includes(question.question)){
        givenAnswer = answers[question.question];
    }
    document.getElementById("question-text").innerHTML = question.question;
    let letters = getAllLowercaseLetters();
    Object.values(document.getElementById("answers").children).forEach(element=>{element.remove()})
    question.answers.forEach((answer, index)=>{
        // let _ = `<div class='answer-box'><input id="${letters[index]}" onclick="selectAnswer('${letters[index]}')" type="checkbox" class="answer-checkbox"><label class='answer-label'>${letters[index]}. ${answer}</label></div>`
        let _ = `<label id="answer_${letters[index]}" class="container">${letters[index]}. ${answer}
            <input id="${letters[index]}" value="${answer}" onclick="selectAnswer('${letters[index]}')" type="checkbox" ${ givenAnswer == answer ? "checked" : null}>
            <span class="checkmark"></span>
          </label>`
        document.getElementById("answers").insertAdjacentHTML("beforeend", _); // Append it to the end of the body
    })  
}
const correct = () => {
    Toastify({
    text: "Je hebt het correct.",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "green",
    },
    onClick: function(){} // Callback after click
    }).showToast();
}
const wrong = () => {
    Toastify({
    text: "Je hebt het fout.",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "red",
    },
    onClick: function(){} // Callback after click
    }).showToast();
}
const checkAnswer = (question) => {
    let givenAnswer;
    let answers = JSON.parse(document.getElementById("storedAnswers").value);
    if (Object.keys(answers).includes(question.question)){
        givenAnswer = answers[question.question];
    }
    let passed = givenAnswer == question.answer;
    let tf = [];
    document.getElementById("answers").querySelectorAll("input").forEach((element)=>{
        if(element.value == question.answer){
            tf.push([element.id, true])
        }else{
            tf.push([element.id, false])
        }
    })
    tf.forEach((e)=>{
        if (e[1]){
            document.getElementById(`answer_${e[0]}`).style.color = "green";
        }else{
            document.getElementById(`answer_${e[0]}`).style.color = "red";
        }
    })
    passed ? correct() : wrong();
    let nxb = document.getElementById("nextButton");
    nxb.innerHTML = "Verder";
    nxb.onclick = continueAfterCheck;
}
const saveAnswer = () => {
    let answers = JSON.parse(document.getElementById("storedAnswers").value);
    let questionAnswered = {...answers}
    let answer; 
    document.getElementById("answers").querySelectorAll("input").forEach((element)=>{
        if(element.checked){
            answer = element.value;
        }
    })
    questionAnswered[questions[index].question] = answer;
    document.getElementById("storedAnswers").value = JSON.stringify(questionAnswered);
}
const previousQuestion = () => {
    if(index >= 0){
    saveAnswer();}
    let nxb = document.getElementById("nextButton");
    nxb.innerHTML = "volgende vraag";
    nxb.onclick = nextQuestion;
    index > 1 ? index = index - 1 : index = 0;
    loadQuestions(questions[index])
    document.getElementById("currentQuestion").innerHTML = `Vraag ${index+1} van de ${questions.length}`
}
const continueAfterCheck = () => {
    let nxb = document.getElementById("nextButton");
    nxb.innerHTML = "volgende vraag";
    nxb.onclick = nextQuestion;
    index < questions.length-1 ? index = index + 1 : index = questions.length-1; 
    loadQuestions(questions[index]);
    document.getElementById("currentQuestion").innerHTML = `Vraag ${index+1} van de ${questions.length}`
};
const nextQuestion = () => {
    if(index >= 0){
        saveAnswer();}
    let checkDirectly = document.getElementById("checkDirectly").checked;
    if (checkDirectly){
        checkAnswer(questions[index]);
    }else{
        index < questions.length-1 ? index = index + 1 : index = questions.length-1; 
        loadQuestions(questions[index]);
        document.getElementById("currentQuestion").innerHTML = `Vraag ${index+1} van de ${questions.length}`
    }
    if(index + 1 == questions.length){
        // end
        let nxb = document.getElementById("nextButton");
        nxb.innerHTML = "resultaten zien";
        nxb.onclick = results;
    }
};
const results = () => {
    let qb = document.getElementById("quizBody");
    qb.style.display = "none";
    let answers = JSON.parse(document.getElementById("storedAnswers").value);
    let answerKeys = Object.keys(answers);
    let _results = []
    let points = 0
    questions.forEach(question=>{
        let format = {
            question:"",
            userAnswer:"",
            rightAnswer:"",
            passed:false
        }
        format.question = question.question;
        format.rightAnswer = question.answer;
        if(answerKeys.includes(question.question)){
            format.userAnswer = answers[question.question];
            if (answers[question.question] == question.answer){
                format.passed = true;
                points += 1;
            }else{
                format.passed = false;
            }
        }
        _results.push(format)
    })
    let resultsDiv = document.getElementById("results");
    _results.forEach((result)=>{
    let _ = ` <div id="result-item">
                <p class="${result.passed ? "passed" : "failed"}">Gegeven antwoord: <span>${result.userAnswer ? result.userAnswer : "Geen antwoord"}</span></p>
                <p>Juiste antwoord: <span>${result.rightAnswer }</span></p>
                <p class="${result.passed ? "passed" : "failed"}">Punten: <span>${result.passed ? "+1" : "0"}</span></p>
            </div>`
        resultsDiv.insertAdjacentHTML("beforeend", _)
    })
    resultsDiv.hidden = false;
};

const again = () => {
    location.reload();
};

nextQuestion();