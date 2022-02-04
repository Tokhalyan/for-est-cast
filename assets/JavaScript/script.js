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