
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
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';


function App() {
  const [metaData, setMetaData] = useState()
  const [order, setOrder] = useState('asc')
  const [combinedInfo, setCombinedInfo] = useState([])
  const [tagDisplay, setTagDisplay] = useState('asc')
  const [contentDisplay, setContentDisplay] = useState('asc')



  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const getTagName = (str) => {
    // for the epub2 tag names
    const match = 'name=';
    const found = str.match(match);
    // finds the match of the name= in the meta data string
    let indexOfFirst = str.indexOf('"')
    let second = str.indexOf('"', indexOfFirst + 1)
    // line 35 and 36 helps find the first few quotation marks in the meta data string
    let arr = []
    // we create an empty array to push in the string of letters of the tag name
    for (let i = indexOfFirst + 1; i < second; i++) {

      arr.push(str[i])
      // this for loop captures everything inbetween the beginning quotation mark to then ending
    }
    let newStuff = arr.join('')
    // we then join it all
    str = str.replace(found[0], '')
    // we delete the name=
    str = str.replace('"' + newStuff + '"', '')
    // we then delete the tag name and the quotation marks
    // we need to delete all this data to find the content of the tag names in the next function getContent

    return [newStuff, str]
    // we then return the tag name and new string of the meta data
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
    // simply makes an object to hold the data of the meta data to parse it in the table 
  }




  const handleSubmit = (e) => {
    e.preventDefault()
    let dataHolder = metaData
    // once the data is submitted it is put into the meta data state and saved in another variable
    let tagArr = []
    let contentArr = []
    // the arrays for the epub2 meta data, seperated them in order to distinguish between the data when writing the code
    let epub3Tags = []
    let epub3Content = []
    // for the epub3 meta data 
    if (dataHolder) {
      //if the data is submitted and exist the code begins to parse the meta data
      if (dataHolder.includes('name=')) {
        //if statment is used to distinguish between epub2 and epub3 formats name= correlates to the epub2 format
        while (dataHolder.includes('name=') && dataHolder.includes('content=')) {
          //while loop runs until there is no name= and content= in the metadata
          let tag = getTagName(dataHolder)
          //goes to the getTagName function
          let tagName = tag[0]
          // we now have a value that is the tag name of the 
          dataHolder = tag[1]
          // the new string produced with out the name= and tag name attached to it
          tagArr.push(tagName)
          // we push the tag name into the tagArr
          let content = getContent(dataHolder)
          let contentInfo = content[0]
          dataHolder = content[1]
          contentArr.push(contentInfo)
          // same process for content for the tags in the meta data for the epub2 version

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
          // this goes through the same process as the epub3 just rel=, property=, href= and "> are used to find the content 
          //and tag names in the metadata and parse it

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
    //these 2 if statments sorts the both versions of the meta data (epub2&3) and sorts it by the tag names
    // goes into the combinedData function to organize the data before sorting

  }


  const handleClick = (name) => {
    // this function is used to give the action of changing the order of the data from ascending to descending and vice versa
    if (order === 'asc') {
      setOrder('dsc')
    } else {
      setOrder('asc')
    }

    if (name === 'Tag/Property') {
      //if what is clicked belongs to the tag/property the order of the properties change from descending to ascending
      // or vice versa and changes the state of the tag display to show on the screen
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
        setTagDisplay('dsc')
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
        setTagDisplay('asc')
      }
    } else {
      // same process but just for the content information and changing its asortment
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
        setContentDisplay('dsc')
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
        setContentDisplay('asc')
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

      <ThemeProvider theme={darkTheme}>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell ><div onClick={() => { handleClick('Tag/Property') }}>Tag/Property <div>{tagDisplay}</div></div></TableCell>
                <TableCell align='right' ><div onClick={() => { handleClick('Value') }}>Value <div>{contentDisplay}</div></div></TableCell>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
