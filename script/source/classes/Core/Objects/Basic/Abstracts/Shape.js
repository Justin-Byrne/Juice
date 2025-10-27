/**
 * Abstract base class for all drawable shapes on HTML5 Canvas
 * Provides common properties and methods for all canvas objects
 * @abstract
 * @class
 * @property {Point}             point  X & Y coordinates
 * @property {Stroke}            stroke Color, type, segments, and width properties
 * @property {Shadow}            shadow Color, blur, and offset properties
 * @property {HTMLCanvasElement} canvas Canvas element ID or reference
 */
class Shape
{
  // Public properties
    _point  = new Point;
    _stroke = new Stroke;
    _shadow = new Shadow;
    _canvas = undefined;

  // Private properties
    #scale    = new Point ( 1, 1 );
    #options  = new Options;
    #mass     = 0;
    #velocity = new Point;
    #active   = false;
    #id       = null;

    /**
     * Base constructor for all shapes
     * @param {Object} config - Configuration object containing common shape properties
     */
    constructor ( config = {} )
    {
        // Destructure with defaults
        const {
            point  = { x: undefined, y: undefined },
            stroke = { color: undefined, type: undefined, segments: undefined, width: undefined },
            shadow = { color: undefined, blur: undefined, offset: { x: undefined, y: undefined } },
            canvas = undefined
        } = config;

        // Initialize base properties
        this.point   = point;
        this._stroke = new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width );
        this._shadow = new Shadow ( shadow.color, shadow.blur, { x: shadow.offset.x, y: shadow.offset.y } );
        this.canvas  = canvas;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set point
     * @public
     * @param {Point} value - X & Y coordinates
     */
    set point ( value )
    {
        this._point = VERIFY.isPoint ( value ) ? new Point ( value.x, value.y ) : this._point;
    }

    /**
     * Get point
     * @readOnly
     * @return {Point} - X & Y coordinates
     */
    get point ( )
    {
        return this._point;
    }

    /**
     * Set x-axis value
     * @public
     * @param {number} value - X coordinate value
     */
    set x ( value )
    {
        this._point.x = value;
    }

    /**
     * Get x-axis value
     * @readOnly
     * @return {number} - X coordinate value
     */
    get x ( )
    {
        return this._point.x;
    }

    /**
     * Set y-axis value
     * @public
     * @param {number} value - Y coordinate value
     */
    set y ( value )
    {
        this._point.y = value;
    }

    /**
     * Get y-axis value
     * @readOnly
     * @return {number} - Y coordinate value
     */
    get y ( )
    {
        return this._point.y;
    }

    /**
     * Set stroke properties
     * @public
     * @param {Stroke} value - Stroke properties
     */
    set stroke ( value )
    {
        this._stroke = VERIFY.isStroke ( value ) ? value : this._stroke;
    }

    /**
     * Get stroke properties
     * @readOnly
     * @return {Stroke} - Stroke properties
     */
    get stroke ( )
    {
        return this._stroke;
    }

    /**
     * Get shadow properties
     * @readOnly
     * @return {Shadow} - Shadow properties
     */
    get shadow ( )
    {
        return this._shadow;
    }

    /**
     * Set canvas value
     * @public
     * @param {string} value - Canvas id
     */
    set canvas ( value )
    {
        this._canvas = VERIFY.isInDom ( value ) ? document.getElementById ( value ).getContext ( '2d' )

                                                : document.getElementById ( 'canvas' ).getContext ( '2d' );
    }

    /**
     * Get canvas value
     * @readOnly
     * @return {string} - Canvas id
     */
    get canvas ( )
    {
        return this._canvas;
    }

    /**
     * Set scale
     * @public
     * @param {number} value - Scale of object
     */
    set scale ( value )
    {
        this.#scale = value;
    }

    /**
     * Get scale
     * @readOnly
     * @return {number} Scale of object
     */
    get scale ( )
    {
        return this.#scale;
    }

    /**
     * Get options properties
     * @readOnly
     * @return {Options} Options properties
     */
    get options ( )
    {
        return this.#options;
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
     * @readOnly
     * @return {number} Id of object
     */
    get id ( )
    {
        return this.#id;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Sets shadow properties
     * @private
     */
    _setShadow ( )
    {
        this._canvas.shadowBlur    = this._shadow.blur;
        this._canvas.shadowOffsetX = this._shadow.x;
        this._canvas.shadowOffsetY = this._shadow.y;
        this._canvas.shadowColor   = this._shadow.color.toCss ( );
    }

    /**
     * Move this object
     * @public
     * @param {number} degree   - Direction to move; in degrees
     * @param {number} distance - Distance to move
     */
    move ( degree, distance )
    {
        const _angle = ( degree % 360 ) * DEG_TO_RAD;
        const _cos   = Math.cos ( _angle );
        const _sin   = Math.sin ( _angle );

        this.x -= _cos * distance;
        this.y -= _sin * distance;
    }

  ////    DRAW    /////////////////////////////////////////

    /**
     * Base draw method - validates canvas and applies transformations
     * @private
     * @param   {string} canvas                 Canvas element ID
     * @returns {CanvasRenderingContext2D|null} Context or null if invalid
     */
    _beginDraw ( canvas )
    {
        if ( canvas !== undefined ) this.canvas = canvas;

        if ( ! ( this._canvas instanceof CanvasRenderingContext2D ) )
        {
            console.warn ( `'canvas' property is not set for ${this.constructor.name}!` );

            return null;
        }

        const _context = this._canvas;

        _context.save ( );


        return _context;
    }

    /**
     * Complete drawing and restore context
     * @private
     * @param {CanvasRenderingContext2D} context - Canvas context
     */
    _endDraw ( context )
    {
        // Reset shadow if it was applied
        if ( this.options.shadow )

            context.shadowColor = new Rgb ( 0, 0, 0, 0 ).toCss ( );


        context.restore ( );
    }

    /**
     * Apply stroke settings
     * @private
     * @param {CanvasRenderingContext2D} context - Canvas context
     */
    _applyStroke ( context )
    {
        context.strokeStyle = this.stroke.color.toCss ( );

        context.lineWidth   = this.stroke.width;

        context.setLineDash ( this.stroke.type === 'solid' ? [] : this.stroke.segments );
    }

    /**
     * Abstract draw method - must be implemented by subclasses
     * @abstract
     * @param {string} canvas - Canvas element ID
     */
    draw ( canvas )
    {
        throw new Error ( 'Draw method must be implemented by subclass' );
    }
}
