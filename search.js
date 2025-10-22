const form = document.querySelector("form");
const input = document.querySelector(".searchbar");

let pages = [];

fetch("data/data.json")
  .then(response => response.json())
  .then(data => {
    pages = data;
    console.log("Search data loaded:", pages);
  })
  .catch(err => console.error("Error loading JSON:", err));

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = input.value.trim().toLowerCase();
  if (!query) return;

  // Find the best match based on keywords or name
  const match = pages.find(page => {
    // Check both the main name and all its keywords
    return (
      page.name.toLowerCase().includes(query) ||
      page.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );
  });

  if (match) {
    window.location.href = match.url;
  } else {
    alert("No matching section found. Try keywords like 'about', 'projects', 'contact', etc.");
  }

  input.value = "";
});
