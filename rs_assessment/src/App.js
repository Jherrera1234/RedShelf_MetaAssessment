
import './App.css';
import { useState, useEffect } from 'react'


function App() {
  const [metaData, setMetaData] = useState()
  const [metaTagName, setMetaTagName] = useState([])
  const [metaContent, setMetaContent] = useState([])




  const getTagName = (str) => {
    const match = 'name=';
    const found = str.match(match);
    let indexOfFirst = str.indexOf('"')
    let second = str.indexOf('"', indexOfFirst + 1)
    let arr = []
    for (let i = indexOfFirst + 1; i < second; i++) {

      arr.push(str[i])
    }
    let newStuff = arr.join('')
    str = str.replace(found[0], '')
    str = str.replace('"' + newStuff + '"', '')
    return [newStuff, str]
  }

  const getContent = (string) => {
    const match = 'content=';
    const found = string.match(match);
    let indexOfFirst = string.indexOf('"')
    let second = string.indexOf('"', indexOfFirst + 1)
    let arr = []
    for (let i = indexOfFirst + 1; i < second; i++) {

      arr.push(string[i])
    }
    let newContent = arr.join('')
    string = string.replace(found[0], '')
    string = string.replace('"' + newContent + '"', '')
    return [newContent, string]
  }
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

    return [newStuff1, newStuff2, stri]
  }

  const getContentEPUB3 = (strings) => {
    let indexOfFirst = strings.indexOf('f="') + 3
    let second = strings.indexOf('"', indexOfFirst + 1)
    let indexOfProp = strings.indexOf('">') + 2
    let indexOfProp2 = strings.indexOf('<', indexOfProp + 1)
    let arr = []
    let arr2 = []
    for (let i = indexOfFirst; i < second; i++) {

      arr.push(strings[i])
    }
    for (let i = indexOfProp; i < indexOfProp2; i++) {

      arr2.push(strings[i])
    }
    let newStuff1 = arr.join('')
    let newStuff2 = arr2.join('')
    console.log(newStuff2)
    const match = 'href=';
    const match2 = '">'
    const found = strings.match(match);
    const found2 = strings.match(match2);
    strings = strings.replace(found[0], '')
    strings = strings.replace(found2[0], '')
    strings = strings.replace('"' + newStuff1 + '"', '')
    strings = strings.replace(newStuff2, '')

    return [newStuff1, newStuff2, strings]
  }




  const handleSubmit = (e) => {
    e.preventDefault()

    let dataHolder = metaData
    console.log(dataHolder)
    let tagArr = []
    let contentArr = []
    let epub3Tags = []
    let epub3Content = []
    if (dataHolder) {
      if (dataHolder.includes('name=')) {
        while (dataHolder.includes('name=') && dataHolder.includes('content=')) {

          let tag = getTagName(dataHolder)
          let tagName = tag[0]
          dataHolder = tag[1]
          tagArr.push(tagName)
          let content = getContent(dataHolder)
          let contentInfo = content[0]
          dataHolder = content[1]
          contentArr.push(contentInfo)

        }
      } else if (dataHolder.includes('rel=')) {
        while (dataHolder.includes('rel=') && dataHolder.includes('property=') && dataHolder.includes('href=') && dataHolder.includes('">')) {
          let tags = getTagEPUB3(dataHolder)
          let relName = tags[0]
          let propName = tags[1]
          dataHolder = tags[2]
          epub3Tags.push(relName)
          epub3Tags.push(propName)
          let contentEpub = getContentEPUB3(dataHolder)
          let hrefContent = contentEpub[0]
          let propContent = contentEpub[1]
          dataHolder = contentEpub[2]
          epub3Content.push(hrefContent)
          epub3Content.push(propContent)
        }
      }
      console.log(contentArr, tagArr)
      console.log(epub3Content, epub3Tags, dataHolder)
    }
  }






  return (
    <div className="App">

      <form className='form-sub' onSubmit={handleSubmit}>
        <label className='input-label' > Please paste meta data into the textbox</label>
        <textarea className='input-text' rows={15} cols={50} onChange={(e) => setMetaData(e.target.value)} />
        <button className='submit-button' type='Submit' >Submit</button>

      </form>

      <div className='table-info'>


      </div>
    </div>
  );
}

export default App;
