export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const getRandomNumbers = (min, max, amountOfNUmbers) => {
  const arr = []
  while (arr?.length < amountOfNUmbers) {
    const temp = getRandomInt(min, max)
    if (arr.indexOf(temp) === -1) {
      arr.push(temp)
    }
  }
  return arr
}