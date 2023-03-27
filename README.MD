# Progressive Web Apps @cmda-minor-web 2022 - 2023

## Description :pen:
In this course we convert the client side web application, made during the Web App From Scratch course, into a server side rendered application. We also add functionalities based on the Service Worker and turn the application into a Progressive Web App. Finally we’ll implement a series of optimisations to improve the performance of the application.

## Goals
After finishing this program you can:

* deal with server side rendering;
* implement a Service Worker;
* enhance the critical render path for a better runtime or percieved performance.

## Checkpoint :smirk:
|Start screen| Details screen |
|---| --- |
|![Startscreen](public/images/readme/state1.png)| ![Details screen](public/images/readme/state2.png)

### Functionality (Client side)
* Fetch a collection from the rijksmuseum API
* Display art in a gridlike structure
* Search functionality to search for paintings
* Routing system
* Details page to view a specific art 
* Infinite scrolling 

This is the current functionality I have created now I am tasked to convert this to server side

## Tools
|Node.js| NPM| Express |
| --- | --- |---|
|![Node.js](public/images/readme/node.png)| ![NPM](public/images/readme/npm.png)|![Express](public/images/readme/express.png)

### Node.js
Node.js is a free and open-source, cross-platform, back-end JavaScript runtime environment that allows developers to run JavaScript code outside of a web browser. It is built on Chrome's V8 JavaScript engine and provides an event-driven, non-blocking I/O model that makes it ideal for building scalable and high-performance applications. Node.js is commonly used for building web servers, real-time applications, and networking tools. It has a large and active community, with a vast ecosystem of third-party libraries and tools available for developers to use.

### NPM
NPM stands for Node Package Manager, and it is a command-line utility used to install, manage, and share Node.js packages.

Node.js is a popular JavaScript runtime environment that allows developers to run JavaScript code outside of a web browser, and it has a vast ecosystem of packages and modules that developers can use to build their applications. NPM provides a centralized repository of these packages, making it easy for developers to discover and install the dependencies they need for their projects.

In addition to managing packages, NPM also provides features for versioning and publishing packages, as well as tools for managing dependencies and scripts for building, testing, and deploying Node.js applications. NPM is an essential tool for Node.js developers, and it is included with every installation of Node.js.

### Express
Express.js is a popular and powerful web application framework for Node.js, designed to make it easy to build web applications and APIs. It provides a set of robust features and HTTP utility methods for creating RESTful API and handling HTTP requests and responses.

Express.js allows developers to create modular and scalable web applications, providing a flexible routing system that maps HTTP requests to corresponding application logic. It also offers middleware functionality, which allows developers to extend the core functionality of the framework and add additional features such as authentication and authorization, logging, error handling, and more.

Express.js is built on top of Node.js, so it takes advantage of Node's event-driven, non-blocking I/O model, making it highly efficient and performant. It is also widely adopted in the Node.js community and has a large ecosystem of plugins and extensions available.

|Handlebars| Sass |
|---|---|
|![Handlebars](public/images/readme/handlebars-js.webp)|![Sass](public/images/readme/sass.png)

in order to make development a litle bit easier I installed handlebars and sass

### Handlebars
Handlebars is a popular templating language that can be used with Node.js, as well as other JavaScript environments like web browsers. It allows you to dynamically generate HTML, or other markup, by filling in placeholders (called "variables") with data from a JavaScript object.

Handlebars templates consist of plain HTML, with special Handlebars tags that mark where variables or expressions should be inserted. For example, the `{{variableName}}` syntax is used to insert the value of a variable with the given name, while `{{#if expression}}` and `{{/if}}` are used to conditionally include or exclude blocks of HTML based on the value of an expression.

In Node.js, you can use the handlebars module to compile Handlebars templates into functions that can be called to render HTML dynamically, with data provided as input. This can be useful for generating dynamic web pages, sending email templates, or other tasks that involve generating HTML based on data.

### Sass
Sass (short for Syntactically Awesome Style Sheets) is a preprocessor scripting language that is used to create cascading style sheets (CSS). Sass is essentially an extension of CSS, providing a range of features and capabilities that are not available in CSS.

Sass allows you to use variables, mixins, nested rules, functions, and more to help make your CSS code more efficient and maintainable. For example, you can define a set of commonly used styles as a mixin, and then include that mixin in different parts of your code to apply those styles consistently. You can also use variables to define colors, font sizes, and other values, making it easy to update your styles across your entire site by updating a single variable.

Sass code is typically written in .scss or .sass files, which are then compiled into regular CSS code that can be used in a web application. There are several tools and frameworks available that can help you work with Sass, including Node.js-based command-line tools like Node-Sass and LibSass, as well as web-based Sass compilers like CodePen and SassMeister.

After installing all of the needed packages it was time to grind :moyai:

## Week 1
This week i focussed on setting up the node envirmont with tools described above.

In order to create a node environment I ran the command `npm init` to do so.
After that I created an app.js file and this is where all the core functionality will reside.

app.js

```javascript
import express from 'express';
import { engine } from 'express-handlebars';
import router from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/', router);


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});
```

After creating the core I decided to create some routes. In the code above you see that I used `app.use('/', router)` this file is being imported.

routes/index.js

```javascript
import express from 'express';
const router = express.Router();
import { initialFetchArt, getArt } from '../controllers/homeController.js';


router.get('/', initialFetchArt);
router.get('/art/:id', getArt);


export default router;
```

`router.get('/', initialFetchArt);`

The code above shows how I used router. Whats happening is that whenever I hit the route with `/` invoke the initialFetchArt. The initialFetchArt function is then again being imported from another file called HomeController.

HomeController.js.initialFetchArt

```javascript
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
```

In the code above I do a simple fetch. The tricky part was using the spread operator. In order to improve the performance of the application I am calling a function `getSmallerImg` to get smaller images (the images in the collection are really big causing the application to run slower).

```javascript
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
```
above is the function I am passing the objectNumber as parameter in order to fetch smaller images. Some paintings have no smaller image so for that I return a placeholder image.

This was kind of a tricky part

```javascript
const paintings = await Promise.all(data.map( async (painting) => {
    const smallImg = await getSmallerImg(painting.objectNumber);

    const newPainting = {
        ...painting,
        smallImg,
    };

    return newPainting;
}));
```

To quickly go over it I am creatig a new object and using the spread operator to insert the `smallImg` in the object. Then I can loop over the array with objects in my handlebars template.

```html
<ul>
    {{#each paintings}}
    <li class="loading">
        <a href="/art/{{objectNumber}}">
            <img src="{{smallImg}}" alt="{{title}}">
        </a>
    </li>
    {{/each}}
</ul>

```

In my layouts/main.hbs

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/app.css">
    <title>Rijksmuseum</title>
</head>
<body>
    <main>
        {{{body}}}
    </main>
</body>
</html>
```
and voila I did some more but I thought this was the most relevant pieces of code.

## Week 2


