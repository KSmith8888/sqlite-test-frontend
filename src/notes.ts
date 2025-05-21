import "../assets/main.css";

const getNotesForm = <HTMLFormElement>document.getElementById("get-notes-form");
const noteByIdForm = <HTMLFormElement>(
    document.getElementById("note-by-id-form")
);
const createNoteForm = <HTMLFormElement>(
    document.getElementById("create-note-form")
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
    notesArray.forEach((note: unknown) => {
        if (
            note &&
            typeof note === "object" &&
            "id" in note &&
            typeof note.id === "number" &&
            "title" in note &&
            typeof note.title === "string" &&
            "content" in note &&
            typeof note.content === "string"
        ) {
            const container = document.createElement("div");
            container.classList.add("note-container");
            notesArea.append(container);
            const noteId = document.createElement("p");
            noteId.classList.add("note-id");
            noteId.textContent = `Id: ${note.id.toString(10)}`;
            container.append(noteId);
            const title = document.createElement("p");
            title.classList.add("note-title");
            title.textContent = `Title: ${note.title}`;
            container.append(title);
            const content = document.createElement("p");
            content.classList.add("note-content");
            content.textContent = `Content: ${note.content}`;
            container.append(content);
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
