// timelineService.js
// Backend API adapter for timeline events (MongoDB via Flask backend).

const API_URL = "http://127.0.0.1:5001/api/events";

/**
 * Fetch all events for a user, sorted chronologically.
 */
export const getEvents = async (userEmail) => {
  if (!userEmail) return [];
  try {
    const res = await fetch(`${API_URL}/${userEmail}`);
    if (!res.ok) throw new Error("Failed to fetch events");
    const data = await res.json();
    const events = data.events || [];
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch (err) {
    console.error("Error fetching events:", err);
    return [];
  }
};

/**
 * Save a new event for a user.
 */
export const addEvent = async (userEmail, event) => {
  try {
    const res = await fetch(`${API_URL}/${userEmail}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!res.ok) {
      console.error("Failed to add event:", await res.text());
    }
  } catch (err) {
    console.error("Error adding event:", err);
  }
  return await getEvents(userEmail);
};

/**
 * Delete an event by ID.
 */
export const deleteEvent = async (userEmail, eventId) => {
  try {
    const res = await fetch(`${API_URL}/${userEmail}/${eventId}`, {
      method: "DELETE",
    });
    if (!res.ok) console.error("Failed to delete event");
  } catch (err) {
    console.error("Error deleting event:", err);
  }
  return await getEvents(userEmail);
};

/**
 * Clear all events for a user.
 */
export const clearEvents = async (_userEmail) => {
  console.warn("clearEvents not fully implemented on server yet.");
};
