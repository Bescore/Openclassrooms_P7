const http = require( 'http' );
const app = require( './app' );
const fs = require( 'fs' )
const httpPort = 80
const normalizePort = val => {
    const port = parseInt( val, 10 );

    if ( isNaN( port ) ) {
        return val;
    }
    if ( port >= 0 ) {
        return port;
    }
    return false;
};
const port = normalizePort( process.env.PORT || '3000' );
app.set( 'port', port );

const errorHandler = error => {
    if ( error.syscall !== 'listen' ) {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch ( error.code ) {
        case 'EACCES':
            console.error( bind + ' requires elevated privileges.' );
            process.exit( 1 );
            break;
        case 'EADDRINUSE':
            console.error( bind + ' is already in use.' );
            process.exit( 1 );
            break;
        default:
            throw error;
    }
};

const server = http.createServer( app );


server.on( 'error', errorHandler );
server.on( 'listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log( 'Listening on ' + bind );
} );

server.listen( port );



//VUE NECESSARIES//

http.createServer( ( req, res ) => {
    fs.readFile( 'index.html', 'utf-8', ( err, content ) => {
        if ( err ) {
            console.log( 'We cannot open "index.html" file.' )
        }

        res.writeHead( 200, {
            'Content-Type': 'text/html; charset=utf-8'
        } )

        res.end( content )
    } )
} ).listen( httpPort, () => {
    console.log( 'Server listening on: http://localhost:%s', httpPort )
} )