/**
 * Control points for bezier curve
 * @class
 * @property {number} p0 Control point one
 * @property {number} p1 Control point two
 * @property {number} p2 Control point three
 * @property {number} p3 Control point four
 */
class ControlPoints
{
  // Public properties
    _p0 = 0;
    _p1 = 0;
    _p2 = 0;
    _p3 = 0;

    /**
     * Create control points
     * @param {number} p0 - Control point one
     * @param {number} p1 - Control point two
     * @param {number} p2 - Control point three
     * @param {number} p3 - Control point four
     */
    constructor ( p0, p1, p2, p3 )
    {
        // Initialize base properties
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set control point one
     * @public
     * @param {number} value - Control point one
     */
    set p0 ( value )
    {
        this._p0 = VERIFY.isNumber ( value ) ? value : this._p0;
    }

    /**
     * Get control point one
     * @readOnly
     * @return {number} Control point one
     */
    get p0 ( )
    {
        return this._p0;
    }

    /**
     * Set control point one
     * @public
     * @param {number} value - Control point two
     */
    set p1 ( value )
    {
        this._p1 = VERIFY.isNumber ( value ) ? value : this._p1;
    }

    /**
     * Get control point one
     * @readOnly
     * @return {number} Control point two
     */
    get p1 ( )
    {
        return this._p1;
    }

    /**
     * Set control point one
     * @public
     * @param {number} value - Control point three
     */
    set p2 ( value )
    {
        this._p2 = VERIFY.isNumber ( value ) ? value : this._p2;
    }

    /**
     * Get control point one
     * @readOnly
     * @return {number} Control point three
     */
    get p2 ( )
    {
        return this._p2;
    }

    /**
     * Set control point one
     * @public
     * @param {number} value - Control point four
     */
    set p3 ( value )
    {
        this._p3 = VERIFY.isNumber ( value ) ? value : this._p3;
    }

    /**
     * Get control point one
     * @readOnly
     * @return {number} Control point four
     */
    get p3 ( )
    {
        return this._p3;
    }

    /**
     * Set points
     * @public
     * @param {number} value - Points of object
     */
    set points ( value )
    {
        if ( VERIFY.isControlPoint ( value ) )

            [ this.p0, this.p1, this.p2, this.p3 ] = [ value [ 0 ], value [ 1 ], value [ 2 ], value [ 3 ] ];
    }

    /**
     * Get points
     * @readOnly
     * @return {number} Points of object
     */
    get points ( )
    {
        return [ this.p0, this.p1, this.p2, this.p3 ];
    }
}
