import express from 'express';

const files = require('./routes/files')
const pages = require('./routes/pages')
const scripts = require('./routes/scripts')


const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.set('views', 'views');

// Routes

app.use('/files', files)
app.use('/pages', pages)
app.use('/scripts', scripts)

app.listen(3000, () => console.log('✅ Server online -> http://localhost:3000/'))


