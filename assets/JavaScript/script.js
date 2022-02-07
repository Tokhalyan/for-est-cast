// Query selectors
const submitButtonEl = document.querySelector("#submitButton"); 
const leftSidebarEl = document.querySelector("#left-sidebar");
const mainContentEl = document.querySelector("#main-content");
const statesEl = document.querySelector("#states");
const rightPanelEl = document.querySelector(".right-panel");


function openRightPanel() {
    rightPanelEl.classList.add("show");
}

function closeRightPanel() {
    rightPanelEl.classList.remove("show");
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
          data1 += `      <div class="parkCard">
                          <p id="park-name-header">${values.fullName}</p>
                          <a href="park.html" target="_blank">
                          <img src=${values.images[0].url} alt=""></a>
                      </div> `
        })
          document.getElementById("ParkCards").innerHTML = data1;
        });
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
    if(value != "state") {
        // to get state's name and pass it as a parameter for your function please call your function HERE and give it parameter (value) 

    } else {
        // need modal error window for this message 
        console.log("Please choose the state");
        closeRightPanel()
    }
    
    // Call your function with (value) parameter if you need the state name for your fetch request
}

submitButtonEl.addEventListener("click", getStateName);

