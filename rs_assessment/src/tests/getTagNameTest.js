const getTagNameTest = (str) => {
  const match = 'name=';
  const found = str.match(match);
  let indexOfFirst = str.indexOf('"')
  let second = str.indexOf('"', indexOfFirst + 1)
  let arr = []
  for (let i = indexOfFirst + 1; i < second; i++) {

    arr.push(str[i])
  }
  let newStuff = arr.join('')
  console.log(arr)
  str = str.replace(found[0], '')
  str = str.replace('"' + newStuff + '"', '')
  return newStuff
}
module.exports = getTagNameTest