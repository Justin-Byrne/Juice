/**
 * X & Y coordinates for an object
 * @class
 * @property {number} [x=0]  X coordinate value
 * @property {number} [y=0]  Y coordinate value
 * @property {number} [z=0]  Z coordinate value
 */
class Point
{
  // Public properties
    _x = 0;
    _y = 0;
    _z = 0;

    /**
     * Create a point
     * @param {number} x - X coordinate value
     * @param {number} y - Y coordinate value
     * @param {number} z - Z coordinate value
     */
    constructor ( x, y, z )
    {
        // Initialize base properties
        this.x = x;
        this.y = y;
        this.y = y;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set x-axis value
     * @public
     * @param {number} value - X coordinate value
     */
    set x ( value )
    {
        this._x = VERIFY.isNumber ( value ) ? value : this._x;
    }

    /**
     * Get x-axis value
     * @readOnly
     * @return {number} - X coordinate value
     */
    get x ( )
    {
        return this._x;
    }

    /**
     * Set y-axis value
     * @public
     * @param {number} value - Y coordinate value
     */
    set y ( value )
    {
        this._y = VERIFY.isNumber ( value ) ? value : this._y;
    }

    /**
     * Get x-axis value
     * @readOnly
     * @return {number} - X coordinate value
     */
    get y ( )
    {
        return this._y;
    }

    /**
     * Set z-axis value
     * @public
     * @param {number} value - Z coordinate value
     */
    set z ( value )
    {
        this._z = VERIFY.isNumber ( value ) ? value : this._z;
    }

    /**
     * Get x-axis value
     * @readOnly
     * @return {number} - X coordinate value
     */
    get z ( )
    {
        return this._z;
    }
}
