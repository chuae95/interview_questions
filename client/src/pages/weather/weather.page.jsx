import React, { useEffect, useState } from 'react';
import { 
    Card,
    Row,
    Col
 } from 'react-bootstrap';
import DropDown from '../../components/dropDown/dropDown.component';
import InfoCard from '../../components/infoCard/infoCard.component';
import Loading from '../../components/loading/loading.component';
import './weather.styles.scss';


function WeatherPage() {

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ location, setLocation ] = useState("");
    const [ weather, setWeather] = useState("");
    const [ weatherOptions, setWeatherOptions ] = useState([]);
    const [ starttimeframe, setStartTimeFrame ] = useState("");
    const [ endtimeframe, setEndTimeFrame ] = useState("");

    useEffect(() => {

        setLocation("");
        setWeather("");
        
        retrieveWeatherData();
        
    }, [])

    useEffect(() => {

    }, [ loading ])

    async function retrieveWeatherData() {

        setLoading(true);
        let response = await fetch('/weatherRetrieval');
        let data = await response.json();

        setStartTimeFrame(data.timeframe.start.split('T')[1].split('+')[0])
        setEndTimeFrame(data.timeframe.end.split('T')[1].split('+')[0])

        let options = generateWeatherConditions(data.weather)
        setWeatherOptions(options);

        let result = await generateWeatherForecastsForArea(data.places, data.weather);
        setData(result);
        setLoading(false);

    }

    function generateWeatherConditions(weathers) {

        let weatherData = [];;

        for (const w of weathers) {

            if (!weatherData.includes(w.forecast)) {
                weatherData.push(w.forecast)
            }
            
        }

        return weatherData;

    }

    async function generateWeatherForecastsForArea(placesData, forecastsData) {

        for (let i = 0; i < placesData.length - 1; i ++) {

            for (let j = 0; j < forecastsData.length - 1; j++) {

                if (placesData[i].name == forecastsData[j].area) {
                    placesData[i]['forecast'] = forecastsData[j].forecast;
                }

            }

        }

        let validData = placesData.filter(data => (
            data.forecast != null ? data : null
        ))
        
        return validData;

    };

    function updateLocation(e) {
        setLocation(e.target.value);
    }

    function updateWeather(e) {
        setWeather(e)
    }

    async function searchForResults() {
        setLoading(true);

        let response = await fetch('/weatherRetrieval');
        let data = await response.json();
        let result = await generateWeatherForecastsForArea(data.places, data.weather);

        let filtered = [];

        result.map(place => {
            if (place.name.toLowerCase().includes(location.toLowerCase()) && place.forecast.includes(weather)) {
                console.log(place.forecast.includes(weather))
                filtered.push(place);
            }
        })

        setData(filtered);
        setWeather("");
        setLocation("");
        setLoading(false);
        
    }
    
    return (
        <>
            
                <div id='weatherPage'>

                    <div id = 'weatherPageUserInterface'>

                        <div id = 'weatherPageUserInterfaceBox'>

                            <div id = 'weatherPageDescription'>
                                Current Weather across Singapore 
                                <br />
                                ({starttimeframe} - {endtimeframe})
                            </div>

                            <div id = 'weatherPageUserInputBox'>
                                <input placeHolder='Enter a location here...' value={location} id = 'weatherPageUserInput' onChange={(e) => updateLocation(e)} />

                                <DropDown id='weatherPageUserFilter' selected={weather} options={weatherOptions} updateField={updateWeather} />

                                <button id='weatherPageSearchButton' className='btn btn-block' onClick={() => searchForResults()}>
                                    Search
                                </button>
                            </div>

                            

                        </div>

                    </div>

                    <div id = 'weatherPageInfoDisplay'>

                        {

                            loading ?
                                
                                <Loading />

                                :

                                <div id = 'weatherPageInfoDisplayBox'>
                                    <Row fluid id = 'weatherPageInfoDisplayRow'>

                                        {
                                            data.length !== 0 ? 

                                            data.map(i => (

                                                <InfoCard info={i} />
                                                
                                            )) :

                                            <div>
                                                <div id = 'weatherPageErrorMessage'>
                                                    No valid forecasts matched your filters.
                                                </div>
                                            </div>
                                        }

                                        
                                    </Row>
                                </div>
                    
                        }

                    </div>
            </div>
        </>
    )

}

export default WeatherPage;