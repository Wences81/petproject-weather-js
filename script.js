const link =
    "http://api.weatherstack.com/current?access_key=6eccb70a56010d0ed3c11bb19b17a78f";

const root = document.getElementById("root");  

let store = {
    city: 'Madrid',
    feelslike: 0,
    temperature: 0,
    observationTime: '00:00 AM',
    isDay: 'yes',
    description: "",
    properties: {
        cloudcover: 0,
        humidity: 0,
        windSpeed: 0,
        pressure: 0,
        uvIndex: 0,
        visibility: 0,
    }
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
        feelslike,
        temperature,
        observationTime,
        description: description[0],
        properties: {
            cloudcover: `${cloudcover}%`,
            humidity: `${humidity}%`,
            windSpeed: `${windSpeed}km/h`,
            pressure: `${pressure}%`,
            uvIndex: `${uvIndex}/100`,
            visibility: `${visibility}%`,
        },    
        
    };

    renderComponent();
};

const getImage = (description) => {
    const value = description.toLowerCase();

    switch (value) {
        case 'partly cloudy':
            return 'patly.png';
        case 'cloud':
            return 'cloud.png';
        case 'fog':
            return 'fog.png';
        case 'sunny':
            return 'sunny.png';
        case 'clear':
            return 'clear.png';
        default:
            return 'the.png'
    }
};

const renderProperty = (properties) => {
    console.log(properties)
    return ` 
  <div class='property'>
    <div class='property-icon'>
       <img src='./img/icons/${icon}' alt=''>
    </div>
    <div class='property-info'>
       <div class='property-info__value'>${value}</div>
       <div class='property-info__description'>${title}</div>
    </div>  
   </div>  `
};
    

const markup = () => {
    const { city, description, observationTime, temperature, isDay, properties } = store;

    const containerClass = isDay === 'yes' ? 'is-day' : '';

    return `<div class='container ${containerClass}'>
              <div class='top'>
               <div class='city'>
                   <div class='city-subtitle'>Weather Today in</div>
                   <div class='city-title' id='city'>
                   <span>${city}</span>
                   </div>
                </div>
                <div class='city-info'>
                   <div class='top-left'>
                   <img class='icon' src='./img/${getImage(description)}' alt='' />
                   <div class='description'>${description}</div>
                   </div>
                   
                   <div class='top-right'>
                   <div class='city-info__subtitle'> as of ${observationTime}</div>
                   <div class='city-info__title'>${temperature}°C</div>
                   </div>
                </div>
               </div>
              <div id='properties'>${renderProperty(properties)}</div>
            </div> `;
};

const renderComponent = () => {
    root.innerHTML = markup();
}

fetchData();