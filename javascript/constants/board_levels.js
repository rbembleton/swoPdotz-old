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
    isGoalBased: true,
    size: 16,
    colors: [0,1,2,3,4,7,9],
    goals: {
      star: 5,
      plus: 5
    },
    moves: 20,
    fruitify: true
  }
};
