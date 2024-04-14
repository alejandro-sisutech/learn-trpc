import { createTRPCProxyClient } from "@trpc/client";
import { AppRouter } from "../../server/src/routers";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:3000/trpc" })],
});

async function renderUsers() {
  const users = await client.users.getAll.query();
  const usersList = document.getElementById("users-list")!;
  usersList.innerHTML = "";
  users.forEach((user) => {
    const userElement = document.createElement("li");
    userElement.innerText = user.name;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = async () => {
      await client.users.delete.mutate({ userId: user.id });
      renderUsers();
    };
    userElement.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = async () => {
      const newName = prompt("Enter new name");
      if (!newName) {
        return;
      }
      await client.users.update.mutate({ userId: user.id, name: newName });
      renderUsers();
    };
    userElement.appendChild(editButton);

    usersList.appendChild(userElement);
  });
  console.log(users);
}

async function createUser() {
  const nameInput = document.getElementById("name") as HTMLInputElement;
  await client.users.create.mutate({ name: nameInput.value });
  renderUsers();
}

// submit button create user
const form = document.getElementById("create-user-form")!;
form.onsubmit = (event) => {
  event.preventDefault();
  createUser();
};

renderUsers();
