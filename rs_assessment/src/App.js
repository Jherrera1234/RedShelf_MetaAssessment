
import './App.css';
import { useState, useEffect } from 'react'


function App() {
  const [metaData, setMetaData] = useState([])
  const [metaTagName, setMetaTagName] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

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
