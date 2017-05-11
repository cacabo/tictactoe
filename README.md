# Tic-Tac-Toe

Try it out [here.](http://cameroncabo.com/projects/tictactoe)

Recreation of tic-tac-toe in Javascript, HTML, and CSS. This project was
primarily an exploration into Javascript as a functional programming language.

I kept track of the game state via arrays and tried to create a point system of
sorts to track this state. The purpose of this was two-fold:

1. To make it easier to check if a player had won without iterating over all
possible sequences of 3 adjacent positions.
2. So that the AI could decide which move is most likely to
result in a win or most likely to avoid defeat.

The purpose of this project was not to write perfectly encapsulated code: I used
global variables heavily and integer values where an enumerated type or user
defined type would've made the code a lot more breathable. The true purpose of this
was to get more comfortable with jQuery and Javascript and to write a unique set of
algorithms such that the CPU ensures the user never wins. The project was largely
successful on both of these fronts.
