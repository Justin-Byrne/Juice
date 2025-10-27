/**
 * Bounded array
 * @class
 * @property {number} maxSize  Maximum number of items stored
 */
class BoundedArray extends Array
{
  // Private properties
    #maxSize = undefined;

    /**
     * Creates a BoundedArray
     * @param {number} maxSize - Maximum number of items to store
     */
    constructor ( maxSize )
    {
    	super ( );

    	this.maxSize = maxSize;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Sets the maxSize size
     * @public
     * @param {number} value - New maxSize size
     */
	set maxSize ( value )
	{
	    this.#maxSize = VERIFY.isNumber ( value ) ? value : this.#maxSize;
	}

	/**
     * Gets the maxSize size
     * @readOnly
     * @returns {number} The maxSize size limit
     */
	get maxSize ( )
	{
	    return this.#maxSize;
	}

  ////    UTILITIES    ////////////////////////////////////

	/**
     * Checks if the array is at capacity
     * @readOnly
     * @returns {boolean} True || False
     */
    get isAtCapacity ( )
    {
        return this.#maxSize !== undefined && this.length >= this.#maxSize;
    }

    /**
     * Gets the remaining capacity
     * @readOnly
     * @returns {number|null} Number of items that can be added, or null if unlimited
     */
    get remainingCapacity ( )
    {
        if ( this.#maxSize === undefined ) return null;

        return Math.max ( 0, this.#maxSize - this.length );
    }

    /**
     * Changes the maximum size and trims array if necessary
     * @param {number} newMaxSize - New maximum size
     */
    resizeCapacity ( newMaxSize )
    {
        this.maxSize = newMaxSize;

        // Trim array if it exceeds new maximum
        if ( this.#maxSize !== undefined && this.length > this.#maxSize )

            this.splice(0, this.length - this.#maxSize);
    }

    /**
     * Adds an item only if there's capacity
     * @param   {*} item - Item to add
     * @returns {boolean} True if item was added, false if at capacity
     */
    tryPush ( item )
    {
        if ( this.isAtCapacity ) return false;

        super.push ( item );

        return true;
    }

    /**
     * Adds items to the array, removing oldest items if at capacity
     * @public
     * @param   {...any} items - Items to add
     * @returns {number} New length of the array
     */
	push ( )
	{
	    for ( let _i = 0; _i < arguments.length; _i++ )
	    {
	        if ( this.maximum && this.maximum == this.length )

	            this.shift ( );


	        Array.prototype.push.apply ( this, [ arguments [ _i ] ] );
	    }
	}
}
