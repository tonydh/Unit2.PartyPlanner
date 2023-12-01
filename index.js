const COHORT = `2310-FSA-ET-WEB-PT-SF`;
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    events: [],
}

const addEventForm = document.querySelector(`#addEvent`);

/**
 * sync state with the API and re-render
 */
async function render() {
    await getEvents();
    renderEvents();
}

render();

/**
 * update state with events from API
 */

async function getEvents(){
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.events = json.data;
        console.log(state.events);
    } catch (error) {
        console.log("Error: ", error);
    }
}

function renderEvents() {
    if(!state.events.length) {
        eventContainer.innerHTML = "No events, please add one.";
        return;
    }

    const eventInfo = state.events.map((event) => {
        const listAllEvents = document.createElement(`li`);
        listAllEvents.innerHTML = `
            <h3>${event.name}</h3>
            <h4>${event.date}</h4>
            <h4>${event.location}</h4>
            <p>${event.description}</p>
        `;

        return listAllEvents;
    })
    
    eventContainer.replaceChildren(...eventInfo)
}