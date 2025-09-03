const questions = [
    {
        question:"Which planet is known as the “Red Planet”?",
        answers:[
            {text:"Earth",correct:false},
            {text:"Jupiter",correct:false},
            {text:"Mars",correct:true},
            {text:"None",correct:false},
        ]
    },
    {
        question:" What is the tallest land animal in the world?",
        answers:[
            {text:"Tiger",correct:false},
            {text:"Elephant",correct:false},
            {text:"Whale shark",correct:false},
            {text:"Giraffe",correct:true},
        ]
    }
]

const questionButton = document.getElementById("question");
const answerButtons = document.getElementById("ans-btn");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML  = "NEXT";
    showQuesion();
}

function showQuesion(){
    // resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    questionButton.innerHTML = questionNumber + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = answer.text;
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click",function(e){
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true" ;
            if(isCorrect){
                selectedBtn.classList.add("correct");
                score++;
            }
            else{
                selectedBtn.classList.add("incorrect");
            }
           Array.from(answerButtons.children).forEach(button=>{
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            
            }
            button.disabled = true;
           })
           nextButton.style.display ="block";
          
        });
    });
    
}

function nextQuestion(){
    resetState();
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuesion();
    }
    else{
        resetState();
        questionButton.innerHTML = ` you scored ${score} out of ${questions.length}!`
        nextButton.innerHTML = "restart";
        nextButton.style.display = "block";
    }
}

nextButton.addEventListener("click",function(){
    if(currentQuestionIndex < questions.length){
            nextQuestion();
    }
    else{
            startQuiz();
    } 
})

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

startQuiz();