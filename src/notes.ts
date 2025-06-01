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
const updateEmailForm = <HTMLFormElement>(
    document.getElementById("update-email-form")
);
const deleteUserForm = <HTMLFormElement>(
    document.getElementById("delete-user-form")
);
const deleteAllUsersForm = <HTMLFormElement>(
    document.getElementById("delete-all-users-form")
);

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
    idHead.classList.add("col-name");
    idHead.scope = "col";
    headRow.append(idHead);
    const titleHead = document.createElement("th");
    titleHead.textContent = "Title";
    titleHead.classList.add("col-name");
    titleHead.scope = "col";
    headRow.append(titleHead);
    const contentHead = document.createElement("th");
    contentHead.textContent = "Content";
    contentHead.classList.add("col-name");
    contentHead.scope = "col";
    headRow.append(contentHead);
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
            typeof note.content === "string"
        ) {
            const newRow = document.createElement("tr");
            tbody.append(newRow);
            const noteId = document.createElement("td");
            noteId.classList.add("note-id");
            noteId.textContent = note.id.toString(10);
            newRow.append(noteId);
            const title = document.createElement("td");
            title.classList.add("note-title");
            title.textContent = note.title;
            newRow.append(title);
            const content = document.createElement("td");
            content.classList.add("note-content");
            content.textContent = note.content;
            newRow.append(content);
        }
    });
}

function createUsers(usersArray: []) {
    const table = document.createElement("table");
    table.classList.add("user-container");
    usersArea.append(table);
    const caption = document.createElement("caption");
    caption.textContent = "User data";
    caption.classList.add("caption");
    table.append(caption);
    const thead = document.createElement("thead");
    table.append(thead);
    const headRow = document.createElement("tr");
    thead.append(headRow);
    const idHead = document.createElement("th");
    idHead.textContent = "Id";
    idHead.classList.add("col-name");
    idHead.scope = "col";
    headRow.append(idHead);
    const nameHead = document.createElement("th");
    nameHead.textContent = "Name";
    nameHead.classList.add("col-name");
    nameHead.scope = "col";
    headRow.append(nameHead);
    const emailHead = document.createElement("th");
    emailHead.textContent = "Email";
    emailHead.classList.add("col-name");
    emailHead.scope = "col";
    headRow.append(emailHead);
    const ageHead = document.createElement("th");
    ageHead.textContent = "Age";
    ageHead.classList.add("col-name");
    ageHead.scope = "col";
    headRow.append(ageHead);
    const tbody = document.createElement("tbody");
    table.append(tbody);
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
            const newRow = document.createElement("tr");
            tbody.append(newRow);
            const userId = document.createElement("td");
            userId.classList.add("user-id");
            userId.textContent = user.id.toString(10);
            newRow.append(userId);
            const name = document.createElement("td");
            name.classList.add("user-name");
            name.textContent = user.name;
            newRow.append(name);
            const email = document.createElement("td");
            email.classList.add("user-email");
            email.textContent = user.email;
            newRow.append(email);
            const age = document.createElement("td");
            age.classList.add("user-age");
            age.textContent = user.age.toString(10);
            newRow.append(age);
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

updateEmailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formInfo = new FormData(updateEmailForm);
        const newEmail = formInfo.get("email");
        const userId = formInfo.get("userId");
        if (
            !userId ||
            typeof userId !== "string" ||
            typeof parseInt(userId) !== "number"
        ) {
            throw new Error("No valid note id provided");
        }
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/users/${userId}`,
            {
                method: "PATCH",
                body: JSON.stringify({
                    email: newEmail,
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
        updateEmailForm.reset();
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
