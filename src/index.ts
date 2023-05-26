const express = require('express')
const path = require('path')
import { listDir } from '../protected/src/listDir';


const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.set('views', 'views');

// pages
app.get('/', (req: any, res: any)=> {
    res.render('index')
})

app.get('/principal', (req: any, res: any)=> {
    res.render('../views/principal')
})

app.get('/math', (req: any, res: any)=> {
    res.render('../views/math')
})

app.get('/musicas', (req: any, res: any)=> {
    res.render('../views/musicas')
})


// files
app.get('/protected/images/:imageName', (req: any, res: any) => {
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '../protected/images', imageName))
})

app.get('/protected/images/timeline/:imageName', (req: any, res: any) => {
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '../protected/images/timeline', imageName))
})

app.get('/protected/src/:fileName', (req: any, res: any) => {
    const fileName = req.params.fileName;
    res.sendFile(path.resolve(__dirname, '../protected/src', fileName))
})

// scripts
app.get('/array', async (req: any, res: any) => {
    const files = await listDir()
    res.send(files)
})


app.listen(3000, () => console.log('✅ Server online -> http://localhost:3000/'))


