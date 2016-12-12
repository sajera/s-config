/*-------------------------------------------------
    define the config on the platform      
---------------------------------------------------*/
if ( typeof process != 'undefined' && Object.prototype.toString.call(process) == '[object process]' ) {

    module.exports = mapper;
}
