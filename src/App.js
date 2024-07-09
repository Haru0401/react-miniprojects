import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const apiKey = 'b56f2562f3ea3c9e81bc770a93d8e626';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
      
      axios.get(url).then((response) => {
        setData(response.data);
        setError('');
        console.log(response.data);
      }).catch((error) => {
        setError('City not found');
        setData({});
      });
      setLocation('');
    }
  };

  return (
    <div className='app'>
      <div className='search'>
        <input
          type='text'
          placeholder='Enter location'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
        />
      </div>
      <div className='container'>
        {error && <p className='error'>{error}</p>}
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : ''}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name && (
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
