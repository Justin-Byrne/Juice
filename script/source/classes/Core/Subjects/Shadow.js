/**
 * Shadow of associated object
 * @class
 * @property {Rgb}    color     RGB color value; r, g, b
 * @property {number} [blur=3]  Blur strength
 * @property {Point}  offset    Point offset coordinates
 */
class Shadow
{
  // Public properties
    _color  = new Rgb;
    _blur   = 3;
    _offset = new Point;

    /**
     * Create a shadow
     * @param {Object} color  - RGB color value
     * @param {number} blur   - Shadow blur value
     * @param {Point}  offset - Shadow offset
     */
    constructor ( color, blur, offset = { x: undefined, y: undefined } )
    {
        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.color  = color;
        this.blur   = blur;
        this.offset = offset;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'color',  PROPERTY_BLOCKS.individual.color   );
        Object.defineProperty ( this, 'blur',   PROPERTY_BLOCKS.individual.blur    );
        Object.defineProperty ( this, 'offset', PROPERTY_BLOCKS.individual.offset  );
        Object.defineProperty ( this, 'x',      PROPERTY_BLOCKS.individual.offsetX );
        Object.defineProperty ( this, 'y',      PROPERTY_BLOCKS.individual.offsetY );
    }
}
