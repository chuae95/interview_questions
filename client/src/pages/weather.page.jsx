import React, { useEffect, useState } from 'react';
import { 
    Card,
    Row,
    Col
 } from 'react-bootstrap';

function WeatherPage() {

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const [ location, setLocation ] = useState("");

    useEffect(() => {
        
        retrieveWeatherData();
        
    }, [])

    useEffect(() => {

    }, [ loading ])

    async function retrieveWeatherData() {

        setLoading(true);
        let response = await fetch('/weatherRetrieval');
        let data = await response.json();

        let result = await generateWeatherForecastsForArea(data.places, data.weather);
        setData(result);
        setLoading(false);

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

    async function searchForResults(str) {
        setLoading(true);

        let response = await fetch('/weatherRetrieval');
        let data = await response.json();
        let result = await generateWeatherForecastsForArea(data.places, data.weather);

        let filtered = [];

        result.map(location => {
            if (location.name.includes(str)) {
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