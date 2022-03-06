let allQuestions = [
  {
    question: "Q1. What is the full form of RAM ?",
    choices: [
      "Random Access Memory",
      "Randomely Access Memory",
      "Run Aceapt Memory",
      "None of these",
    ],

    correctAnswer: 0,
  },
  {
    question: "Q2. What is the full form of CPU?",
    choices: [
      "Central Program Unit",
      "Central Processing Unit",
      "Central Preload Unit",
      "None of these",
    ],

    correctAnswer: 1,
  },
  {
    question: "Q3. What is the full form of E-mail",
    choices: [
      "Electronic Mail",
      "Electric Mail",
      "Engine Mail",
      "None of these",
    ],

    correctAnswer: 0,
  },

  {
    question: "Q4. What is the full form of HTML",
    choices: [
      "hello my land",
      "Hyper text markup language",
      "hyper text language",
      "None of these",
    ],

    correctAnswer: 1,
  },
  {
    question: "Q5. What is the full form of JS",
    choices: ["java", "java language", "java script", "None of these"],

    correctAnswer: 2,
  },
];

let questionCounter = 0;
let totalQuestions = allQuestions.length;
let totalScore = 0;
let list = document.createElement("ul");
let nextButton = document.getElementById("Next");
let prevButton = document.getElementById("Previous");
let submButton = document.getElementById("submit");
const progressbarfull = document.querySelector("#progressBarFull");
prevButton.disabled = true;
submButton.disabled = true;

let userAnswer = allQuestions[questionCounter].userAnswer;
let score = allQuestions[questionCounter].score;

// Quiz function
let quiz = function quiz() {
  let singleQuestion = allQuestions[questionCounter];

  // identify elements from the existing markup
  let correctAnswer = singleQuestion.correctAnswer;
  let radioGroup = document.getElementById("radioGroup");
  let question = document.getElementById("question");
  question.innerHTML = singleQuestion.question;
  radioGroup.appendChild(list);

  // loop through each choice and output html to display them
  for (let i = 0; i < singleQuestion.choices.length; i++) {
    let item = document.createElement("li");
    let optionButton = document.createElement("input");
    let optionText = document.createTextNode(singleQuestion.choices[i]);

    optionButton.setAttribute("type", "radio");
    optionButton.setAttribute("name", "quiz");
    optionButton.setAttribute("id", `choiceRadio-${i}`);
    optionButton.setAttribute("value", i); // give the value it's corresponding number from the choices array

    console.log(userAnswer);
    if (i == userAnswer) {
      optionButton.checked = true;
    }

    list.appendChild(item);
    item.appendChild(optionButton);
    item.appendChild(optionText);
  }
};
// call quiz function to load the first question
quiz();

// holds the option that the user picks for a question
let usersChoice = function usersChoice() {
  userAnswer = document.querySelectorAll('input[name="quiz"]:checked');

  // makes sure the user has selected an option
  if (userAnswer.length > 0) {
    userAnswer = userAnswer[0].value;
    return userAnswer;
  } else {
    // ALERT WORKS: BUT HOW DO I PREVENT IT FROM MOVIGN TO NEXT QUESTION
    alert("You must select one of the choices");
  }
};

let calcScore = function calcScore() {
  let correctAnswer = allQuestions[questionCounter].correctAnswer;

  if (usersChoice() == correctAnswer) {
    score = 1;
  } else {
    score = 0;
  }

  // update total score global variable
  totalScore += score;
};

let removeOptions = function removeOptions() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
};

let buttonLogic = function buttonLogic() {
  if (questionCounter < totalQuestions) {
    removeOptions();
    quiz();
  }

  if (questionCounter == totalQuestions) {
    // remove the next button
    nextButton.parentNode.removeChild(nextButton);

    const dselectall = () => {
      answers.forEach((usersChoice) => (usersChoice.checked = false));
    };

    // removes the list of options
    removeOptions();

    // output the users score
    let result = `
     Total Score =${totalScore}
     `;
    question.innerHTML = result;
    prevButton.parentNode.removeChild(prevButton);
    // add "take quiz again" button
  }

  if (questionCounter == 0) {
    prevButton.style.display = "none";
    submButton.style.display = "none";
    if (questionCounter < 5) {
      submButton.disabled = true;
      submButton.style.display = "none";
    }

    if (questionCounter == 4) {
      prevButton.disabled = true;
      nextButton.disabled = true;
    }
  }
};

//  when the user clicks next button
let next = function () {
  calcScore();
  questionCounter++;
  progressBarFull.style.width = `${(questionCounter / totalQuestions) * 100}%`;
  console.log(`You scored ${score} on this question`);
  buttonLogic();
  const dselectall = () => {
    answers.forEach((usersChoice) => (usersChoice.checked = false));
  };

  prevButton.disabled = false;
  submButton.disabled = true;
  if (questionCounter == 4) {
    prevButton.style.display = "none";
    nextButton.disabled = true;
    nextButton.style.display = "none";
    submButton.disabled = false;
  }
};

let submit = function () {
  calcScore();
  questionCounter++;
  progressBarFull.style.width = `${(questionCounter / totalQuestions) * 100}%`;
 // console.log(`Your total score is ${totalScore}`);
  buttonLogic();
  submButton.disabled = true;
  submButton.style.display = "none";
};

// What happens when the user clicks previous button
let prev = function () {
  questionCounter--;
  if (!totalScore == 0) {
    totalScore--;
  }
  console.log(`You scored ${score} on this question`);
  buttonLogic();
};

// on clicking the next button
nextButton.addEventListener("click", next);
prevButton.addEventListener("click", prev);
submButton.addEventListener("click", submit);
