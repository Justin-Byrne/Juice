/**
 * Line shape object for drawing straight or curved lines
 * @extends Shape
 * @class
 * @property {Point}   start            Start X & Y axis coordinates
 * @property {Point}   end              End X & Y axis coordinates
 * @property {string} [lineCap='round'] Line cap's end points shape
 */
class Line extends Shape
{
  // Public properties
    _start   = new Point;
    _end     = new Point;
    _lineCap = 'round';

  // Private properties
    #offset        = new Point ( 0, 0 );
    #controlPoints = new ControlPoints;

    /**
     * Create a Line object
     * @param {Point}  start    Starting point of line
     * @param {Point}  end      Ending point of line
     * @param {Stroke} stroke   Stroke properties
     * @param {Shadow} shadow   Shadow properties
     * @param {string} lineCap  Shape of end points
     * @param {string} canvas   Canvas Id
     */
    constructor (
        start   = { x: undefined, y: undefined },
        end     = { x: undefined, y: undefined },
        stroke  = { color: undefined, type: undefined, segments: undefined, width: undefined },
        shadow  = { color: undefined, blur: undefined, offset: { x: undefined, y: undefined } },
        lineCap = undefined,
        canvas
    )
    {
        // Pass common config to parent
        super ( { point: { x: undefined, y: undefined }, stroke, shadow, canvas } );

        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.start   = start;
        this.end     = end;
        this.lineCap = lineCap;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'start',   PROPERTY_BLOCKS.individual.start   );
        Object.defineProperty ( this, 'end',     PROPERTY_BLOCKS.individual.end     );
        Object.defineProperty ( this, 'lineCap', PROPERTY_BLOCKS.individual.lineCap );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set offset
     * @public
     * @param {number} value - Offset of object
     */
    set offset ( value )
    {
        this.#offset = value;
    }

    /**
     * Get offset
     * @readOnly
     * @return {number} Offset of object
     */
    get offset ( )
    {
        return this.#offset;
    }

    /**
     * Get control point properties
     * @readOnly
     * @return {ControlPoints} Control points properties
     */
    get controlPoints ( )
    {
        return this.#controlPoints;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Set line's path
     * @private
     */
    _setPath ( context )
    {
        const _cp = this.controlPoints;

        // Draw bezier curve or straight line
        if ( _cp.p0 !== 0 || _cp.p1 !== 0 || _cp.p2 !== 0 || _cp.p3 !== 0 )

            context.bezierCurveTo ( _cp.p0 + this.start.x, _cp.p1 + this.start.y, _cp.p2 + this.end.x, _cp.p3 + this.end.y, this.end.x, this.end.y );

        else

            context.lineTo ( this.end.x, this.end.y );
    }

    /**
     * Get center of this object
     * @readOnly
     * @return {Point} Center point coordinates
     */
    get center ( )
    {
        const _x = ( this.start.x > this.end.x )

                       ? this.end.x   + ( ( this.start.x - this.end.x )   / 2 )

                       : this.start.x + ( ( this.end.x   - this.start.x ) / 2 );

        const _y = ( this.start.y > this.end.y )

                       ? this.end.y   + ( ( this.start.y - this.end.y )   / 2 )

                       : this.start.y + ( ( this.end.y   - this.start.y ) / 2 );

        return new Point ( _x, _y );
    }

    /**
     * Set control points for bezier curve
     * @public
     * @param {number} p0 - Control point 0
     * @param {number} p1 - Control point 1
     * @param {number} p2 - Control point 2
     * @param {number} p3 - Control point 3
     */
    curve ( p0, p1, p2, p3 )
    {
        this.controlPoints.p0 = p0;
        this.controlPoints.p1 = p1;
        this.controlPoints.p2 = p2;
        this.controlPoints.p3 = p3;
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

        // Override transformation for lines
        _context.translate ( this.x, this.y );

        // Set line-specific styles
        this._applyStroke ( _context );

        _context.lineCap = this.lineCap;

        // Draw the line
        _context.beginPath ( )
        _context.moveTo ( this.start.x, this.start.y );

        this._setPath ( _context );

        _context.closePath ( )
        _context.stroke ( )

        this._endDraw ( _context );
    }
}
