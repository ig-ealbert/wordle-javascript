let secretWord = "";
const ALLOWED_GUESSES = 5;
const WORD_LENGTH = 5;
let remainingGuesses = ALLOWED_GUESSES;
const guessHistory = document.getElementById("guessHistory");
const userInput = document.getElementById("currentGuess");
const feedback = document.getElementById("feedback");

window.onload = initialize;

function initialize() {
  const index = Math.floor(Math.random() * words.length);
  secretWord = words[index];
  remainingGuesses = ALLOWED_GUESSES;
  guessHistory.innerHTML = "";
  feedback.innerHTML = "";
  userInput.value = "";
}

function validateGuess(guess) {
  if (guess.length > WORD_LENGTH) {
    return guess.substring(0, WORD_LENGTH);
  }
  if (guess.length < WORD_LENGTH) {
    return `${guess}${"x".repeat(WORD_LENGTH - guess.length)}`;
  }
  return guess;
}

function handleGuess() {
  const userGuess = validateGuess(userInput.value);
  const letters = userGuess.split('');
  drawGuess(letters);
  const greenLetters = markGreenLetters(letters);
  markYellowLetters(letters, greenLetters);
  remainingGuesses--;
  checkForWin();
}

function drawGuess(letters) {
  const guessEntry = document.createElement("div");
  letters.map((letter) => {
    const letterSpan = document.createElement("span");
    letterSpan.innerHTML = letter;
    guessEntry.append(letterSpan);
  });
  guessHistory.append(guessEntry);
}

function styleLetter(className, index) {
  const historyEntry = guessHistory.childNodes[ALLOWED_GUESSES - remainingGuesses];
  const letterSpan = historyEntry.childNodes[index];
  letterSpan.classList.add(className);
}

function markGreenLetters(letters) {
  const greenLetters = [];
  letters.forEach((letter, index) => {
    if (letter === secretWord[index]) {
      styleLetter("green", index);
      greenLetters.push(letter);
    }
  });
  return greenLetters;
}

function getLetterCountInArray(letter, array) {
  const matches = array.filter((arrayLetter) => arrayLetter === letter);
  return matches.length;
}

function markYellowLetters(letters, greenLetters) {
  const yellowLetters = [];
  const secretLetters = secretWord.split('');
  letters.forEach((letter, index) => {
    const allInstances = getLetterCountInArray(letter, secretLetters);
    const greenInstances = getLetterCountInArray(letter, greenLetters);
    const yellowInstances = getLetterCountInArray(letter, yellowLetters);
    if (letter !== secretWord[index] &&
        secretWord.includes(letter) &&
        allInstances > greenInstances + yellowInstances) {
      styleLetter("yellow", index);
      yellowLetters.push(letter);
    }
  });
}

function checkForWin() {
  const userGuess = userInput.value;
  if (userGuess === secretWord) {
    feedback.innerHTML = `You guessed the word in ${ALLOWED_GUESSES - remainingGuesses} guesses!`;
  }
  else if (remainingGuesses === 0) {
    feedback.innerHTML = `The word was ${secretWord}.  Reset the game and try again!`;
  }
}
