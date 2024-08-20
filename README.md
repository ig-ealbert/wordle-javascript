# Wordle

## Overview

Wordle gives you five tries to guess a five letter word. It provides feedback if any of the letters are correctly guessed and placed (green), or if any of the letters are correct but in the wrong place (yellow).

The word list is from [this website](https://byjus.com/english/5-letter-words/).

## Logic

While the most direct approach would be to go through all the letters in order and provide feedback with styles as we go, this doesn't allow us to properly assess if a letter is correct but in the wrong place. The problem is that we need to take into account all of the "green" (right letter in the right place) letters first, so we know if another instance of a letter we've already encountered is in the wrong place, or is unnecessary.

To properly provide feedback, we have to check for the green letters first and keep track of any that were found. Then we have to check for yellow letters and see if the letter has more total occurrences than we've already found.

This makes the logic rather complex, but breaking it down into multiple functions makes it more readable.

With this approach, we can draw the entry in the guess history first, and style it in two passes.

## Error Handling

Because Wordle uses a 5-letter word, we have to make sure that the user guessed 5 letters. If they guessed more, truncate the guess to 5 letters. If they guessed less, fill in the guess with `x`.
