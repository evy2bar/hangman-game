/**
 *  Create the alphabet 
 */
var alphabet = ['a', 'b', 'c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var buttonContainer = document.querySelector('.keyboard-container');
var missesCount = document.getElementById('misses-count');
var currentCount = 0;
var resetButton = document.getElementById("reset-btn");
var currentWord = '';
var dictionary = ["computer", "java", "activity", "alaska",
"appearance", "javatar", "automobile", "falafel", "birthday",
"canada", "central", "character", "chicken", "chosen", "cutting",
"daily", "darkness", "shawarma", "disappear", "driving", "effort",
"establish", "exact", "establishment", "fifteen", "football",
"foreign", "frequently", "frighten", "function", "gradually",
"hurried", "identity", "importance", "impossible", "invented",
"italian", "journey", "lincoln", "london", "massage", "minerals",
"outer", "paint", "particles", "personal", "physical", "progress",
"quarter", "recognise", "replace", "rhythm", "situation",
"slightly", "steady", "stepped", "strike", "successful", "sudden",
"terrible", "traffic", "unusual", "volume", "yesterday"];

for (var i = 0; i < alphabet.length; i++) {
    var button = document.createElement("button");
    button.onclick = handlerOnClickLetter;
    button.innerHTML = alphabet[i];
    button.classList.add('letter', 'btn-enabled');
    buttonContainer.appendChild(button);
}
/**
 *  Handling on click events on letter buttons
 */
function handlerOnClickLetter(ev) {
    var target = ev.target;
    var clickedLetter = target.textContent;
    if (!target.disabled) {
        target.disabled = true;
        if (currentWord.includes(clickedLetter)) {
            //Show the correct selected letter
            target.classList.replace('btn-enabled', 'btn-disabled-correct');
        }
        else {
            target.classList.replace('btn-enabled', 'btn-disabled-incorrect');
            //Increment misses count 
            currentCount = parseInt(missesCount.innerHTML);
            missesCount.innerHTML = currentCount + 1;
            //Shows when the game is over
            if (currentCount == 5) {
                document.querySelector('.game-over-shade').style.display='block';
                document.getElementById('reset-btn').style.display='block';
            }
        }
    }  
}

// // API calls
// // Create a request variable and assign a new XMLHttpRequest object to it.
// var request = new XMLHttpRequest();

// // Open a new connection, using the GET request on the URL endpoint
// request.open('GET', 'https://od-api.oxforddictionaries.com/api/v1/entries/en/ace/regions=us', true);

// request.onload = function () {
//   // Begin accessing JSON data here
//   var data = JSON.parse(this.response);
//   console.log(data);
// }
// request.setRequestHeader("Access-Control-Allow-Origin", );
// request.setRequestHeader('app_key', '66dc38201b35fa80802b3bb6cf506c60');
// request.setRequestHeader('app_id', 'f5624583');
                
// // Send request
// request.send();




/**
 * Generates a random word
 * @returns {string} a random word from the dictionary
 */
function getNewWord() {
    var randomPos = getRandomArbitrary(0, dictionary.length);
    return dictionary[randomPos];
}

/**
 * Generates an arbitrar number between two numbers (Util function)
 * @returns {number} a random number
 */
function getRandomArbitrary(min, max) {
    var randomFloat = Math.random() * (max - min) + min;
    return Math.floor(randomFloat);
}

function createGhostWord(){
    var word = getNewWord();
    currentWord = word;
    console.log(word);
    var currentWordContainer = document.getElementById('current-word');
    resetWord(currentWordContainer);
    for (var i = 0; i < word.length; i++) {
        var letter = document.createElement("p");
        letter.innerHTML = '_';
        letter.classList.add("hidden-letter");
        currentWordContainer.appendChild(letter);
    } 
}
createGhostWord();

/**
 * Reset the word
 */
function resetWord(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
}
/**
 * Reset the alphabet
 */
function resetAlphabet() {
    var letters = document.getElementsByClassName('letter');
    for (var i = 0; i < letters.length; i++){
        letters[i].classList.replace('btn-disabled-correct', 'btn-enabled');
        letters[i].classList.replace('btn-disabled-incorrect', 'btn-enabled');
    }
}
/**
 * Reset the game
 */
resetButton.onclick = function(){
    resetAlphabet();
    createGhostWord();
    document.querySelector('.game-over-shade').style.display='none';
    document.getElementById('reset-btn').style.display='none';
    currentCount = 0;
    missesCount.innerHTML = '0';
};