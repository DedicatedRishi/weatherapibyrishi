const timeEl= document.getElementById('time');
const dateEl= document.getElementById('date');
const currentWeatherItemEl= document.getElementById('current-weather-items');
const timezone= document.getElementById('time-zone');
const countryEl=document.getElementById('country');
// country take the value in latitude and longitude
const weatherForecastEl= document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


// now here we will use setInterval function 
// interva is function is that function which get called every after the interval time is get
// over. and 1000 = 1sec time interval means here our function is going to 
// call or reexecute after  every a 1 second.
const days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","sep", "Oct", "Nov", "Dec"];
const API_KEY = "49cc8c821cd2aff9af04c9f98c36eb74";
// this api key is of ashish george tech youtube channel because you api was not working

setInterval(()=>{
    const time= new Date();//here this datefunction provide alldate in time object 
    //and now we are going to seperate it .
    const month = time.getMonth();
    const date = time.getDate();//this will provide value from 1to 31.
    const day= time.getDay();//this will provide value from 1 to 7 thatswhy we 
    //get the days from arry if 7 then it will staurday.
    const hours = time.getHours();
    const HoursIn12HoursFormat = hours >=13 ? hours % 12: hours;
    //hour%(module) 12 means it will divide the hour 
    // by 12 but it will provide the remainder as value
    const minutes = time.getMinutes();
    const twodigit = minutes <10 ? '0'+ minutes: minutes;

// console.log( (date.getMinutes()<10?'0':'') + date.getMinutes() );

    const ampm = hours >=12 ? "PM" : "AM";
    
    timeEl.innerHTML = (HoursIn12HoursFormat<10 ? "0"+HoursIn12HoursFormat:HoursIn12HoursFormat) + ':' + twodigit + ' ' + `<span id="am-pm">${ampm}</span>`;
    // here we write ampm in to back code because we write it in span tag
    // we write ampm in span to show it in previous font size
    
    dateEl.innerHTML =  days[day] + ', '  + date + ' ' + months[month];
    //here days is that array which contains sunday monday
    //and day is the value in no.s received from .getDay() function
}, 1000);
// this is setinterval call this function in every 1sec(1000)


//this is function is created to get latitude and longitude by our location
// function getweatherData(){
//     navigator.geolocation.getCurrentPosition((success) =>{//sucess is just object you can change the object name also rushikesh 
//         console.log(success);
//     })
// }
// getweatherData();
//hurray its worked yes previous time it was showing error good rushkesh.


function getweatherData(){
    navigator.geolocation.getCurrentPosition ((success)=> {
        // we not need all coords of geolocation we
        // need only latitude and longitude so we only write here
        let {latitude, longitude} = success.coords;
        fetch(`
        https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,minutely&appid=${API_KEY}`).then(res => res.json()).then(data => {
//the default unit of this api is in Kelvin we have to convert it into 
//degree celcious thatswhy we write &units=metric without space
        console.log(data)
        showWeatherData(data);
        })
    })
}
getweatherData();
function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
    timezone.innerHTML=data.timezone;
    countryEl.innerHTML= data.lat+"N "+data.lon+"E"
    
    currentWeatherItemEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>wind speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format("HH:mm a")}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format("HH:mm a")}</div>
    </div>`;       
    let= otherDayForcast =""
    data.daily.forEach((day, idx)=>{
        if (idx == 0){
            currentTempEl.innerHTML=`
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" id="w-icon" />
            <div class="other">
                <div class="day">Monday</div>
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div>
            `    
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd') }</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" id="w-icon" />
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>  

            `
        }
        weatherForecastEl.innerHTML= otherDayForcast;

    })

}
