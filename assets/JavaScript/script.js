// Query selectors
const submitButtonEl = document.querySelector("#submitButton");
const leftSidebarEl = document.querySelector("#left-sidebar");
const mainContentEl = document.querySelector("#main-content");
const statesEl = document.querySelector("#states");
const rightPanelEl = document.querySelector(".right-panel");
const covidInfoEl = document.querySelector("#covid-info");
let city;
let cityPark;
let currentParkList;

// api key for covid api
let covidApiKey = "a61d828378ec47f7a19232209993e4e1"

// Function created to close the right panel where the main content is getting generated
function closeRightPanel() {
    rightPanelEl.classList.remove("show");

    let closedPhraseEl = document.querySelector("#confucius");
    closedPhraseEl.innerHTML ="Wherever you go, go with all your heart - Confucius";

    document.getElementById("state-selection").classList.add("state-select");
    document.getElementById("state-selection").classList.remove("state-selected");

    if (document.getElementById("state-selection").classList.contains("state-selected"))
    document.getElementById("state-selection").classList.toggle("state-select");
    document.getElementById("where-to-label").classList.add('where-to');
    document.getElementById("where-to-label").classList.remove('where-to-selected');
        
    if(document.getElementById("where-to-label").classList.contains("where-to-selected"))
        document.getElementById("where-to-label").classList.toggle("where-to");

    document.getElementById('select-state').classList.add('selection');
    document.getElementById("select-state").classList.remove('select-selected');

    if (document.getElementById("select-state").classList.contains('select-selected'))
        document.getElementById("select-state").classList.toggle("selection");
}

// Weather and Park Apis declared and under onclick function
$('#submitButton').on('click', function() {
    if(city && cityPark) {
        var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=12aee5ec80ede57ba0b91712e6a6f44d';
        var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=imperial&appid=12aee5ec80ede57ba0b91712e6a6f44d';
        var currentPark =  'https://developer.nps.gov/api/v1/parks?stateCode=' + cityPark + '&stateCode=&api_key=aasGgYTFCP5RhABVLXGcydD4VYevDcBYE0c6Qnh2';
        searchWeather(requestUrl);
        getCurrentWeather(currentWeather);
        getCurrentPark(currentPark);
        getCovidInfo(cityPark);
        rightPanelEl.classList.add("show");
        getStateName()
    }
});

// function for getting weather information
function getCurrentWeather(currentWeather) { 
    fetch(currentWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {  

        // CURRENT WEATHER 
        document.getElementById("current-city").innerHTML = data.name.toUpperCase();
        document.getElementById("icon").innerHTML = ("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        document.getElementById("current-temp").innerHTML = data.main.temp + " °F";
        document.getElementById("current-description").innerHTML = data.weather[0].description.toUpperCase()
        });
}

// Getting the list of the parks in the chosen state 
function getCurrentPark(currentPark) { 
    fetch(currentPark)
        .then(function (response) {
            return response.json(); 
        })
        .then(function (data) {  
            currentParkList = data.data;
            let data1 = "";
            currentParkList.forEach((item) => {
                data1 += `  <div class="parkCard" onclick="parkInfo('${item.id}')">
                                <img src=${item.images[0].url}>
                                <p id="park-name-header" class="park-name" data-park-name="${item.fullName}">${item.fullName}</p>
                            </div> `   
            })
            document.getElementById("ParkCards").innerHTML = data1;
        });
        
}

// Information about the chosen park
function parkInfo(id) {
    let info = currentParkList ? currentParkList.find(item => item.id === id): null;
    if(!info) {
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        info = favorites.find(item => item.id === id)
    }
    
    document.getElementById("ParkCards").innerHTML = `
    <h3>${info.fullName }</h3>
    <button class ="favorite" type="button" src="assets/Images/favorite.png" onclick="addFavorite('${info.id}')"></button>
        <p>${info.description}</p>
        <div style="width:100% padding: 50%">
            <img src=${info.images[0].url} style="width:600px; height:400px" class="is-align-self-center">
        </div>
        <div class= "columns" style="margin-left: 20%">
        <div class= "address column is-3">Address: <br>
            ${info.addresses[1].line1} ${info.addresses[1].line2} ${info.addresses[1].line3}, ${info.addresses[1].city}, ${info.addresses[1].postalCode} ${info.addresses[1]. stateCode}
        </div>
        <div class = "phone-number column is-4">Phone Number: ${info.contacts.phoneNumbers[0].phoneNumber}</div>
        <div class= "park-hours column is-4">
            Park Hours: <br>
            Monday: ${info.operatingHours[0].standardHours.monday}<br>
            Tuesday: ${info.operatingHours[0].standardHours.tuesday}<br>
            Wednesday: ${info.operatingHours[0].standardHours.wednesday}<br>
            Thursday: ${info.operatingHours[0].standardHours.thursday}<br>
            Friday: ${info.operatingHours[0].standardHours.friday}<br>
            Saturday: ${info.operatingHours[0].standardHours.saturday}<br>
            Sunday: ${info.operatingHours[0].standardHours.sunday}
        </div>
        
    `;
    rightPanelEl.classList.add("show");
}

// function to show the list of users favorite parks when the favorite parks button is clicked
function showFavorites() {
    if(document.querySelector('.fav_list')) {
        document.querySelector('.fav_list').remove()
        return 
    }
    let localFav = localStorage.getItem('favorites');
    const favorites = JSON.parse(localFav);
    // let btn = document.querySelector('.buttons');
    let list = "<div class='fav_list dropdown-item'>";
    favorites.forEach(el => {
        list += `<a onclick="parkInfo('${el.id}')">${el.fullName}</a><br>`;
    });
    list += "</div>";
    var dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', function(event) {
    event.stopPropagation();
    dropdown.classList.toggle('is-active');
});
    favParksEl.appendChild($(list)[0]);
    // $('#submitButton').click();
    getStateName(true);
    // btn.appendChild(list)
}

