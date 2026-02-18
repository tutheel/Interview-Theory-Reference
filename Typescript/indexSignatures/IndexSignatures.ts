export {};

interface ScoreBoard {
  [username: string]: number;
}

const scores: ScoreBoard = {
  ava: 95,
  liam: 88
};

scores.noah = 91;

console.log("Scoreboard:", scores);
console.log("Ava score:", scores.ava);
