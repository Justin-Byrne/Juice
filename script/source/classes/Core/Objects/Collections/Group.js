/**
 * Collection of multiple object types
 * @extends Array
 * @class
 * @property {Template}          template           Template object
 * @property {Lines}             lines              Collection of Line objects
 * @property {Circles}           circles            Collection of Circle objects
 * @property {Ellipses}          ellipses           Collection of Ellipse objects
 * @property {Rectangles}        rectangles         Collection of Rectangle objects
 * @property {RoundedRectangles} roundedRectangles  Collection of Rounded Rectangle objects
 * @property {Texts}             texts              Collection of Text objects
 */
class Group extends Array
{
  // Public properties
    _template = undefined;

  // Initialize sub-collections
    _lines             = new Lines;
    _circles           = new Circles;
    _ellipses          = new Ellipses;
    _rectangles        = new Rectangles;
    _roundedRectangles = new RoundedRectangles;
    _texts             = new Texts;

  // Private properties
    #storage =
    {
        types: ['lines', 'circles', 'ellipses', 'rectangles', 'roundedRectangles', 'texts']
    };

    #collectionMap =
    {
        'Line'              : '_lines',
        'Circle'            : '_circles',
        'Ellipse'           : '_ellipses',
        'Rectangle'         : '_rectangles',
        'RoundedRectangle'  : '_roundedRectangles',
        'Text'              : '_texts',
        'Lines'             : '_lines',
        'Circles'           : '_circles',
        'Ellipses'          : '_ellipses',
        'Rectangles'        : '_rectangles',
        'RoundedRectangles' : '_roundedRectangles',
        'Texts'             : '_texts'
    };

    constructor ( )
    {
        // Set parent
        super ( );

        // Define common property descriptors
        this._defineProperties ( );
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @protected
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'canvas',   PROPERTY_BLOCKS.collection.canvas   );
        Object.defineProperty ( this, 'template', PROPERTY_BLOCKS.collection.template );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Get's lines
     * @readOnly
     * @return {Lines} Lines collection
     */
    get lines ( )
    {
        return this._lines;
    }

    /**
     * Get's circles
     * @readOnly
     * @return {Circles} Circles collection
     */
    get circles ( )
    {
        return this._circles;
    }

    /**
     * Get's ellipse
     * @readOnly
     * @return {Ellipses} Ellipses collection
     */
    get ellipses ( )
    {
        return this._ellipses;
    }

    /**
     * Get's rectangles
     * @readOnly
     * @return {Rectangles} Rectangles collection
     */
    get rectangles ( )
    {
        return this._rectangles;
    }

    /**
     * Get's rounded rectangles
     * @readOnly
     * @return {RoundedRectangles} RoundedRectangles collection
     */
    get roundedRectangles ( )
    {
        return this._roundedRectangles;
    }

    /**
     * Get's texts
     * @readOnly
     * @return {Texts} Texts collection
     */
    get texts ( )
    {
        return this._texts;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Sets all canvases throughout each internal collection of objects
     * @private
     */
    _setAllCanvases (   )
    {
        if ( ! this._canvas ) return;

        for ( let type of this.#storage.types )

            if ( this [ `_${type}` ].length )

                this [ `_${type}` ].canvas = this.canvas;
    }

    /**
     * Modifies one or more internal collections based on the given operation
     * @private
     * @param {string} operation - The collection method to perform (e.g., `'push'`, `'pop'`)
     * @param {Array} args       - The arguments representing one or more items or collections to modify
     */
    _modifyCollection ( operation, args )
    {
        for ( let _value of args )
        {
            const _className      = _value.constructor.name;
            const _collectionProp = this.#collectionMap [ _className ];

            if ( _collectionProp )
            {
                const _collection = this [ _collectionProp ];

                // Handle individual objects vs collections
                if ( _className.endsWith ( 's' ) )

                    for ( let _item of _value )            // It's a collection, iterate through items

                        _collection [ operation ] ( _item );

                else

                    _collection [ operation ] ( _value );  // It's an individual object
            }
        }
    }

    /**
     * Adds one or more objects to their respective internal collections
     * @param {Array} objects - The objects or object collections to add.
     */
    push ( ...objects )
    {
        this._modifyCollection ( 'push', objects );
    }

    /**
     * Removes one or more objects from their respective internal collections
     * @param {Array} objects - The objects or object collections to add.
     */
    pop ( ...objects )
    {
        this._modifyCollection ( 'pop', objects );
    }

  ////    DRAW    /////////////////////////////////////////

    /**
     * Draw this object
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas )
    {
        if ( canvas !== undefined ) this.canvas = canvas;

        for ( let type of this.#storage.types )

            if ( this [ `_${type}` ].length > 0 )

                this [ `_${type}` ].draw ( );

            else

                console.warn ( `No ${type} exist to draw !` );
    }
}
