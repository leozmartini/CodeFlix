import express, { Request, Response } from 'express';
import { authVerify, loginRedirect } from './controllers/authVerify';
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const files = require('./routes/files')
const pages = require('./routes/pages')
const scripts = require('./routes/scripts')
const auth = require('./routes/auth')

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser())
app.set('views', path.join(__dirname, '..', 'views'));

// Routes
app.use('/files', authVerify, files)
app.use('/pages', authVerify, pages)
app.use('/scripts', authVerify, scripts)
app.use('/auth', auth)

app.get('/login', loginRedirect)

app.get('/', (req: Request, res: Response) => {
    res.render('index')
})

app.use(function (req, res, next) {
    res.status(404)
    res.render('404')
});


mongoose.connect(process.env.MONGO_URI || 'Erro no DB_URI').then(() => {
    console.log('✅ Conectado ao banco de dados.')
    app.listen(port, () => console.log(`✅ Server online na porta ${port}`))
}).catch((error: any) => {
    console.log(`Erro na conexão com banco de dados: ${error}`)
})




// HTTPS (apenas para desenvolvimento, no deploy não é necessário pois é usado o SSL da própria hospedagem)

// const https = require('https')
// mongoose.connect(process.env.MONGO_URI || 'Erro no DB_URI' ).then(() => {
// https.createServer({
//     key: fs.readFileSync('./SSL/code.key'),
//     cert: fs.readFileSync('./SSL/code.crt'),
// }, app).listen(port, () => {
//     console.log(`✅ Server HTTPS online -> https://${serverURL}:${port}/`);
// })
// }).catch((error) => {
//     console.log(`Erro ao tentar iniciar: ${error}`)
// })