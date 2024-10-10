let userId = null;
const url = 'http://localhost:3000';

let correctAnswerd = 0;
let wrongAnswerd = 0;
let questionIndex = 0;
let easyQuestions = 0;
let mediumQuestions = 0;
let hardQuestions = 0;
let veryHardQuestions = 0;
let difficultyLevel = 'easy';

// HTML elements
const questions = document.getElementById('questions');
const questionType = document.getElementById('question-types');
const types = questionType.querySelectorAll('p');
const navbarCont = document.getElementById('navbar-cont');
const filter = document.getElementById('filter-input');
const answerBox = document.querySelector('.answer-checker');
const totalAnswerd = document.getElementById('answerd-questions');
const correctAnswers = document.getElementById('correct-answers');
const wrongAnswers = document.getElementById('wrong-answers');
const popup = document.getElementById('popup-cont');
const overlay = document.getElementById('overlay');
const nextBtn = document.getElementById('next-btn');
const navcloseBtn = document.getElementById("nav-popup-close-btn");
const popupHeading=document.getElementById('popup-heading')
const popupContent=document.getElementById('popup-content')
const popupContainer=document.getElementById('popup-cont')
const popupOverlay=document.getElementById('overlay')
const questionscontainer=document.getElementById('questions-cont')


let type = '';
let questionsArray = [];

// Change question type
types.forEach(para => {  
    para.addEventListener('click', (event) => {
         questions.style.backgroundImage='none'
        type = event.target.textContent + 'Questions';
        correctAnswerd,wrongAnswerd=0;
        if(userId)
            {
                loadUserDetails()
            }
        getQuestions(type);
    });
});

// Add filter
filter.addEventListener('change', () => {
    difficultyLevel = filter.value;
    correctAnswerd,wrongAnswerd=0;
    if (!type) {
       showPopup('Select Question Type',"Select Question type wich you are comfortable to continue")
       filter.value='easy'
       difficultyLevel=filter.value
       return;
    }    
     getQuestions(type);
     removeColors() ;
})

// Fetch questions
function getQuestions(type) {
    questionscontainer.scrollIntoView({behavior:"smooth"})
    fetch(`${url}/get/${type}/${questionIndex}/${difficultyLevel}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => addToHtml(data))
        .catch(error => console.error('Error fetching questions:', error));
}

// Add questions to HTML
function addToHtml(data) {
    questions.innerHTML = '';
    questionsArray = [];

    data.forEach(question => {
        questions.innerHTML += 
            `<div class="tot-box">
                <h2 class="question">${question.question}</h2>
                <div class="box">
                    <div class="options">
                        <p value="A" onclick="checkAnswer(this)">A) ${question.options[0]}</p>
                        <p value="B" onclick="checkAnswer(this)">B) ${question.options[1]}</p>
                        <p value="C" onclick="checkAnswer(this)">C) ${question.options[2]}</p>
                        <p value="D" onclick="checkAnswer(this)">D) ${question.options[3]}</p>
                    </div>
                </div>
                </div>`
            
        addToArray(question.question, question.Answer);
    });
}

// Add question and answer to array
function addToArray(question, ans) {
    const newques = { question: question, Ans: ans, Answerd: false };
    questionsArray.push(newques);
}

let answerd=0;
function checkAnswer(ans) {
    const cont = ans.closest('.tot-box');
    const question = cont.querySelector('.question');
    const answer = ans.getAttribute('value');
    questionsArray.forEach(ques => {
        if (ques.question === question.textContent) {
            index = questionsArray.indexOf(ques);
            answerd+=1;
            if (ques.Answerd) {
                showPopup('Already Answered',"You Answered For This Question,So it does,t Consider")
                return; // Early return if already answered
            }
            ques.Answerd = true; // Mark as answered
            if (answer === ques.Ans) {
                correctAnswerd += 1;
                setColorsAndOthers(true);
            } else {
                wrongAnswerd += 1;
                setColorsAndOthers(false);
            }
            if(!userId)
            {
                updateTexts()
            }
            if(index==questionsArray.length-1)
            {
                scrollToBottom()
            }
        }
    });
}

// Add colors, update answered questions and wrong answers
const boxes = answerBox.querySelectorAll('p');

function setColorsAndOthers(Ans) {
    const currentBox = boxes[index];

    if (Ans) {
        currentBox.style.backgroundColor = "green";
    } else {
        currentBox.style.backgroundColor = "red";
    }
}

function removeColors() {
    boxes.forEach(box => {
        box.style.backgroundColor = 'white';
    });
}

// Change to next page
nextBtn.addEventListener('click', () => {
    changePage();
});

function changePage() {
    if (questionsArray.length < 1) {
        showPopup('Select Question Type',"Select Question type wich you are comfortable to continue")
        return;
    }

    let finished = true;
    questionsArray.forEach(ques => {
        if (ques.Answerd !== true) { finished = false; }
    });

    if (finished) {
        questionIndex+=2;
        questionscontainer.scrollIntoView({behavior:"smooth"})
        removeColors();
        getQuestions(type);
        updateQuestionDetails(); 
        if(userId)
        {
            loadUserDetails()
        }
    } else {
         showPopup('Answer All',"Answer all questions to change next page")
    }
}

// Update total answered questions, wrong, correct Answers
let totalAnswers=0;
function updateTexts() {
    totalAnswerd.textContent=`Answered Questions: ${correctAnswerd+wrongAnswerd}`
    correctAnswers.textContent = `Correct Answers: ${correctAnswerd}`;
    wrongAnswers.textContent = `Wrong Answers: ${wrongAnswerd}`;
}

// Check user and update details
window.addEventListener('load', () => {
    if (localStorage.getItem('User')) {
        userId = localStorage.getItem('User');
        loadUserDetails();
        correctAnswerd , wrongAnswerd=0;
    }
});

function loadUserDetails() {
    fetch(`${url}/login?id=${userId}`)
        .then(res => res.json())
        .then(data => changeValues(data))
        .catch(error => console.error('Error loading user details:', error));
}

function displayUserDetails(data) {
  
    totalAnswerd.textContent = `Answered Questions: ${data.totalAnswerd}`;
    totalAnswers=data.totalAnswerd;
    correctAnswers.textContent =` Correct Answers: ${data.correctAnswers}`;
    wrongAnswers.textContent =` Wrong Answers: ${data.wrongAnswers}`;
}

// Update user details
function updateUserDetails() {
    const categoryIndex = checkIndexToUpdate('cat');
    const difficultyIndex = checkIndexToUpdate('diff');
    const incrementValue = checkValueToUpdate();

    if (categoryIndex === -1 || difficultyIndex === -1) {
        console.error("Invalid category or difficulty index");
        return;
    }

    const incrementData = {
        userID: userId,
        categoryIndex: categoryIndex,
        difficultyType: difficultyLevel,
        incrementValue: incrementValue,
        difficultyIndex: difficultyIndex,
        totalAnsweredIncrement: correctAnswerd + wrongAnswerd,
        correctAnswersIncrement: correctAnswerd,
        wrongAnswersIncrement: wrongAnswerd,
    };

    fetch(`${url}/put/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incrementData)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to update user details');
        }
        return res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function checkIndexToUpdate(opt) {
    if (opt === 'cat') {
        switch (type) {
            case 'GeneralQuestions': return 0;
            case 'MathsQuestions': return 1;
            case 'DSAQuestions': return 2;
            case 'SocialQuestions': return 3;
            default:
                console.error('Unknown question type:', type);
                return -1;
        }
    } else {
        switch (difficultyLevel) {
            case 'easy': return 0;
            case 'medium': return 1;
            case 'hard': return 2;
            case 'veryHard': return 3;
            default:
                console.error('Unknown difficulty level:', difficultyLevel);
                return -1;
        }
    }
}

