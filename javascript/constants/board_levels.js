module.exports = {
  'infinity': {
    isGoalBased: false,
    size: 16,
  },
  'ilikewinning': {
    isGoalBased: false,
    size: 16,
    colors: [1,3,8]
  },
  'coolcolors': {
    isGoalBased: false,
    size: 16,
    colors: [5,6,7,8,9]
  },
  'intro': {
    name: 'intro',
    isGoalBased: true,
    size: 12,
    colors: [1,3,5,7,8],
    goals: {
      triangle: 5
    },
    moves: 10,
    nextLevel: 'one'
  },
  'one': {
    name: 'one',
    isGoalBased: true,
    size: 12,
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
    size: 14,
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
    size: 12,
    colors: [1,2,3,4,7],
    goals: {
      star: 3
    },
    moves: 20,
    nextLevel: 'bonus'
  },
  'bonus': {
    name: 'bonus',
    isGoalBased: true,
    size: 16,
    colors: [0,1,2,3,4,7,9],
    goals: {
      star: 5,
      plus: 5
    },
    moves: 20,
    fruitify: true,
    nextLevel: 'four'
  },
  'four': {
    name: 'four',
    isGoalBased: true,
    size: 12,
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
    size: 14,
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
    size: 14,
    colors: [1,2,3,5,7,9],
    goals: {
      sphere: 3
    },
    moves: 30,
    nextLevel: 'seven'
  },
  'seven': {
    name: 'seven',
    isGoalBased: true,
    size: 12,
    colors: [1,2,3,4,7],
    goals: {
      asterisk: 3
    },
    moves: 30,
    nextLevel: 'bonus2'
  },
  'bonus2': {
    name: 'bonus2',
    isGoalBased: true,
    size: 16,
    colors: [0,1,2,3,4,5],
    goals: {
      star: 10,
    },
    moves: 25,
    fruitify: true
  }

};
