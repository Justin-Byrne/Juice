/**
 * Fill container for various fill types
 * @class
 * @property {Rgb}     color          Color model & value
 * @property {string} [type='solid']  Fill type; solid | linear | radial | conic | pattern
 * @property {Object}  gradient       Gradient object; Linear | Radial | Conic
 * @property {Pattern} pattern        Pattern fill object
 * @property {string}  repetition     Repetition of fill pattern
 */
class Fill
{
  // Public properties
    _color      = new Rgb ( 0, 0, 0, 0 );
    _type       = 'solid';
    _gradient   = undefined;
    _pattern    = undefined;
    _repetition = 'repeat';

    /**
     * Create a fill type
     * @param {Rgb}     color         - Color model & value
     * @param {string} [type='solid'] - Fill type
     * @param {Object}  gradient      - Gradient object
     * @param {Pattern} pattern       - Pattern fill object
     * @param {string}  repetition    - Repetition of fill pattern
     */
    constructor ( color, type, gradient, pattern, repetition )
    {
        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.color      = color;
        this.type       = type;
        this.gradient   = gradient;
        this.pattern    = pattern;
        this.repetition = repetition;
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
     * Set type value
     * @public
     * @param {string} value - Fill type value
     */
    set type ( value )
    {
        this._type = VERIFY.isFillType ( value ) ? value : this._type;
    }

    /**
     * Get type value
     * @readOnly
     * @return {string} Fill type value
     */
    get type ( )
    {
        return this._type;
    }

    /**
     * Set gradient gradient properties
     * @public
     * @param {Object} value - Gradient object & properties
     */
    set gradient ( value )
    {
        if ( VERIFY.isGradient ( value ) )

            [ this._gradient, this._type ] = [ value, value.constructor.name.toLowerCase ( ) ];
    }

    /**
     * Get gradient gradient properties
     * @readOnly
     * @return {Object} Gradient object & properties
     */
    get gradient ( )
    {
        return this._gradient;
    }

    /**
     * Sets pattern property value
     * @public
     * @param {string} value - Path of image to pattern
     */
    set pattern ( value )
    {
        if ( VERIFY.isString ( value ) )
        {
            const _image     = new Image;

                  _image.src = value;


            this._pattern = _image;

            this.type     = 'pattern';
        }
    }

    /**
     * Gets pattern property value
     * @readOnly
     * @return {Pattern} Pattern fill object
     */
    get pattern ( )
    {
        return this._pattern;
    }

    /**
     * Sets repetition property value
     * @public
     * @param {string} value - Repetition property value
     */
    set repetition ( value )
    {
        this._repetition = VERIFY.isRepetition ( value ) ? value : this._repetition;
    }

    /**
     * Gets repetition property value
     * @readOnly
     * @return {string} Repetition property value
     */
    get repetition ( )
    {
        return this._repetition;
    }
}
