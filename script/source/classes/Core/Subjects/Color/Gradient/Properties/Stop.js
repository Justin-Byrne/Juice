/**
 * Color stop properties for gradients
 * @class
 * @property {Rgb}    color   Color model & value
 * @property {number} offset  Representation of the color stop position; 0 = start, & 1 = end
 */
class Stop
{
  // Public properties
    _color  = new Rgb;
    _offset = undefined;

    /**
     * Create a color stop
     * @param {Rgb|string} color  - Color model, or CSS color value
     * @param {number}     offset - Representation of the color stop position
     */
    constructor ( color, offset )
    {
        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.color  = color;
        this.offset = offset;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'color', PROPERTY_BLOCKS.individual.color );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set offset value
     * @public
     * @param {number} value - Offset value
     */
    set offset ( value )
    {
        this._offset = ( VERIFY.isDecimal ( value ) ) ? value : this._offset;
    }

    /**
     * Get offset value
     * @readOnly
     * @return {number} Offset value
     */
    get offset ( )
    {
        return this._offset;
    }
}
