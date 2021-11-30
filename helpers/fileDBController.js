const fs = require('fs');

const file = './db/data.json';

const saveDB = ( data ) => {

    try {
        
        fs.writeFileSync( file, JSON.stringify( data ) );
    } catch (error) {
        console.log('Cant write file');
    }
}

const readDB = () => {


    try {
        if ( !fs.existsSync( file ) ) return null;

        const data = JSON.parse( fs.readFileSync( file, { encoding: 'utf8'} ) );

        return data;
        
    } catch (error) {
        // console.log('Cant read file');
    }
}

module.exports = {
    saveDB,
    readDB
}