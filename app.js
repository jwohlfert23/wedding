const express = require('express')
const path = require('path');
const fs = require('fs');
const exphbs = require('express-handlebars')
const sizeOf = require('image-size');
const inflection = require('inflection')

const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.get('/', (req, res) => res.render('home'))

const directoryPath = path.join(__dirname, 'public/img/gallery');
const files = fs.readdirSync(directoryPath);

const photos = files.filter(file => !file.includes('_tn')).map((file) => {
    const dim = sizeOf(path.join(__dirname, 'public/img/gallery')+'/'+file)
    const basename =file.split('.')[0];
    return {
        width: dim.width,
        height: dim.height,
        image: `/img/gallery/${file}`,
        thumbnail: `/img/gallery/${basename}_tn.jpg`,
        caption: inflection.humanize(basename)
    }
});

app.get('/photos', (req, res) => res.render('photos', {photos}))

app.use(express.static('public'))
app.use('/images', express.static('images'))

/*
const directoryPath = path.join(__dirname, 'views');
const files = fs.readdirSync(directoryPath);
    files.forEach((file) => {
       const basename = file.split('.')[0];
        app.get('/'+basename, (req, res) => {
            res.render(basename)
        })
    });
*/
module.exports = app;