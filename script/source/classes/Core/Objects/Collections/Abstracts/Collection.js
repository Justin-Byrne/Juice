/**
 * Base collection class for all array canvas elements
 * @abstract
 * @extends Array
 * @class
 * @property {Template} template     Template object
 * @property {Object}   storage      Storage type configuration
 * @property {bObject}  storage.type Basic object type
 */
class Collection extends Array
{
  // Public properties
    _template = undefined;
    _storage  = { type: null }; // Override in subclasses

    /**
     * Create Collection object
     * @param {Point}             point      X & Y axis coordinates
     * @param {HTMLCanvasElement} canvas     Canvas Id
     * @param {Template}          template   Template object
     */
    constructor ( )
    {
        // Set parent
        super ( );

        // Define common property descriptors
        this._defineProperties ( );

        // Populate collection if arguments provided
        if ( arguments.length > 0 )

            this.push.apply ( this, arguments );
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'template',    PROPERTY_BLOCKS.collection.template    );
        Object.defineProperty ( this, 'storageType', PROPERTY_BLOCKS.collection.storageType );
        Object.defineProperty ( this, 'endPoint',    PROPERTY_BLOCKS.collection.endPoint    );
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Pushes child object(s) into this collection
     * @public
     */
    push ( )
    {
        for ( let _i = 0; _i < arguments.length; _i++ )

            if ( arguments [ _i ] instanceof this.storageType )

                Array.prototype.push.apply ( this, [ arguments [ _i ] ] );

            else if ( ! VERIFY.isPoint ( arguments [ _i ] ) )

                console.error ( `[ERROR] Argument ${ ( _i + 1 ) }, of type "${ arguments [ _i ].constructor.name }", is not a valid type !` );
    }

  ////    DRAW    /////////////////////////////////////////

    /**
     * Draw function for collections
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas )
    {
        if ( canvas !== undefined ) this.canvas = canvas;


        if ( this._canvas instanceof CanvasRenderingContext2D )

            if ( this.length > 0 )

                for ( let _object of this )

                    _object.draw ( );

            else

                console.warn ( `No ${this.constructor.name} exist to draw !` );

        else

            console.warn ( `'canvas' property is not set for ${this.constructor.name} !` );
    }
}
