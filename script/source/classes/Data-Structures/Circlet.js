/**
 * Circular iterator
 * @class
 * @property {Array}   entries   Array of entries
 * @property {number} [index=0]  Current index
 * @property {Object}  entry     Current entry
 */
class Circlet
{
    #entries = new Array;
    #index   = 0;
    #entry   = undefined;
    #touched = false;

    /**
     * Create a Circlet object
     * @property        {Array} entries                             Array of entries
     */
    constructor ( entries )
    {
        if ( Array.isArray ( entries ) )
        {
            this.entries = entries;

            this.#entry  = entries [ 0 ];
        }
        else

            this.#entries = Array.from ( arguments ).filter ( value => typeof value === 'object' || typeof value === 'function' );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set entries
     * @public
     * @param {Array} value - Array of entries
     */
    set entries ( value )
    {
        this.#entries = Array.isArray ( value ) ? value : this.#entries;
    }

    /**
     * Get entries
     * @readOnly
     * @return {Array} Array of entries
     */
    get entries ( )
    {
        return this.#entries;
    }

    /**
     * Get index
     * @readOnly
     * @return {number} - Current index value
     */
    get index ( )
    {
        return this.#index;
    }

    /**
     * Pushes in an entry
     * @public
     * @param {Object|Function} value - Entry to add
     */
    set entry ( value )
    {
        if ( typeof value === 'object' || typeof value === 'function' )

            this.#entries.push ( value );
    }

    /**
     * Get current entry
     * @readOnly
     * @return {Object} Current entry
     */
    get entry ( )
    {
        return this.#entry;
    }

  ////    VERIFICATION    /////////////////////////////////

    /**
     * Returns whether this queue is at its end
     * @readOnly
     * @return {boolean} True || False
     */
    isEnd ( )
    {
        return this.#touched && this.#index === 0;
    }

    /**
     * Returns whether this queue is on its last element
     * @readOnly
     * @return {boolean} True || False
     */
    isLast ( )
    {
        return this.#index === this.#entries.length - 1;
    }

    /**
     * Returns whether this queue is set, or populated
     * @readOnly
     * @return {boolean} True || False
     */
    isSet ( )
    {
        return this.#entries.length > 0;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Returns next entry; begins with first entry
     * @readOnly
     * @return {Object} Next entry
     */
    next ( )
    {
        this.#touched = true;

        this.#entry   = this.#entries [ this.#index ];

        this.#index   = ( this.#index + 1 ) % this.#entries.length;

        return this.#entry;
    }

    /**
     * Get the previous item and move index backward; wraps to end
     * @readOnly
     * @return {Object} The previous item in the sequence
     */
    fore ( )
    {
        this.#touched = true;

        this.#entry   = this.#entries [ this.#index ];

        this.#index   = ( this.#index === 0 ) ? this.#entries.length - 1 : this.#index - 1;

        return this.#entry;
    }

    /**
     * Resets index to 0
     * @public
     */
    reset ( )
    {
        [ this.#index, this.#touched ] = [ 0, false ];
    }
}
