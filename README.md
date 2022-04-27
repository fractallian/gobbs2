# Gobbs 2

This is a digital version of the game [Gobblet](https://en.wikipedia.org/wiki/Gobblet) written in React for fun by Jeremy Dunn.

To run locally, clone this repo then:

```
cd gobbs2
npm i
npm start
```

You may also play it [here](https://fractallian.github.io/).

## How To Play

From Board Game Geek:

---

Gobblet is an abstract game played on a 4x4 grid with each of the two players having twelve pieces that can nest on top of one another to create three stacks of four pieces.

Your goal in Gobblet is to place four of your pieces in a horizontal, vertical or diagonal row. Your pieces start nested off the board. On a turn, you either play one exposed piece from your three off-the-board piles or move one piece on the board to any other spot on the board where it fits. A larger piece can cover any smaller piece. A piece being played from off the board may not cover an opponent's piece unless it's in a row where your opponent has three of his color.

Your memory is tested as you try to remember which color one of your larger pieces is covering before you move it. As soon as a player has four like-colored pieces in a row, he wins — except in one case: If you lift your piece and reveal an opponent's piece that finishes a four-in-a-row, you don't immediately lose; you can't return the piece to its starting location, but if you can place it over one of the opponent's three other pieces in that row, the game continues.

---

You may find more complete rules [here](https://www.boardspace.net/gobblet/english/gobblet_rules.pdf).

## Notes for this version

At this time there has been no attention paid to making the UI look nice. It was built as a side project to explore creating a simple game AI.

- You are White (player2). You go first.
- There is currently no multiplayer capability. You always play vs. CPU
- 3 is the largest piece, 0 is the smallest.
- Squares will highlight red when you move a piece over them where they may not drop - green where they can.
- Dragging a piece does not currently reveal the one below it. You cannot lose this way.
- Good luck winning! ;)
