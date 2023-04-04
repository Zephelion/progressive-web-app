import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const domain = 'https://www.rijksmuseum.nl/api/nl/collection/';
const apiKey = process.env.API_KEY;
var page = 1;
const limit = 30;



const getRelatedArt = async (maker) => {
    const response = await fetch(`${domain}?key=${apiKey}&involvedMaker=${maker}&ps=10`);
    var {artObjects: data} = await response.json();

    data.shift();
    
    return data;
};

const getSmallerImg = async(objectNumber) => {
    try{
        const smallerImg = await fetch(`${domain}${objectNumber}/tiles?key=${apiKey}`);
        const data = await smallerImg.json();
      
        const z4s = data.levels.filter(level => level.name == "z4");
        const z4 = z4s[0].tiles[0].url.replace("http", "https");
      
        return z4;
    }catch(error){
        return "https://rkd.nl/images/partners/rijksmuseum-logo.jpg";
    }
};

const initialFetchArt = async (req, res) => {

    try{
        const response = await fetch(`${domain}?key=${apiKey}&p=${page}&ps=${limit}`);
        const {artObjects: data} = await response.json();

        const paintings = await Promise.all(data.map( async (painting) => {
            const smallImg = await getSmallerImg(painting.objectNumber);

            const newPainting = {
                ...painting,
                smallImg,
            };

            return newPainting;
        }));

        res.render('index', {
            paintings: paintings,
        });
    }catch(error){
        console.log(error);
    }
};

const getArt = async (req, res) => {
    try{
        const objectNumber = req.params.id;
        const response = await fetch(`${domain}${objectNumber}?key=${apiKey}`);

        const data = await response.json();
        const painting = data.artObject;
    
        const maker = painting.principalMaker;
        const relatedArts = await getRelatedArt(maker);

        console.log(relatedArts);

        res.render('details', {
            painting: painting,
            relatedArts: relatedArts,
        })
    }catch(error){
        res.render('error');
    }
};


const loadMoreArt = async (req, res) => {
    page++;

    const response = await fetch(`${domain}?key=${apiKey}&p=${page}&ps=${limit}`);
    
    const {artObjects: data} = await response.json();

    const morePaintings = await Promise.all(data.map( async (painting) => {
        const smallImg = await getSmallerImg(painting.objectNumber);

        const newPainting = {
            ...painting,
            smallImg,
        };

        return newPainting;
    }));

    res.send(morePaintings)

};

const search = async (req, res) => {
    const searchTerm = req.params.searchTerm;
    const response = await fetch(`${domain}?key=${apiKey}&q=${searchTerm}&p=${page}&ps=30`);
    const {artObjects: data} = await response.json();

    const searchResults = await Promise.all(data.map( async (painting) => {
        const smallImg = await getSmallerImg(painting.objectNumber);

        const newPainting = {
            ...painting,
            smallImg,
        };

        return newPainting;
    }));

    if(searchResults.length == 0){
        res.send("no results");
    }else{
        res.send(searchResults);
    }

};

export {
    initialFetchArt,
    getArt,
    loadMoreArt,
    search
}