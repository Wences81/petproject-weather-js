const link =
    "http://api.weatherstack.com/current?access_key=6eccb70a56010d0ed3c11bb19b17a78f";

const root = document.getElementById("root");  

let store = {
    city: 'Madrid',
    feelslike: 0,
    cloudcover: 0,
    temperature: 0,
    humidity: 0,
    observationTime: '00:00 AM',
    pressure: 0,
    uvIndex: 0,
    visibility: 0,
    isDay: 'yes',
    description: "",
    windSpeed: 0,
};

const fetchData = async () => {
    const result = await fetch(`${link}&query=${store.city}`);
    const data = await result.json();

    const {
        current: {
            feelslike,
            cloudcover,
            temperature,
            humidity,
            observation_time: observationTime,
            pressure,
            uv_index: uvIndex,
            visibility,
            is_day: isDay,
            weather_descriptions: description,
            wind_speed: windSpeed
        },
    } = data;

    console.log(data)

    store = {
        ...store,
        isDay,
        pressure,
        uvIndex,
        feelslike,
        cloudcover,
        temperature,
        humidity,
        observationTime,
        visibility,
        windSpeed,
        description: description[0],
    };

    renderComponent();
};

const renderComponent = () => {
    root.innerHTML = `${store.temperature}°C`
}

fetchData();