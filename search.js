const form = document.querySelector("form");
const input = document.querySelector(".searchbar");

let pages = [];

fetch("data/data.json")
  .then(res => res.json())
  .then(data => {
    pages = data;
  })
  .catch(err => console.log("Error loading data:", err));

form.addEventListener("submit", e => {
  e.preventDefault();

  const text = input.value.toLowerCase().trim();
  if (text === "") return;

  let found = null;

  for (let i = 0; i < pages.length; i++) {
    let p = pages[i];
    if (
      p.name.toLowerCase().includes(text) ||
      p.keywords.some(k => k.toLowerCase().includes(text))
    ) {
      found = p;
      break;
    }
  }

  if (found) {
    window.location.href = found.url;
  } else {
    alert("Nothing found. Try words like 'about', 'projects', or 'contact'.");
  }

  input.value = "";
});

