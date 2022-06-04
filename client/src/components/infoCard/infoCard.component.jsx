import React from 'react';
import { Card, Col } from 'react-bootstrap';
import './infoCard.styles.scss';

function InfoCard({info}) {

    function generateWeatherIcon(weather) {

        const Rain = "rain";
        const Sun = "sun";
        const Cloud = "cloud";

        if (weather.toLowerCase().includes(Cloud)) {
            return "cloudy.png";
        } else if (weather.toLowerCase().includes(Sun)) {
            return "sunny.png"
        } else if (weather.toLowerCase().includes(Rain)) {
            return "rainy.png"
        } else {
            return "default.png"
        }

    }

    return (
        <>
            {

                info.forecast !== undefined ?

                <Col xs={4}>
                    <Card style={{'margin': '5px'}}>
                        <Card.Body className="colCardBody">
                            <Card.Img className="cardImg" src={`/images/${generateWeatherIcon(info.forecast)}`}/>
                            <Card.Title>
                                <div>{info.name}</div>
                            </Card.Title>
                            <Card.Text>
                                <div>{info.forecast}</div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                : null

            }
            
        </>
    )

}

export default InfoCard;