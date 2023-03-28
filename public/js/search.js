import { displayArt } from "./infiniteScroll.js";
import { container } from "./infiniteScroll.js";

const searchInput = document.getElementById("search");
const form = document.querySelector("form");
const searchUrl = "/search/";


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value;

    const response = await fetch(`${searchUrl}${searchTerm}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            searchTerm: searchTerm,
        }),
    });


    const data = await response.json();
    console.log(data);
    
    container.innerHTML = "";
    displayArt(data);

});