module.exports = {
  'infinity': {
    isGoalBased: false,
    size: 12,
  },
  'one': {
    name: 'one',
    isGoalBased: true,
    size: 10,
    colors: [1,3,5,6,9],
    goals: {
      triangle: 20,
    },
    moves: 25,
    nextLevel: 'two'
  },
  'two': {
    name: 'two',
    isGoalBased: true,
    size: 10,
    colors: [1,2,3,4,7,8],
    goals: {
      square: 10,
      heart: 10
    },
    moves: 25,
    nextLevel: 'three'
  },
  'three': {
    name: 'three',
    isGoalBased: true,
    size: 10,
    colors: [1,2,3,4,7],
    goals: {
      star: 3
    },
    moves: 20,
    nextLevel: 'four'
  },
  'four': {
    name: 'four',
    isGoalBased: true,
    size: 10,
    colors: [3,4,5,6,7],
    goals: {
      square: 5,
    },
    moves: 10,
    nextLevel: 'five'
  },
  'five': {
    name: 'five',
    isGoalBased: true,
    size: 10,
    colors: [0,3,4,5,6,7],
    goals: {
      heart: 20
    },
    moves: 20,
    nextLevel: 'six'
  },
  'six': {
    name: 'six',
    isGoalBased: true,
    size: 10,
    colors: [1,2,3,5,7,9],
    goals: {
      sphere: 3
    },
    moves: 30,
  },
};
