// back

var backData = {
    "answerButton1": {
        "color": "red",
        "colorClicked": "rgb(255, 90, 90)",
        "tts": "first again"
    },
    "answerButton2": {
        "color": "grey",
        "colorClicked": "rgb(181, 179, 179)",
        "tts": "second hard"
    },
    "answerButton3": {
        "color": "green",
        "colorClicked": "rgb(2, 204, 2)",
        "tts": "third good"
    },
    "answerButton4": {
        "color": "DodgerBlue",
        "colorClicked": "rgb(75, 171, 255)",
        "tts": "fourth easy"
    }
}

// # ...................................... ¤¤¤ prepare DOM for back
var jsAllAnswerButton = document.createElement("div");
jsAllAnswerButton.innerHTML = `
   
   <div id="answerButtons">
   <button id="answerButton1" onclick="fbuttonAnswer(this.id)" class="ankiAnswer ans1"><time id="time1">
   </time><br>Again</button>
   <button id="answerButton2" onclick="fbuttonAnswer(this.id)" class="ankiAnswer ans2"><time id="time2">
   </time><br>Hard</button>
   <button id="answerButton3" onclick="fbuttonAnswer(this.id)" class="ankiAnswer ans3"><time id="time3">
   </time><br>Good</button>
   <button id="answerButton4" onclick="fbuttonAnswer(this.id)" class="ankiAnswer ans4"><time id="time4">
   </time><br>Easy</button>
   </div>
   `;
document.body.insertBefore(jsAllAnswerButton, document.body.lastChild);
document.getElementById("mainy").style.maxHeight = "620px"
document.getElementById("answerButtons").style.display = "flex";
if (window.orientation != 0 || document.getElementById("posAnswerButtonsCentralCheckB").checked == false) {
    document.getElementById("answerButtons").style.bottom = "0px";
}


// # ------------------------------------------------------ ¤¤ modify front element: hide "show answer", set size to maing
if (document.getElementById("showAns") != null) {
    document.getElementById("showAns").style.display = "none";
}
document.getElementById("maing").style.maxHeight = ""
document.getElementById("maing").style.overflowY = "visible"



// # ...................................... ¤¤¤ add  text to button or hide it
if (!AnkiDroidJS.ankiGetNextTime1()) {
    document.getElementById("answerButton1").style.display = "none";
} else {
    document.getElementById("time1").innerText = AnkiDroidJS.ankiGetNextTime1();
}

if (!AnkiDroidJS.ankiGetNextTime2()) {
    document.getElementById("answerButton2").style.display = "none";
} else {
    document.getElementById("time2").innerText = AnkiDroidJS.ankiGetNextTime2();
}

if (!AnkiDroidJS.ankiGetNextTime3()) {
    document.getElementById("answerButton3").style.display = "none";
} else {
    document.getElementById("time3").innerText = AnkiDroidJS.ankiGetNextTime3();
}

if (!AnkiDroidJS.ankiGetNextTime4()) {
    document.getElementById("answerButton4").style.display = "none";
} else {
    document.getElementById("time4").innerText = AnkiDroidJS.ankiGetNextTime4();
}


function fbuttonAnswer(clicked_id) {
    var callAnswerFunction;
    if (clicked_id == "answerButton1") {
        callAnswerFunction = function () {
            buttonAnswerEase1()
        };
    } else if (clicked_id == "answerButton2") {
        callAnswerFunction = function () {
            buttonAnswerEase2()
        };
    } else if (clicked_id == "answerButton3") {
        callAnswerFunction = function () {
            buttonAnswerEase3()
        };
    } else if (clicked_id == "answerButton4") {
        callAnswerFunction = function () {
            buttonAnswerEase4()
        };
    }

    color = backData[clicked_id]["color"]
    colorClicked = backData[clicked_id]["colorClicked"]
    tts = backData[clicked_id]["tts"]
    checkIfBodyBkgColorShouldChange_and_changeIt(color)
    document.getElementById(clicked_id).style.backgroundColor = colorClicked;
    if (document.getElementById("ttsAnswerCheckB").checked == true) {
        AnkiDroidJS.ankiTtsSetLanguage("en-US");
        AnkiDroidJS.ankiTtsSpeak(tts);
        setTimeout(callAnswerFunction, 300)
    } else {
        sessionStorage.setItem('lastAnswerColor', color)
        callAnswerFunction()
    }
}


function checkIfBodyBkgColorShouldChange_and_changeIt(color) {
    if (document.getElementById("colorBcksAnswerCheckB").checked == true) {
        document.body.style.backgroundColor = color;
    }
}