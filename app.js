const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();


// unlocking "EJS" template into express
app.set('views',path.join(__dirname,'views'));
// 'views': its a setting to find array of paths or html files
app.set('view engine', 'ejs'); // 'EJS' template enjine for processing view files

// Serving static files css or javascript using middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/about', function(req, res){
   /*const htmlFilePath = path.join(__dirname,'views', 'about.html');
    res.sendFile(htmlFilePath);*/
    res.render('about');
});
app.get('/confirm', function(req, res){
    /*const htmlFilePath = path.join(__dirname,'views', 'confirm.html');
    res.sendFile(htmlFilePath);*/
    res.render('confirm');
});
app.get('/', function(req, res){
   /* const htmlFilePath = path.join(__dirname,'views', 'index.html');
    res.sendFile(htmlFilePath);*/
    res.render('index');
});
app.get('/recommend', function(req, res){
    /*const htmlFilePath = path.join(__dirname,'views', 'recommend.html');
    res.sendFile(htmlFilePath);*/
    res.render('recommend');
});

//Parsing form data & Redirecting Requests
app.post('/recommend', function(req,res){
    const restaurant = req.body;
    const filePath = path.join(__dirname,'data', 'restaurant.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants =JSON.parse(fileData);
    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath,JSON.stringify(storedRestaurants));

    // BuiltIn redirect method
    res.redirect('/confirm');
})
app.get('/restaurants', function(req, res){
    /*const htmlFilePath = path.join(__dirname,'views', 'restaurants.html');
    res.sendFile(htmlFilePath);*/
    const filePath = path.join(__dirname,'data', 'restaurant.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants =JSON.parse(fileData);
    res.render('restaurants',{noofrestaurants: storedRestaurants.length, restaurants: storedRestaurants});
});
app.listen(3000);