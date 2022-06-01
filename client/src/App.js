import React from 'react';
import './App.scss';
import LinkButton from './components/linkButton/linkButton.component';

function App() {

  const links = [
    {
      url: '/uen',
      display: 'UEN Validator'
    }, 
    {
      url: '/weather',
      display: 'Weather Forecast'
    }
  ];

  return (
    <div id='homePage'>

      <div id='homePageBox'>

        <div id='homePageTitle'>

          HOME PAGE

        </div>

        <div id='homePageButtons'>

            {
              links.map(link => (
                <LinkButton link={link} />
              ))

            }

        </div>

      </div>

    </div>
  )

}

export default App;