# Tic-Tac-Toe

Recreation of tic-tac-toe in Javascript, HTML, and CSS. This project was
primarily an exploration into Javascript as a functional programming language.

I kept track of the game state via arrays and tried to create a point system of
sorts to track this state. The purpose of this was two fold:

1. To make it easier to check if a player had won without iterating over all
possible sequences of 3 adjacent positions.
2. So that the AI could decide which move is most likely to
result in a win or most likely to avoid defeat.
