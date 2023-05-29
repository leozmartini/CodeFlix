import express, { Response } from 'express';
import path from 'path';

const files = require('./routes/files')
const pages = require('./routes/pages')
const scripts = require('./routes/scripts')


const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.set('views', path.join(__dirname, '../public'));

// Routes

app.use('/files', files)
app.use('/pages', pages)
app.use('/scripts', scripts)

app.get('/login', (req: any, res: any)=> {
    res.render('login')
})

app.use(function(req, res, next) {
    res.status(404)
    res.render('404')
});
  

app.listen(3000, () => console.log('✅ Server online -> http://localhost:3000/'))


