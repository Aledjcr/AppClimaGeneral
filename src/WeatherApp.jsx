import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [error, setError] = useState(null) // Estado para manejar posibles errores, si tipean mal la cuidad o ponen  algun dato invalido.


    const getWeather = async (city) => {
        setError(null) // Limpia errores previos
        setWeatherData(null) // Limpiar datos previos
        try {
            const res = await fetch(`/.netlify/functions/getWeather?city=${city}`);
            const data = await res.json();
            if (res.ok && !data.error) {
                setWeatherData(data);
                setCity('') // Limpiar input tras éxito
            } else {
                setError('Ciudad no encontrada o error en la consulta');
            }
        } catch (e) {
            setError('Error de red o del servidor');
        }
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        getWeather(city)
    }

    return (
        <div className="container">
            <h1>Quiero saber el clima en:</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingresa una ciudad o país"
                    value={city}
                    onChange={handleCityChange}
                />
                <button type="submit">Buscar</button>
            </form>

            {error && (
                <div className="error">{error}</div>
            )}

            {weatherData && (
                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>La temperatura actual es </p><br />
                    <p className='temp'>{Math.round(weatherData.main.temp)}°C</p>
                    <p>Condición meteorológica actual: {weatherData.weather[0].description}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                    />
                </div>
            )}

        </div>
    )
}
