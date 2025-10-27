/**
 * Rectangle shape object
 * @extends ShapeFillable
 * @class
 * @property {Aspect} aspect Aspect properties
 * @property {Array}  round  Rounding properties
 */
class Rectangle extends ShapeFillable
{
  // Public properties
    _aspect = new Aspect;
    _round  = new Array;

    /**
     * Create a Rectangle object
     * @param {Point}  point    X & Y axis coordinates
     * @param {Aspect} aspect   Aspect properties
     * @param {Array}  round    Rounding properties
     * @param {Stroke} stroke   Stroke properties
     * @param {Fill}   fill     Fill properties
     * @param {Shadow} shadow   Shadow properties
     * @param {string} canvas   Canvas Id
     */
    constructor (
        point  = { x: undefined, y: undefined },
        aspect = { width: undefined, height: undefined },
        round  = [ 0, 0, 0, 0 ],
        stroke = { color: undefined, type: undefined, segments: undefined, width: undefined },
        fill   = { color: undefined, type: undefined },
        shadow = { color: undefined, blur: undefined, offset: { x: undefined, y: undefined } },
        canvas
    )
    {
        // Pass common config to parent
        super ( { point, stroke, fill, shadow, canvas } );

        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.width  = aspect.width !== undefined ? aspect.width : 50;
        this.height = aspect.height !== undefined ? aspect.height : 50;
        this.round  = round;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'aspect', PROPERTY_BLOCKS.individual.aspect );
        Object.defineProperty ( this, 'width',  PROPERTY_BLOCKS.individual.width  );
        Object.defineProperty ( this, 'height', PROPERTY_BLOCKS.individual.height );
        Object.defineProperty ( this, 'round',  PROPERTY_BLOCKS.individual.round  );
    }

  ////    DRAW    /////////////////////////////////////////

    /**
     * Draw this object
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas )
    {
        const _context = this._beginDraw ( canvas );

        if ( ! _context ) return;

        // Apply shadow if enabled
        if ( this.options.shadow ) this._setShadow ( );

        // Set styles
        this._applyStroke ( _context );
        this._setFillType ( );

        // Draw the rectangle
        _context.beginPath ( );
        _context.roundRect ( this.x, this.y, this.width, this.height, this.round );

        this._drawFillAndStroke ( _context );
        this._endDraw ( _context );
    }
}
