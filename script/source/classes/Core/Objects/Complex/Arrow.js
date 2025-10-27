/**
 * Ship object
 * @extends ShapeFillable
 * @class
 * @property {Point} points  Vertices of shape
 */
class Arrow extends ShapeFillable
{
    #points =
    [
        new Point (  39,   0 ),
        new Point (   4, -30 ),
        new Point (   4,  -8 ),
        new Point ( -39, -13 ),
        new Point ( -39,  13 ),
        new Point (   4,   8 ),
        new Point (   4,  30 ),
        new Point (  39,   0 )
    ]

    /**
     * Create a Ship object
     * @param {Point}             point  - X & Y axis coordinates
     * @param {number|Point}      radius - Radius of circle
     * @param {Angle}             angle  - Angle properties
     * @param {Stroke}            stroke - Stroke properties
     * @param {Fill}              fill   - Fill properties
     * @param {Shadow}            shadow - Shadow properties
     * @param {HTMLCanvasElement} canvas - Canvas Id
     */
    constructor ( config = {} )
    {
        // Pass common config to parent
        super ( config );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set points
     * @public
     * @param {number} value - Points of object
     */
    set points ( value )
    {
        this.#points = value;
    }

    /**
     * Get points
     * @readOnly
     * @return {number} Points of object
     */
    get points ( )
    {
        return this.#points;
    }

  ////    DRAW    /////////////////////////////////////////

    _drawShape ( )
    {
        for ( let _i = 0; _i < this.points.length; _i++ )
        {
            const _point = this._points [ _i ];
            const _x     = _point.x + this.offset.x;
            const _y     = _point.y + this.offset.y;

            ( _i === 0 ) ? this._canvas.moveTo ( _x, _y )
                         : this._canvas.lineTo ( _x, _y );
        }
    }

    /**
     * Draw this object
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas )
    {
        const _context = this._beginDraw ( canvas );

        if ( ! _context ) return;

        // Override transformation for lines
        _context.translate ( this.x, this.y );

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
