//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

start_btn.onclick = ()=>
{
    info_box.classList.add("activeInfo"); //show the info box
}

exit_btn.onclick = ()=>
{
    info_box.classList.remove("activeInfo"); //hide or close the info box
}

continue_btn.onclick = ()=>
{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz"); //show the quiz box

    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>
{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");

    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;

    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function

    timeText.textContent = "Time Left"; //changing the text of the variable timeText to Time Left
    next_btn.classList.remove("show");
}

quit_quiz.onclick = ()=>
{
    window.location.reload(); //reload window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = ()=>
{
    if(que_count < questions.length - 1)//if question count is less than total question length
    { 
        que_count++;
        que_numb++;

        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function

        timeText.textContent = "Time Left"; //changing the text of the variable timeText to Time Left
        next_btn.classList.remove("show");
    }
    else
    {
        clearInterval(counter); //clear the variable counter
        clearInterval(counterLine); //clear the variable counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index)
{
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i = 0; i < option.length; i++)
    {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//div tags for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer)
{
    clearInterval(counter);
    clearInterval(counterLine); 

    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array

    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns)
    { 
        userScore += 1;
        answer.classList.add("correct"); //coloring the correct answer with green
        answer.insertAdjacentHTML("beforeend", tickIconTag); //displaying the tick icon to correct answer
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }
    else
    {
        answer.classList.add("incorrect"); //coloring the incorrect answer with red
        answer.insertAdjacentHTML("beforeend", crossIconTag); //displaying the incorrect answer with cross icon cross icon
        console.log("Wrong Answer");

        for(i = 0; i < allOptions; i++)
        {
            if(option_list.children[i].textContent == correcAns) //if there is an option which is matched to an array answer 
            { 
                option_list.children[i].setAttribute("class", "option correct"); //coloring the matching answer with green
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //displaying the tick icon to the matching answer
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i = 0; i < allOptions; i++)
    {
        option_list.children[i].classList.add("disabled"); //when the user choose one answer disable others once
    }
    next_btn.classList.add("show"); //if the user choosed somthing show the next button show
}

function showResult()
{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");

    if (userScore > 8)
    { 
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>And congrats! You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 3)
    { 
        let scoreTag = '<span>And nice, you got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else
    { 
        let scoreTag = '<span>And sorry, you got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time)
{
    counter = setInterval(timer, 1000);
    function timer()
    {
        timeCount.textContent = time; //changing the value of the variable timeCount with time
        time--;

        if(time < 9)
        { 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0)
        { 
            clearInterval(counter);
            timeText.textContent = "Time Off"; //when there is not time left the time text is changing to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array

            for(i = 0; i < allOptions; i++)
            {
                if(option_list.children[i].textContent == correcAns)
                { 
                    option_list.children[i].setAttribute("class", "option correct"); //coloring the matching answers with green
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //displaying the  tick icon to matched answers
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i = 0; i < allOptions; i++)
            {
                option_list.children[i].classList.add("disabled"); //when the user choose an answer disable all others
            }
            next_btn.classList.add("show"); //showing the next button
        }
    }
}

function startTimerLine(time)
{
    counterLine = setInterval(timer, 29);

    function timer()
    {
        time += 1; 
        time_line.style.width = time + "px"; //increasing width of the variable time_line with px by time value

        if(time > 549)
        { 
            clearInterval(counterLine); //clear the variabel counterLine
        }
    }
}

function queCounter(index)
{
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}
