/**
 * Linear gradient object type and properties
 * @extends Gradient
 * @class
 * @property {Point} start  Start X & Y axis coordinates
 * @property {Point} end    End X & Y axis coordinates
 */
class Linear extends Gradient
{
  // Public properties
    _start = new Point;
    _end   = new Point;

    /**
     * Create a Linear gradient object type
     * @param {Point}        start - Starting point of linear gradient
     * @param {Point}        end   - Ending point of linear gradient
     * @param {Array.<Stop>} stops - Array of color stops
     */
    constructor ( start, end, stops )
    {
        // Set parent
        super ( );

        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.start = start;
        this.end   = end;
        this.stops = stops;
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
}
