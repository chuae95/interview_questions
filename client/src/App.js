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

        <div id = 'homePageDescription'>
          Created by : Eugene Chua
          <br />
          <div id = 'homePageExplanation'>
          To begin, simply select either of the buttons below to try out the Uen or Weather function
          </div>
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