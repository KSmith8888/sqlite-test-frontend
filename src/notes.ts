import "../assets/main.css";

const getNotesForm = <HTMLFormElement>document.getElementById("get-notes-form");
const noteByIdForm = <HTMLFormElement>(
    document.getElementById("note-by-id-form")
);
const createNoteForm = <HTMLFormElement>(
    document.getElementById("create-note-form")
);
const completeNoteForm = <HTMLFormElement>(
    document.getElementById("complete-note-form")
);
const editNoteForm = <HTMLFormElement>document.getElementById("edit-note-form");
const deleteByIdForm = <HTMLFormElement>(
    document.getElementById("delete-by-id-form")
);
const deleteNotesForm = <HTMLFormElement>(
    document.getElementById("delete-notes-form")
);
const messageText = <HTMLParagraphElement>(
    document.getElementById("message-text")
);
const notesArea = <HTMLElement>document.getElementById("notes-area");

function createNotes(notesArray: []) {
    const table = document.createElement("table");
    table.classList.add("note-container");
    notesArea.append(table);
    const caption = document.createElement("caption");
    caption.textContent = "Notes data";
    caption.classList.add("caption");
    table.append(caption);
    const thead = document.createElement("thead");
    table.append(thead);
    const headRow = document.createElement("tr");
    thead.append(headRow);
    const idHead = document.createElement("th");
    idHead.textContent = "Id";
    idHead.classList.add("table-data");
    idHead.scope = "col";
    headRow.append(idHead);
    const titleHead = document.createElement("th");
    titleHead.textContent = "Title";
    titleHead.classList.add("table-data");
    titleHead.scope = "col";
    headRow.append(titleHead);
    const contentHead = document.createElement("th");
    contentHead.textContent = "Content";
    contentHead.classList.add("table-data");
    contentHead.scope = "col";
    headRow.append(contentHead);
    const userIdHead = document.createElement("th");
    userIdHead.textContent = "User Id";
    userIdHead.classList.add("table-data");
    userIdHead.scope = "col";
    headRow.append(userIdHead);
    const completedHead = document.createElement("th");
    completedHead.textContent = "Completed";
    completedHead.classList.add("table-data");
    completedHead.scope = "col";
    headRow.append(completedHead);
    const tbody = document.createElement("tbody");
    table.append(tbody);
    notesArray.forEach((note: unknown) => {
        if (
            note &&
            typeof note === "object" &&
            "id" in note &&
            typeof note.id === "number" &&
            "title" in note &&
            typeof note.title === "string" &&
            "content" in note &&
            typeof note.content === "string" &&
            "user_id" in note &&
            typeof note.user_id === "number" &&
            "is_completed" in note &&
            typeof note.is_completed === "number"
        ) {
            const newRow = document.createElement("tr");
            tbody.append(newRow);
            const noteId = document.createElement("td");
            noteId.classList.add("table-data");
            noteId.textContent = note.id.toString(10);
            newRow.append(noteId);
            const title = document.createElement("td");
            title.classList.add("table-data");
            title.textContent = note.title;
            newRow.append(title);
            const content = document.createElement("td");
            content.classList.add("table-data");
            content.textContent = note.content;
            newRow.append(content);
            const userId = document.createElement("td");
            userId.classList.add("table-data");
            userId.textContent = note.user_id.toString(10);
            newRow.append(userId);
            const isCompleted = document.createElement("td");
            isCompleted.classList.add("table-data");
            isCompleted.textContent =
                note.is_completed === 1 ? "True" : "False";
            newRow.append(isCompleted);
        }
    });
}

getNotesForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/notes");
        const data = await response.json();
        if (!data) throw new Error("No data received");
        if (data.message && typeof data.message === "string") {
            messageText.textContent = data.message;
        }
        notesArea.replaceChildren();
        if (data.notes && Array.isArray(data.notes)) {
            if (data.notes.length > 0) createNotes(data.notes);
            else messageText.textContent = "Message: There were no notes";
        }
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});

noteByIdForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formInfo = new FormData(noteByIdForm);
        const noteId = formInfo.get("noteId");
        if (
            !noteId ||
            typeof noteId !== "string" ||
            typeof parseInt(noteId) !== "number"
        ) {
            throw new Error("No valid note id provided");
        }
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/notes/${noteId}`
        );
        const data = await response.json();
        if (!data) throw new Error("No data received");
        if (data.message && typeof data.message === "string") {
            messageText.textContent = data.message;
        }
        notesArea.replaceChildren();
        if (data.notes && Array.isArray(data.notes) && data.notes.length > 0) {
            createNotes(data.notes);
        }
        noteByIdForm.reset();
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});

createNoteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) throw new Error("Please log in");
        const formData = new FormData(createNoteForm);
        const title = formData.get("title");
        const content = formData.get("content");
        const response = await fetch(
            "http://127.0.0.1:3000/api/v1/notes/create",
            {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    content: content,
                    userId,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        if (!data) throw new Error("No data received");
        if (data.message && typeof data.message === "string") {
            messageText.textContent = data.message;
        }
        notesArea.replaceChildren();
        if (data.notes && Array.isArray(data.notes) && data.notes.length > 0) {
            createNotes(data.notes);
        }
        createNoteForm.reset();
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});

completeNoteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData(completeNoteForm);
        const noteId = formData.get("noteId");
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/notes/complete/${noteId}`,
            {
                method: "PATCH",
            }
        );
        const data = await response.json();
        if (!data) throw new Error("No data received");
        if (data.message && typeof data.message === "string") {
            messageText.textContent = data.message;
        }
        notesArea.replaceChildren();
        if (data.notes && Array.isArray(data.notes) && data.notes.length > 0) {
            createNotes(data.notes);
        }
        completeNoteForm.reset();
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});

editNoteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData(editNoteForm);
        const noteId = formData.get("noteId");
        const title = formData.get("title");
        const content = formData.get("content");
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/notes/${noteId}`,
            {
                method: "PATCH",
                body: JSON.stringify({
                    title: title,
                    content: content,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        if (!data) throw new Error("No data received");
        if (data.message && typeof data.message === "string") {
            messageText.textContent = data.message;
        }
        notesArea.replaceChildren();
        if (data.notes && Array.isArray(data.notes) && data.notes.length > 0) {
            createNotes(data.notes);
        }
        editNoteForm.reset();
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});

deleteByIdForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formInfo = new FormData(deleteByIdForm);
        const deleteId = formInfo.get("deleteId");
        if (
            !deleteId ||
            typeof deleteId !== "string" ||
            typeof parseInt(deleteId, 10) !== "number"
        ) {
            throw new Error("Valid note id not provided");
        }
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/notes/${deleteId}`,
            {
                method: "DELETE",
            }
        );
        const data = await response.json();
        if (!data) throw new Error("No data received");
        if (data.message && typeof data.message === "string") {
            messageText.textContent = data.message;
        }
        notesArea.replaceChildren();
        if (data.notes && Array.isArray(data.notes) && data.notes.length > 0) {
            createNotes(data.notes);
        }
        deleteByIdForm.reset();
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});

deleteNotesForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/notes/", {
            method: "DELETE",
        });
        const data = await response.json();
        if (!data) throw new Error("No data received");
        if (data.message && typeof data.message === "string") {
            messageText.textContent = data.message;
        }
        notesArea.replaceChildren();
        if (data.notes && Array.isArray(data.notes) && data.notes.length > 0) {
            createNotes(data.notes);
        }
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});
