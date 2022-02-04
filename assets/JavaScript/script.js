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




$('#submitButton').on('click', function() {
  
    var city = $("#states :selected").text();
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=12aee5ec80ede57ba0b91712e6a6f44d';
    var currentWeather = 'http://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=imperial&appid=12aee5ec80ede57ba0b91712e6a6f44d';
    searchWeather(requestUrl);
    getCurrentWeather(currentWeather)
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
      $("#current-city").html(data.name);
      $("#icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
      $("#current-temp").html(data.main.temp + " °F");
      $("#current-description").html(data.weather[0].description);
      });
    }


//   $('.fav').on('change', function() {
//     var city = $(this).text();
//     var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='+ city +'&units=imperial&appid=12aee5ec80ede57ba0b91712e6a6f44d';
//     console.log(data);

//     searchWeather(requestUrl);

//   });
  
  
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
    let dayFive = moment().add(5git , 'days').format("dddd");



          // NEXT DAY WEATHER DAY 1
    $("#day-one").html(dayOne);
    $("#icon1").html("<img src='http://openweathermap.org/img/w/" + data.list[8].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $("#current-temp1").html(data.list[8].main.temp + " °F");
    $("#current-description1").html(data.list[8].weather[0].description);

          // NEXT DAY WEATHER DAY 2
    $("#day-two").html(dayTwo);
    $("#icon2").html("<img src='http://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $("#current-temp2").html(data.list[16].main.temp + " °F");
    $("#current-description2").html(data.list[16].weather[0].description);

        // NEXT DAY WEATHER DAY 3
    $("#day-three").html(dayThree);
    $("#icon3").html("<img src='http://openweathermap.org/img/w/" + data.list[24].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $("#current-temp3").html(data.list[24].main.temp + " °F");
    $("#current-description3").html(data.list[24].weather[0].description);

        // NEXT DAY WEATHER DAY 4
    $("#day-four").html(dayFour);
    $("#icon4").html("<img src='http://openweathermap.org/img/w/" + data.list[32].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $("#current-temp4").html(data.list[32].main.temp + " °F");
    $("#current-description4").html(data.list[32].weather[0].description);

        // NEXT DAY WEATHER DAY 5
    $("#day-four").html(dayFive);
    $("#icon5").html("<img src='http://openweathermap.org/img/w/" + data.list[39].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $("#current-temp5").html(data.list[39].main.temp + " °F");
    $("#current-description5").html(data.list[39].weather[0].description);
        
    

    });
    }  

