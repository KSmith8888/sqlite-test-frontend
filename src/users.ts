const usersArea = <HTMLElement>document.getElementById("users-area");
const getUsersForm = <HTMLFormElement>document.getElementById("get-users-form");
const userByIdForm = <HTMLFormElement>(
    document.getElementById("user-by-id-form")
);
const createUserForm = <HTMLFormElement>(
    document.getElementById("create-user-form")
);
const loginForm = <HTMLFormElement>document.getElementById("login-form");
const updateEmailForm = <HTMLFormElement>(
    document.getElementById("update-email-form")
);
const deleteUserForm = <HTMLFormElement>(
    document.getElementById("delete-user-form")
);
const deleteAllUsersForm = <HTMLFormElement>(
    document.getElementById("delete-all-users-form")
);
const messageText = <HTMLParagraphElement>(
    document.getElementById("message-text")
);
const loggedInText = <HTMLParagraphElement>(
    document.getElementById("logged-in-text")
);
const logOutButton = <HTMLButtonElement>(
    document.getElementById("log-out-button")
);

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
    idHead.classList.add("table-data");
    idHead.scope = "col";
    headRow.append(idHead);
    const usernameHead = document.createElement("th");
    usernameHead.textContent = "Username";
    usernameHead.classList.add("table-data");
    usernameHead.scope = "col";
    headRow.append(usernameHead);
    const emailHead = document.createElement("th");
    emailHead.textContent = "Email";
    emailHead.classList.add("table-data");
    emailHead.scope = "col";
    headRow.append(emailHead);
    const ageHead = document.createElement("th");
    ageHead.textContent = "Age";
    ageHead.classList.add("table-data");
    ageHead.scope = "col";
    headRow.append(ageHead);
    const adminHead = document.createElement("th");
    adminHead.textContent = "Admin";
    adminHead.classList.add("table-data");
    adminHead.scope = "col";
    headRow.append(adminHead);
    const tbody = document.createElement("tbody");
    table.append(tbody);
    usersArray.forEach((user: unknown) => {
        if (
            user &&
            typeof user === "object" &&
            "id" in user &&
            typeof user.id === "number" &&
            "username" in user &&
            typeof user.username === "string" &&
            "email" in user &&
            typeof user.email === "string" &&
            "age" in user &&
            typeof user.age === "number" &&
            "is_admin" in user &&
            typeof user.is_admin === "number"
        ) {
            const newRow = document.createElement("tr");
            tbody.append(newRow);
            const userId = document.createElement("td");
            userId.classList.add("table-data");
            userId.textContent = user.id.toString(10);
            newRow.append(userId);
            const username = document.createElement("td");
            username.classList.add("table-data");
            username.textContent = user.username;
            newRow.append(username);
            const email = document.createElement("td");
            email.classList.add("table-data");
            email.textContent = user.email;
            newRow.append(email);
            const age = document.createElement("td");
            age.classList.add("table-data");
            age.textContent = user.age.toString(10);
            newRow.append(age);
            const admin = document.createElement("td");
            admin.classList.add("table-data");
            admin.textContent = user.is_admin === 1 ? "True" : "False";
            newRow.append(admin);
        }
    });
}

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
        const username = formData.get("username");
        const password = formData.get("password");
        const email = formData.get("email");
        const age = formData.get("age");
        const response = await fetch(
            "http://127.0.0.1:3000/api/v1/users/create",
            {
                method: "POST",
                body: JSON.stringify({
                    name,
                    username,
                    password,
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

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formInfo = new FormData(loginForm);
        const username = formInfo.get("username");
        const password = formInfo.get("password");
        const response = await fetch(
            "http://127.0.0.1:3000/api/v1/users/login",
            {
                method: "POST",
                body: JSON.stringify({
                    username,
                    password,
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
        if (
            data.users &&
            typeof data.users === "object" &&
            data.users.length === 1
        ) {
            const user = data.users[0];
            loggedInText.textContent = `Name: ${user.username} Status: Logged in`;
            sessionStorage.setItem("user_id", data.users[0].id);
        }
        loginForm.reset();
    } catch (error) {
        if (error instanceof Error) {
            messageText.textContent = error.message;
        }
    }
});

logOutButton.addEventListener("click", () => {
    loggedInText.textContent = "Name: GUEST Status: Not logged in";
    sessionStorage.clear();
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
        const userId = sessionStorage.getItem("user_id");
        if (!userId)
            throw new Error("You must log in before performing this action");
        const response = await fetch("http://127.0.0.1:3000/api/v1/users/", {
            method: "DELETE",
            headers: {
                "user_id": userId,
            },
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
