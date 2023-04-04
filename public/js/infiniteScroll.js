const url = `/loadmore`;
let loading = false;
let fired = false;
export const container = document.querySelector("main ul");

export const displayArt = async (paintings) => {


  paintings.forEach(painting => {
    var liHtml = `
    <li class="loading">
      <a href="/art/${painting.objectNumber}">
        <img src="${painting.smallImg}" alt="${painting.title}" srcset="">
      </a>
    </li>`;
    container.insertAdjacentHTML("beforeend", liHtml);
    const lastLi = container.lastElementChild;

    setTimeout(() => {
      lastLi.classList.remove("loading");
      }, 400);
    
  });

};

const loadMoreArt = async () => {
    loading = true;
    if(loading){

      const response = await fetch(url);
      const data = await response.json();

      displayArt(data);

      loading = false;

    }
}

window.addEventListener("scroll", () => {
    const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
    
    if(endOfPage && !fired) {
      
        console.log("end of page");
        loadMoreArt();
        fired = true;
    }else if(!endOfPage){
      fired = false;
    }
  
  
});