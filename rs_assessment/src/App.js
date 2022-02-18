
import './App.css';
import { useState } from 'react'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function App() {
  const [metaData, setMetaData] = useState()
  const [order, setOrder] = useState('asc')
  const [combinedInfo, setCombinedInfo] = useState([])




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

  const combinedData = (tagName, contentInfo) => {
    return {
      tagName,
      contentInfo
    };
  }




  const handleSubmit = (e) => {
    e.preventDefault()
    let dataHolder = metaData
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

    }


    if (contentArr.length !== 0) {
      let rows = []
      for (let i = 0; i < contentArr.length; i++) {
        rows.push(combinedData(tagArr[i], contentArr[i]))
      }
      rows = rows.sort(function (a, b) {
        let nameA = a.tagName.toUpperCase()
        let nameB = b.tagName.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1;
        }


        return 0;
      })
      setCombinedInfo(rows)


    } else {
      let rows = []
      for (let i = 0; i < epub3Content.length; i++) {
        rows.push(combinedData(epub3Tags[i], epub3Content[i]))
      }
      rows = rows.sort(function (a, b) {
        let nameA = a.tagName.toUpperCase()
        let nameB = b.tagName.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1;
        }


        return 0;
      })
      setCombinedInfo(rows)
    }


  }


  const handleClick = (name) => {

    if (order === 'asc') {
      setOrder('dsc')
    } else {
      setOrder('asc')
    }

    if (name === 'Tag/Property') {
      if (order === 'dsc') {
        let info = combinedInfo
        info = info.sort(function (a, b) {
          let nameA = a.tagName.toUpperCase()
          let nameB = b.tagName.toUpperCase()
          if (nameA > nameB) {
            return -1
          }
          if (nameA < nameB) {
            return 1;
          }


          return 0;
        })
        setCombinedInfo(info)
      } else {
        let info = combinedInfo
        info = info.sort(function (a, b) {
          let nameA = a.tagName.toUpperCase()
          let nameB = b.tagName.toUpperCase()
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1;
          }


          return 0;
        })
        setCombinedInfo(info)
      }
    } else {

      if (order === 'dsc') {
        let info = combinedInfo
        info = info.sort(function (a, b) {
          let nameA = a.contentInfo.toUpperCase()
          let nameB = b.contentInfo.toUpperCase()
          if (nameA > nameB) {
            return -1
          }
          if (nameA < nameB) {
            return 1;
          }


          return 0;
        })
        setCombinedInfo(info)
      } else {
        let info = combinedInfo
        info = info.sort(function (a, b) {
          let nameA = a.contentInfo.toUpperCase()
          let nameB = b.contentInfo.toUpperCase()
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1;
          }


          return 0;
        })
        setCombinedInfo(info)
      }
    }
  }



  return (
    <div className="App">

      <form className='form-sub' onSubmit={handleSubmit}>
        <label className='input-label' > Please paste meta data into the textbox</label>
        <textarea className='input-text' rows={15} cols={50} onChange={(e) => setMetaData(e.target.value)} />
        <button className='submit-button' type='Submit' >Submit</button>

      </form>

      {/* <div className='table-info'>
        <p>{metaContent[0]}</p>

      </div> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell ><div onClick={() => { handleClick('Tag/Property') }}>Tag/Property</div></TableCell>
              <TableCell align='right' ><div onClick={() => { handleClick('Value') }}>Value</div></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {combinedInfo.map((element, index) => (
              <TableRow
                key={element.tagName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {element.tagName}
                </TableCell>
                <TableCell align="right">{element.contentInfo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
    </div>
  );
}

export default App;
