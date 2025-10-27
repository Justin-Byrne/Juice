/**
 * Radial gradient object type and properties
 * @extends Gradient
 * @class
 * @property {Point}  start        Start X & Y axis coordinates
 * @property {Number} startRadius  Starting radius of linear gradient
 * @property {Point}  end          End X & Y axis coordinates
 * @property {Number} endRadius    Ending radius of linear gradient gradient
 */
class Radial extends Gradient
{
  // Public properties
    _start       = new Point;
    _startRadius = 0;
    _end         = new Point;
    _endRadius   = 0;

    /**
     * Create a Radial gradient object type and properties
     * @param {Point}        start       - Starting point of linear gradient
     * @param {Number}       startRadius - Starting radius of linear gradient gradient
     * @param {Point}        end         - Ending point of linear gradient
     * @param {Number}       endRadius   - Ending radius of linear gradient gradient
     * @param {Array.<Stop>} stops       - Array of color stops
     */
    constructor ( start, startRadius, end, endRadius, stops )
    {
        // Set parent
        super ( );

        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.start       = start;
        this.startRadius = startRadius;
        this.end         = end;
        this.endRadius   = endRadius;
        this.stops       = stops;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'start', PROPERTY_BLOCKS.individual.start );
        Object.defineProperty ( this, 'end',   PROPERTY_BLOCKS.individual.end   );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set starting radius
     * @public
     * @param {Number} value - Starting radius
     */
    set startRadius ( value )
    {
        this._startRadius = VERIFY.isRadius ( value ) ? value : this._startRadius;
    }

    /**
     * Set starting radius
     * @readOnly
     * @return {Number} Starting radius
     */
    get startRadius ( )
    {
        return this._startRadius;
    }

    /**
     * Set ending radius
     * @public
     * @param {Number} value - Ending radius
     */
    set endRadius ( value )
    {
        this._endRadius = VERIFY.isRadius ( value ) ? value : this._endRadius;
    }

    /**
     * Set ending radius
     * @readOnly
     * @return {Number} Ending radius
     */
    get endRadius ( )
    {
        return this._endRadius;
    }
}
