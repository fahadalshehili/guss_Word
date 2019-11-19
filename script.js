
var words = []
var selectedWord = ""

/**
 * 
 * @param {string} letter 
 * 
 * check if the letter is "?" and add an input element to the #word div 
 */
function loadLetterBox(letter) {
var wordDiv = document.getElementById("word");
if (letter=== "?"){
    wordDiv.innerHTML += `<input class="letter-box wrong" type="text" maxlength="1" value="?"></input>`;
}
else{
    wordDiv.innerHTML += `<input class="letter-box correct" type="text" disabled value="${letter}"></input>`;
}
}

/**
 *  1) Choose a random word from the global words array and set it to the global selectedWord variable 
 *  2) call hideLetters function to hide some letters
 *  3) iterate the word and call loadLetterBox for each letter
 */
function pickWord() {
    var idx = parseInt(Math.random() * words.length);
    selectedWord = words[idx];
    console.log(selectedWord);
    var newWord = hideLetters(selectedWord);
    console.log(newWord);
    for (var i in newWord ){
        var letter = newWord.charAt(i);
        loadLetterBox(letter);
    }
    
}

/**
 * @returns {Array<String>}
 * return a new list of words that only have words with length btw 4 and 9 inclusive
 */
function cleanWordsList() {
    var clean=[];
    for(var i in words){
        if(words[i].length > 3 && words[i].length <10){
            clean.push(words[i]);
        }
    }
    console.log(clean);
    return clean;
}

/**
 * 
 * @param {String} word
 * @returns {String}
 *  
 *  1) convert the word to Array
 *  2) choose two random indixes
 *  3) repalce each with a space
 *  4) convert the Array back to String
 */
function hideLetters(word="") {
    var temp =word.split("");
    var idx = parseInt(Math.random() * word.length);
    temp[idx] ="?";
    var idx = parseInt(Math.random() * word.length);
    temp[idx] ="?";
    if(temp.length >5){
        var idx = parseInt(Math.random() * word.length);
    temp[idx] ="?";
    }
      return temp.join();
    
}

/**
 * for each letter of the global variable selectedWord
 *  1) get the crossbonding input element from the DOM and get its value
 *  2) if the two letters match add 'correct' to the class attribute of the input element
 *  3) if the two letters don't match add 'wrong' to the class attribute of the input element
 * 4) if the whole word match change the img in the img tag to 'happy.png'
 */
function checkGuess() {
    var answer ="";
    for (var i=0; i < selectedWord.length; i++){
        var correctLetter = selectedWord.charAt(i);
        var letterbox = document.querySelector(`#word input:nth-child(${i+1})`);
        var userLetter = letterbox.Value;
        answer +=userLetter;
        if (correctLetter===userLetter){
            letterbox.setAttribute("class","letter-box correct");
        }
    }
    if (answer===selectedWord){
        document.querySelector("img").src = "happy.png";

    }
    
}

/**
 *  1) remove all HTML inside the #word div
 *  2) change the img in the img tag to 'think.png' 
 *  3) call the pickWord function to pick new word
 */
function playAgain() {
    document.getElementById("word").innerHTML="";
    document.querySelector("img").src = "think.png";
    pickWord();

    
}


function loadWords() {
    var file = "https://raw.githubusercontent.com/OmarInCS/GuessWordApp/master/words.txt";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            words = rawFile.responseText.split("\n");
            words = cleanWordsList();
            pickWord();
        }
    }
    rawFile.send()
}

document.addEventListener("DOMContentLoaded", loadWords);
// register the onclick event for 'bt-check' and 'bt-again'
document.getElementById("bt-check").onclick = checkGuess;
document.getElementById("bt-again").onclick = playAgain;