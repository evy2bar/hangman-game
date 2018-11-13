/**
 *  Task for today - Create the HINTS 0/2
 */



var alphabet = ['a', 'b', 'c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var buttonContainer = document.querySelector('.keyboard-container');
var missesCount = document.getElementById('misses-count');
var currentCount = 0;
var resetButton = document.getElementById("reset-btn");
var currentWordContainer = document.getElementById('current-word');
var currentWord = '';
var letter = '';
var ghostLinesLetters = [];
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

/**
 *  Creates all the alphabet letters as buttons
 */
function createKeyboard() {
    for (var i = 0; i < alphabet.length; i++) {
        var button = document.createElement("button");
        button.onclick = handlerOnClickLetter;
        button.innerHTML = alphabet[i];
        button.classList.add('letter', 'btn-enabled');
        buttonContainer.appendChild(button);
    }
}

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
/**
 * Generates a random word that shows hidden 
 */
function createGhostWord() {
    var word = getNewWord(); 
    currentWord = word;
    console.log(word);
    for (var i = 0; i < word.length; i++) {
        letter = document.createElement("p");
        letter.innerHTML = '_';
        letter.classList.add("hidden-letter");
        currentWordContainer.appendChild(letter);
        ghostLinesLetters.push(letter);
    } 
}
/**
 *  Handling on click events on letter buttons
 */
function handlerOnClickLetter(ev) {
    var target = ev.target;
    var clickedLetter = target.innerHTML;
    var lines = 0;

    if (!target.disabled) {
        target.disabled = true;
        if (currentWord.includes(clickedLetter)) {
            // Show the correct selected letters
            target.classList.replace('btn-enabled', 'btn-disabled-correct');
            // Fill the blanc with the selected letters
            for (var i = 0; i < ghostLinesLetters.length; i++) {
                if (currentWord[i] === clickedLetter) {
                    ghostLinesLetters[i].innerHTML = clickedLetter;
                }
                if (ghostLinesLetters[i].innerHTML === '_') {
                    lines++;
                }
            }
            if (lines === 0) {
                console.log('kudos! you won the game');
                document.querySelector('.kudos-shade').style.display='block';
                document.getElementById('reset-btn').style.display='block';
            }
        }
        else {
            target.classList.replace('btn-enabled', 'btn-disabled-incorrect');
            // Increment misses count 
            currentCount = parseInt(missesCount.innerHTML);
            missesCount.innerHTML = currentCount + 1;
            // Shows when the game is over
            if (currentCount == 5) {
                document.querySelector('.game-over-shade').style.display='block';
                document.getElementById('reset-btn').style.display='block';
            }
        }
    }  
}

/**
 * Removes each element inside the letters' container
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
 * Event hndler for the reset game button
 */
function handlerOnClickResetGame() {
    currentCount = 0;
    ghostLinesLetters = [];
    missesCount.innerHTML = '0';
    document.querySelector('.game-over-shade').style.display='none';
    document.querySelector('.kudos-shade').style.display='none';
    document.getElementById('reset-btn').style.display='none';
    resetAlphabet();
    resetWord(currentWordContainer);
    createGhostWord();
    const keyboardButtons = buttonContainer.getElementsByClassName('letter');
    for (var i = 0; i < keyboardButtons.length; i++) {
        keyboardButtons[i].disabled = false;
    }
}

resetButton.onclick = handlerOnClickResetGame;

createGhostWord();
createKeyboard();