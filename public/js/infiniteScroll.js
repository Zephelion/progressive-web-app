const url = `http://localhost:3000/loadmore`;
let loading = false;
let fired = false;

const loadMoreArt = async () => {
    loading = true;
    if(loading){

      const response = await fetch(url);
      const data = await response.json();

      loading = false;

    }
}

window.addEventListener("scroll", () => {
    const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    
    if(endOfPage && !fired) {
      
        console.log("end of page");
        loadMoreArt();
        fired = true;
    }else if(!endOfPage){
      fired = false;
    }
  
  
});