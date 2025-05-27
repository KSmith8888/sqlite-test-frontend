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
const usersArea = <HTMLElement>document.getElementById("users-area");
const getUsersForm = <HTMLFormElement>document.getElementById("get-users-form");
const userByIdForm = <HTMLFormElement>(
    document.getElementById("user-by-id-form")
);
const createUserForm = <HTMLFormElement>(
    document.getElementById("create-user-form")
);
const deleteUserForm = <HTMLFormElement>(
    document.getElementById("delete-user-form")
);
const deleteAllUsersForm = <HTMLFormElement>(
    document.getElementById("delete-all-users-form")
);

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

function createUsers(usersArray: []) {
    usersArray.forEach((user: unknown) => {
        if (
            user &&
            typeof user === "object" &&
            "id" in user &&
            typeof user.id === "number" &&
            "name" in user &&
            typeof user.name === "string" &&
            "email" in user &&
            typeof user.email === "string" &&
            "age" in user &&
            typeof user.age === "number"
        ) {
            const container = document.createElement("div");
            container.classList.add("user-container");
            usersArea.append(container);
            const userId = document.createElement("p");
            userId.classList.add("user-id");
            userId.textContent = `Id: ${user.id.toString(10)}`;
            container.append(userId);
            const name = document.createElement("p");
            name.classList.add("user-name");
            name.textContent = `Name: ${user.name}`;
            container.append(name);
            const email = document.createElement("p");
            email.classList.add("user-email");
            email.textContent = `Email: ${user.email}`;
            container.append(email);
            const age = document.createElement("p");
            age.classList.add("user-age");
            age.textContent = `Age: ${user.age}`;
            container.append(age);
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

getUsersForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/users");
        const data = await response.json();
        if (!data) throw new Error("No data received");
        if (data.message && typeof data.message === "string") {
            messageText.textContent = data.message;
        }
        usersArea.replaceChildren();
        if (data.users && Array.isArray(data.users)) {
            if (data.users.length > 0) createUsers(data.users);
            else messageText.textContent = "Message: No users were returned";
        }
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});

userByIdForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formInfo = new FormData(userByIdForm);
        const userId = formInfo.get("userId");
        if (
            !userId ||
            typeof userId !== "string" ||
            typeof parseInt(userId) !== "number"
        ) {
            throw new Error("No valid note id provided");
        }
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/users/${userId}`
        );
        const data = await response.json();
        if (!data) throw new Error("No data received");
        if (data.message && typeof data.message === "string") {
            messageText.textContent = data.message;
        }
        usersArea.replaceChildren();
        if (data.users && Array.isArray(data.users)) {
            if (data.users.length > 0) createUsers(data.users);
            else messageText.textContent = "Message: No users were returned";
        }
        userByIdForm.reset();
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});

createUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData(createUserForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const age = formData.get("age");
        const response = await fetch(
            "http://127.0.0.1:3000/api/v1/users/create",
            {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    age,
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
        usersArea.replaceChildren();
        if (data.users && Array.isArray(data.users)) {
            if (data.users.length > 0) createUsers(data.users);
            else messageText.textContent = "Message: No users were returned";
        }
        createUserForm.reset();
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});

deleteUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formInfo = new FormData(deleteUserForm);
        const deleteId = formInfo.get("deleteId");
        if (
            !deleteId ||
            typeof deleteId !== "string" ||
            typeof parseInt(deleteId, 10) !== "number"
        ) {
            throw new Error("Valid user id not provided");
        }
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/users/${deleteId}`,
            {
                method: "DELETE",
            }
        );
        const data = await response.json();
        if (!data) throw new Error("No data received");
        if (data.message && typeof data.message === "string") {
            messageText.textContent = data.message;
        }
        usersArea.replaceChildren();
        if (data.users && Array.isArray(data.users)) {
            if (data.users.length > 0) createUsers(data.users);
            else messageText.textContent = "Message: No users were returned";
        }
        deleteUserForm.reset();
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});

deleteAllUsersForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/users/", {
            method: "DELETE",
        });
        const data = await response.json();
        if (!data) throw new Error("No data received");
        if (data.message && typeof data.message === "string") {
            messageText.textContent = data.message;
        }
        usersArea.replaceChildren();
        if (data.users && Array.isArray(data.users)) {
            if (data.users.length > 0) createUsers(data.users);
            else messageText.textContent = "Message: No users were returned";
        }
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});
