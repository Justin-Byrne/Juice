/**
 * Image object for rendering images on canvas
 * @class
 * @property {string}            source             Source path of image file
 * @property {Object}            primary            Primary set of coordinates
 * @property {Point}             primary.point      X & Y axis coordinates
 * @property {Aspect}            primary.aspect     Aspect properties
 * @property {Object}            secondary          Secondary set of coordinates
 * @property {Point}             secondary.point    X & Y axis coordinates
 * @property {Aspect}            secondary.aspect   Aspect properties
 * @property {HTMLCanvasElement} canvas             Canvas element ID or reference
 */
class aImage
{
  // Public properties
    _source = new Image;

    _primary =
    {
        point:  new Point,
        aspect: new Aspect
    };

    _secondary =
    {
        point:  undefined,
        aspect: undefined
    };

    _canvas = undefined;

  // Private properties
    #id = null;

    /**
     * Create a cImage object
     * @param {string}            source            Source path of image file
     * @param {Object}            primary           Primary set of coordinates
     * @param {Point}             primary.point     X & Y axis coordinates
     * @param {Aspect}            primary.aspect    Aspect properties
     * @param {Object}            secondary         Secondary set of coordinates
     * @param {Point}             secondary.point   X & Y axis coordinates
     * @param {Aspect}            secondary.aspect  Aspect properties
     * @param {HTMLCanvasElement} canvas            Canvas Id
     */
    constructor (
        source,
        primary   = { point: { x: undefined, y: undefined }, aspect: { width: undefined, height: undefined } },
        secondary = { point: { x: undefined, y: undefined }, aspect: { width: undefined, height: undefined } },
        canvas
    )
    {
        // Define common property descriptors
        this._defineProperties ( );

        // Define utilities
        this._defineUtilities ( );

        // Initialize base properties
        this.source    = source;
        this.primary   = primary;
        this.secondary = secondary;
        this.canvas    = canvas;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'source', PROPERTY_BLOCKS.individual.source );
        Object.defineProperty ( this, 'canvas', PROPERTY_BLOCKS.individual.canvas );
        Object.defineProperty ( this, 'center', PROPERTY_BLOCKS.individual.center );
    }

    /**
     * Define shared utilities
     * @private
     */
    _defineUtilities ( )
    {
        this.move = UTILITIES.individual.misc.move;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Sets primary property values
     * @public
     * @param {Object} object        - Primary set of coordinates
     * @param {Point}  object.point  - X & Y axis coordinates
     * @param {Aspect} object.aspect - Aspect properties
     */
    set primary ( object )
    {
        if ( VERIFY.isPointNAspect ( object ) )

            [ this._primary.point, this._primary.aspect ] = [ object.point, object.aspect ];
    }

    /**
     * Gets primary property value
     * @readOnly
     * @return {Object} Primary set of coordinates
     */
    get primary ( )
    {
        return this._primary;
    }

    /**
     * Sets secondary property values
     * @public
     * @param {Object} object        - Secondary set of coordinates
     * @param {Point}  object.point  - X & Y axis coordinates
     * @param {Aspect} object.aspect - Aspect properties
     */
    set secondary ( value )
    {
        if ( VERIFY.isPointNAspect ( value ) )

            [ this._secondary.point, this._secondary.aspect ] = [ value.point, value.aspect ];
    }

    /**
     * Gets primary property value
     * @readOnly
     * @return {Object} Secondary set of coordinates
     */
    get secondary ( )
    {
        return this._secondary;
    }

    /**
     * Set point
     * @public
     * @param {Point} value - X & Y coordinates
     */
    set point ( value )
    {
        this._primary.point = VERIFY.isPoint ( value ) ? value : this._primary.point;
    }

    /**
     * Get point
     * @readOnly
     * @return {Point} - X & Y coordinates
     */
    get point ( )
    {
        return this._primary.point;
    }

    /**
     * Set x-axis value
     * @public
     * @param {number} value - X coordinate value
     */
    set x ( value )
    {
        this._primary.point.x = VERIFY.isNumber ( value ) ? value : this._primary.point.x;
    }

    /**
     * Get x-axis value
     * @readOnly
     * @return {number} - X coordinate value
     */
    get x ( )
    {
        return this._primary.point.x;
    }

    /**
     * Set y-axis value
     * @public
     * @param {number} value - Y coordinate value
     */
    set y ( value )
    {
        this._primary.point.y = VERIFY.isNumber ( value ) ? value : this._primary.point.y;
    }

    /**
     * Get y-axis value
     * @readOnly
     * @return {number} - Y coordinate value
     */
    get y ( )
    {
        return this._primary.point.y;
    }

    /**
     * Set id
     * @public
     * @param {number} value - Id of object
     */
    set id ( value )
    {
        this.#id = value;
    }

    /**
     * Get id
     * @public
     * @return {number} Id of object
     */
    get id ( )
    {
        return this.#id;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Get aspect with
     * @readOnly
     * @return {number} Width value
     */
    get width ( )
    {
        return this.source.width;
    }

    /**
     * Get aspect height
     * @readOnly
     * @return {number} Height value
     */
    get height ( )
    {
        return this.source.height;
    }

  ////    DRAW    /////////////////////////////////////////

    /**
     * Draws image depending on primary & secondary property settings
     * @private
     * @function
     */
    _drawImage ( )
    {
        if ( this.secondary.point )

            this._canvas.drawImage ( this._source, this.secondary.point.x, this.secondary.point.y, this.secondary.aspect.width, this.secondary.aspect.height, this.anchor.x, this.anchor.y, this.primary.aspect.width, this.primary.aspect.height );

        else

            this._canvas.drawImage ( this._source, this.anchor.x, this.anchor.y, this._source.width, this._source.height );
    }

    /**
     * Draw this object
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas )
    {
        if ( canvas ) this.canvas = canvas;

        if ( this.source.onload === null && this._canvas instanceof CanvasRenderingContext2D )

            this.source.onload = ( ) => { this._drawImage ( ); }

        else

            this._drawImage ( );
    }
}
