/**
 * Range object
 * @class
 * @property {number} min   - Minimum range
 * @property {number} max   - Maximum range
 * @property {number} value - Current value
 */
class Range
{
  // Public properties
    _min   = 0;
    _max   = 100;
    _value = 0;

    /**
     * Create a Range object
     * @param {number} min   - Minimum range
     * @param {number} max   - Maximum range
     * @param {number} value - Current value
     */
    constructor ( min, max, value )
    {
        // Initialize base properties
        this.min   = min;
        this.max   = max;
        this.value = value;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set min
     * @public
     * @param {number} value - Min of object
     */
    set min ( value )
    {
        this._min = VERIFY.isNumber ( value ) ? value : this._min;
    }

    /**
     * Get min
     * @readOnly
     * @return {number} Min of object
     */
    get min ( )
    {
        return this._min;
    }

    /**
     * Set max
     * @public
     * @param {number} value - Max of object
     */
    set max ( value )
    {
        this._max = VERIFY.isNumber ( value ) ? value : this._max;
    }

    /**
     * Get max
     * @readOnly
     * @return {number} Max of object
     */
    get max ( )
    {
        return this._max;
    }

    /**
     * Set value
     * @public
     * @param {number} value - Value of object
     */
    set value ( value )
    {
        this._value = VERIFY.isNumber ( value ) ? value : this._value;
    }

    /**
     * Get value
     * @readOnly
     * @return {number} Value of object
     */
    get value ( )
    {
        return this._value;
    }
}
