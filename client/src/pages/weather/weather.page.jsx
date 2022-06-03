import React, { useEffect, useState } from 'react';
import { 
    Card,
    Row,
    Col
 } from 'react-bootstrap';
 import { Dropdown, DropdownButton } from 'react-bootstrap';

function WeatherPage() {

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ location, setLocation ] = useState("");
    const [ weather, setWeather] = useState("");
    const [ weatherOptions, setWeatherOptions ] = useState([]);

    useEffect(() => {
        
        retrieveWeatherData();
        
    }, [])

    useEffect(() => {

    }, [ loading ])

    async function retrieveWeatherData() {

        setLoading(true);
        let response = await fetch('/weatherRetrieval');
        let data = await response.json();

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

        return placesData;

    };

    function updateLocation(e) {
        setLocation(e.target.value);
    }

    function updateWeather(e) {
        setWeather(e)

        searchForResults(location)
    }

    async function searchForResults(str) {
        setLoading(true);

        let response = await fetch('/weatherRetrieval');
        let data = await response.json();
        let result = await generateWeatherForecastsForArea(data.places, data.weather);

        let filtered = [];

        result.map(location => {
            if (location.name.includes(str) && location.forecast === weather) {
                filtered.push(location);
            }
        })

        setData(filtered);
        setLoading(false);
    }
    
    return (
        <>
            {
                loading ?
                    <div>Loading Screen</div>
                :
                <div>

                    <div>
                            Current Weather across Singapore (2hr Forecast)
                    </div>

                    <div>
                        <input onChange={(e) => updateLocation(e)} />
                        <button onClick={() => searchForResults(location)}>
                            Search
                        </button>
                    </div>

                    <DropdownButton
                        alignRight
                        title="Filter by Weather"
                        id="dropdown-menu-align-right"
                        onSelect={updateWeather}
                    >
                        {
                            weatherOptions.map(w => (
                                <Dropdown.Item eventKey={w}>{w}</Dropdown.Item>
                            ))
                        }
                        
                    </DropdownButton>

                    <div>
                        <Row>
                            {data.map(i => (
                                <>
                                    <Col xs={4}>
                                        <Card>
                                            <div>{i.name}</div>
                                            <div>{i.forecast}</div>
                                        </Card>
                                    </Col>
                                </>
                            ))}
                        </Row>
                    </div>
                </div>

            }
        </>
    )

}

export default WeatherPage;