// saving users chosen favorite parks in the local storage
function addFavorite(id) {
    const localFav = localStorage.getItem('favorites');
    const favorites = JSON.parse(localFav) || [];
    let info = currentParkList.find(item => item.id === id);

    if(!favorites.find(item => item.id === id )) {
        favorites.push(info);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// going back from the park information page to the park list
function goBack() {
    $('#submitButton').click();
}

// getting chosen parks value and innerText
function currentStateHandler() {
    city = $("#states :selected").text();
    cityPark = $("#states :selected").val();
}
    
// getting weather informaation for 5 days
function searchWeather(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {  

            // MOMENTS.JS FOR WEATHER DATES/DAYS
            let dayOne = moment().add(1, 'days').format("dddd");
            let dayTwo = moment().add(2, 'days').format("dddd");
            let dayThree = moment().add(3, 'days').format("dddd");
            let dayFour = moment().add(4, 'days').format("dddd");


            // NEXT DAY WEATHER DAY 1
            document.getElementById("day-one").innerHTML = dayOne.toUpperCase();
            document.getElementById("icon1").innerHTML = ("<img src='http://openweathermap.org/img/w/" + data.list[8].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            document.getElementById("current-temp1").innerHTML = data.list[8].main.temp + " °F";
            document.getElementById("current-description1").innerHTML = data.list[8].weather[0].description.toUpperCase()

            // NEXT DAY WEATHER DAY 2
            document.getElementById("day-two").innerHTML = dayTwo.toUpperCase();
            document.getElementById("icon2").innerHTML = ("<img src='http://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            document.getElementById("current-temp2").innerHTML = data.list[16].main.temp + " °F";
            document.getElementById("current-description2").innerHTML = data.list[16].weather[0].description.toUpperCase()

            // NEXT DAY WEATHER DAY 3
            document.getElementById("day-three").innerHTML = dayThree.toUpperCase();
            document.getElementById("icon3").innerHTML = ("<img src='http://openweathermap.org/img/w/" + data.list[24].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            document.getElementById("current-temp3").innerHTML = data.list[24].main.temp + " °F";
            document.getElementById("current-description3").innerHTML = data.list[24].weather[0].description.toUpperCase()

            // NEXT DAY WEATHER DAY 4
            document.getElementById("day-four").innerHTML = dayFour.toUpperCase();
            document.getElementById("icon4").innerHTML = ("<img src='http://openweathermap.org/img/w/" + data.list[32].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            document.getElementById("current-temp4").innerHTML = data.list[32].main.temp + " °F";
            document.getElementById("current-description4").innerHTML = data.list[32].weather[0].description.toUpperCase()
            });
}  

// getting the state's name
function getStateName(isFav) {
    let value = statesEl.options[statesEl.selectedIndex].value;
    if (value != "state" || isFav) {
        covidInfoEl.innerHTML = "";
        let selectedPhraseEl = document.querySelector("#confucius");
        selectedPhraseEl.innerHTML = "Wherever you go, go with all your heart <br> - Confucius";

        document.getElementById("state-selection").classList.add("state-selected");
        document.getElementById("state-selection").classList.remove('state-select');

        if (document.getElementById("state-selection").classList.contains("state-select"))
            document.getElementById("state-selection").classList.toggle('state-selected');
        
        document.getElementById("where-to-label").classList.add('where-to-selected');
        document.getElementById("where-to-label").classList.remove('where-to');
        
        if(document.getElementById("where-to-label").classList.contains("where-to"))
            document.getElementById("where-to-label").classList.toggle("where-to-selected");

        document.getElementById('select-state').classList.add('select-selected');
        document.getElementById("select-state").classList.remove('selection');

        if (document.getElementById("select-state").classList.contains('selection'))
            document.getElementById("select-state").classList.toggle("select-selected");
        
    } else {
        closeRightPanel()
    }
}

// Function for getting current covid info by state
function getCovidInfo(stateForCovid) {
    covidApiUrl = `https://api.covidactnow.org/v2/state/${stateForCovid}.json?apiKey=${covidApiKey}`
    fetch(covidApiUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            let casesEl = document.createElement('p');
            if (data.actuals.cases) {
                casesEl.innerHTML = `Cases: ${data.actuals.cases}`
                covidInfoEl.appendChild(casesEl);
            } else {
                casesEl.innerHTML = "Cases: No information available for this State";
                covidInfoEl.appendChild(casesEl);
            }

            let positivesEl = document.createElement('p');
            if (data.actuals.positiveTests) {
                positivesEl.innerHTML = `Positive tests: ${data.actuals.positiveTests}`;
                covidInfoEl.appendChild(positivesEl);
            } else {
                casesEl.innerHTML = "Cases: No information available for this State";
                covidInfoEl.appendChild(positivesEl);
            }

            let deathsEl = document.createElement('p');
            if (data.actuals.deaths) {
                deathsEl.innerHTML = `Deaths: ${data.actuals.deaths}`
                covidInfoEl.appendChild(deathsEl);
            } else {
                casesEl.innerHTML = "Cases: No information available for this State";
                covidInfoEl.appendChild(deathsEl);
            }

            let anchorEl = document.createElement("a");
            anchorEl.setAttribute("href", `${data.url}`);
            anchorEl.setAttribute("target", "_blank")
            anchorEl.text = "Please visit this page for more information"
            covidInfoEl.appendChild(anchorEl);
        })
}