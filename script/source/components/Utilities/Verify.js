/**
 * Shared validation functions
 * @namespace       VERIFY
 */
const VERIFY =
{
    /**
     * Returns whether the passed value is a 256 color value; 0 - 255
     * @public
     * @memberof VERIFY
     * @function
     * @param           {number} value                              256 color value; 0 - 255
     * @return          {boolean}                                   True || False
     */
    is256: ( value ) => typeof value === 'number' && value >= 0 && value <= 255,

    /**
     * Returns whether the passed value is an Angle or equivalent value
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Object|number} value                       Angle object or number value
     * @return          {boolean}                                   True || False
     */
    isAngle: ( value ) => value instanceof Angle || ( typeof value === 'number' && value <= 360 ),

    /**
     * Returns whether the passed value is an alpha value; 0.00 - 1
     * @public
     * @memberof VERIFY
     * @function
     * @param           {number} value                              Alpha value; 0.00 - 1
     * @return          {boolean}                                   True || False
     */
    isAlpha: ( value ) => typeof value === 'number' && value >= 0 && value <= 1,

    /**
     * Returns whether the passed value is an Aspect
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Object} value                              Aspect or object equivalent
     * @return          {boolean}                                   True || False
     */
    isAspect( value )
    {
        if ( value instanceof Aspect )

            return true;

        const keys = Object.keys ( value );

        return keys.length === 2 && typeof value.width  === 'number' && typeof value.height === 'number';
    },

    /**
     * Returns whether the passed value is a boolean value
     * @public
     * @memberof VERIFY
     * @function
     * @param           {number} value                              Boolean value
     * @return          {boolean}                                   True || False
     */
    isBoolean: ( value ) => typeof value === 'boolean',

    /**
     * Returns whether the passed value is a blur value
     * @public
     * @memberof VERIFY
     * @function
     * @param           {number} value                              Blur value
     * @return          {boolean}                                   True || False
     */
    isBlur: ( value ) => typeof value === 'number' && value >= 0,

    /**
     * Returns whether the passed value is a basic object; Line, Circle, Rectangle, Text
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Object} value                              Basic object
     * @return          {boolean}                                   True || False
     */
    isBasicObject( value )
    {
        const _clObjects = [ Group, Line, Lines, Circle, Circles, Ellipse, Ellipses, Rectangle, Rectangles, RoundedRectangle, Text, Texts, cImage ];

        return _clObjects.some( obj => value instanceof obj );
    },

    /**
     * Returns whether the passed value is a CSS color name
     * @public
     * @memberof VERIFY
     * @function
     * @param           {string} value                              CSS color name
     * @return          {boolean}                                   True || False
     */
    isColorName: ( value ) => CSS_COLORS.has ( value.toLowerCase ( ) ),

    /**
     * Returns whether the passed value is a color model
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Object} value                              Color model or object equivalent
     * @return          {boolean}                                   True || False
     */
    isColorModel: ( value ) => value instanceof Rgb,

    /**
     * Returns whether the passed value is an array of Control Point values
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Array.<number>} value                      Array of Control Points
     * @return          {boolean}                                   True || False
     */
    isControlPoint: ( value ) => Array.isArray ( value ) && value.length === 4 && value.every ( v => typeof v === 'number' ),

    /**
     * Returns whether the passed value is a decimal value; 0.00 - 1
     * @public
     * @memberof VERIFY
     * @function
     * @param           {number} value                              Decimal value; 0.00 - 1
     * @return          {boolean}                                   True || False
     */
    isDecimal: ( value ) => typeof value === 'number' && value >= 0 && value <= 1,

    /**
     * Returns whether the passed value is a degree
     * @public
     * @memberof VERIFY
     * @function
     * @param           {number} value                              Degree
     * @return          {boolean}                                   True || False
     */
    isDegree: ( value ) => typeof value === 'number' && value <= 360,

    /**
     * Returns whether the passed value is a Fill property object
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Object} value                              Fill
     * @return          {boolean}                                   True || False
     */
    isFill ( value )
    {
        if ( value instanceof Fill )

            return true;

        const keys = Object.keys ( value );

        return keys.length > 1 && keys.length < 6 && value.color instanceof Rgb && typeof value.type === 'string';
    },

    /**
     * Returns whether the passed value is a fill type
     * @public
     * @memberof VERIFY
     * @function
     * @param           {string} value                              Fill type
     * @return          {boolean}                                   True || False
     */
    isFillType: ( value ) => [ 'solid', 'linear', 'radial', 'conic', 'pattern' ].includes( value ),

    /**
     * Returns whether the passed value is a gradient object
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Object} value                              Gradient object
     * @return          {boolean}                                   True || False
     */
    isGradient: ( value ) => value instanceof Linear || value instanceof Radial || value instanceof Conic,

    /**
     * Returns whether the passed value is an element id within the DOM
     * @public
     * @memberof VERIFY
     * @function
     * @param           {string} value                              Element id
     * @return          {boolean}                                   True || False
     */
    isInDom: ( value ) => document.getElementById ( value ) !== null,

    /**
     * Returns whether the passed value is a line cap value
     * @public
     * @memberof VERIFY
     * @function
     * @param           {string} value                              Line cap value
     * @return          {boolean}                                   True || False
     */
    isLineCap: ( value ) => [ 'butt', 'round', 'square' ].includes ( value ),

    /**
     * Returns whether the passed value is a Number value
     * @public
     * @memberof VERIFY
     * @function
     * @param           {number} value                              Number value
     * @return          {boolean}                                   True || False
     */
    isNumber: ( value ) => typeof value === 'number' && !isNaN ( value ),

    /**
     * Returns whether the passed value is a Point
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Object} value                              Point or object equivalent
     * @return          {boolean}                                   True || False
     */
    isPoint ( value )
    {
        if ( value instanceof Point )

            return true;

        const keys = Object.keys ( value );

        return keys.length === 2 && typeof value.x === 'number' && typeof value.y === 'number';
    },

    /**
     * Returns whether the passed value is a Point & Aspect
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Object} value                              Object
     * @param           {Point}  value.point                        Point object
     * @param           {Aspect} value.aspect                       Aspect object
     * @return          {boolean}                                   True || False
     */
    isPointNAspect( value )
    {
        if ( typeof value !== 'object' || Object.keys ( value ).length !== 2 )

            return false;

        return this.isPoint ( value.point ) && this.isAspect ( value.aspect );
    },

    /**
     * Returns whether the passed value is a radian; 0 - 6.28...
     * @public
     * @memberof VERIFY
     * @function
     * @param           {number} value                              Radian value; 0 - 6.28...
     * @return          {boolean}                                   True || False
     */
    isRadian: ( value ) => typeof value === 'number' && value >= 0 && value <= PI2,

    /**
     * Returns whether the passed value is a radius value
     * @public
     * @memberof VERIFY
     * @function
     * @param           {number} value                              Radius value
     * @return          {boolean}                                   True || False
     */
    isRadius: ( value ) => typeof value === 'number' && value > 0,

    /**
     * Returns whether the passed value is a repetition value
     * @public
     * @memberof VERIFY
     * @function
     * @param           {string} value                              Repetition value
     * @return          {boolean}                                   True || False
     */
    isRepetition: ( value ) => [ 'repeat', 'repeat-x', 'repeat-y', 'no-repeat' ].includes ( value ),

    /**
     * Returns whether the passed value is an Array of segment values
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Array.<number>} value                      Array of segment values
     * @return          {boolean}                                   True || False
     */
    isSegments: ( value ) => Array.isArray ( value ) && value.every ( v => typeof v === 'number' ),

    /**
     * Returns whether the passed value is a Stop or object equivalent
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Object} value                              Stop or object equivalent
     * @return          {boolean}                                   True || False
     */
    isStop ( value )
    {
        if ( value instanceof Stop ) return true;

        return typeof value === 'object' && ! Array.isArray ( value ) && VERIFY.isNumber ( value.offset ) && VERIFY.isColorModel ( value.color );
    },

    /**
     * Returns whether the passed value is a string
     * @public
     * @memberof VERIFY
     * @function
     * @param           {string} value                              String value
     * @return          {boolean}                                   True || False
     */
    isString: ( value ) => typeof value === 'string',

    /**
     * Returns whether the passed value is a Stroke property object
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Object} value                              Stroke
     * @return          {boolean}                                   True || False
     */
    isStroke ( value )
    {
        if ( value instanceof Stroke )

            return true;

        const keys = Object.keys ( value );

        return keys.length > 1 && keys.length < 5 && value.color instanceof Rgb && typeof value.type === 'string' && typeof value.width === 'number';
    },

    /**
     * Returns whether the passed value is a stroke type
     * @public
     * @memberof VERIFY
     * @function
     * @param           {string} value                              Stroke type
     * @return          {boolean}                                   True || False
     */
    isStrokeType: ( value ) => [ 'solid', 'dashed' ].includes ( value ),

    /**
     * Returns whether the passed value is a Template
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Template} value                            Template object
     * @return          {boolean}                                   True || False
     */
    isTemplate ( value )
    {
        if ( ! value )

            return false;

        try
        {
            const _instance  = eval ( `new ${value.constructor.name} ();` );

            const _functions = Object.getOwnPropertyNames ( Object.getPrototypeOf ( value ) );

            return Object.hasOwn ( _instance, '_point' ) && Object.hasOwn ( _instance, '_master' ) && _functions.includes ( 'init' );
        }
        catch
        {
            return false;
        }
    },

    /**
     * Returns whether the passed value is a Transition
     * @public
     * @memberof VERIFY
     * @function
     * @param           {Transition} value                          Transition object
     * @return          {boolean}                                   True || False
     */
    isTransition ( value )
    {
        if ( ! value )

            return false;

        try
        {
            const _instance = eval ( `new ${value.constructor.name} ();` );

            return Object.hasOwn ( _instance, '_transitions' ) && Object.hasOwn ( _instance, '_template' );
        }
        catch
        {
            return false;
        }
    },

    /**
     * Returns whether the passed value is a width value
     * @public
     * @memberof VERIFY
     * @function
     * @param           {number} value                              Width value
     * @return          {boolean}                                   True || False
     */
    isWidth: ( value ) => typeof value === 'number' && value >= 0
}
