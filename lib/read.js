/*-------------------------------------------------
    PARSERS for files
---------------------------------------------------*/
var parsers = {
    // simple json
    json: JSON.parse.bind( JSON ),
    // parse env file
    env: function ( sourse ) {
        var res = {}, field, value, key = 0, lines = String( sourse ).split('\n');
        for ( ; key < lines.length; key ++ ) {
            field = lines[ key ].match(/^\s*([\w\.\-\$\@\#\*\!\~]+)\s*=+/)[1];
            value = lines[ key ].match(/=\s*(.*)\s*$/)[1].trim();
            if ( field ) res[ field ] = value.replace(/(^['"]|['"]$)/g, '').replace(/\s+/,' ');
        }
        return res;
    }
};

/**
* sync read file 
*
* @param path: { String } - suorce path (required)
* @returns: { Object } - js object from file
*/
mapper['read'] = readFileSync;
function readFileSync ( src ) {

    var root = path.dirname(process.mainModule.filename);
    var parser = parsers[ path.extname(src).replace('.', '') ];

    if ( !parser ) throw new Error('Source path must be specified correctly, with extension(.json .env)');

    return parser( fs.readFileSync( path.join(root, src), 'utf8', 'r') );
}

