const output = document.querySelector("#output");
const form = document.querySelector("#option-form");
const inputform = document.querySelector("#input-form");

async function fetchData(url, path, method) {
  const response = await fetch(url + path, { method: method });
  return response.json();
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function appendJSONChild(parent, child) {
  const pre = document.createElement("pre");
  pre.innerHTML = JSON.stringify(child, null, 2);
  parent.appendChild(pre);
}

function showAllResults(url, path, method) {
  fetchData(url, path, method).then((data) => {
    data.forEach((element) => {
      appendJSONChild(output, element);
    });
  });
}

function createForm(data, action, id, text) {
  for (const d of data) {
    const input = document.createElement("input");
    const label = document.createElement("label");
    let setID = "";
    let setText = "";

    if (id === "genres") {
      setID = d;
      setText = d;
    } else {
      setID = d[id];
      setText = d[text];
    }
    input.setAttribute("type", "radio");
    input.setAttribute("name", "user");
    input.setAttribute("onclick", `${action}(event, "${setID}")`);

    label.setAttribute("for", `${setID}`);

    label.innerHTML = setText;

    form.appendChild(input);
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
  }
}

function showUserShows(event, id) {
  removeAllChildNodes(output);
  removeAllChildNodes(inputform);
  showAllResults("http://localhost:5001/users", `/${id}/shows`, "GET");
}

function showShowsByGenre(event, genre) {
  removeAllChildNodes(output);
  showAllResults("http://localhost:5001/shows", `/genres/${genre}`, "GET");
}

function deleteShow(event, id) {
  removeAllChildNodes(output);
  removeAllChildNodes(form);

  const h3 = document.createElement("h3");
  h3.innerHTML = "Show deleted successfully.";
  output.appendChild(h3);
  fetchData("http://localhost:5001/shows", `/${id}`, "DELETE").then((data) =>
    appendJSONChild(output, data)
  );
}

function updateShowStatus(event, id) {
  removeAllChildNodes(output);

  const h3 = document.createElement("h3");
  h3.innerHTML = "Show status updated successfully.";
  output.appendChild(h3);
  fetchData("http://localhost:5001/shows", `/${id}/update`, "PUT").then(
    (data) => appendJSONChild(output, data)
  );
}

function formRating(event, id) {
  removeAllChildNodes(output);

  const input = document.createElement("input");
  const label = document.createElement("label");
  const submitButton = document.createElement("button");

  input.setAttribute("type", "number");
  input.setAttribute("name", "rating");
  input.setAttribute("id", "rating");
  input.setAttribute("placeholder", "Number between 0-5");
  // input.setAttribute("submit", `updateRating(event, ${id})`)

  submitButton.setAttribute("id", "submit");
  submitButton.setAttribute("onclick", `updateRating(event, ${id})`);
  submitButton.innerHTML = "Submit";

  label.innerHTML = "Enter Rating: ";

  inputform.appendChild(label);
  inputform.appendChild(input);
  inputform.appendChild(document.createElement("br"));

  inputform.appendChild(submitButton);
}

function updateRating(event, id) {
  removeAllChildNodes(output);

  const h3 = document.createElement("h3");
  h3.innerHTML = "Show rating updated successfully.";
  output.appendChild(h3);

  const inputRating = document.querySelector("#rating");

  fetch(`http://localhost:5001/shows/${id}/watched`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rating: parseInt(inputRating.value) }),
  })
    .then((response) => response.json())
    .then((data) => appendJSONChild(output, data));
}
