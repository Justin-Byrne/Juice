/**
 * Text object for rendering text on canvas
 * @extends Font
 * @class
 */
class Text extends Font
{
  // Public properties
    _point  = new Point;
    _text   = undefined;
    _stroke = new Stroke;
    _fill   = new Fill;
    _shadow = new Shadow;
    _canvas = undefined;

  // Private properties
    #scale    = new Point ( 1, 1 );
    #options  = new Options;
    #mass     = 0;
    #velocity = new Point;
    #id       = null;

    /**
     * Create a Text object
     * @param {Point}  point    X & Y axis coordinates
     * @param {string} text     Text of text object
     * @param {string} type     Font type
     * @param {number} size     Font size
     * @param {string} weight   Font weight
     * @param {number} maxWidth Font max width
     * @param {Point}  offset   Text offset
     * @param {Stroke} stroke   Stroke properties
     * @param {Fill}   fill     Fill Properties
     * @param {Shadow} shadow   Shadow properties
     * @param {string} canvas   Canvas Id
     */
    constructor (
        point  = { x: undefined, y: undefined },
        text, type, size, weight, maxWidth,
        offset = { x: undefined, y: undefined },
        stroke = { color: undefined, type: undefined, segments: undefined, width: undefined },
        fill   = { color: undefined, type: undefined },
        shadow = { color: undefined, blur: undefined, offset: { x: undefined, y: undefined } },
        canvas
    )
    {
        // Set parent
        super ( );

        // Define common property descriptors
        this._defineProperties ( );

        // Define utilities
        this._defineUtilities ( );

        // Set defaults
        stroke.width = stroke.width === undefined ? 0 : stroke.width;
        fill.color   = fill.color === undefined ? new Rgb ( 0, 0, 0 ) : fill.color;

        this.point = point;
        this.text  = text;

        // Initialize font properties
        super.type     = type;
        super.size     = size;
        super.weight   = weight;
        super.maxWidth = maxWidth;
        super.offset   = offset;

        // Initialize properties
        this._stroke = new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width );
        this._fill   = new Fill ( fill.color, fill.type );
        this._shadow = new Shadow ( shadow.color, shadow.blur, { x: shadow.offset.x, y: shadow.offset.y } );

        this.canvas = canvas;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'canvas', PROPERTY_BLOCKS.individual.canvas );
        Object.defineProperty ( this, 'offset', PROPERTY_BLOCKS.individual.offset );
        Object.defineProperty ( this, 'point',  PROPERTY_BLOCKS.individual.point  );
        Object.defineProperty ( this, 'x',      PROPERTY_BLOCKS.individual.pointX );
        Object.defineProperty ( this, 'y',      PROPERTY_BLOCKS.individual.pointY );
        Object.defineProperty ( this, 'stroke', PROPERTY_BLOCKS.individual.stroke );
        Object.defineProperty ( this, 'fill',   PROPERTY_BLOCKS.individual.fill   );
        Object.defineProperty ( this, 'shadow', PROPERTY_BLOCKS.individual.shadow );
    }

    /**
     * Define shared utilities
     * @private
     */
    _defineUtilities ( )
    {
        this._setFillType = UTILITIES.individual.set.fillType;
        this._setShadow   = UTILITIES.individual.set.shadow;
        this.move         = UTILITIES.individual.misc.move;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set text
     * @public
     * @param {string} value - Text of object
     */
    set text ( value )
    {
        this._text = VERIFY.isString ( value ) ? value : undefined;
    }

    /**
     * Get text
     * @readOnly
     * @return {string} Text of object
     */
    get text ( )
    {
        return this._text;
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

  ////    DRAWING METHODS    ///////////////////////

    /**
     * Draw this object
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas, shadow = false )
    {
        if ( canvas !== undefined ) this.canvas = canvas;

        if ( ! ( this._canvas instanceof CanvasRenderingContext2D ) )
        {
            console.warn ( `'canvas' property is not set for ${this.constructor.name}!` );

            return;
        }

        const _context = this._canvas;

        const _x = this.x + this.offset.x;
        const _y = this.y + this.offset.y;

        _context.save ( );

        // Apply transformations
        _context.scale ( this.scale.x, this.scale.y );

        // Apply shadow if enabled
        if ( this.options.shadow ) this._setShadow ( );

        // Set text properties
        _context.font         = this.font;
        _context.textAlign    = 'center';
        _context.textBaseline = 'middle';

        this._setFillType ( );

        _context.fillText ( this.text, _x, _y, this.maxWidth );

        // Draw stroke if needed
        if ( this.stroke.width > 0 )
        {
            const _width = _context.lineWidth;

            _context.lineWidth   = this.stroke.width;
            _context.strokeStyle = this.stroke.color.toCss ( );

            _context.strokeText ( this.text, _x, _y, this.maxWidth );

            _context.lineWidth   = _width;
        }

        // Reset shadow
        if ( this.options.shadow ) _context.shadowColor = new Rgb ( 0, 0, 0, 0 ).toCss ( );

        _context.restore ( )
    }
}
