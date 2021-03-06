
/**
 * method to merge a sources of config
 * it can take path source or object or names of other configs
 *
 * @param { Object|String } - sources of configs
 * @returns { Object }
 * @private
 */
function mergeConfig () {
    var sources = arguments, key = 0, res = [], item;

    for ( ; key < sources.length; key ++ ) {
        item = sources[key];
        if ( typeof item == 'string' ) {
            if ( MAP[item] ) {
                res.push( MAP[item] );
            } else {
                res.push( readFileSync(item) );
            }
        } else if ( item&&Object.prototype.toString.call(item) == '[object Object]' ) {
            res.push( item );
        } else throw new Error('Unexpected variables of config: ', item);
    }
    return res.length ? Object.assign.apply(Object, res) : null;
}
