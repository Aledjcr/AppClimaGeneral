// Funcion creada para hacer la consulta 
import axios from 'axios';

export async function handler (event) {
  const city = event.queryStringParameters.city;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: 'Error al obtener el clima' }),
    };
  }
}
