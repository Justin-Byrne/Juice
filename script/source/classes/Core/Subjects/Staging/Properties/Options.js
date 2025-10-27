/**
 * Options for objects
 * @class
 * @property {boolean} [shadow=false] Show shadow
 */
class Options
{
  // Public properties
    _shadow = false;

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set shadow value
     * @public
     * @function
     * @param {boolean} value - True || False
     */
    set shadow ( value )
    {
        this._shadow = VERIFY.isBoolean ( value ) ? value : this._shadow;
    }

    /**
     * Get shadow value
     * @public
     * @function
     * @return {boolean} True || False
     */
    get shadow ( )
    {
        return this._shadow;
    }
}
