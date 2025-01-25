

let questions = [
    {
        "question": "Wat betekent 'HyperText' in HyperText Markup Language?",
        "answers": [
            "Tekst met opmaak voor betere leesbaarheid",
            "Tekst met verwijzingen naar andere teksten",
            "Een taal om multimedia-inhoud te creëren"
        ],
        "answer": "Tekst met verwijzingen naar andere teksten"
    },
    {
        "question": "Wat is een 'Markup Language'?",
        "answers": [
            "Een taal die documenten opmaakt en structuur geeft",
            "Een taal die de werking van servers beschrijft",
            "Een taal die alleen gebruikt wordt voor multimedia"
        ],
        "answer": "Een taal die documenten opmaakt en structuur geeft"
    },
    {
        "question": "Wat is de correcte structuur van een HTML-document?",
        "answers": [
            "&lt;!DOCTYPE html&gt;, &lt;html&gt;, &lt;head&gt;, &lt;body&gt;",
            "&lt;header&gt;, &lt;footer&gt;, &lt;aside&gt;",
            "&lt;table&gt;, &lt;tr&gt;, &lt;td&gt;"
        ],
        "answer": "&lt;!DOCTYPE html&gt;, &lt;html&gt;, &lt;head&gt;, &lt;body&gt;"
    },
    {
        "question": "Welke HTML-tags worden gebruikt voor een minimale tekstopmaak?",
        "answers": [
            "Heading, paragrafen en breaks",
            "Divs, spans en buttons",
            "Formulieren, inputvelden en knoppen"
        ],
        "answer": "Heading, paragrafen en breaks"
    },
    {
        "question": "Wat doet een &lt;div&gt;-element in HTML?",
        "answers": [
            "Het voegt kleur toe aan de tekst",
            "Het fungeert als container voor inhoud en structuur",
            "Het creëert een hyperlink naar een andere pagina"
        ],
        "answer": "Het fungeert als container voor inhoud en structuur"
    },
    {
        "question": "Welke tag wordt gebruikt om een afbeelding in een HTML-document in te voegen?",
        "answers": [
            "&lt;img&gt;",
            "&lt;picture&gt;",
            "&lt;image&gt;"
        ],
        "answer": "&lt;img&gt;"
    },
    {
        "question": "Wat is het verschil tussen een 'relative path' en een 'absolute path'?",
        "answers": [
            "Relative paths zoeken vanaf de huidige directory, absolute paths vanaf de root",
            "Relative paths verwijzen altijd naar een externe server",
            "Absolute paths gebruiken altijd ./ of ../"
        ],
        "answer": "Relative paths zoeken vanaf de huidige directory, absolute paths vanaf de root"
    },
    {
        "question": "Welke HTML-tags worden gebruikt voor een tabel?",
        "answers": [
            "&lt;table&gt;, &lt;tr&gt;, &lt;td&gt;",
            "&lt;div&gt;, &lt;span&gt;, &lt;h1&gt;",
            "&lt;header&gt;, &lt;footer&gt;, &lt;main&gt;"
        ],
        "answer": "&lt;table&gt;, &lt;tr&gt;, &lt;td&gt;"
    },
    {
        "question": "Wat is een voorbeeld van een block-element in HTML?",
        "answers": [
            "&lt;div&gt;",
            "&lt;span&gt;",
            "&lt;button&gt;"
        ],
        "answer": "&lt;div&gt;"
    },
    {
        "question": "Wat is een 'inline-element' in HTML?",
        "answers": [
            "Een element dat op dezelfde regel blijft als andere inhoud",
            "Een element dat altijd op een nieuwe regel begint",
            "Een element dat wordt gebruikt voor tabellen"
        ],
        "answer": "Een element dat op dezelfde regel blijft als andere inhoud"
    },
    {
        "question": "Wat is het doel van een &lt;span&gt;-element?",
        "answers": [
            "Een specifiek deel van tekst stylen",
            "Een container creëren voor een hele sectie",
            "Een lijst aanmaken in een document"
        ],
        "answer": "Een specifiek deel van tekst stylen"
    },
    {
        "question": "Wat betekent de &lt;header&gt;-tag in een HTML-structuur?",
        "answers": [
            "Het geeft de koptekst van een pagina aan",
            "Het definieert een tabelkop",
            "Het voegt een afbeelding toe aan de pagina"
        ],
        "answer": "Het geeft de koptekst van een pagina aan"
    },
    {
        "question": "Wat is een commentaar in HTML en hoe gebruik je het?",
        "answers": [
            "Een stukje tekst dat niet wordt gerenderd in de browser, geschreven tussen &lt;!-- en --&gt;",
            "Tekst die wordt weergegeven in de browser voor gebruikers",
            "Een sectiecode die altijd wordt uitgevoerd"
        ],
        "answer": "Een stukje tekst dat niet wordt gerenderd in de browser, geschreven tussen &lt;!-- en --&gt;"
    }
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
        let _ = `<label id="answer_${letters[index]}" class="container">${letters[index]}. ${String(answer)}
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
            answer = element.value.replaceAll("&", "&amp").replaceAll("<", "&lt").replaceAll(">", "&gt");
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
                <h3 class="question-title">${result.question}</h3>
                <p class="${result.passed ? "passed" : "failed"}">Gegeven antwoord: <span>"${result.userAnswer ? result.userAnswer : "Geen antwoord"}"</span></p>
                <p>Juiste antwoord: <span>${String(result.rightAnswer)}"</span></p>
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