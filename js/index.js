document.addEventListener("DOMContentLoaded", function () {
  show50Monsters();
  handleSubmit();
  loadNextOrLastMonsters()
});

//Show the first 50 monsters!!//
function renderMonsters(monster) {
  let monsterData = document.querySelector("#monster-container");

  let h2 = document.createElement("h2");
  h2.innerText = monster.name;
  let h4 = document.createElement("h4");
  h4.innerText = monster.age;
  let p = document.createElement("p");
  p.innerText = monster.description;

  monsterData.append(h2, h4, p);
}

//Fetch/GET - Show the first 50 monsters!!//
function show50Monsters() {
  fetch("http://localhost:3000/monsters?_limit=50&_page=1")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((monster) => {
        //console.log(monster)
        renderMonsters(monster);
      });
    });
}

//Create a new monster!!//
function handleSubmit() {
  let createMonster = document.querySelector("#create-monster");
  createMonster.innerHTML = `
    <form id="monster-form">  
      <input id="name" placeholder="name...">
      <input id="age" placeholder="age...">
      <input id="description" placeholder="description..."></input>
      <button> Create </button>
    </form>
    `;
  let form = document.querySelector("#monster-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let monsterObj = {
      name: e.target.name.value,
      age: e.target.age.value,
      description: e.target.description.value,
    };
    //console.log("Submit values are:", monsterObj)

    createNewMonster(monsterObj);
    renderMonsters(monsterObj);

    form.reset();
  });
}

//Fetch/POST - Create a new monster!!//
function createNewMonster(monsterObj) {
  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(monsterObj),
  })
    .then((response) => response.json())
    .then((data) => console.log("Post data are:", data));
}

//Load next/last 50 monsters!!//
function loadNextOrLastMonsters() {
  let forwardBtn = document.querySelector("#forward");
  let pageNum = 1;
  forwardBtn.addEventListener("click", () => {
    pageNum += 1;
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log("Data in next page:", data)
        document.querySelector("#monster-container").innerText = "";
        data.forEach((newData) => {
          renderMonsters(newData);
        });
      });
  });

  //Load last 50 monsters!!//
  let backBtn = document.querySelector("#back");
  backBtn.addEventListener("click", () => {
    pageNum -= 1;
    //console.log(pageNum);
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("#monster-container").innerText = "";
        data.forEach((newData) => {
          renderMonsters(newData);
        });
      });
  });
}
