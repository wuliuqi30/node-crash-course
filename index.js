// import{Person} from './person.js'
// import { basename } from 'path';
// import { fileURLToPath } from 'url';
// import { Logger } from './logger.js';
import { basename, dirname, extname, join, parse } from 'path'
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { readFile } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const server = createServer((req, res) => {
    // console.log('enetered create server thing')
    // console.log(req.url)
    // if(req.url === '/'){
    //     readFile(join(__dirname,'public','index.html'),(err,content)=> {
    //         if(err) throw err
    //         res.writeHead(200,{'Content-Type': 'text/html'})
    //         res.end(content); 
    //     })


    // }

    // if(req.url === '/api/users'){
    //     const users = [
    //         {name: 'bob smith', age: 40},
    //         {name: 'jennifer', age: 34}
    //     ];
    //     res.writeHead(200,{'Content-Type':'application/json'});
    //     res.end(JSON.stringify(users))

    // }

    // Build file path

    let filePath = join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);



    let extensionname = extname(filePath);

    let contentType = 'text/html';

    switch (extensionname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // read file

    readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('Page not found')
                // Page not found
                readFile(join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');

                }
                )
            } else {
                // some server error
                res.writeHead(500);
                res.end(`Server Error ${err.code}`);
            }
        } else {
            console.log('Success')
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));



// console.log(basename('/foo/bar/baz/asdf/quux.html'))
// // const person = require('./person')
// const hersh = new Person('hersh', 33);
// hersh.greeting();


// const logger = new Logger();

// logger.on('message',(data)=>console.log('Called Listener',data));

// logger.log('Hello world')

// logger.log('Hello')

// logger.log('soup')



