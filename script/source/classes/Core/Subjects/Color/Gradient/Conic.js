/**
 * Conic gradient object type and properties
 * @extends Gradient
 * @class
 * @property {Point}  point  X & Y axis coordinates
 * @property {number} angle  Angle in radians
 */
class Conic extends Gradient
{
  // Public properties
    _point = new Point;
    _angle = 0;

    /**
     * Create a Conic gradient object type
     * @param {number}       angle - Angle in radians
     * @param {Point}        point - Starting point of linear gradient
     * @param {Array.<Stop>} stops - Array of color stops
     */
    constructor ( angle, point, stops )
    {
        // Set parent
        super ( );

        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.point = point;
        this.angle = angle;
        this.stops = stops;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'point', PROPERTY_BLOCKS.individual.point );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set angle property
     * @public
     * @param {Angle} value - Angle object
     */
    set angle ( value )
    {
        this._angle = VERIFY.isRadian ( value ) ? value : this._angle;
    }

    /**
     * Set angle property
     * @readOnly
     * @return {Angle} Angle object
     */
    get angle ( )
    {
        return this._angle;
    }
}
