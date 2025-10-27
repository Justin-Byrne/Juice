/**
 * Angle properties of associated object
 * @class
 * @property {number}  [start=0]        The start of the angle, in radians; measured from the positive x-axis
 * @property {number}  [end=360]        The end of the angle, in radians; measured from the positive x-axis
 * @property {boolean} [clockwise=true] Path arc clockwise
 */
class Angle
{
  // Public properties
    _start     = 0;
    _end       = 360;
    _clockwise = true;

    /**
     * Create an angle
     * @param {number}  start     - The angle at which the arc starts in degrees, measured from the positive x-axis
     * @param {number}  end       - The angle at which the arc ends in degrees, measured from the positive x-axis
     * @param {boolean} clockwise - Draws the arc clockwise between the start and end angles
     */
    constructor ( start, end, clockwise )
    {
        // Initialize base properties
        this.start     = start;
        this.end       = end;
        this.clockwise = clockwise;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set start angle
     * @public
     * @param {number} value - Start angle; in degrees
     */
    set start ( value )
    {
        this._start = VERIFY.isDegree ( value ) ? value : this._start;
    }

    /**
     * Get start angle
     * @readOnly
     * @return {number} Start value; in degrees
     */
    get start ( )
    {
        return this._start;
    }

    /**
     * Set end angle
     * @public
     * @param {number} value - End angle; in degrees
     */
    set end ( value )
    {
        this._end = VERIFY.isDegree ( value ) ? value : this._end;
    }

    /**
     * Get end angle
     * @readOnly
     * @return {number} End angle; in degrees
     */
    get end ( )
    {
        return this._end;
    }

    /**
     * Set clockwise
     * @public
     * @param {boolean} value - Clockwise; true | false
     */
    set clockwise ( value )
    {
        this._clockwise = VERIFY.isBoolean ( value ) ? value : this._clockwise;
    }

    /**
     * Get clockwise
     * @readOnly
     * @return {boolean} Clockwise; true | false
     */
    get clockwise ( )
    {
        return this._clockwise;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Convert degree to radian
     * @private
     * @param {number} value - Degree
     * @return {number} Conversion in radians
     */
    _convert2Radian ( value )
    {
        return VERIFY.isDegree ( value ) ? value * DEG_TO_RAD : console.warn ( `${value} is not a degree value !` );
    }
    /**
     * Get start angle in radians
     * @readOnly
     * @return {number} Start value; to radians
     */
    get startInRadians ( )
    {
        return this._convert2Radian ( this.start );
    }

    /**
     * Get end angle in radians
     * @readOnly
     * @return {number} End value; in radians
     */
    get endInRadians ( )
    {
        return this._convert2Radian ( this.end );
    }
}
