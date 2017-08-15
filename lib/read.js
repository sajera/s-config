/*-------------------------------------------------
    PARSERS for files
    parser['.env']('DB_PASS=s1mpl3')
    parser['.json']('{"DB_PASS"="s1mpl3"}')
---------------------------------------------------*/
var parser = {
    // simple json
    '.json': JSON.parse.bind( JSON ),
    // parse env file
    '.env': function ( sourse ) {
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
 * @description
    
    s-config can read .json and .env files.
    If you do not need to use constants, you can read the files without saving them inside of the s-config.
    Important - this method does not use ability to merge configuration. 

 * @example 
    // 
    require('s-config').read('./test.env');
    require('s-config').read('./test.json');

    // Emulation of the "dotenv" approach
    // read of environment variable from '.env' and write it in process
    Object.assign(process.env, require('s-config').read('.env') );
    // expand of environment variable from environment file
    Object.assign(process.env, require('s-config').read('./config/env/'+process.env.NODE_ENV+'.env') );

 *
 * @param { String } path - suorce path (extension is required)
 * @returns { Object } - js object from file
 */
mapper['read'] = readFileSync;
function readFileSync ( src ) {

    var root = path.dirname(process.mainModule.filename);
    var parse = parser[ path.extname(src) ];

    if ( !parse ) throw new Error('Source path must be specified correctly, with extension(.json .env)');

    return parse( fs.readFileSync( path.join(root, src), 'utf8', 'r') );
}

