import { endpoints } from '../config';

async function getWeather(callback, onError) {

    const response = await fetch(endpoints.WEATHER);

    if (response.status === 200) {
        const data = await response.json();
        return callback ? callback(data) : data;
    }

    return onError ? onError(response) : null;
}

export default getWeather;
