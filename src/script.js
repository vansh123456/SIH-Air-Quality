const userTab = document.querySelector("[data-UserWeather]");
const searchTab = document.querySelector("[data-SearchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScrren = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const grantAccessButton = document.querySelector("[data-GrantAccess]");
const condition = document.querySelector(".condition");
const image = document.querySelector(".rotating-image");


image.addEventListener("click", function(){
    location.reload();
});


let currentTab = userTab;
const API_KEY = "db2370419529b294811d3aa712a9903d";
currentTab.classList.add("current-tab");
getfromSessionStorage();


function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");


        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
        }
        else{
            userContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }
}


userTab.addEventListener("click", () =>{
    switchTab(userTab);
});


function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}


async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} = coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScrren.classList.add("active");


    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const response2 = await fetch(
            `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const data = await response.json();
        const data2 = await response2.json();


        loadingScrren.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data,data2);
    }
    catch(err){
        loadingScrren.classList.remove("active");
    }
}


function renderWeatherInfo(weatherInfo , aqiInfo){
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const aqi1 = document.querySelector("[data-aqi]");
    const pm10 = document.querySelector("[data-pm10]");
    const pm25 = document.querySelector("[data-pm25]");
    const co = document.querySelector("[data-co]");
    const ozone = document.querySelector("[data-ozone]");
    const no = document.querySelector("[data-no]");
    const no2 = document.querySelector("[data-no2]");
    const so2 = document.querySelector("[data-so2]");
    const nh3 = document.querySelector("[data-nh3]");




    cityName.innerText = weatherInfo?.name;
    cityName.style.fontFamily = "Montserrat";
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    aqi1.innerText = `${aqiInfo?.list?.[0]?.main?.aqi}`;
    const aqiValue = parseInt(aqi1.innerText);
    condition.innerText = value(aqiValue);
    condition.style.fontFamily = "Montserrat";
    function value(x) {
        if(x===1){
            condition.style.color = "Orange";
            condition.style.fontFamily = "Montserrat";
            return "Good Air Quality in your location";
        }else if(x===2){
            condition.style.color = "Yellow";
            condition.style.fontFamily = "Montserrat";
            return "Fair Air Quality in your location";
        }else if(x===3){
            condition.style.color = "Orange";
            condition.style.fontFamily = "Montserrat";
            return "Moderate Air Quality in your location";
        }else if(x===4){
            condition.style.color = "Red";
            condition.style.fontFamily = "Montserrat";
            return "Poor Air Quality in your location";
        }else{
            condition.style.color = "Maroon";
            condition.style.fontFamily = "Montserrat";
            return "Very Poor Air Quality in your location";
        }
    }
    pm10.innerText = `${aqiInfo?.list?.[1]?.components?.pm10}µg/m3`;
    pm10.style.fontFamily = "Montserrat";
    pm25.innerText = `${aqiInfo?.list?.[1]?.components?.pm2_5}µg/m3`;
    pm25.style.fontFamily = "Montserrat";
    co.innerText = `${aqiInfo?.list?.[1]?.components?.co}ppm`;
    co.style.fontFamily = "Montserrat";
    ozone.innerText = `${aqiInfo?.list?.[1]?.components?.o3}ppb`;
    ozone.style.fontFamily = "Montserrat";
    no.innerText = `${aqiInfo?.list?.[1]?.components?.no}ppb`;
    no.style.fontFamily = "Montserrat";
    no2.innerText = `${aqiInfo?.list?.[1]?.components?.no2}ppb`;
    no2.style.fontFamily = "Montserrat";
    so2.innerText = `${aqiInfo?.list?.[1]?.components?.so2}ppb`;
    so2.style.fontFamily = "Montserrat";
    nh3.innerText = `${aqiInfo?.list?.[1]?.components?.nh3}ppb`;
    nh3.style.fontFamily = "Montserrat";
}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("No Geolocation supported");
    }
}


function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }


    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}


grantAccessButton.addEventListener("click", getLocation);


const seasrchInput = document.querySelector("[data-searchInput]");
document.getElementById("websiteLink").addEventListener("click", function () {
    window.location.href = "https://o2gn171cru4.typeform.com/to/a2aULIJ8";
});


document.querySelector(".btn-rtaqi").addEventListener("click", function(){
    window.location.href = "https://www.aqi.in/";
})
