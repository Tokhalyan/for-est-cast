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