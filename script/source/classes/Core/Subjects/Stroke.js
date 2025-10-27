/**
 * Stroke properties of associated object
 * @class
 * @property {Rgb}      color              Color model & value
 * @property {string}   [type='solid']     Stroke type; 'solid' || 'dashed'
 * @property {number[]} [segments=[5, 5]]  Dashed line segment distance(s)
 * @property {number}   [width=2]          Thickness of stroke
 * @property {Shadow}   shadow             Shadow properties
 */
class Stroke
{
  // Public properties
    _color    = new Rgb ( 255, 255, 255 );
    _type     = 'solid';
    _segments = [ 5, 5 ];
    _width    = 1;

    /**
     * Create a stroke
     * @param {Object}   color    - RGB color value
     * @param {string}   type     - Stroke type
     * @param {number[]} segments - Dashed line segment distance(s)
     * @param {number}   width    - Thickness of stroke
     */
    constructor ( color, type, segments, width )
    {
        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.color    = color;
        this.type     = type;
        this.segments = segments;
        this.width    = width;
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
     * Set type
     * @public
     * @param {string} value - Stroke type: 'solid' || 'dashed'
     */
    set type ( value )
    {
        this._type = VERIFY.isStrokeType ( value ) ? value : this._type;
    }

    /**
     * Get type
     * @readOnly
     * @return {string}                                    Stroke type: 'solid' || 'dashed'
     */
    get type ( )
    {
        return this._type;
    }

    /**
     * Set segment value
     * @public
     * @param {Array.<number>} value - Dashed line segment distance(s)
     */
    set segments ( value )
    {
        this._segments = VERIFY.isSegments ( value ) ? value : this._segments;
    }

    /**
     * Get segment value
     * @readOnly
     * @return {Array.<number>} Dashed line segment distance(s)
     */
    get segments ( )
    {
        return this._segments;
    }

    /**
     * Set width value
     * @public
     * @param {number} value - Thickness of stroke
     */
    set width ( value )
    {
        this._width = VERIFY.isWidth ( value ) ? value : this._width;
    }

    /**
     * Get width value
     * @readOnly
     * @return {number} Thickness of stroke
     */
    get width ( )
    {
        return this._width;
    }
}
