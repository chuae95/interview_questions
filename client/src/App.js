import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function App() {

  

  // useEffect(() => {
  //   fetch("/api")
  //     .then(resp => {
  //       resp.json();
  //     }) 
  //     .then(info => {
  //       setData(info);
  //     }
  //   )
  // }, [])

  return (
    <div>
      Main Page testing v1.0

    <div>
      
        <Link to = '/uen'>
          <button>
            UEN
          </button>
        </Link>

        <Link to = '/weather'>
          <button>
            Weather
          </button>
        </Link>
    </div>

    </div>
  )

}

export default App;