// Funcion creada para hacer la consulta 
export async function handler(event) {
  const city = event.queryStringParameters.city;
  const API_KEY = process.env.VITE_OPENWEATHER_API_KEY; // Asegúrate de definir tu API_KEY aquí

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.message || 'Error al obtener el clima' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error de red o del servidor' }),
    };
  }
}
