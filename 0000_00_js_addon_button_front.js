// front js : card count + inter /review + show answer  + resize maing and mainy when screen orientation change  (for front and back)
// when used inside a note template: require : mainy maing and templateBack
var bodyColor = document.body.style.backgroundColor;

// # ...................................... ¤¤¤ if colorBcksAnswerCheckB checked, flash the color of the anwer on the background for 0.5sc

if (sessionStorage.getItem('lastAnswerColor')) {
  if (sessionStorage.getItem('colorBcksAnswerStorage')) {
    document.body.style.backgroundColor = sessionStorage.getItem('lastAnswerColor');
    sessionStorage.setItem('lastAnswerColor', '')
    setTimeout(function () {
      document.body.style.backgroundColor = bodyColor
    }, 500)
  }
}


// // reset lastAnswerColor
// document.body.style.backgroundColor = bodyColor
// sessionStorage.setItem('lastAnswerColor', '')


var jsCardCountCheckBData = document.createElement("div");

jsCardCountCheckBData.innerHTML = `
<div id='card-count' style="text-align: left; display: table-cell;position:absolute ; top:5px;left:7px; padding: = 0px 40px 0px 10px;margin:0px;font-size :15px; width 97%; ">
<div style="color:#63b5f6; display:inline-block;" id="newCard">1</div>
<div style="color:#ea2322; display:inline-block;" id="learnCard">2</div>
<div style="color:#81c784; display:inline-block;" id="reviewCard">3</div>

<!--div style="display: inline-block; padding-left: 30px;"-->


<input type="checkbox" id="ttsAnswerCheckB" name="ttsAnswerCheckB" style="height :10px; width:10px">
<label for="ttsAnswerCheckB">TTS</label>


<input type="checkbox" id="colorBcksAnswerCheckB" name="colorBcksAnswerCheckB" style="height :10px; width:10px">
<label for="colorBcksAnswerCheckB">Color</label>


<input type="checkbox" id="posAnswerButtonsCentralCheckB" name="posAnswerButtonsCentralCheckB" style="height :10px; width:10px">
<label for="posAnswerButtonsCentralCheckB">Center</label>



<!--/div-->
<div style="padding-left: 30px;display: inline-block;" id="data"></div>

</div>
`;

var jsShowAnswerButton = document.createElement("div");
jsShowAnswerButton.innerHTML = '<button id="showAns" onclick="showAnswer()" class="ankiAnswer" style ="display: block;" >Show Answer</button>';


document.body.insertBefore(jsCardCountCheckBData, document.body.firstChild);
document.body.insertBefore(jsShowAnswerButton, document.body.lastChild);

document.getElementById("showAns").addEventListener('mouseup', function () {
  showAnswer()
});


// # ...................................... ¤¤¤  Position answer button
//1) for fist launch, set the storage based on the var the front note template...

if (sessionStorage.getItem('posAnswerButtonsCentralStorage') === null) {
  sessionStorage.setItem('posAnswerButtonsCentralStorage', posAnswerButtonsCentralVar)
}
// ... then set the checkbox accordingly
if (sessionStorage.getItem('posAnswerButtonsCentralStorage') == false) {
  document.getElementById("posAnswerButtonsCentralCheckB").checked = false
} else {
  document.getElementById("posAnswerButtonsCentralCheckB").checked = true
}

// 2)modify the storage according to the state of the button
document.getElementById("posAnswerButtonsCentralCheckB").addEventListener('change', function () {
  if (this.checked) {
    sessionStorage.setItem('posAnswerButtonsCentralStorage', 'true')
  } else {
    sessionStorage.setItem('posAnswerButtonsCentralStorage', '')
  }
});
// 3) call checkorientation to adjust position answersbutton

checkOrientation()

document.getElementById("newCard").innerText = AnkiDroidJS.ankiGetNewCardCount();
document.getElementById("learnCard").innerText = AnkiDroidJS.ankiGetLrnCardCount();
document.getElementById("reviewCard").innerText = AnkiDroidJS.ankiGetRevCardCount();

// # .... * get the interval and number review of the card
document.getElementById("data").innerHTML = "I:" + AnkiDroidJS.ankiGetCardInterval() + " R:" + AnkiDroidJS.ankiGetCardReps();



function checkOrientation() {
  if (window.orientation == 0) {

    if (templateBack) {
      document.getElementById("mainy").style.maxHeight = "620px"
      if (document.getElementById("posAnswerButtonsCentralCheckB").checked == false) {
        document.getElementById("answerButtons").style.bottom = "0px"
      } else {
        document.getElementById("answerButtons").style.bottom = "200px"
      }

    } else {
      document.getElementById("maing").style.maxHeight = "620px"
      if (document.getElementById("posAnswerButtonsCentralCheckB").checked == false) {
        document.getElementById("showAns").style.bottom = "0px"
      } else {
        document.getElementById("showAns").style.bottom = "300px"
      }
    }

  } else {

    if (templateBack) {
      document.getElementById("mainy").style.maxHeight = "280px"

      document.getElementById("answerButtons").style.bottom = "0px"

    } else {
      document.getElementById("maing").style.maxHeight = "280px"
      document.getElementById("showAns").style.bottom = "0px"
    }
  }
}

window.addEventListener("resize", checkOrientation, false);
window.addEventListener("orientationchange", checkOrientation, false);

// (optional) Android doesn't always fire orientationChange on 180 degree turns
setInterval(checkOrientation, 2000);


// # ...................................... ¤¤¤  TTS answer
//1) for fist launch, set the storage based on the var the front note template...
if (sessionStorage.getItem('ttsAnswerStorage') === null) {
  sessionStorage.setItem('ttsAnswerStorage', ttsAnswerVar)
}

// ... then set the checkbox accordingly
if (sessionStorage.getItem('ttsAnswerStorage') == false) {
  document.getElementById("ttsAnswerCheckB").checked = false
} else {
  document.getElementById("ttsAnswerCheckB").checked = true
}

// 2) modify the storage according to the state of the button
document.getElementById("ttsAnswerCheckB").addEventListener('change', function () {
  if (this.checked) {
    sessionStorage.setItem('ttsAnswerStorage', 'true')
  } else {
    sessionStorage.setItem('ttsAnswerStorage', '')
  }
});


// # ...................................... ¤¤¤  color bkg when answer
//1) for fist launch, set the storage based on the var the front note template...
if (sessionStorage.getItem('colorBcksAnswerStorage') === null) {
  sessionStorage.setItem('colorBcksAnswerStorage', colorBcksAnswerVar);
}

// ... then set the checkbox accordingly
if (sessionStorage.getItem('colorBcksAnswerStorage') == false) {
  document.getElementById("colorBcksAnswerCheckB").checked = false
} else {
  document.getElementById("colorBcksAnswerCheckB").checked = true
}

// 2)modify the storage according to the state of the button
document.getElementById("colorBcksAnswerCheckB").addEventListener('change', function () {
  if (this.checked) {
    sessionStorage.setItem('colorBcksAnswerStorage', 'true')
  } else {
    sessionStorage.setItem('colorBcksAnswerStorage', '')
  }
});