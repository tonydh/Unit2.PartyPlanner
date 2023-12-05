const COHORT = "2310-FSA-ET-WEB-PT-SF";
const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events";

const state = {
    events: [],
}

const addEventForm = document.querySelector("#addEvent");

addEventForm.addEventListener("submit", addEvent);


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

async function getEvents() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.events = json.data;
        console.log(state.events);
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function addEvent(event) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                name: addEventForm.name.value,
                description: addEventForm.description.value,
                date: addEventForm.date.value,
                location: addEventForm.location.value
            }),
        })

        if(!response.ok) {
            throw new Error("Failed to add new event.");
        }

        render();
    } catch (error) {
        console.log(error);
    }
}

async function deleteEvent(id) {
    try {
        await fetch(API_URL + `/${id}`, {
            method: "DELETE",
        });
        render();
    } catch (error) {
        console.log(error);
    }
}

function renderEvents() {
    if(!state.events.length) {
        eventContainer.innerHTML = "No events, please add one.";
        return;
    }

    const eventInfo = state.events.map((event) => {
        const listAllEvents = document.createElement("li");
        listAllEvents.innerHTML = `
            <h2>${event.name}</h2>
            <h4>${event.date}</h4>
            <h4>${event.location}</h4>
            <p>${event.description}</p>
            <button onclick="deleteEvent(${event.id})">Delete Event</button>
        `;

        return listAllEvents;
    })
    
    eventContainer.replaceChildren(...eventInfo);
};
