/**
 * Linear queue
 * @class
 * @property {Array}    entries   Array of entries
 * @property {number}  [index=0]  Current index
 * @property {Object}   entry     Current entry
 */
class Queue
{
  // Private properties
    #entries = new Array;
    #index   = 0;
    #entry   = undefined;
    #touched = false;

    /**
     * Create a Queue object
     * @param {Array|...any} entries - Either an array of entries or individual arguments
     */
    constructor ( entries )
    {
        if ( Array.isArray ( entries ) )

            this.entries = entries;

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
     * @return          {number}                                    Current index value
     */
    get index ( )
    {
        return this.#index;
    }

    /**
     * Pushes in an entry
     * @public
     */
    set entry ( value )
    {
        if ( typeof value === 'object' || typeof value === 'function' )

            this.#entries.push ( value );
    }

    /**
     * Get current entry
     * @readOnly
     * @return          {Object}                                    Current entry
     */
    get entry ( )
    {
        return this.#entry;
    }

  ////    VERIFICATION    /////////////////////////////////

    /**
     * Returns whether this queue is at its end
     * @readOnly
     * @return          {boolean}                                   True || False
     */
    get isEnd ( )
    {
        return this.#touched && this.#index === 0;
    }

    /**
     * Returns whether this queue is on its last element
     * @readOnly
     * @return          {boolean}                                   True || False
     */
    get isLast ( )
    {
        return this.#index === this.#entries.length - 1;
    }

    /**
     * Returns whether this queue is set, or populated
     * @readOnly
     * @return          {boolean}                                   True || False
     */
    get isSet ( )
    {
        return this.#entries.length > 0;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Returns next entry; begins with [ 0 ], or first entry
     * @readOnly
     * @return          {Object}                                    Next entry
     */
    get next ( )
    {
        this.#touched = true;

        const _entry = this.#entries [ this.#index ];

        this.#index = ( this.#index + 1 ) % this.#entries.length;

        return _entry;
    }

    /**
     * Resets index to 0
     * @readOnly
     */
    get reset ( )
    {
        [ this.#index, this.#touched ] = [ 0, false ];
    }
}