function checkValueToUpdate() {
    switch (difficultyLevel) {
        case 'easy': return easyQuestions;
        case 'medium': return mediumQuestions;
        case 'hard': return hardQuestions;
        case 'veryHard': return veryHardQuestions;
        default:
            console.error('Unknown difficulty level:', difficultyLevel);
            return -1;
    }
}

function updateQuestionDetails() {

    switch (difficultyLevel) {
        case 'easy':
            easyQuestions += 2;
            break;
        case 'medium':
            mediumQuestions += 2;
            break;
        case 'hard':
            hardQuestions += 2;
            break;
        case 'veryHard':
            veryHardQuestions += 2;
            break;
    }
    updateUserDetails();
}

// Change values based on user data
function changeValues(data) {
    correctAnswerd = 0;
    wrongAnswerd = 0;
    questionIndex = 0;
    easyQuestions = 0;
    mediumQuestions = 0;
    hardQuestions = 0;
    veryHardQuestions = 0;
   
   if(data)
   {
    switch(type,difficultyLevel)
    {  
       //If the type is General change Question Index
       case 'GeneralQuestions' && 'easy':
           questionIndex=data.Category[0][0].easy*1;
           break;
       case 'GeneralQuestions' && 'medium':
           questionIndex=data.Category[0][1].medium*1; 
           break;  
       case 'GeneralQuestions' && 'hard':
           questionIndex=data.Category[0][2].hard*1
           break;
        case 'GeneralQuestions' && 'veryHard':
           questionIndex=data.Category[0][3].veryHard*1; 
           break;      
       //If the type is Maths Change Index   
      case 'MathsQuestions' && 'easy':
          questionIndex=data.Category[1][0].easy*1;
          break;
      case 'MathsQuestions' && 'medium':
          questionIndex=data.Category[1][1].medium*1; 
          break;  
      case 'MathsQuestions' && 'hard':
          questionIndex=data.Category[1][2].hard*1
          break;
       case 'MathsQuestions' && 'veryHard':
          questionIndex=data.Category[1][3].veryHard*1; 
          break; 
        //If the type is DSA change Index
        case 'DSAQuestions' && 'easy':
          questionIndex=data.Category[2][0].easy*1; 
          break;
        case 'DSAQuestions' && 'medium':
          questionIndex=data.Category[2][1].medium*1; 
          break;   
        case 'DSAQuestions' && 'hard':
          questionIndex=data.Category[2][2].hard*1; 
          break; 
         case 'DSAQuestions' && 'veryHard':
          questionIndex=data.Category[2][3].veryHard*1; 
          break;      
        //IF the type is Social change Index
        case 'SocialQuestions' && 'easy':
          questionIndex=data.Category[3][0].easy*1; 
          break;
        case 'SocialQuestions' && 'medium':
          questionIndex=data.Category[3][1].medium*1; 
          break;   
        case 'SocialQuestions' && 'hard':
          questionIndex=data.Category[3][2].hard*1; 
          break; 
         case 'SocialQuestions' && 'veryHard':
          questionIndex=data.Category[3][3].veryHard*1; 
          break;        
    }
   }
   displayUserDetails(data)
}

const body=document.querySelector('body')
function showPopup(heading,msg)
{
    popupContainer.style.display='inline-block'
    overlay.style.display='inline-block'
    popupHeading.textContent=heading;
    popupContent.textContent=msg;
    body.scrollIntoView()
}

function closePopup()
{
     popupContainer.style.display='none'
     overlay.style.display='none'
}

// Moblie Styles
const level=document.getElementById('levels')
function scrollToBottom()
{  
    console.log("yes")
    level.scrollIntoView({behavior:"smooth"})
}