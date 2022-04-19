import React, { Component } from 'react';
import axios from 'axios';
import "../Css/WeatherCard.css";
import $ from 'jquery';

let cities = require('../city.list.json');
let backgrounds = require('../city.backgrounds.json');
let localCity = require('../city.local.json');

class WeatherCard extends Component {

    constructor() {
        super();
        this.state = {
            location: undefined,
            temp: undefined,
            temp_min: undefined,
            temp_max: undefined,
            winds: undefined,
            description: undefined,
            humidity: undefined,
            icoin: undefined,
            background: undefined,
            status: undefined,
            flag: false
        }
    }

    randomCity() {
        let city = cities[Math.floor(Math.random() * cities.length)];
        //console.log(city);
        let apiKey = 'b26b3bd97e976ea0769e263ae8d85aeb';
        this.getValue(city, apiKey);
        //console.log(this.state.id);
    }

    getValue(city, apiKey) {
        let url = 'https://api.openweathermap.org/data/2.5/weather?id=' + city.id + '&appid=' + apiKey;

        axios
            .get(url)
            .then((res) => {
                this.setState({
                    status: res.status,
                    location: res.data.name,
                    temp: res.data.main.temp,
                    temp_min: res.data.main.temp_min,
                    temp_max: res.data.main.temp_max,
                    winds: res.data.wind.speed,
                    description: res.data.weather[0].description,
                    humidity: res.data.main.humidity,
                    icoin: "https://openweathermap.org/img/w/" + res.data.weather[0].icon + ".png",
                    background: this.findBackground(res.data.weather[0].id),
                    flag: true
                })
                /*  console.log(res);
                 this.setState({
                     status: res.status
                 }) */
            });
    }

    findBackground(city) {
        for (let i = 0; i < backgrounds.length; i++)
            if (backgrounds[i].code === city)
                return backgrounds[i].url;
    }

    render() {
        console.log(this.state);
        if (this.state.flag === false) {
            const date = new Date();
            $('.cr-left').css('background-image', localCity[0].background);
            console.log(localCity[0].background)

            return (
                <div className='card cr-weather'>
                    <div className='cr-left'>
                        <h3>{date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}</h3>
                        <h4>{localCity[0].location}</h4>

                        <img className='img img-fluid' src={localCity[0].icoin} alt="icon of weather app!"></img>
                        <h1>{localCity[0].description}</h1>
                        <p>{localCity[0].temp + "°F"}</p>
                    </div>

                    <div className='cr-right'>
                        <h3>humidity: {localCity[0].humidity}</h3>
                        <h5>max: {localCity[0].temp_max + "°F"}</h5>
                        <h5>min: {localCity[0].temp_min + "°F"}</h5>
                        <h5>wind: {localCity[0].winds + " km/h"}</h5>

                        <button className='btn' onClick={() => this.randomCity()}>change location</button>
                    </div>



                </div>
            );

        }
        else {
            const date = new Date();
            $(".cr-left").css("background-image", 'url(' + this.state.background + ')');
            return (
                <div className='card cr-weather'>
                    <div className='cr-left'>
                        <h3>{date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}</h3>
                        <h4>{this.state.location}</h4>

                        <img className='img img-fluid' src={this.state.icoin} alt="icon of weather app!"></img>
                        <h1>{this.state.description}</h1>
                        <p>{this.state.temp + "°F"}</p>
                    </div>

                    <div className='cr-right'>
                        <h3>humidity: {this.state.humidity}</h3>
                        <h5>max: {this.state.temp_max + "°F"}</h5>
                        <h5>min: {this.state.temp_min + "°F"}</h5>
                        <h5>wind: {this.state.winds + " km/h"}</h5>

                        <button className='btn' onClick={() => this.randomCity()}>change location</button>
                    </div>



                </div>
            );
        }
    }
}

export default WeatherCard;