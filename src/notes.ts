const createNoteForm = document.getElementById("create-note-form");

createNoteForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/notes");
        const data = await response.json();
        if (!data) throw new Error("No data received");
        console.log(data);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
