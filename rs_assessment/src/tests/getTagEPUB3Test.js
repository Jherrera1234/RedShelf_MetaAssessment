const getTagEPUB3 = (stri) => {
  const match = 'rel=';
  const match2 = 'property='
  const found = stri.match(match);
  const found2 = stri.match(match2)
  let indexOfFirst = stri.indexOf('l="') + 3
  let second = stri.indexOf('"', indexOfFirst + 1)
  let indexOfProp = stri.indexOf('y="') + 3
  let indexOfProp2 = stri.indexOf('"', indexOfProp + 1)
  let arr = []
  let arr2 = []
  for (let i = indexOfFirst; i < second; i++) {

    arr.push(stri[i])
  }
  for (let i = indexOfProp; i < indexOfProp2; i++) {

    arr2.push(stri[i])
  }
  let newStuff1 = arr.join('')
  let newStuff2 = arr2.join('')
  stri = stri.replace(found[0], '')
  stri = stri.replace(found2[0], '')
  stri = stri.replace('"' + newStuff1 + '"', '')
  stri = stri.replace('"' + newStuff2, '')

  return [newStuff1, newStuff2]
}
module.exports = getTagEPUB3