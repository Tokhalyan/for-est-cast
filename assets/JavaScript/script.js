// Query selectors
const submitButtonEl = document.querySelector("#submitButton");
const leftSidebarEl = document.querySelector("#left-sidebar");
const mainContentEl = document.querySelector("#main-content");
const statesEl = document.querySelector("#states");
const rightPanelEl = document.querySelector(".right-panel");
const covidInfoEl = document.querySelector("#covid-info");

// api key for covid api
let covidApiKey = "a61d828378ec47f7a19232209993e4e1"

function openRightPanel() {
    rightPanelEl.classList.add("show");
}

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

// WEATHER FUNCTION STARTS HERE 
$('#submitButton').on('click', function() {
    var city = $("#states :selected").text();
    var cityPark = $("#states :selected").val();
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=12aee5ec80ede57ba0b91712e6a6f44d';
    var currentWeather = 'http://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=imperial&appid=12aee5ec80ede57ba0b91712e6a6f44d';
    var currentPark =  'https://developer.nps.gov/api/v1/parks?stateCode=' + cityPark + '&limit=12&stateCode=&api_key=aasGgYTFCP5RhABVLXGcydD4VYevDcBYE0c6Qnh2';
    searchWeather(requestUrl);
    getCurrentWeather(currentWeather)
    getCurrentPark(currentPark);
});

function getCurrentWeather(currentWeather) { 
    fetch(currentWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {  

            console.log(data);
            console.log(data.name);
            console.log(Math.floor(data.main.temp));
            console.log(data.weather[0].description);

        // CURRENT WEATHER 
        $("#current-city").html(data.name.toUpperCase());
        $("#icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $("#current-temp").html(data.main.temp + " °F");
        $("#current-description").html(data.weather[0].description.toUpperCase());
        });
}



function getCurrentPark(currentPark) { 
    fetch(currentPark)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {  
            console.log(data);
            console.log(data.data.length);
            console.log(data.data[0].fullName);
            let data1 = "";
            data.data.map((values) => {
            data1 += `      <div class="parkCard" onClick="parkInfo(event)">
                                <p id="park-name-header" class="park-name" data-park-name="${values.fullName}" >${values.fullName}</p> <br><br>
                                <p class="park-description noShow" data-park-description="${values.description}">${values.description}</p>

                                    <img  class="park-image" data-park-description="${values.description}" data-park-name="${values.fullName}" data-park-image="${values.images[0].url}" src=${values.images[0].url}>
                            </div> `  
            
                        document.getElementById("ParkCards").innerHTML = data1;
                        
                        })
        });
}


var backBtnEl = document.getElementById("back-btn");
backBtnEl.addEventListener("click", backHome);

function backHome() {
    
    document.getElementById("ParkCards").classList.remove("noShow");
    document.getElementById("ParkCards2").classList.add("noShow");


}


function parkInfo(event) {
    // console.log(event)
    if(event.target.matches(".park-image")) { 
        document.getElementById("ParkCards").classList.add("noShow");
        document.getElementById("ParkCards2").classList.remove("noShow");
        console.log('event', event);
        console.log(event.target.getAttribute('data-park-name'));
        console.log(event.target.getAttribute('data-park-description'));
        console.log(event.target.getAttribute('data-park-image'));
        

        var parkName = (event.target.getAttribute('data-park-name'));
        document.getElementById("park-name-header2").innerHTML = parkName;

        var parkDescription = (event.target.getAttribute('data-park-description'));
        document.getElementById("park-description2").innerHTML = parkDescription;

        var parkImage = (event.target.getAttribute('data-park-image'));
        document.getElementById("park-image2").src = parkImage;



    }
}




    
function searchWeather(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {  
            console.log(data);
            console.log(data.city.name);

            // MOMENTS.JS FOR WEATHER DATES/DAYS
            let dayOne = moment().add(1, 'days').format("dddd");
            let dayTwo = moment().add(2, 'days').format("dddd");
            let dayThree = moment().add(3, 'days').format("dddd");
            let dayFour = moment().add(4, 'days').format("dddd");

            // NEXT DAY WEATHER DAY 1
            $("#day-one").html(dayOne.toUpperCase());
            $("#icon1").html("<img src='http://openweathermap.org/img/w/" + data.list[8].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $("#current-temp1").html(data.list[8].main.temp + " °F");
            $("#current-description1").html(data.list[8].weather[0].description.toUpperCase());

            // NEXT DAY WEATHER DAY 2
            $("#day-two").html(dayTwo.toUpperCase());
            $("#icon2").html("<img src='http://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $("#current-temp2").html(data.list[16].main.temp + " °F");
            $("#current-description2").html(data.list[16].weather[0].description.toUpperCase());

            // NEXT DAY WEATHER DAY 3
            $("#day-three").html(dayThree.toUpperCase());
            $("#icon3").html("<img src='http://openweathermap.org/img/w/" + data.list[24].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $("#current-temp3").html(data.list[24].main.temp + " °F");
            $("#current-description3").html(data.list[24].weather[0].description.toUpperCase());

            // NEXT DAY WEATHER DAY 4
            $("#day-four").html(dayFour.toUpperCase());
            $("#icon4").html("<img src='http://openweathermap.org/img/w/" + data.list[32].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $("#current-temp4").html(data.list[32].main.temp + " °F");
            $("#current-description4").html(data.list[32].weather[0].description.toUpperCase());
        });
}  

// this function is receiving the chosen option's value. Example - ca for california
function getStateName(event) {
    let value = statesEl.options[statesEl.selectedIndex].value;
    if (value != "state") {
        // to get state's name and pass it as a parameter for your function please call your function HERE and give it parameter (value) 
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
        
        getCovidInfo(value)
    } else {
        // need modal error window for this message 
        console.log("Please choose the state");
        closeRightPanel()
    }
}

// Function for getting current covidd info by state
function getCovidInfo(stateForCovid) {
    covidApiUrl = `https://api.covidactnow.org/v2/state/${stateForCovid}.json?apiKey=${covidApiKey}`
    fetch(covidApiUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // covidInfoEl - covid-i divn a
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


submitButtonEl.addEventListener("click", getStateName);



    //   window.onload=function() {
    //   $(".parkCard").on('click', function() {
    //     $(".cityHeader").html($(this).attr('url'));
    // });
    //   }
