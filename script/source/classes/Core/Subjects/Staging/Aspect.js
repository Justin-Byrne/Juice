/**
 * Aspect dimensions of associated object
 * @class
 * @property {number} [width=0]  Width
 * @property {number} [height=0] Height
 */
class Aspect
{
  // Public properties
    _width  = 0;
    _height = 0;

  // Private properties
    #offset = new Point;

    /**
     * Create an aspect
     * @param {number} width  - Width of aspect
     * @param {number} height - Height of aspect
     */
    constructor ( width, height )
    {
        // Initialize base properties
        this.width  = width;
        this.height = height;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set width
     * @public
     * @param {number} value - Width value
     */
    set width ( value )
    {
        this._width = VERIFY.isNumber ( value ) ? value : this._width;
    }

    /**
     * Get width
     * @readOnly
     * @return {number} Width value
     */
    get width ( )
    {
        return this._width;
    }

    /**
     * Set height
     * @public
     * @param {number} value - Height value
     */
    set height ( value )
    {
        this._height = VERIFY.isNumber ( value ) ? value : this._height;
    }

    /**
     * Get height
     * @readOnly
     * @return {number} Height value
     */
    get height ( )
    {
        return this._height;
    }

    /**
     * Get offset
     * @readOnly
     * @return {Point} Aspect offset
     */
    get offset ( )
    {
        return this.#offset;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Get center of aspect
     * @readOnly
     * @return {Point} Center point of this aspect
     */
    get center ( )
    {
        return new Point ( this.width / 2, this.height / 2 );
    }

    /**
     * Get center of height
     * @readOnly
     * @return {number} Center of height
     */
    get heightCenter ( )
    {
        return this.height / 2;
    }

    /**
     * Get center of width
     * @readOnly
     * @return {number} Center of with
     */
    get widthCenter ( )
    {
        return this.width / 2;
    }
}
