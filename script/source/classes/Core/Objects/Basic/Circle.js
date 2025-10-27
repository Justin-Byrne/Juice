/**
 * Circle shape object for drawing on HTML5 Canvas
 * @extends ShapeFillable
 * @class
 * @property {number|Point} [radius=25] Radius of circle
 * @property {Angle}         angle      Angle properties
 */
class Circle extends ShapeFillable
{
  // Public properties
    _radius = 25;
    _angle  = new Angle;

    /**
     * Create a Circle object
     * @param {Point}             point     X & Y axis coordinates
     * @param {number|Point}      radius    Radius of circle
     * @param {Angle}             angle     Angle properties
     * @param {Stroke}            stroke    Stroke properties
     * @param {Fill}              fill      Fill properties
     * @param {Shadow}            shadow    Shadow properties
     * @param {HTMLCanvasElement} canvas    Canvas Id
     */
    constructor (
        point  = { x: undefined, y: undefined },
        radius,
        angle  = { start: undefined, end: undefined, clockwise: undefined },
        stroke = { color: undefined, type: undefined, segments: undefined, width: undefined },
        fill   = { color: undefined, type: undefined },
        shadow = { color: undefined, blur: undefined, offset: { x: undefined, y: undefined } },
        canvas = undefined
    )
    {
        // Pass common config to parent
        super ( { point, stroke, fill, shadow, canvas } );

        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.radius = radius;
        this._angle = new Angle ( angle.start, angle.end, angle.clockwise );
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'radius', PROPERTY_BLOCKS.individual.radius );
        Object.defineProperty ( this, 'angle',  PROPERTY_BLOCKS.individual.angle  );
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

        // Draw the circle/ellipse
        _context.beginPath ( )

        // Draw ellipse or arc
        if ( VERIFY.isPoint ( this.radius ) )

            _context.ellipse ( this.x, this.y, this.radius.x, this.radius.y, 0, this.angle.startInRadians, this.angle.endInRadians, ! this.angle.clockwise );

        else

            _context.arc ( this.x, this.y, this.radius, this.angle.startInRadians, this.angle.endInRadians, ! this.angle.clockwise );

        this._drawFillAndStroke ( _context );
        this._endDraw ( _context );
    }
}
