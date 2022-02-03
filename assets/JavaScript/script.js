// Query selectors
const submitButtonEl = document.querySelector("#submitButton"); 

function getStateName(event) {
    // prevent page from refreshing when we push submit button
    event.preventDefault();

    // get value from input element
    let stateName = cityInputEl.value.trim();

    if (stateName) {
        console.log(stateName)
        document.querySelector("#state").textContent = cityName.toUpperCase();
    } else {

    }
}

submitButtonEl.addEventListener("submit", getStateName);