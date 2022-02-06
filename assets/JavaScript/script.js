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
}

// this function is receiving the chosen option's value. Example - ca for california
function getStateName(event) {
    let value = statesEl.options[statesEl.selectedIndex].value;
    if(value != "state") {
        // to get state's name and pass it as a parameter for your function please call your function HERE and give it parameter (value) 
        covidInfoEl.innerHTML = "";
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
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            // covidInfoEl - covid-i divn a
            let casesEl = document.createElement('p');
            if(data.actuals.cases) {
                casesEl.innerHTML = `Cases: ${data.actuals.cases}`
                covidInfoEl.appendChild(casesEl);
            } else {
                casesEl.innerHTML = "Cases: No information available for this State";
                covidInfoEl.appendChild(casesEl);
            }
            
            let positivesEl = document.createElement('p');
            if(data.actuals.positiveTests) {
                positivesEl.innerHTML = `Positive tests: ${data.actuals.positiveTests}`;
                covidInfoEl.appendChild(positivesEl);
            } else {
                casesEl.innerHTML = "Cases: No information available for this State";
                covidInfoEl.appendChild(positivesEl);
            }

            let deathsEl = document.createElement('p');
            if(data.actuals.deaths) {
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