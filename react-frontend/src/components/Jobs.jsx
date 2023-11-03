import React, { useState } from 'react'
import Searchbar from "./Searchbar"
import Cards from "./Cards"
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
function Jobs() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const handleChange = (value) => {
    setInput(value);

  }
  return (
    <div>
      <div>
        <div className="search-bar-container">
          <Searchbar setResults={setResults} />
          <div className='m-4'></div>
          <div>
            {/* <form className='d-flex input-group w-auto px-5 '> */}
            <MDBCol>
              <div className='d-flex input-group w-auto px-4 '>
              <input type='search' className='' placeholder='Type query' value={input} onChange={(e) => handleChange(e.target.value)} aria-label='Search' />
              <div className='d-grid '><MDBBtn color='primary'>Search</MDBBtn></div>
            </div></MDBCol>
            
          </div>
          {results && results.length > 0 && <Cards results={results} />}
        </div>
        
      </div>
      <div style={{ margin: "25px" }}> <Cards /></div>
      
    </div>
  )
}

export default Jobs;
