const express = require('express');
const hbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
const app = express();
const path = require('path');
const mail = require('./lib/mail');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", hbs({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

const active = {
    "about": false,
    "portfolio": false,
    "contact": false
}
function updateActiveRoute(route) {
    Object.keys(active).forEach(key => {
        if (key === route) {
            active[key] = true;
        } else {
            active[key] = false;
        }
    });
}
app.get('/', (req, res) => {
    updateActiveRoute('about');
    // res.sendFile(path.join(__dirname, 'public/index.html'));
    res.render("index", { active });
});
app.get('/portfolio', (req, res) => {
    updateActiveRoute('portfolio');
    res.render('portfolio', { active });
});
app.get('/contact', (req, res) => {
    updateActiveRoute('contact');
    // res.sendFile(path.join(__dirname, 'public/contact.html'));
    res.render('contact', { active });
});
app.post('/api/contact', ({ body }, res) => {
    mail(body).then(response => {
        res.render('contact', { active, message: 'Thank you!' })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err.message);
    });
});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log('Server listening on http://localhost:' + PORT);
});