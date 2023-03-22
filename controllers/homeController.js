import * as dotenv from 'dotenv';
dotenv.config();

const domain = 'https://www.rijksmuseum.nl/api/nl/collection/';
const apiKey = process.env.API_KEY;
var page = 1;
const limit = 10;


const initialFetchArt = async (req, res) => {

    try{
        const response = await fetch(`${domain}?key=${apiKey}&p=${page}&ps=${limit}`);
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.log(error);
    }
    // res.render('index');

};

export {
    initialFetchArt
}