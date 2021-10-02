

let container = document.querySelector("div");
   
let startBtn = document.querySelector("button");
let questionBox = document.createElement("div");
let nextBtn = document.createElement("button");
let form=document.querySelector('form');
let currentCount = 0;
let answer;
let parsedData = [];
let correctAnswers = [];
let selectedOptions = [];
fetchData = async () =>
  //Making A Request to Api
  {
    let cat=document.getElementById("category").value;
    let diff=document.getElementById("difficulty").value;
    if(cat=="any")
    {
        console.log("no cat selected")
        cat=9;
    }
    console.log(cat);
    const url =
      `https://opentdb.com/api.php?amount=11&category=${cat}&difficulty=${diff}&type=multiple`;

    let response = await fetch(url);
    let data = await response.json();
    return data.results;
};

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const addItems = () => {
    console.log(`current Count=${currentCount}`);
  let option1 = document.getElementById("option1");
  let option2 = document.getElementById("option2");
  let option3 = document.getElementById("option3");
  let option4 = document.getElementById("option4");

  option1.classList.remove("selected");
  option2.classList.remove("selected");
  option3.classList.remove("selected");
  option4.classList.remove("selected");

  if (currentCount === parsedData.length - 1)
  {
    //   console.log(`Your Submission:${selectedOptions} Correct Answer${correctAnswers}`);
    checkAnswer();
    document.body.removeChild(container);
  
  }
   else 
   {
    let finalOptions = [];
    for (let i = 0; i < 3; i++) {
      finalOptions[i] = parsedData[currentCount].incorrect_answers[i];
    }
    finalOptions[3] = parsedData[currentCount].correct_answer;

    shuffle(finalOptions);
    
    let htmlCorrectAnswer=document.createElement('p');
    htmlCorrectAnswer.innerHTML=parsedData[currentCount].correct_answer;
    correctAnswers.push(htmlCorrectAnswer.innerHTML);
    
    questionBox.innerHTML = `${currentCount+1}/${parsedData.length-1} <br>${parsedData[currentCount].question}`;
    option1.innerHTML = finalOptions[0];
    option2.innerHTML = finalOptions[1];
    option3.innerHTML = finalOptions[2];
    option4.innerHTML = finalOptions[3];
    currentCount = currentCount + 1;

  }
};

const startQuiz = async () =>
{
    const pData=await fetchData();
    parsedData=pData;
   
    console.log(parsedData);
    let heading=document.querySelector('h1');
    container.removeChild(form);
    container.removeChild(heading);
    container.style.display="block";
    questionBox.classList.add("questionBox");
  container.appendChild(questionBox);


  let optionsBox = document.createElement("div");
  optionsBox.classList.add("optionsBox");

  for (let i = 0; i < 4; i++)
  {
    let optionDiv = document.createElement("div");
    optionDiv.classList.add("optionDiv");
    optionDiv.setAttribute("id", `option${i + 1}`);
    optionDiv.addEventListener("click", () => {
        //Single Div Selection

      var selectedEl = document.querySelector(".selected");
      if (selectedEl) {
        selectedEl.classList.remove("selected");
      }
      optionDiv.classList.add("selected");

      answer = optionDiv.innerText; //Initializing Answer
    });
    optionsBox.appendChild(optionDiv);
  }
  //Creating Next Button
  nextBtn.classList.add("nextBtn");
  nextBtn.innerText = "Next >";
  nextBtn.setAttribute(
    "style",
    "padding:10px 20px;background-color:#00aeff;border-radius:5px;border:none"
  );
  nextBtn.setAttribute("onclick", "addSelectedOption(),addItems()");

  container.removeChild(startBtn);
  container.appendChild(optionsBox);
  container.appendChild(nextBtn);


  addItems();
};




const addSelectedOption = () => {
     selectedOptions.push(answer);
    //  correctAnswers.push(parsedData[currentCount].correct_answer);

//   let statement = `Your Answer: ${answer} Correct Answer: ${parsedData[currentCount].correct_answer}`;
//   console.log(statement);
};
function checkAnswer()
{
    let total = 0;
    for(let i=0;i<10;i++)
    {
        if(selectedOptions[i]===correctAnswers[i])
        {
            total=total+1;
        }
    }
 
    let resultBox=document.createElement('div');
    resultBox.classList.add("resultBox");
    
    let result = document.createElement("h1");
    result.innerHTML=`Result: ${total}/${parsedData.length-1}`;
    
    let tryAgainBtn=document.createElement('button');
    tryAgainBtn.innerText="Try Again";
    tryAgainBtn.setAttribute('onclick','reload()');
    tryAgainBtn.classList.add('tryAgainBtn');

    resultBox.appendChild(result);
    resultBox.appendChild(tryAgainBtn);
    document.body.appendChild(resultBox);
 
}
function reload()
{
    document.location.reload();
}