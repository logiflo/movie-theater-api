
const getUserbutton = document.querySelector("#get-users");

getUserbutton.addEventListener("click", () => {
  removeAllChildNodes(output)
  removeAllChildNodes(form);
  removeAllChildNodes(inputform);
  showAllResults("http://localhost:5001/users", "/", "GET");
});


const getShowsbutton = document.querySelector("#get-shows");

getShowsbutton.addEventListener("click", () => {
  removeAllChildNodes(output)
  removeAllChildNodes(form);
  removeAllChildNodes(inputform);
  showAllResults("http://localhost:5001/shows", "/", "GET");
});


const getUserShowsbutton = document.querySelector("#get-shows-by-user");

getUserShowsbutton.addEventListener("click", () => {
  removeAllChildNodes(output)
  removeAllChildNodes(form);
  removeAllChildNodes(inputform);
  fetchData("http://localhost:5001/users", "/", "GET").then((data) => { createForm(data, "showUserShows", "id", "username")});
});

const getShowsGenrebutton = document.querySelector("#get-shows-by-genre");

getShowsGenrebutton.addEventListener("click", () => {
  removeAllChildNodes(output)
  removeAllChildNodes(form);
  removeAllChildNodes(inputform);
  fetchData("http://localhost:5001/shows", "/", "GET").then((data) => {
    const genres = data.map(d => d.genre);
    const uniqueGenre = new Set(genres);
    createForm(uniqueGenre, "showShowsByGenre", "genres", "genres")});
});

const deleteShowbutton = document.querySelector("#delete-show");

deleteShowbutton.addEventListener("click", () => {
  removeAllChildNodes(output)
  removeAllChildNodes(form);
  removeAllChildNodes(inputform);
  fetchData("http://localhost:5001/shows", "/", "GET").then((data) => createForm(data, "deleteShow", "id", "title"));
});

const updateShowStatusbutton = document.querySelector("#update-show-status");

updateShowStatusbutton.addEventListener("click", () => {
  removeAllChildNodes(output)
  removeAllChildNodes(form);
  removeAllChildNodes(inputform);
  fetchData("http://localhost:5001/shows", "/", "GET").then((data) => createForm(data, "updateShowStatus", "id", "title"));
});

const updateShowWatchedbutton = document.querySelector("#update-show-watched");

updateShowWatchedbutton.addEventListener("click", () => {
  removeAllChildNodes(output)
  removeAllChildNodes(form);
  removeAllChildNodes(inputform);
  fetchData("http://localhost:5001/shows", "/", "GET").then((data) => createForm(data, "formRating", "id", "title"));
});
