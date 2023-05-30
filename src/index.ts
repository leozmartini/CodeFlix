import express, { Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';
require('dotenv').config();

const files = require('./routes/files')
const pages = require('./routes/pages')
const scripts = require('./routes/scripts')
const auth  = require('./routes/auth')

const app = express();
const serverURL = process.env.SERVER_URL || "http://localhost";

const port = process.env.PORT || 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.set('views', path.join(__dirname, '../public'));

// Routes

app.use('/files', files)
app.use('/pages', pages)
app.use('/scripts', scripts)
app.use('/auth', auth)

app.get('/login', (req: Request, res: Response)=> {
    res.render('login')
})

app.use(function(req, res, next) {
    res.status(404)
    res.render('404')
});
  

mongoose.connect(process.env.MONGO_URI || 'Erro no DB_URI' ).then(() => {
    console.log('✅ Conectado ao banco de dados.')
    app.listen(port, () => console.log(`✅ Server online -> ${serverURL}:${port}/`))
}).catch((error) => {
    console.log(`Erro na conexão com banco de dados: ${error}`)
})


