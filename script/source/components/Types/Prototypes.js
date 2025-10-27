/**
 * Converts string to camel case
 * @public
 * @name toCamelCase
 * @function
 * @param           {string} string                     String to convert
 * @return          {string}                            Camel case string
 */
String.prototype.toCamelCase = function ( )
{
    let _firstCharacter = this.charAt ( 0 ).toLowerCase ( );

    let _string         = _firstCharacter + this.substring ( 1 );


    return _string;
};
