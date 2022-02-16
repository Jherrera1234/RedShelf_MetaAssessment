
import './App.css';
import { useState, useEffect } from 'react'


function App() {
  const [metaData, setMetaData] = useState()
  const [metaTagName, setMetaTagName] = useState([])
  const [metaContent, setMetaContent] = useState([])




  const getTagName = (str) => {
    const regex = 'name=';
    const found = str.match(regex);
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
    const regex = 'content=';
    const found = string.match(regex);
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
  const handleSubmit = (e) => {
    e.preventDefault()

    let dataHolder = metaData
    console.log(dataHolder)
    let tagArr = []
    let contentArr = []
    if (dataHolder) {
      while (dataHolder.includes('name=') && dataHolder.includes('content=')) {

        let tag = getTagName(dataHolder)
        let tagName = tag[0]
        dataHolder = tag[1]
        tagArr.push(tagName)
        console.log(dataHolder)
        let content = getContent(dataHolder)
        let contentInfo = content[0]
        dataHolder = content[1]
        contentArr.push(contentInfo)
        console.log(dataHolder)
      }
    }
    console.log(contentArr, tagArr)
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
