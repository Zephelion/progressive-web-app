const domain = "https://www.rijksmuseum.nl/api/nl/collection/";
const apiKey = "9ht5U2BA";

let fired = false;
var page = 2;
const limit = 30;


const loadMoreArt = async () => {
    page++;
    loading = true;
  
    if(loading){
    //   displayLoading();
      const response = await fetch(`${domain}?key=${apiKey}&p=${page}&ps=${limit}`);
      const data = await response.json();
    
      const morePaintings = data.artObjects;

      console.log(morePaintings);
    
    //   displayArt(morePaintings, "main ul");
    //   hideLoading();
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