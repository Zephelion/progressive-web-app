import * as dotenv from 'dotenv';
dotenv.config();

const domain = 'https://www.rijksmuseum.nl/api/nl/collection/';
const apiKey = process.env.API_KEY;
var page = 1;
const limit = 30;



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

        console.log(paintings);


        res.render('index', {
            paintings: paintings,
        });
    }catch(error){
        console.log(error);
    }
    // res.render('index');

};

export {
    initialFetchArt
}