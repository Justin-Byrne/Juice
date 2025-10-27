// @program:        Juice
// @brief:          JavaScript Unified Interactive Creation Engine
// @author:         Justin D. Byrne
// @email:          justin@byrne-systems.com
// @version:        1.0.0
// @date:           2025.10.26
// @license:        GPL-2.0

"use strict";

////    TYPEDEF    //////////////////////////////////////

/**
 * Basic object shape
 * @typedef 		{Object} bObject
 */

/**
 * Basic object collection
 * @typedef 		{bObject} bCollection
 */

/**
 * Complex object shape
 * @typedef 		{Object} cObject
 */

/**
 * Complex object collection
 * @typedef 		{cObject} cCollection
 */

/**
 * Template, for the creation of objects through collections
 * @typedef 		{Object}   Template
 * @property 		{Point}    point 							X & Y coordinates
 * @property 		{bObject}  master 							Master basic object
 * @property 		{Function} init 							Initialization of Template
 */

////    COMPONENTS    //////////////////////////////////////

const PI2 		 = Math.PI * 2;
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

////    TYPES    //////////////////////////////////////

/**
 * Converts string to camel case
 * @public
 * @name toCamelCase
 * @function
 * @param           {string} string                     String to convert
 * @return          {string}                            Camel case string
 */
String.prototype.toCamelCase = function ( )
{
    let _firstCharacter = this.charAt ( 0 ).toLowerCase ( );

    let _string         = _firstCharacter + this.substring ( 1 );


    return _string;
};

////    UTILITIES    //////////////////////////////////////

// Cached CSS color names for O(1) lookup performance
const CSS_COLORS = new Set (
[
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black',
    'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse',
    'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan',
    'darkgoldenrod', 'darkgray', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen',
    'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue',
    'darkslategray', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray',
    'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite',
    'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred',
    'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon',
    'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgreen', 'lightgrey',
    'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue',
    'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine',
    'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue',
    'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream',
    'mistyrose', 'moccasin', 'navajowhite', 'navy', 'navyblue', 'oldlace', 'olive', 'olivedrab',
    'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred',
    'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown',
    'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver',
    'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan', 'teal',
    'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'
] );

const KEYCODE = Object.freeze (
{
    BACKSPACE:  8,
    TAB:        9,
    ENTER:      13,
    COMMAND:    15,
    SHIFT:      16,
    CONTROL:    17,
    ALTERNATE:  18,
    PAUSE:      19,
    CAPS_LOCK:  20,
    NUMPAD:     21,
    ESCAPE:     27,
    SPACE:      32,
    PAGE_UP:    33,
    PAGE_DOWN:  34,
    END:        35,
    HOME:       36,

    // ARROWS
    LEFT:   37,
    UP:     38,
    RIGHT:  39,
    DOWN:   40,

    INSERT: 45,
    DELETE: 46,

    // NUMBERS
    NUMBER_0: 48,
    NUMBER_1: 49,
    NUMBER_2: 50,
    NUMBER_3: 51,
    NUMBER_4: 52,
    NUMBER_5: 53,
    NUMBER_6: 54,
    NUMBER_7: 55,
    NUMBER_8: 56,
    NUMBER_9: 57,

    // NUMBERS (SHORTHAND)
    N0: 48,
    N1: 49,
    N2: 50,
    N3: 51,
    N4: 52,
    N5: 53,
    N6: 54,
    N7: 55,
    N8: 56,
    N9: 57,

    // LETTERS
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,

    LEFT_WINDOW_KEY:  91,
    RIGHT_WINDOW_KEY: 92,
    SELECT_KEY:       93,

    // NUMBER PAD
    NUMPAD_0: 96,
    NUMPAD_1: 97,
    NUMPAD_2: 98,
    NUMPAD_3: 99,
    NUMPAD_4: 100,
    NUMPAD_5: 101,
    NUMPAD_6: 102,
    NUMPAD_7: 103,
    NUMPAD_8: 104,
    NUMPAD_9: 105,
    NUMPAD_MULTIPLY: 106,
    NUMPAD_ADD:      107,
    NUMPAD_ENTER:    108,
    NUMPAD_SUBTRACT: 109,
    NUMPAD_DECIMAL:  110,
    NUMPAD_DIVIDE:   111,

    // FUNCTION KEYS
    F1:  112,
    F2:  113,
    F3:  114,
    F4:  115,
    F5:  116,
    F6:  117,
    F7:  118,
    F8:  119,
    F9:  120,
    F10: 121,
    F11: 122,
    F12: 123,
    F13: 124,
    F14: 125,
    F15: 126,

    NUM_LOCK:    144,
    SCROLL_LOCK: 145,

    // PUNCTUATION
    SEMICOLON:    186,
    EQUAL:        187,
    COMMA:        188,
    MINUS:        189,
    PERIOD:       190,
    SLASH:        191,
    BACKQUOTE:    192,
    LEFTBRACKET:  219,
    BACKSLASH:    220,
    RIGHTBRACKET: 221,
    QUOTE:        222
} );

/**
 * Base module for shared accessors & mutators
 * @namespace       PROPERTY_BLOCKS
 */
const PROPERTY_BLOCKS =
{
    /**
     * Individual property accessors & mutators
     * @var             {Object} PROPERTY_BLOCKS.individual
     */
    individual:
    {
        alpha:
        {
            set ( value )
            {
                this._alpha = ( value <= 1 && value >= 0 ) ? value : this._alpha;
            },
            get ( )
            {
                return this._alpha;
            }
        },
        angle:
        {
            get ( )
            {
                return this._angle;
            }
        },
        area:
        {
            get ( )
            {
                return Math.PI * Math.pow ( this.radius, 2 );
            }
        },
        aspect:
        {
            set ( value )
            {
                this._aspect = VERIFY.isAspect ( value ) ? value : this._aspect;
            },
            get ( )
            {
                return this._aspect;
            }
        },
        blur:
        {
            set ( value )
            {
                this._blur = VERIFY.isBlur ( value ) ? value : this._blur;
            },
            get ( )
            {
                return this._blur;
            }
        },
        canvas:
        {
            set ( value )
            {
                this._canvas = VERIFY.isInDom ( value ) ? document.getElementById ( value ).getContext ( '2d' )

                                                        : document.getElementById ( 'canvas' ).getContext ( '2d' );
            },
            get ( )
            {
                return this._canvas;
            }
        },
        center:
        {
            get ( )
            {
                const _x = this.x - ( this.x - this.anchor.x ) + ( this.width  / 2 );

                const _y = this.y - ( this.y - this.anchor.y ) + ( this.height / 2 );


                return new Point ( _x, _y );
            }
        },
        color:
        {
            set ( value )
            {
                this._color = VERIFY.isColorModel ( value ) ? value : this._color;
            },
            get ( )
            {
                return this._color;
            }
        },
        end:
        {
            set ( value )
            {
                this._end = VERIFY.isPoint ( value ) ? value : this._end;
            },
            get ( )
            {
                return this._end;
            }
        },
        fill:
        {
            set ( value )
            {
                this._fill = VERIFY.isFill ( value ) ? value : this._fill;
            },
            get ( )
            {
                return this._fill;
            }
        },
        height:
        {
            set ( value )
            {
                this._aspect.height = VERIFY.isNumber ( value ) ? value : this._aspect._height;
            },
            get ( )
            {
                return this._aspect.height;
            }
        },
        lineCap:
        {
            set ( value )
            {
                this._lineCap = VERIFY.isLineCap ( value ) ? value : this._lineCap;
            },
            get ( )
            {
                return this._lineCap;
            }
        },
        master:
        {
            set ( value )
            {
                this._master = VERIFY.isBasicObject ( value ) ? value : this._master;
            },
            get ( )
            {
                return this._master;
            }
        },
        offset:
        {
            set ( value )
            {
                this._offset = VERIFY.isPoint ( value ) ? value : this._offset;
            },
            get ( )
            {
                return this._offset;
            }
        },
        offsetX:
        {
            set ( value )
            {
                this._offset.x = value;
            },
            get ( )
            {
                return this._offset.x;
            }
        },
        offsetY:
        {
            set ( value )
            {
                this._offset.y = value;
            },
            get ( )
            {
                return this._offset.y;
            }
        },
        point:
        {
            set ( value )
            {
                this._point = VERIFY.isPoint ( value ) ? new Point ( value.x, value.y ) : this._point;
            },
            get ( )
            {
                return this._point;
            }
        },
        pointX:
        {
            set ( value )
            {
                this._point.x = value;
            },
            get ( )
            {
                return this._point.x;
            }
        },
        pointY:
        {
            set ( value )
            {
                this._point.y = value;
            },
            get ( )
            {
                return this._point.y;
            }
        },
        perimeter:
        {
            get ( )
            {
                return ( this.area * 2 );
            }
        },
        radius:
        {
            set ( value )
            {
                if ( value )

                    this._radius = VERIFY.isNumber ( value ) ? value : VERIFY.isPoint ( value ) ? value : this._radius;
            },
            get ( )
            {
                return this._radius;
            }
        },
        round:
        {
            set ( value )
            {
                this._round = Array.isArray ( value ) ? value : this._round;
            },
            get ( )
            {
                return this._round;
            }
        },
        shadow:
        {
            get ( )
            {
                return this._shadow;
            }
        },
        source:
        {
            set ( value )
            {
                if ( VERIFY.isString ( value ) )
                {
                    const _image = new Image;

                    _image.src   = value;

                    this._source = _image;

                    this.type    = 'source';
                }
            },
            get ( )
            {
                return this._source;
            }
        },
        start:
        {
            set ( value )
            {
                this._start = VERIFY.isPoint ( value ) ? value : this._start;
            },
            get ( )
            {
                return this._start;
            }
        },
        stroke:
        {
            set ( value )
            {
                this._stroke = VERIFY.isStroke ( value ) ? value : this._stroke;
            },
            get ( )
            {
                return this._stroke;
            }
        },
        template:
        {
            set ( value )
            {
                this._template = VERIFY.isTemplate ( value ) ? value : this._template;
            },
            get ( )
            {
                return this._template;
            }
        },
        width:
        {
            set ( value )
            {
                this._aspect.width = VERIFY.isNumber ( value ) ? value : this._aspect._width;
            },
            get ( )
            {
                return this._aspect.width;
            }
        }
    },

    /**
     * Collection property accessors & mutators
     * @var             {Object} PROPERTY_BLOCKS.collection
     */
    collection:
    {
        anchor:
        {
            set ( value )
            {
                this._anchor.type = VERIFY.isAnchor ( value ) ? value : this._anchor.type;

                this._setAnchorPoint ( );
            },
            get ( )
            {
                return this._anchor;
            }
        },
        area:
        {
            get ( )
            {
                return ( this.width * this.height );
            }
        },
        aspect:
        {
            get ( )
            {
                this._setAspect ( );

                return this._aspect;
            }
        },
        aspectWidth:
        {
            get ( )
            {
                return this._aspect.width;
            }
        },
        aspectHeight:
        {
            get ( )
            {
                return this._aspect.height;
            }
        },
        canvas:
        {
            set ( value )
            {
                this._canvas = ( value ) ? VERIFY.isInDom ( value )

                                             ? document.getElementById ( value ).getContext ( '2d' )

                                             : VERIFY.isBasicObject ( value )

                                                 ? null

                                                 : console.warn ( `"${value}" is not a valid DOM element !` )

                                         : document.getElementById ( 'canvas' ).getContext ( '2d' );


                if ( this.length > 0  &&  this._canvas instanceof CanvasRenderingContext2D )

                    for ( let _object of this )

                        if ( _object )

                            _object.canvas = this.canvas;
            },
            get ( )
            {
                return ( this._canvas != undefined ) ? this._canvas.canvas.id : undefined;
            }
        },
        center:
        {
            get ( )
            {
                return new Point ( this.width / 2, this.height / 2 );
            }
        },
        endPoint:
        {
            get ( )
            {
                return this [ this.length - 1 ].point;
            }
        },
        perimeter:
        {
            get ( )
            {
                return ( this.area * 2 );
            }
        },
        storageType:
        {
            get ( )
            {
                return this._storage.type;
            }
        },
        template:
        {
            set ( value )
            {
                if ( VERIFY.isTemplate ( value ) )
                {
                    [ this._template, this._template._master ] = [ value, this ];


                    this._template.init ( );

                    this._setAllCanvases ( );
                }
            },
            get ( )
            {
                return this._template;
            }
        }
    }
};

const SYMBOLS = 
{
    glyphs:
    {
    	egyptian: [ '𓆗', '𓁳', '𓅓', '𓃠', '𓃶', '𓆣', '𓁈', '𓆃', '𓂀', '𓋹' ]
    },
    emojis:
    {
    	clocks:
	    {
	        one: [ '🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚' ],

	        two: [ '🕧', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦' ]
	    }
    }
}

/**
 * Shared utility functions
 * @namespace       UTILITIES
 */
const UTILITIES =
{
    /**
     * Utilities for collection functions
     * @function UTILITIES.collection
     */
    collection:
    {
        /**
         * Draw function
         * @public
         * @function
         * @param           {string} canvas                             Canvas Id
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
        },

        /**
         * Get all or specific points throughout this collection
         * @public
         * @function
         * @param           {Array.<number>} indexes                    Indexes of points
         * @param           {boolean}        zero                       Whether to start points at 0, 0; screen coordinates
         */
        getPoints ( indexes, zero = true )
        {
            let _results = new Array;


            if ( Array.isArray ( indexes ) )

                for ( let _index of indexes )

                    _results.push ( this [ _index ].point );

            else

                for ( let _index of this )

                    _results.push ( _index.point );


            if ( zero )
            {
                let _aspect = new Aspect ( 999999, 999999 );


                for ( let _result of _results )
                {
                    _aspect.width  = ( _result.x < _aspect.width  ) ? _result.x : _aspect.width;

                    _aspect.height = ( _result.y < _aspect.height ) ? _result.y : _aspect.height;
                }


                for ( let _result of _results )
                {
                    _result.x -= _aspect.width;

                    _result.y -= _aspect.height;
                }
            }

            return _results;
        },

        /**
         * Pushes child object(s) into this collection
         * @public
         * @function
         */
        push ( )
        {
            for ( let _i = 0; _i < arguments.length; _i++ )

                if ( arguments [ _i ] instanceof this.storageType )

                    Array.prototype.push.apply ( this, [ arguments [ _i ] ] );

                else if ( ! VERIFY.isPoint ( arguments [ _i ] ) )

                    console.error ( `[ERROR] Argument ${ ( _i + 1 ) }, of type "${ arguments [ _i ].constructor.name }", is not a valid type !` );
        }
    },

    /**
     * Utilities for individual functions
     * @function UTILITIES.individual
     */
    individual:
    {
        /**
         * Utility color functions
         * @function UTILITIES.individual.color
         */
        color:
        {
            /**
             * Utility color cycling functions
             */
            cycle:
            {
                /**
                 * Cycle colors for stroke
                 * @public
                 * @function
                 * @param           {Rgb}    start                              Starting RGB value
                 * @param           {Rgb}    end                                Ending RGB value
                 * @param           {number} progress                           Progress time unit; 0.00 - 1.00
                 * @param           {number} [max=1]                            Maximum increments
                 */
                stroke ( start, end, progress, max = 1 )
                {
                    this._stroke._color._cycle ( start, end, progress, max );
                },

                /**
                 * Cycle colors for fill
                 * @public
                 * @function
                 * @param           {Rgb}    start                              Starting RGB value
                 * @param           {Rgb}    end                                Ending RGB value
                 * @param           {number} progress                           Progress time unit between; 0.00 - 1.00
                 * @param           {number} [max=1]                            Maximum increments
                 */
                fill ( start, end, progress, max = 1 )
                {
                    this._fill.color._cycle ( start, end, progress, max );
                },

                /**
                 * Cycle colors for gradient
                 * @public
                 * @function
                 * @param           {Rgb}    start                              Starting RGB value
                 * @param           {Rgb}    end                                Ending RGB value
                 * @param           {number} progress                           Progress time unit between; 0.00 - 1.00
                 * @param           {number} stop                               Gradient color stop
                 * @param           {number} [max=1]                            Maximum increments
                 */
                gradient ( start, end, progress, stop, max = 1 )
                {
                    this._fill.gradient.stopColorCycle ( start, end, progress, stop, max );
                },

                /**
                 * Cycle colors for gradient stop(s)
                 * @public
                 * @function
                 * @param           {Rgb}      start                            Color model & values
                 * @param           {Rgb}      end                              Color model & values
                 * @param           {number}   progress                         Progress time unit; 0.00 - 1.00
                 * @param           {number}   stop                             Color stop to cycle
                 * @param           {number}   max                              Maximum number of steps between interpolation
                 */
                stop ( start, end, progress, stop, max )
                {
                    this.stops [ stop ].color._cycle ( start, end, progress, max );
                }
            }
        },

        /**
         * Utility misc functions
         * @function UTILITIES.individual.misc
         */
        misc:
        {
            /**
             * Move this object
             * @public
             * @function
             * @param           {number}  degree                            Direction to move; in degrees
             * @param           {number}  distance                          Distance to move
             */
            move ( degree, distance )
            {
                const _angle = ( degree % 360 ) * DEG_TO_RAD;
                const _cos   = Math.cos ( _angle );
                const _sin   = Math.sin ( _angle );

                this.x -= _cos * distance;
                this.y -= _sin * distance;
            }
        },

        /**
         * Utility draw collection functions
         * @function UTILITIES.individual.set
         */
        set:
        {
            /**
             * Sets all option values throughout a collection
             * @public
             * @function
             * @param           {string}  property                          Option property
             * @param           {boolean} value                             True || False
             */
            all ( property, value )
            {
                const _ancestor = this.constructor.name.replace( 'Collection', '' ).toLowerCase( );

                this[ `_${property}` ] = value;


                if ( this._master.length > 0 )

                    for ( const _item of this._master )

                        _item[ _ancestor ][ property ] = value;

            },

            /**
             * Sets shadow properties
             * @public
             * @function
             */
            shadow ( )
            {
                this._canvas.shadowBlur    = this._shadow.blur;

                this._canvas.shadowOffsetX = this._shadow.x;

                this._canvas.shadowOffsetY = this._shadow.y;

                this._canvas.shadowColor   = this._shadow.color.toCss ( );
            },

            /**
             * Sets fill type of the associated object
             * @public
             * @function
             */
            fillType ( )
            {
                const _setStops = ( gradient, stops ) =>
                {
                    for ( const _stop of stops )

                        gradient.addColorStop ( _stop.offset, _stop.color.toCss ( ) );


                    return gradient;
                };

                switch ( this.fill.type )
                {
                    case 'solid':

                        this._canvas.fillStyle = this.fill.color.toCss ( );

                        break;

                    case 'linear':

                        const _linear = this._canvas.createLinearGradient (

                            this.fill.gradient.start.x, this.fill.gradient.start.y,

                            this.fill.gradient.end.x, this.fill.gradient.end.y

                        );

                        this._canvas.fillStyle = _setStops ( _linear, this.fill.gradient.stops );

                        break;

                    case 'radial':

                        const _radial = this._canvas.createRadialGradient (
                            this.fill.gradient.start.x, this.fill.gradient.start.y, this.fill.gradient.startRadius,
                            this.fill.gradient.end.x,   this.fill.gradient.end.y,   this.fill.gradient.endRadius
                        );

                        this._canvas.fillStyle = _setStops ( _radial, this.fill.gradient.stops );

                        break;

                    case 'conic':

                        const _conic = this._canvas.createConicGradient (
                            this.fill.gradient.angle, this.fill.gradient.point.y, this.fill.gradient.point.x
                        );

                        this._canvas.fillStyle = _setStops ( _conic, this.fill.gradient.stops );

                        break;

                    case 'pattern':

                        this.fill._pattern.onload = ( ) =>
                        {
                            this._canvas.fillStyle = this._canvas.createPattern ( this.fill.pattern, this.fill.repetition );
                            this._canvas.fill ( );
                        };

                        break;
                }
            }
        }
    }
}

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

////    COLOR    //////////////////////////////////////

/**
 * RGB color model
 * @class
 * @property {number} [red=0]   Red value; 0 - 255
 * @property {number} [green=0] Green value; 0 - 255
 * @property {number} [blue=0]  Blue value; 0 - 255
 * @property {number} [alpha=1] Alpha value; 0 - 1 (decimal)
 */
class Rgb
{
  // Public properties
    _red   = 0;
    _green = 0;
    _blue  = 0;
    _alpha = 1;

    /**
     * Create an RGB color model
     * @param {number} red      Red value
     * @param {number} green    Green value
     * @param {number} blue     Blue value
     * @param {number} alpha    Alpha value
     */
    constructor ( red, green, blue, alpha )
    {
        // Initialize base properties
        this.red   = red;
        this.green = green;
        this.blue  = blue;
        this.alpha = alpha;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Sets the red value
     * @public
     * @param {number} red - Red value; 0 - 255
     */
    set red ( value )
    {
        this._red = VERIFY.is256 ( value ) ? Math.round ( value ) : this._red;
    }

    /**
     * Gets the red value
     * @readOnly
     * @return {number} Red value; 0 - 255
     */
    get red ( )
    {
        return this._red;
    }

    /**
     * Sets the green value
     * @public
     * @param {number} green - Green value; 0 - 255
     */
    set green ( value )
    {
        this._green = VERIFY.is256 ( value ) ? Math.round ( value ) : this._green;
    }

    /**
     * Gets the green value
     * @readOnly
     * @return {number} Green value; 0 - 255
     */
    get green ( )
    {
        return this._green;
    }

    /**
     * Sets the blue value
     * @public
     * @param {number} blue - Blue value; 0 - 255
     */
    set blue ( value )
    {
        this._blue = VERIFY.is256 ( value ) ? Math.round ( value ) : this._blue;
    }

    /**
     * Gets the blue value
     * @readOnly
     * @return {number} Blue value; 0 - 255
     */
    get blue ( )
    {
        return this._blue;
    }

    /**
     * Set alpha value
     * @public
     * @param {number} value - Alpha value; 0 - 1
     */
    set alpha ( value )
    {
        this._alpha = VERIFY.isAlpha ( value ) ? value : this._alpha;
    }

    /**
     * Set alpha value
     * @readOnly
     * @return {number} Alpha value; 0 - 1
     */
    get alpha ( )
    {
        return this._alpha;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Linear interpolation color transitions
     * @private
     * @param {number} start    - Color model & values
     * @param {number} end      - Color model & values
     * @param {number} progress - Progress time unit; 0.00 - 1.00
     * @param {number} max      - Maximum number of steps between interpolation
     */
    _lerp ( start, end, progress, max )
    {
        return Math.round ( start + ( end - start ) * progress / max );
    }

    /**
     * Linear interpolation of Rgb values
     * @private
     * @param {Rgb} start       - Color model & values
     * @param {Rgb} end         - Color model & values
     * @param {number} progress - Progress time unit; 0.00 - 1.00
     * @param {number} max      - Maximum number of steps between interpolation
     */
    _lerpRgb ( start, end, progress, max )
    {
        this._red   = this._lerp ( start.red,   end.red,   progress, max );
        this._green = this._lerp ( start.green, end.green, progress, max );
        this._blue  = this._lerp ( start.blue,  end.blue,  progress, max );
    }

    /**
     * Color cycling
     * @public
     * @param {Rgb}    start    - Color model & values
     * @param {Rgb}    end      - Color model & values
     * @param {number} progress - Progress time unit; 0.00 - 1.00
     * @param {number} max      - Maximum number of steps between interpolation
     */
    cycle ( start, end, progress, max )
    {
        this._lerpRgb ( start, end, progress, max );
    }

    /**
     * Returns a CSS compatible <color> string value
     * @public
     * @return {string} CSS <color> string
     */
    toCss ( )
    {
        return `rgb(${this.red} ${this.green} ${this.blue} / ${this.alpha * 100}%)`;
    }
}

////    PROPERTIES    //////////////////////////////////////

/**
 * Options for objects
 * @class
 * @property {boolean} [shadow=false] Show shadow
 */
class Options
{
  // Public properties
    _shadow = false;

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set shadow value
     * @public
     * @function
     * @param {boolean} value - True || False
     */
    set shadow ( value )
    {
        this._shadow = VERIFY.isBoolean ( value ) ? value : this._shadow;
    }

    /**
     * Get shadow value
     * @public
     * @function
     * @return {boolean} True || False
     */
    get shadow ( )
    {
        return this._shadow;
    }
}

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

////    STAGING    //////////////////////////////////////

/**
 * Angle properties of associated object
 * @class
 * @property {number}  [start=0]        The start of the angle, in radians; measured from the positive x-axis
 * @property {number}  [end=360]        The end of the angle, in radians; measured from the positive x-axis
 * @property {boolean} [clockwise=true] Path arc clockwise
 */
class Angle
{
  // Public properties
    _start     = 0;
    _end       = 360;
    _clockwise = true;

    /**
     * Create an angle
     * @param {number}  start     - The angle at which the arc starts in degrees, measured from the positive x-axis
     * @param {number}  end       - The angle at which the arc ends in degrees, measured from the positive x-axis
     * @param {boolean} clockwise - Draws the arc clockwise between the start and end angles
     */
    constructor ( start, end, clockwise )
    {
        // Initialize base properties
        this.start     = start;
        this.end       = end;
        this.clockwise = clockwise;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set start angle
     * @public
     * @param {number} value - Start angle; in degrees
     */
    set start ( value )
    {
        this._start = VERIFY.isDegree ( value ) ? value : this._start;
    }

    /**
     * Get start angle
     * @readOnly
     * @return {number} Start value; in degrees
     */
    get start ( )
    {
        return this._start;
    }

    /**
     * Set end angle
     * @public
     * @param {number} value - End angle; in degrees
     */
    set end ( value )
    {
        this._end = VERIFY.isDegree ( value ) ? value : this._end;
    }

    /**
     * Get end angle
     * @readOnly
     * @return {number} End angle; in degrees
     */
    get end ( )
    {
        return this._end;
    }

    /**
     * Set clockwise
     * @public
     * @param {boolean} value - Clockwise; true | false
     */
    set clockwise ( value )
    {
        this._clockwise = VERIFY.isBoolean ( value ) ? value : this._clockwise;
    }

    /**
     * Get clockwise
     * @readOnly
     * @return {boolean} Clockwise; true | false
     */
    get clockwise ( )
    {
        return this._clockwise;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Convert degree to radian
     * @private
     * @param {number} value - Degree
     * @return {number} Conversion in radians
     */
    _convert2Radian ( value )
    {
        return VERIFY.isDegree ( value ) ? value * DEG_TO_RAD : console.warn ( `${value} is not a degree value !` );
    }
    /**
     * Get start angle in radians
     * @readOnly
     * @return {number} Start value; to radians
     */
    get startInRadians ( )
    {
        return this._convert2Radian ( this.start );
    }

    /**
     * Get end angle in radians
     * @readOnly
     * @return {number} End value; in radians
     */
    get endInRadians ( )
    {
        return this._convert2Radian ( this.end );
    }
}

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

/**
 * Font base class for text objects
 * @class
 * @property {string} type              Font type or face; typography name
 * @property {number} [size=24]         Size of font; in pixels
 * @property {string} [weight='normal'] Weight of font
 * @property {number} maxWidth          Font's maximum width
 * @property {Point}  offset            Point offset coordinates
 */
class Font
{
  // Public properties
    _type     = undefined;
    _size     = 24;
    _weight   = 'normal';
    _maxWidth = undefined;
    _offset   = new Point;

  // Private properties
    #weight = { type: [ 'normal', 'bold', 'italic' ] };

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set font type
     * @public
     * @param {string} value - Type face; typography name
     */
    set type( value )
    {
        this._type = VERIFY.isString ( value ) ? value : this._type;

        if ( ! value )
        {
            const _regex  = /(\w+(\s))?(?<size>\d+)px\s(?<type>\w.+)/;
            const _canvas = document.getElementById('canvas')?.getContext('2d');

            if ( _canvas && _regex.test ( _canvas.font ) )

                this._type = _regex.exec ( _canvas.font ).groups [ 'type' ];
        }
    }

    /**
     * Get type
     * @readOnly
     * @return {string} Type face; typography name
     */
    get type ( )
    {
        return this._type;
    }

    /**
     * Set font size
     * @public
     * @param {number} value - Font size
     */
    set size ( value )
    {
        this._size = VERIFY.isNumber ( value ) ? value : this._size;
    }

    /**
     * Get font size
     * @readOnly
     * @return {number} Font size
     */
    get size ( )
    {
        return this._size;
    }

    /**
     * Set font weight
     * @public
     * @param {number} value - Font weight
     */
    set weight ( value )
    {
        this._weight = ( this.#weight.type.includes ( value ) ) ? value : this._weight;
    }

    /**
     * Get font weight
     * @readOnly
     * @return {number} Font weight
     */
    get weight ( )
    {
        return this._weight;
    }

    /**
     * Set font's max width
     * @public
     * @param {number} value - Max width
     */
    set maxWidth ( value )
    {
        this._maxWidth = VERIFY.isNumber ( value ) ? value : this._maxWidth;
    }

    /**
     * Get font's max width
     * @readOnly
     * @return {number} Max width
     */
    get maxWidth ( )
    {
        return this._maxWidth;
    }

    /**
     * Set font's offset
     * @public
     * @return {Point} value - X & Y axis coordinates
     */
    set offset ( value )
    {
        this._offset = VERIFY.isPoint ( value ) ? value : this._offset;
    }

    /**
     * Get font's offset
     * @readOnly
     * @return {Point} Font's offset; ( x, y )
     */
    get offset ( )
    {
        return this._offset;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Set font
     * @public
     * @param {string} value - CSS style font property syntax
     */
    set font ( value )
    {
        if ( /(\w+(-\w+?)?|[1-9][0][0]?)(\s?)\d{1,3}px\s\w.+/.test ( value ) )

            this.font = value;
    }

    /**
     * Get font
     * @readOnly
     * @return {string} CSS style font property syntax
     */
    get font ( )
    {
        return `${this._weight} ${this._size}px ${this._type}`;
    }
}

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

////    ABSTRACTS    //////////////////////////////////////

/**
 * Base class for gradient types
 * @abstract
 * @class
 * @property {Array.<Stop>} stops  Array of color stops
 */
class Gradient
{
  // Public properties
    _stops = new Array;

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set color stops
     * @public
     * @param {Array.<Stop>} values - Color stops
     */
    set stops ( value )
    {
        if ( Array.isArray ( value ) )

            for ( const _stop of value )

                if ( VERIFY.isStop ( _stop ) )

                    this._stops.push ( _stop );

        else

            console.warn ( '[ ERROR ]: value is not of type Array !' );
    }

    /**
     * Get color stops
     * @readOnly
     * @return {Array.<Stop>} Color stops
     */
    get stops ( )
    {
        return this._stops;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Cycle colors for gradient stop(s)
     * @public
     * @function
     * @param {Rgb}    start    - Color model & values
     * @param {Rgb}    end      - Color model & values
     * @param {number} progress - Progress time unit; 0.00 - 1.00
     * @param {number} stop     - Color stop to cycle
     * @param {number} max      - Maximum number of steps between interpolation
     */
    _stopColorCycle ( start, end, progress, stop, max )
    {
        this.stops [ stop ].color._cycle ( start, end, progress, max );
    }
}

////    PROPERTIES    //////////////////////////////////////

/**
 * Color stop properties for gradients
 * @class
 * @property {Rgb}    color   Color model & value
 * @property {number} offset  Representation of the color stop position; 0 = start, & 1 = end
 */
class Stop
{
  // Public properties
    _color  = new Rgb;
    _offset = undefined;

    /**
     * Create a color stop
     * @param {Rgb|string} color  - Color model, or CSS color value
     * @param {number}     offset - Representation of the color stop position
     */
    constructor ( color, offset )
    {
        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.color  = color;
        this.offset = offset;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'color', PROPERTY_BLOCKS.individual.color );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set offset value
     * @public
     * @param {number} value - Offset value
     */
    set offset ( value )
    {
        this._offset = ( VERIFY.isDecimal ( value ) ) ? value : this._offset;
    }

    /**
     * Get offset value
     * @readOnly
     * @return {number} Offset value
     */
    get offset ( )
    {
        return this._offset;
    }
}

////    GRADIENT    //////////////////////////////////////

/**
 * Conic gradient object type and properties
 * @extends Gradient
 * @class
 * @property {Point}  point  X & Y axis coordinates
 * @property {number} angle  Angle in radians
 */
class Conic extends Gradient
{
  // Public properties
    _point = new Point;
    _angle = 0;

    /**
     * Create a Conic gradient object type
     * @param {number}       angle - Angle in radians
     * @param {Point}        point - Starting point of linear gradient
     * @param {Array.<Stop>} stops - Array of color stops
     */
    constructor ( angle, point, stops )
    {
        // Set parent
        super ( );

        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.point = point;
        this.angle = angle;
        this.stops = stops;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'point', PROPERTY_BLOCKS.individual.point );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set angle property
     * @public
     * @param {Angle} value - Angle object
     */
    set angle ( value )
    {
        this._angle = VERIFY.isRadian ( value ) ? value : this._angle;
    }

    /**
     * Set angle property
     * @readOnly
     * @return {Angle} Angle object
     */
    get angle ( )
    {
        return this._angle;
    }
}

/**
 * Linear gradient object type and properties
 * @extends Gradient
 * @class
 * @property {Point} start  Start X & Y axis coordinates
 * @property {Point} end    End X & Y axis coordinates
 */
class Linear extends Gradient
{
  // Public properties
    _start = new Point;
    _end   = new Point;

    /**
     * Create a Linear gradient object type
     * @param {Point}        start - Starting point of linear gradient
     * @param {Point}        end   - Ending point of linear gradient
     * @param {Array.<Stop>} stops - Array of color stops
     */
    constructor ( start, end, stops )
    {
        // Set parent
        super ( );

        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.start = start;
        this.end   = end;
        this.stops = stops;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'start', PROPERTY_BLOCKS.individual.start );
        Object.defineProperty ( this, 'end',   PROPERTY_BLOCKS.individual.end   );
    }
}

/**
 * Radial gradient object type and properties
 * @extends Gradient
 * @class
 * @property {Point}  start        Start X & Y axis coordinates
 * @property {Number} startRadius  Starting radius of linear gradient
 * @property {Point}  end          End X & Y axis coordinates
 * @property {Number} endRadius    Ending radius of linear gradient gradient
 */
class Radial extends Gradient
{
  // Public properties
    _start       = new Point;
    _startRadius = 0;
    _end         = new Point;
    _endRadius   = 0;

    /**
     * Create a Radial gradient object type and properties
     * @param {Point}        start       - Starting point of linear gradient
     * @param {Number}       startRadius - Starting radius of linear gradient gradient
     * @param {Point}        end         - Ending point of linear gradient
     * @param {Number}       endRadius   - Ending radius of linear gradient gradient
     * @param {Array.<Stop>} stops       - Array of color stops
     */
    constructor ( start, startRadius, end, endRadius, stops )
    {
        // Set parent
        super ( );

        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.start       = start;
        this.startRadius = startRadius;
        this.end         = end;
        this.endRadius   = endRadius;
        this.stops       = stops;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'start', PROPERTY_BLOCKS.individual.start );
        Object.defineProperty ( this, 'end',   PROPERTY_BLOCKS.individual.end   );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set starting radius
     * @public
     * @param {Number} value - Starting radius
     */
    set startRadius ( value )
    {
        this._startRadius = VERIFY.isRadius ( value ) ? value : this._startRadius;
    }

    /**
     * Set starting radius
     * @readOnly
     * @return {Number} Starting radius
     */
    get startRadius ( )
    {
        return this._startRadius;
    }

    /**
     * Set ending radius
     * @public
     * @param {Number} value - Ending radius
     */
    set endRadius ( value )
    {
        this._endRadius = VERIFY.isRadius ( value ) ? value : this._endRadius;
    }

    /**
     * Set ending radius
     * @readOnly
     * @return {Number} Ending radius
     */
    get endRadius ( )
    {
        return this._endRadius;
    }
}

////    SUBJECTS    //////////////////////////////////////

/**
 * Fill container for various fill types
 * @class
 * @property {Rgb}     color          Color model & value
 * @property {string} [type='solid']  Fill type; solid | linear | radial | conic | pattern
 * @property {Object}  gradient       Gradient object; Linear | Radial | Conic
 * @property {Pattern} pattern        Pattern fill object
 * @property {string}  repetition     Repetition of fill pattern
 */
class Fill
{
  // Public properties
    _color      = new Rgb ( 0, 0, 0, 0 );
    _type       = 'solid';
    _gradient   = undefined;
    _pattern    = undefined;
    _repetition = 'repeat';

    /**
     * Create a fill type
     * @param {Rgb}     color         - Color model & value
     * @param {string} [type='solid'] - Fill type
     * @param {Object}  gradient      - Gradient object
     * @param {Pattern} pattern       - Pattern fill object
     * @param {string}  repetition    - Repetition of fill pattern
     */
    constructor ( color, type, gradient, pattern, repetition )
    {
        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.color      = color;
        this.type       = type;
        this.gradient   = gradient;
        this.pattern    = pattern;
        this.repetition = repetition;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'color', PROPERTY_BLOCKS.individual.color );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set type value
     * @public
     * @param {string} value - Fill type value
     */
    set type ( value )
    {
        this._type = VERIFY.isFillType ( value ) ? value : this._type;
    }

    /**
     * Get type value
     * @readOnly
     * @return {string} Fill type value
     */
    get type ( )
    {
        return this._type;
    }

    /**
     * Set gradient gradient properties
     * @public
     * @param {Object} value - Gradient object & properties
     */
    set gradient ( value )
    {
        if ( VERIFY.isGradient ( value ) )

            [ this._gradient, this._type ] = [ value, value.constructor.name.toLowerCase ( ) ];
    }

    /**
     * Get gradient gradient properties
     * @readOnly
     * @return {Object} Gradient object & properties
     */
    get gradient ( )
    {
        return this._gradient;
    }

    /**
     * Sets pattern property value
     * @public
     * @param {string} value - Path of image to pattern
     */
    set pattern ( value )
    {
        if ( VERIFY.isString ( value ) )
        {
            const _image     = new Image;

                  _image.src = value;


            this._pattern = _image;

            this.type     = 'pattern';
        }
    }

    /**
     * Gets pattern property value
     * @readOnly
     * @return {Pattern} Pattern fill object
     */
    get pattern ( )
    {
        return this._pattern;
    }

    /**
     * Sets repetition property value
     * @public
     * @param {string} value - Repetition property value
     */
    set repetition ( value )
    {
        this._repetition = VERIFY.isRepetition ( value ) ? value : this._repetition;
    }

    /**
     * Gets repetition property value
     * @readOnly
     * @return {string} Repetition property value
     */
    get repetition ( )
    {
        return this._repetition;
    }
}

/**
 * Shadow of associated object
 * @class
 * @property {Rgb}    color     RGB color value; r, g, b
 * @property {number} [blur=3]  Blur strength
 * @property {Point}  offset    Point offset coordinates
 */
class Shadow
{
  // Public properties
    _color  = new Rgb;
    _blur   = 3;
    _offset = new Point;

    /**
     * Create a shadow
     * @param {Object} color  - RGB color value
     * @param {number} blur   - Shadow blur value
     * @param {Point}  offset - Shadow offset
     */
    constructor ( color, blur, offset = { x: undefined, y: undefined } )
    {
        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.color  = color;
        this.blur   = blur;
        this.offset = offset;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'color',  PROPERTY_BLOCKS.individual.color   );
        Object.defineProperty ( this, 'blur',   PROPERTY_BLOCKS.individual.blur    );
        Object.defineProperty ( this, 'offset', PROPERTY_BLOCKS.individual.offset  );
        Object.defineProperty ( this, 'x',      PROPERTY_BLOCKS.individual.offsetX );
        Object.defineProperty ( this, 'y',      PROPERTY_BLOCKS.individual.offsetY );
    }
}

/**
 * Stroke properties of associated object
 * @class
 * @property {Rgb}      color              Color model & value
 * @property {string}   [type='solid']     Stroke type; 'solid' || 'dashed'
 * @property {number[]} [segments=[5, 5]]  Dashed line segment distance(s)
 * @property {number}   [width=2]          Thickness of stroke
 * @property {Shadow}   shadow             Shadow properties
 */
class Stroke
{
  // Public properties
    _color    = new Rgb ( 255, 255, 255 );
    _type     = 'solid';
    _segments = [ 5, 5 ];
    _width    = 1;

    /**
     * Create a stroke
     * @param {Object}   color    - RGB color value
     * @param {string}   type     - Stroke type
     * @param {number[]} segments - Dashed line segment distance(s)
     * @param {number}   width    - Thickness of stroke
     */
    constructor ( color, type, segments, width )
    {
        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.color    = color;
        this.type     = type;
        this.segments = segments;
        this.width    = width;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'color', PROPERTY_BLOCKS.individual.color );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set type
     * @public
     * @param {string} value - Stroke type: 'solid' || 'dashed'
     */
    set type ( value )
    {
        this._type = VERIFY.isStrokeType ( value ) ? value : this._type;
    }

    /**
     * Get type
     * @readOnly
     * @return {string}                                    Stroke type: 'solid' || 'dashed'
     */
    get type ( )
    {
        return this._type;
    }

    /**
     * Set segment value
     * @public
     * @param {Array.<number>} value - Dashed line segment distance(s)
     */
    set segments ( value )
    {
        this._segments = VERIFY.isSegments ( value ) ? value : this._segments;
    }

    /**
     * Get segment value
     * @readOnly
     * @return {Array.<number>} Dashed line segment distance(s)
     */
    get segments ( )
    {
        return this._segments;
    }

    /**
     * Set width value
     * @public
     * @param {number} value - Thickness of stroke
     */
    set width ( value )
    {
        this._width = VERIFY.isWidth ( value ) ? value : this._width;
    }

    /**
     * Get width value
     * @readOnly
     * @return {number} Thickness of stroke
     */
    get width ( )
    {
        return this._width;
    }
}

////    OBJECTS    //////////////////////////////////////

////    ABSTRACTS    //////////////////////////////////////

/**
 * Abstract base class for all drawable shapes on HTML5 Canvas
 * Provides common properties and methods for all canvas objects
 * @abstract
 * @class
 * @property {Point}             point  X & Y coordinates
 * @property {Stroke}            stroke Color, type, segments, and width properties
 * @property {Shadow}            shadow Color, blur, and offset properties
 * @property {HTMLCanvasElement} canvas Canvas element ID or reference
 */
class Shape
{
  // Public properties
    _point  = new Point;
    _stroke = new Stroke;
    _shadow = new Shadow;
    _canvas = undefined;

  // Private properties
    #scale    = new Point ( 1, 1 );
    #options  = new Options;
    #mass     = 0;
    #velocity = new Point;
    #active   = false;
    #id       = null;

    /**
     * Base constructor for all shapes
     * @param {Object} config - Configuration object containing common shape properties
     */
    constructor ( config = {} )
    {
        // Destructure with defaults
        const {
            point  = { x: undefined, y: undefined },
            stroke = { color: undefined, type: undefined, segments: undefined, width: undefined },
            shadow = { color: undefined, blur: undefined, offset: { x: undefined, y: undefined } },
            canvas = undefined
        } = config;

        // Initialize base properties
        this.point   = point;
        this._stroke = new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width );
        this._shadow = new Shadow ( shadow.color, shadow.blur, { x: shadow.offset.x, y: shadow.offset.y } );
        this.canvas  = canvas;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set point
     * @public
     * @param {Point} value - X & Y coordinates
     */
    set point ( value )
    {
        this._point = VERIFY.isPoint ( value ) ? new Point ( value.x, value.y ) : this._point;
    }

    /**
     * Get point
     * @readOnly
     * @return {Point} - X & Y coordinates
     */
    get point ( )
    {
        return this._point;
    }

    /**
     * Set x-axis value
     * @public
     * @param {number} value - X coordinate value
     */
    set x ( value )
    {
        this._point.x = value;
    }

    /**
     * Get x-axis value
     * @readOnly
     * @return {number} - X coordinate value
     */
    get x ( )
    {
        return this._point.x;
    }

    /**
     * Set y-axis value
     * @public
     * @param {number} value - Y coordinate value
     */
    set y ( value )
    {
        this._point.y = value;
    }

    /**
     * Get y-axis value
     * @readOnly
     * @return {number} - Y coordinate value
     */
    get y ( )
    {
        return this._point.y;
    }

    /**
     * Set stroke properties
     * @public
     * @param {Stroke} value - Stroke properties
     */
    set stroke ( value )
    {
        this._stroke = VERIFY.isStroke ( value ) ? value : this._stroke;
    }

    /**
     * Get stroke properties
     * @readOnly
     * @return {Stroke} - Stroke properties
     */
    get stroke ( )
    {
        return this._stroke;
    }

    /**
     * Get shadow properties
     * @readOnly
     * @return {Shadow} - Shadow properties
     */
    get shadow ( )
    {
        return this._shadow;
    }

    /**
     * Set canvas value
     * @public
     * @param {string} value - Canvas id
     */
    set canvas ( value )
    {
        this._canvas = VERIFY.isInDom ( value ) ? document.getElementById ( value ).getContext ( '2d' )

                                                : document.getElementById ( 'canvas' ).getContext ( '2d' );
    }

    /**
     * Get canvas value
     * @readOnly
     * @return {string} - Canvas id
     */
    get canvas ( )
    {
        return this._canvas;
    }

    /**
     * Set scale
     * @public
     * @param {number} value - Scale of object
     */
    set scale ( value )
    {
        this.#scale = value;
    }

    /**
     * Get scale
     * @readOnly
     * @return {number} Scale of object
     */
    get scale ( )
    {
        return this.#scale;
    }

    /**
     * Get options properties
     * @readOnly
     * @return {Options} Options properties
     */
    get options ( )
    {
        return this.#options;
    }

    /**
     * Set id
     * @public
     * @param {number} value - Id of object
     */
    set id ( value )
    {
        this.#id = value;
    }

    /**
     * Get id
     * @readOnly
     * @return {number} Id of object
     */
    get id ( )
    {
        return this.#id;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Sets shadow properties
     * @private
     */
    _setShadow ( )
    {
        this._canvas.shadowBlur    = this._shadow.blur;
        this._canvas.shadowOffsetX = this._shadow.x;
        this._canvas.shadowOffsetY = this._shadow.y;
        this._canvas.shadowColor   = this._shadow.color.toCss ( );
    }

    /**
     * Move this object
     * @public
     * @param {number} degree   - Direction to move; in degrees
     * @param {number} distance - Distance to move
     */
    move ( degree, distance )
    {
        const _angle = ( degree % 360 ) * DEG_TO_RAD;
        const _cos   = Math.cos ( _angle );
        const _sin   = Math.sin ( _angle );

        this.x -= _cos * distance;
        this.y -= _sin * distance;
    }

  ////    DRAW    /////////////////////////////////////////

    /**
     * Base draw method - validates canvas and applies transformations
     * @private
     * @param   {string} canvas                 Canvas element ID
     * @returns {CanvasRenderingContext2D|null} Context or null if invalid
     */
    _beginDraw ( canvas )
    {
        if ( canvas !== undefined ) this.canvas = canvas;

        if ( ! ( this._canvas instanceof CanvasRenderingContext2D ) )
        {
            console.warn ( `'canvas' property is not set for ${this.constructor.name}!` );

            return null;
        }

        const _context = this._canvas;

        _context.save ( );


        return _context;
    }

    /**
     * Complete drawing and restore context
     * @private
     * @param {CanvasRenderingContext2D} context - Canvas context
     */
    _endDraw ( context )
    {
        // Reset shadow if it was applied
        if ( this.options.shadow )

            context.shadowColor = new Rgb ( 0, 0, 0, 0 ).toCss ( );


        context.restore ( );
    }

    /**
     * Apply stroke settings
     * @private
     * @param {CanvasRenderingContext2D} context - Canvas context
     */
    _applyStroke ( context )
    {
        context.strokeStyle = this.stroke.color.toCss ( );

        context.lineWidth   = this.stroke.width;

        context.setLineDash ( this.stroke.type === 'solid' ? [] : this.stroke.segments );
    }

    /**
     * Abstract draw method - must be implemented by subclasses
     * @abstract
     * @param {string} canvas - Canvas element ID
     */
    draw ( canvas )
    {
        throw new Error ( 'Draw method must be implemented by subclass' );
    }
}

/**
 * Abstract base class for fillable shapes
 * @extends Shape
 * @abstract
 * @property {Fill} fill Fill properties
 */
class ShapeFillable extends Shape
{
  // Public properties
    _fill = new Fill;

    /**
     * Base constructor for all shapes
     * @param {Object} config - Configuration object containing common shape properties
     */
    constructor ( config = {} )
    {
        // Pass common config to parent
        super ( config );

        // Destructure with defaults
        const {
            fill = { color: undefined, type: undefined }
        } = config;

        Object.defineProperty ( this, 'fill', PROPERTY_BLOCKS.individual.fill );

        // Initialize base properties
        this._fill = new Fill ( fill.color, fill.type );
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Sets fill type of the associated object
     * @private
     */
    _setFillType ( )
    {
        const _setStops = ( gradient, stops ) =>
        {
            for ( const _stop of stops )

                gradient.addColorStop ( _stop.offset, _stop.color.toCss ( ) );


            return gradient;
        };

        switch ( this.fill.type )
        {
            case 'solid':

                this._canvas.fillStyle = this.fill.color.toCss ( );

                break;

            case 'linear':

                const _linear = this._canvas.createLinearGradient (

                    this.fill.gradient.start.x, this.fill.gradient.start.y,

                    this.fill.gradient.end.x, this.fill.gradient.end.y

                );

                this._canvas.fillStyle = _setStops ( _linear, this.fill.gradient.stops );

                break;

            case 'radial':

                const _radial = this._canvas.createRadialGradient (
                    this.fill.gradient.start.x, this.fill.gradient.start.y, this.fill.gradient.startRadius,
                    this.fill.gradient.end.x,   this.fill.gradient.end.y,   this.fill.gradient.endRadius
                );

                this._canvas.fillStyle = _setStops ( _radial, this.fill.gradient.stops );

                break;

            case 'conic':

                const _conic = this._canvas.createConicGradient (
                    this.fill.gradient.angle, this.fill.gradient.point.y, this.fill.gradient.point.x
                );

                this._canvas.fillStyle = _setStops ( _conic, this.fill.gradient.stops );

                break;

            case 'pattern':

                this.fill._pattern.onload = ( ) =>
                {
                    this._canvas.fillStyle = this._canvas.createPattern ( this.fill.pattern, this.fill.repetition );
                    this._canvas.fill ( );
                };

                break;
        }
    }

  ////    DRAW    /////////////////////////////////////////

    /**
     * Apply fill and stroke for fillable shapes
     * @private
     * @param {CanvasRenderingContext2D} context - Canvas context
     */
    _drawFillAndStroke ( context )
    {
        context.stroke ( );

        if ( this.fill.type !== 'pattern' )

            context.fill ( );
    }
}

////    BASIC    //////////////////////////////////////

/**
 * Circle shape object for drawing on HTML5 Canvas
 * @extends ShapeFillable
 * @class
 * @property {number|Point} [radius=25] Radius of circle
 * @property {Angle}         angle      Angle properties
 */
class Circle extends ShapeFillable
{
  // Public properties
    _radius = 25;
    _angle  = new Angle;

    /**
     * Create a Circle object
     * @param {Point}             point     X & Y axis coordinates
     * @param {number|Point}      radius    Radius of circle
     * @param {Angle}             angle     Angle properties
     * @param {Stroke}            stroke    Stroke properties
     * @param {Fill}              fill      Fill properties
     * @param {Shadow}            shadow    Shadow properties
     * @param {HTMLCanvasElement} canvas    Canvas Id
     */
    constructor (
        point  = { x: undefined, y: undefined },
        radius,
        angle  = { start: undefined, end: undefined, clockwise: undefined },
        stroke = { color: undefined, type: undefined, segments: undefined, width: undefined },
        fill   = { color: undefined, type: undefined },
        shadow = { color: undefined, blur: undefined, offset: { x: undefined, y: undefined } },
        canvas = undefined
    )
    {
        // Pass common config to parent
        super ( { point, stroke, fill, shadow, canvas } );

        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.radius = radius;
        this._angle = new Angle ( angle.start, angle.end, angle.clockwise );
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'radius', PROPERTY_BLOCKS.individual.radius );
        Object.defineProperty ( this, 'angle',  PROPERTY_BLOCKS.individual.angle  );
    }

  ////    DRAW    /////////////////////////////////////////

    /**
     * Draw this object
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas )
    {
        const _context = this._beginDraw ( canvas );

        if ( ! _context ) return;

        // Apply shadow if enabled
        if ( this.options.shadow ) this._setShadow ( );

        // Set styles
        this._applyStroke ( _context );
        this._setFillType ( );

        // Draw the circle/ellipse
        _context.beginPath ( )

        // Draw ellipse or arc
        if ( VERIFY.isPoint ( this.radius ) )

            _context.ellipse ( this.x, this.y, this.radius.x, this.radius.y, 0, this.angle.startInRadians, this.angle.endInRadians, ! this.angle.clockwise );

        else

            _context.arc ( this.x, this.y, this.radius, this.angle.startInRadians, this.angle.endInRadians, ! this.angle.clockwise );

        this._drawFillAndStroke ( _context );
        this._endDraw ( _context );
    }
}

/**
 * Ellipse shape extending Circle with Point-based radius
 * @extends Circle
 * @class
 * @property {number|Point} [radius=[20,30]] Radius of ellipse
 */
class Ellipse extends Circle
{
  // Public properties
    _radius = new Point ( 20, 30 );
}

/**
 * Line shape object for drawing straight or curved lines
 * @extends Shape
 * @class
 * @property {Point}   start            Start X & Y axis coordinates
 * @property {Point}   end              End X & Y axis coordinates
 * @property {string} [lineCap='round'] Line cap's end points shape
 */
class Line extends Shape
{
  // Public properties
    _start   = new Point;
    _end     = new Point;
    _lineCap = 'round';

  // Private properties
    #offset        = new Point ( 0, 0 );
    #controlPoints = new ControlPoints;

    /**
     * Create a Line object
     * @param {Point}  start    Starting point of line
     * @param {Point}  end      Ending point of line
     * @param {Stroke} stroke   Stroke properties
     * @param {Shadow} shadow   Shadow properties
     * @param {string} lineCap  Shape of end points
     * @param {string} canvas   Canvas Id
     */
    constructor (
        start   = { x: undefined, y: undefined },
        end     = { x: undefined, y: undefined },
        stroke  = { color: undefined, type: undefined, segments: undefined, width: undefined },
        shadow  = { color: undefined, blur: undefined, offset: { x: undefined, y: undefined } },
        lineCap = undefined,
        canvas
    )
    {
        // Pass common config to parent
        super ( { point: { x: undefined, y: undefined }, stroke, shadow, canvas } );

        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.start   = start;
        this.end     = end;
        this.lineCap = lineCap;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'start',   PROPERTY_BLOCKS.individual.start   );
        Object.defineProperty ( this, 'end',     PROPERTY_BLOCKS.individual.end     );
        Object.defineProperty ( this, 'lineCap', PROPERTY_BLOCKS.individual.lineCap );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set offset
     * @public
     * @param {number} value - Offset of object
     */
    set offset ( value )
    {
        this.#offset = value;
    }

    /**
     * Get offset
     * @readOnly
     * @return {number} Offset of object
     */
    get offset ( )
    {
        return this.#offset;
    }

    /**
     * Get control point properties
     * @readOnly
     * @return {ControlPoints} Control points properties
     */
    get controlPoints ( )
    {
        return this.#controlPoints;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Set line's path
     * @private
     */
    _setPath ( context )
    {
        const _cp = this.controlPoints;

        // Draw bezier curve or straight line
        if ( _cp.p0 !== 0 || _cp.p1 !== 0 || _cp.p2 !== 0 || _cp.p3 !== 0 )

            context.bezierCurveTo ( _cp.p0 + this.start.x, _cp.p1 + this.start.y, _cp.p2 + this.end.x, _cp.p3 + this.end.y, this.end.x, this.end.y );

        else

            context.lineTo ( this.end.x, this.end.y );
    }

    /**
     * Get center of this object
     * @readOnly
     * @return {Point} Center point coordinates
     */
    get center ( )
    {
        const _x = ( this.start.x > this.end.x )

                       ? this.end.x   + ( ( this.start.x - this.end.x )   / 2 )

                       : this.start.x + ( ( this.end.x   - this.start.x ) / 2 );

        const _y = ( this.start.y > this.end.y )

                       ? this.end.y   + ( ( this.start.y - this.end.y )   / 2 )

                       : this.start.y + ( ( this.end.y   - this.start.y ) / 2 );

        return new Point ( _x, _y );
    }

    /**
     * Set control points for bezier curve
     * @public
     * @param {number} p0 - Control point 0
     * @param {number} p1 - Control point 1
     * @param {number} p2 - Control point 2
     * @param {number} p3 - Control point 3
     */
    curve ( p0, p1, p2, p3 )
    {
        this.controlPoints.p0 = p0;
        this.controlPoints.p1 = p1;
        this.controlPoints.p2 = p2;
        this.controlPoints.p3 = p3;
    }

  ////    DRAW    /////////////////////////////////////////

    /**
     * Draw this object
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas )
    {
        const _context = this._beginDraw ( canvas );

        if ( ! _context ) return;

        // Override transformation for lines
        _context.translate ( this.x, this.y );

        // Set line-specific styles
        this._applyStroke ( _context );

        _context.lineCap = this.lineCap;

        // Draw the line
        _context.beginPath ( )
        _context.moveTo ( this.start.x, this.start.y );

        this._setPath ( _context );

        _context.closePath ( )
        _context.stroke ( )

        this._endDraw ( _context );
    }
}

/**
 * Rectangle shape object
 * @extends ShapeFillable
 * @class
 * @property {Aspect} aspect Aspect properties
 * @property {Array}  round  Rounding properties
 */
class Rectangle extends ShapeFillable
{
  // Public properties
    _aspect = new Aspect;
    _round  = new Array;

    /**
     * Create a Rectangle object
     * @param {Point}  point    X & Y axis coordinates
     * @param {Aspect} aspect   Aspect properties
     * @param {Array}  round    Rounding properties
     * @param {Stroke} stroke   Stroke properties
     * @param {Fill}   fill     Fill properties
     * @param {Shadow} shadow   Shadow properties
     * @param {string} canvas   Canvas Id
     */
    constructor (
        point  = { x: undefined, y: undefined },
        aspect = { width: undefined, height: undefined },
        round  = [ 0, 0, 0, 0 ],
        stroke = { color: undefined, type: undefined, segments: undefined, width: undefined },
        fill   = { color: undefined, type: undefined },
        shadow = { color: undefined, blur: undefined, offset: { x: undefined, y: undefined } },
        canvas
    )
    {
        // Pass common config to parent
        super ( { point, stroke, fill, shadow, canvas } );

        // Define common property descriptors
        this._defineProperties ( );

        // Initialize base properties
        this.width  = aspect.width !== undefined ? aspect.width : 50;
        this.height = aspect.height !== undefined ? aspect.height : 50;
        this.round  = round;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'aspect', PROPERTY_BLOCKS.individual.aspect );
        Object.defineProperty ( this, 'width',  PROPERTY_BLOCKS.individual.width  );
        Object.defineProperty ( this, 'height', PROPERTY_BLOCKS.individual.height );
        Object.defineProperty ( this, 'round',  PROPERTY_BLOCKS.individual.round  );
    }

  ////    DRAW    /////////////////////////////////////////

    /**
     * Draw this object
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas )
    {
        const _context = this._beginDraw ( canvas );

        if ( ! _context ) return;

        // Apply shadow if enabled
        if ( this.options.shadow ) this._setShadow ( );

        // Set styles
        this._applyStroke ( _context );
        this._setFillType ( );

        // Draw the rectangle
        _context.beginPath ( );
        _context.roundRect ( this.x, this.y, this.width, this.height, this.round );

        this._drawFillAndStroke ( _context );
        this._endDraw ( _context );
    }
}

/**
 * Rounded rectangle extending Rectangle with default corner radii
 * @extends Rectangle
 * @class
 * @property {Array} [round=[5, 5, 5, 5]] Rounding properties
 */
class RoundedRectangle extends Rectangle
{
  // Public properties
    _round = [ 5, 5, 5, 5 ];
}

/**
 * Text object for rendering text on canvas
 * @extends Font
 * @class
 */
class Text extends Font
{
  // Public properties
    _point  = new Point;
    _text   = undefined;
    _stroke = new Stroke;
    _fill   = new Fill;
    _shadow = new Shadow;
    _canvas = undefined;

  // Private properties
    #scale    = new Point ( 1, 1 );
    #options  = new Options;
    #mass     = 0;
    #velocity = new Point;
    #id       = null;

    /**
     * Create a Text object
     * @param {Point}  point    X & Y axis coordinates
     * @param {string} text     Text of text object
     * @param {string} type     Font type
     * @param {number} size     Font size
     * @param {string} weight   Font weight
     * @param {number} maxWidth Font max width
     * @param {Point}  offset   Text offset
     * @param {Stroke} stroke   Stroke properties
     * @param {Fill}   fill     Fill Properties
     * @param {Shadow} shadow   Shadow properties
     * @param {string} canvas   Canvas Id
     */
    constructor (
        point  = { x: undefined, y: undefined },
        text, type, size, weight, maxWidth,
        offset = { x: undefined, y: undefined },
        stroke = { color: undefined, type: undefined, segments: undefined, width: undefined },
        fill   = { color: undefined, type: undefined },
        shadow = { color: undefined, blur: undefined, offset: { x: undefined, y: undefined } },
        canvas
    )
    {
        // Set parent
        super ( );

        // Define common property descriptors
        this._defineProperties ( );

        // Define utilities
        this._defineUtilities ( );

        // Set defaults
        stroke.width = stroke.width === undefined ? 0 : stroke.width;
        fill.color   = fill.color === undefined ? new Rgb ( 0, 0, 0 ) : fill.color;

        this.point = point;
        this.text  = text;

        // Initialize font properties
        super.type     = type;
        super.size     = size;
        super.weight   = weight;
        super.maxWidth = maxWidth;
        super.offset   = offset;

        // Initialize properties
        this._stroke = new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width );
        this._fill   = new Fill ( fill.color, fill.type );
        this._shadow = new Shadow ( shadow.color, shadow.blur, { x: shadow.offset.x, y: shadow.offset.y } );

        this.canvas = canvas;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'canvas', PROPERTY_BLOCKS.individual.canvas );
        Object.defineProperty ( this, 'offset', PROPERTY_BLOCKS.individual.offset );
        Object.defineProperty ( this, 'point',  PROPERTY_BLOCKS.individual.point  );
        Object.defineProperty ( this, 'x',      PROPERTY_BLOCKS.individual.pointX );
        Object.defineProperty ( this, 'y',      PROPERTY_BLOCKS.individual.pointY );
        Object.defineProperty ( this, 'stroke', PROPERTY_BLOCKS.individual.stroke );
        Object.defineProperty ( this, 'fill',   PROPERTY_BLOCKS.individual.fill   );
        Object.defineProperty ( this, 'shadow', PROPERTY_BLOCKS.individual.shadow );
    }

    /**
     * Define shared utilities
     * @private
     */
    _defineUtilities ( )
    {
        this._setFillType = UTILITIES.individual.set.fillType;
        this._setShadow   = UTILITIES.individual.set.shadow;
        this.move         = UTILITIES.individual.misc.move;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set text
     * @public
     * @param {string} value - Text of object
     */
    set text ( value )
    {
        this._text = VERIFY.isString ( value ) ? value : undefined;
    }

    /**
     * Get text
     * @readOnly
     * @return {string} Text of object
     */
    get text ( )
    {
        return this._text;
    }

    /**
     * Set scale
     * @public
     * @param {number} value - Scale of object
     */
    set scale ( value )
    {
        this.#scale = value;
    }

    /**
     * Get scale
     * @readOnly
     * @return {number} Scale of object
     */
    get scale ( )
    {
        return this.#scale;
    }

    /**
     * Get options properties
     * @readOnly
     * @return {Options} Options properties
     */
    get options ( )
    {
        return this.#options;
    }

  ////    DRAWING METHODS    ///////////////////////

    /**
     * Draw this object
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas, shadow = false )
    {
        if ( canvas !== undefined ) this.canvas = canvas;

        if ( ! ( this._canvas instanceof CanvasRenderingContext2D ) )
        {
            console.warn ( `'canvas' property is not set for ${this.constructor.name}!` );

            return;
        }

        const _context = this._canvas;

        const _x = this.x + this.offset.x;
        const _y = this.y + this.offset.y;

        _context.save ( );

        // Apply transformations
        _context.scale ( this.scale.x, this.scale.y );

        // Apply shadow if enabled
        if ( this.options.shadow ) this._setShadow ( );

        // Set text properties
        _context.font         = this.font;
        _context.textAlign    = 'center';
        _context.textBaseline = 'middle';

        this._setFillType ( );

        _context.fillText ( this.text, _x, _y, this.maxWidth );

        // Draw stroke if needed
        if ( this.stroke.width > 0 )
        {
            const _width = _context.lineWidth;

            _context.lineWidth   = this.stroke.width;
            _context.strokeStyle = this.stroke.color.toCss ( );

            _context.strokeText ( this.text, _x, _y, this.maxWidth );

            _context.lineWidth   = _width;
        }

        // Reset shadow
        if ( this.options.shadow ) _context.shadowColor = new Rgb ( 0, 0, 0, 0 ).toCss ( );

        _context.restore ( )
    }
}

/**
 * Image object for rendering images on canvas
 * @class
 * @property {string}            source             Source path of image file
 * @property {Object}            primary            Primary set of coordinates
 * @property {Point}             primary.point      X & Y axis coordinates
 * @property {Aspect}            primary.aspect     Aspect properties
 * @property {Object}            secondary          Secondary set of coordinates
 * @property {Point}             secondary.point    X & Y axis coordinates
 * @property {Aspect}            secondary.aspect   Aspect properties
 * @property {HTMLCanvasElement} canvas             Canvas element ID or reference
 */
class aImage
{
  // Public properties
    _source = new Image;

    _primary =
    {
        point:  new Point,
        aspect: new Aspect
    };

    _secondary =
    {
        point:  undefined,
        aspect: undefined
    };

    _canvas = undefined;

  // Private properties
    #id = null;

    /**
     * Create a cImage object
     * @param {string}            source            Source path of image file
     * @param {Object}            primary           Primary set of coordinates
     * @param {Point}             primary.point     X & Y axis coordinates
     * @param {Aspect}            primary.aspect    Aspect properties
     * @param {Object}            secondary         Secondary set of coordinates
     * @param {Point}             secondary.point   X & Y axis coordinates
     * @param {Aspect}            secondary.aspect  Aspect properties
     * @param {HTMLCanvasElement} canvas            Canvas Id
     */
    constructor (
        source,
        primary   = { point: { x: undefined, y: undefined }, aspect: { width: undefined, height: undefined } },
        secondary = { point: { x: undefined, y: undefined }, aspect: { width: undefined, height: undefined } },
        canvas
    )
    {
        // Define common property descriptors
        this._defineProperties ( );

        // Define utilities
        this._defineUtilities ( );

        // Initialize base properties
        this.source    = source;
        this.primary   = primary;
        this.secondary = secondary;
        this.canvas    = canvas;
    }

  ////    ANCILLARY ARCHITECTURE    ///////////////////////

    /**
     * Define common property blocks
     * @private
     */
    _defineProperties ( )
    {
        Object.defineProperty ( this, 'source', PROPERTY_BLOCKS.individual.source );
        Object.defineProperty ( this, 'canvas', PROPERTY_BLOCKS.individual.canvas );
        Object.defineProperty ( this, 'center', PROPERTY_BLOCKS.individual.center );
    }

    /**
     * Define shared utilities
     * @private
     */
    _defineUtilities ( )
    {
        this.move = UTILITIES.individual.misc.move;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Sets primary property values
     * @public
     * @param {Object} object        - Primary set of coordinates
     * @param {Point}  object.point  - X & Y axis coordinates
     * @param {Aspect} object.aspect - Aspect properties
     */
    set primary ( object )
    {
        if ( VERIFY.isPointNAspect ( object ) )

            [ this._primary.point, this._primary.aspect ] = [ object.point, object.aspect ];
    }

    /**
     * Gets primary property value
     * @readOnly
     * @return {Object} Primary set of coordinates
     */
    get primary ( )
    {
        return this._primary;
    }

    /**
     * Sets secondary property values
     * @public
     * @param {Object} object        - Secondary set of coordinates
     * @param {Point}  object.point  - X & Y axis coordinates
     * @param {Aspect} object.aspect - Aspect properties
     */
    set secondary ( value )
    {
        if ( VERIFY.isPointNAspect ( value ) )

            [ this._secondary.point, this._secondary.aspect ] = [ value.point, value.aspect ];
    }

    /**
     * Gets primary property value
     * @readOnly
     * @return {Object} Secondary set of coordinates
     */
    get secondary ( )
    {
        return this._secondary;
    }

    /**
     * Set point
     * @public
     * @param {Point} value - X & Y coordinates
     */
    set point ( value )
    {
        this._primary.point = VERIFY.isPoint ( value ) ? value : this._primary.point;
    }

    /**
     * Get point
     * @readOnly
     * @return {Point} - X & Y coordinates
     */
    get point ( )
    {
        return this._primary.point;
    }

    /**
     * Set x-axis value
     * @public
     * @param {number} value - X coordinate value
     */
    set x ( value )
    {
        this._primary.point.x = VERIFY.isNumber ( value ) ? value : this._primary.point.x;
    }

    /**
     * Get x-axis value
     * @readOnly
     * @return {number} - X coordinate value
     */
    get x ( )
    {
        return this._primary.point.x;
    }

    /**
     * Set y-axis value
     * @public
     * @param {number} value - Y coordinate value
     */
    set y ( value )
    {
        this._primary.point.y = VERIFY.isNumber ( value ) ? value : this._primary.point.y;
    }

    /**
     * Get y-axis value
     * @readOnly
     * @return {number} - Y coordinate value
     */
    get y ( )
    {
        return this._primary.point.y;
    }

    /**
     * Set id
     * @public
     * @param {number} value - Id of object
     */
    set id ( value )
    {
        this.#id = value;
    }

    /**
     * Get id
     * @public
     * @return {number} Id of object
     */
    get id ( )
    {
        return this.#id;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Get aspect with
     * @readOnly
     * @return {number} Width value
     */
    get width ( )
    {
        return this.source.width;
    }

    /**
     * Get aspect height
     * @readOnly
     * @return {number} Height value
     */
    get height ( )
    {
        return this.source.height;
    }

  ////    DRAW    /////////////////////////////////////////

    /**
     * Draws image depending on primary & secondary property settings
     * @private
     * @function
     */
    _drawImage ( )
    {
        if ( this.secondary.point )

            this._canvas.drawImage ( this._source, this.secondary.point.x, this.secondary.point.y, this.secondary.aspect.width, this.secondary.aspect.height, this.anchor.x, this.anchor.y, this.primary.aspect.width, this.primary.aspect.height );

        else

            this._canvas.drawImage ( this._source, this.anchor.x, this.anchor.y, this._source.width, this._source.height );
    }

    /**
     * Draw this object
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas )
    {
        if ( canvas ) this.canvas = canvas;

        if ( this.source.onload === null && this._canvas instanceof CanvasRenderingContext2D )

            this.source.onload = ( ) => { this._drawImage ( ); }

        else

            this._drawImage ( );
    }
}

////    ABSTRACTS    //////////////////////////////////////

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

/**
 * Base class for shape collections
 * @class
 * @extends Collection
 */
class CollectionShape extends Collection
{
    /**
     * Get all or specific points throughout this collection
     * @public
     * @param {Array.<number>} indexes - Indexes of points
     * @param {boolean}        zero    - Whether to start points at 0, 0; screen coordinates
     */
    getPoints ( indexes, zero = true )
    {
        let _results = new Array;


        if ( Array.isArray ( indexes ) )

            for ( let _index of indexes )

                _results.push ( this [ _index ].point );

        else

            for ( let _index of this )

                _results.push ( _index.point );


        if ( zero )
        {
            let _aspect = new Aspect ( 999999, 999999 );


            for ( let _result of _results )
            {
                _aspect.width  = ( _result.x < _aspect.width  ) ? _result.x : _aspect.width;

                _aspect.height = ( _result.y < _aspect.height ) ? _result.y : _aspect.height;
            }


            for ( let _result of _results )
            {
                _result.x -= _aspect.width;

                _result.y -= _aspect.height;
            }
        }

        return _results;
    }
}

////    COLLECTIONS    //////////////////////////////////////

/**
 * Collection of circle elements
 * @class
 * @extends CollectionShape
 * @property {Object}  storage      Storage type configuration
 * @property {bObject} storage.type Basic object type
 */
class Circles extends CollectionShape
{
    _storage = { type: Circle };
}

/**
 * Collection of ellipse elements
 * @class
 * @extends Circles
 * @property {Object}  storage      Storage type configuration
 * @property {bObject} storage.type Basic object type
 */
class Ellipses extends Circles
{
    _storage = { type: Ellipse };
}

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

/**
 * Collection of Line objects
 * @class
 * @extends Collection
 * @property {Object}  storage      Storage type configuration
 * @property {bObject} storage.type Basic object type
 */
class Lines extends Collection
{
    _storage = { type: Line };
}

/**
 * Collection of Rectangle objects
 * @class
 * @extends CollectionShape
 * @property {Object}  storage      Storage type configuration
 * @property {bObject} storage.type Basic object type
 */
class Rectangles extends CollectionShape
{
    _storage = { type: Rectangle };
}

/**
 * Collection of Rounded Rectangle objects
 * @class
 * @extends Rectangles
 * @property {Object}  storage      Storage type configuration
 * @property {bObject} storage.type Basic object type
 */
class RoundedRectangles extends Rectangles
{
    _storage = { type: RoundedRectangle };
}

/**
 * Collection of Text objects
 * @class
 * @extends Collection
 * @property {Object}  storage      Storage type configuration
 * @property {bObject} storage.type Basic object type
 */
class Texts extends Collection
{
    _storage = { type: Text };
}

////    COMPLEX    //////////////////////////////////////

/**
 * Ship object
 * @extends ShapeFillable
 * @class
 * @property {Point} points  Vertices of shape
 */
class Arrow extends ShapeFillable
{
    #points =
    [
        new Point (  39,   0 ),
        new Point (   4, -30 ),
        new Point (   4,  -8 ),
        new Point ( -39, -13 ),
        new Point ( -39,  13 ),
        new Point (   4,   8 ),
        new Point (   4,  30 ),
        new Point (  39,   0 )
    ]

    /**
     * Create a Ship object
     * @param {Point}             point  - X & Y axis coordinates
     * @param {number|Point}      radius - Radius of circle
     * @param {Angle}             angle  - Angle properties
     * @param {Stroke}            stroke - Stroke properties
     * @param {Fill}              fill   - Fill properties
     * @param {Shadow}            shadow - Shadow properties
     * @param {HTMLCanvasElement} canvas - Canvas Id
     */
    constructor ( config = {} )
    {
        // Pass common config to parent
        super ( config );
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set points
     * @public
     * @param {number} value - Points of object
     */
    set points ( value )
    {
        this.#points = value;
    }

    /**
     * Get points
     * @readOnly
     * @return {number} Points of object
     */
    get points ( )
    {
        return this.#points;
    }

  ////    DRAW    /////////////////////////////////////////

    _drawShape ( )
    {
        for ( let _i = 0; _i < this.points.length; _i++ )
        {
            const _point = this._points [ _i ];
            const _x     = _point.x + this.offset.x;
            const _y     = _point.y + this.offset.y;

            ( _i === 0 ) ? this._canvas.moveTo ( _x, _y )
                         : this._canvas.lineTo ( _x, _y );
        }
    }

    /**
     * Draw this object
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas )
    {
        const _context = this._beginDraw ( canvas );

        if ( ! _context ) return;

        // Override transformation for lines
        _context.translate ( this.x, this.y );

        // Apply shadow if enabled
        if ( this.options.shadow ) this._setShadow ( );

        // Set styles
        this._applyStroke ( _context );
        this._setFillType ( );

        // Draw the rectangle
        _context.beginPath ( );
        _context.roundRect ( this.x, this.y, this.width, this.height, this.round );

        this._drawFillAndStroke ( _context );
        this._endDraw ( _context );
    }
}

/**
 * Polygon class for drawing multi-vertex shapes on HTML5 Canvas
 * @class
 * @extends Shape
 * @property {Point[]} vertices  Array of Point objects defining polygon vertices
 */
class Polygon extends ShapeFillable
{
  // Public properties
	_vertices = new Array;

    /**
     * Constructs a new Polygon instance
     * @param {Object}  config          - Configuration object
     * @param {Object}  config.point    - X & Y coordinates
     * @param {Object}  config.stroke   - Stroke properties (color, type, segments, width)
     * @param {Object}  config.fill     - Fill properties (color, type)
     * @param {Object}  config.shadow   - Shadow properties (color, blur, offset)
     * @param {string}  config.canvas   - Canvas element ID
     * @param {Point[]} config.vertices - Initial array of vertices (optional)
     */
	constructor ( config = {} )
	{
        // Pass common config to parent
        super ( config );

        const { _vertices = [] } = config;

        if ( Array.isArray ( _vertices ) && _vertices.length > 0 )

            this._vertices = _vertices;
	}

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set vertices
     * @public
     * @param {Point} value - Point of vertex
     */
    set vertices ( value )
    {
        this._vertices.push ( value );
    }

    /**
     * Get vertices
     * @readOnly
     * @return {Array} Array of points
     */
    get vertices ( )
    {
        return this._vertices;
    }

  ////    VERIFICATION    /////////////////////////////////

    /**
     * Check whether the passed object is already present
     * @public
     * @param  {Polygon} polygon - Object to validate
     * @return {boolean} True || False
     */
    isThere ( polygon )
    {
        if ( ! ( polygon instanceof Polygon ) )
        {
            console.warn ( `"${polygon.constructor.name}" is not of type ${this.constructor.name}` );

            return false;
        }

        return this.point.x == polygon.point.x && this.point.y == polygon.point.y;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Create polygon from lines
     * @public
     * @param {Lines} addLines - Canvas Lab Object
     */
    addLines ( lines )
    {
        if ( ! Array.isArray ( lines ) || lines.length === 0 )
        {
            console.warn ( 'addLines requires a non-empty array of lines' );

            return;
        }

        this._vertices = [];  // Clear existing vertices

        for ( let _i = 0; _i < lines.length; _i++ )
        {
            let _point;

            if ( _i === 0 )

                _point = new Point ( lines [ 0 ].start.x, lines [ 0 ].start.y );  // First vertex is the start of the first line

            else
            {
                const [ _prevLine, _currLine ] = [ lines [ _i - 1 ], lines [ _i ] ];

                // Check if current line connects to previous line
                const connectsAtStart =
                    Math.round ( _currLine.start.x ) === Math.round ( _prevLine.end.x ) &&
                    Math.round ( _currLine.start.y ) === Math.round ( _prevLine.end.y );

                _point = connectsAtStart
                    ? new Point ( _currLine.start.x, _currLine.start.y )
                    : new Point ( _prevLine.end.x,   _prevLine.end.y   );
            }

            this._vertices.push ( _point );
        }

        // Add closing vertex if needed (end of last line)
        if ( lines.length > 0 )
        {
            const _lastLine   = lines [ lines.length - 1 ];
            const _lastVertex = this._vertices [ this._vertices.length - 1 ];

            if ( Math.round ( _lastLine.end.x ) !== Math.round ( _lastVertex.x ) || Math.round ( _lastLine.end.y ) !== Math.round ( _lastVertex.y ) )

                this._vertices.push ( new Point ( _lastLine.end.x, _lastLine.end.y ) );
        }
    }

  ////    DRAW    /////////////////////////////////////////

    /**
     * Draw this object
     * @public
     * @param {string} canvas - Canvas Id
     */
    draw ( canvas )
    {
        // Validate canvas and begin drawing
        const _context = this._beginDraw ( canvas );

        if ( ! _context ) return;

        // Validate vertices
        if ( this._vertices.length < 3 )
        {
            console.warn ( `Polygon requires at least 3 vertices to draw. Current count: ${this._vertices.length}` );

            this._endDraw ( _context );

            return;
        }

        // Apply scale transformation
        _context.scale ( this.scale.x, this.scale.y );

        // Apply shadow if enabled
        if ( this.options.shadow ) this._setShadow ( );

        // Apply stroke settings
        this._applyStroke ( _context );

        // Set fill type
        this._setFillType ( );

        // Begin path and draw polygon
        _context.beginPath ( );

        this._vertices.forEach ( ( vertex, index ) =>
        {
            if ( index === 0 )

                _context.moveTo ( vertex.x, vertex.y );

            else

                _context.lineTo ( vertex.x, vertex.y );
        } );

        // Close the path for proper filling
        _context.closePath ( );

        // Apply stroke
        _context.stroke ( );

        // Apply fill (skip for pattern fills that need special handling)
        if ( this.fill.type !== 'pattern' )
        {
            _context.fill ( );
        }

        // Complete drawing and restore _context
        this._endDraw ( _context );
    }
}

////    DATA-STRUCTURES    //////////////////////////////////////

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

////    TEMPLATES    //////////////////////////////////////

/**
 * @class           {Object}           SacredCircles            SacredCircles template
 * @property        {Point}            point                    X & Y axis coordinates
 * @property        {number}           [radius=25]              Radius of circle
 * @property        {number}           iterations               Amount of iterations
 * @property        {Queue}            degrees                  Degrees for generation
 * @property        {Rgb|Stroke|Queue} strokes                  Stroke colors
 * @property        {Rgb|Fill|Queue}   fills                    Fill colors
 * @property        {Object}           master                   Master object
 */
class SacredCircles
{
    _point       = new Point;
    _radius      = 25;
    _iterations  = undefined;
    _degrees     = new Queue ( [ 90, 330, 270, 210, 150, 90, 30 ] );

    _strokes     = new Rgb (   0,   0,   0, 1 );
    _fills       = new Rgb ( 255, 255, 255, 0 );

    _master      = undefined;

    #numbers     = undefined;
    #tangents    = undefined;
    #counter     = -1;              /* Counter to define the gaps between each circle: @see this.create ( ) */

    #get =
    {
        /**
         * Returns a Circle object
         * @protected
         * @function
         * @param           {Point}  point                              X & Y Coordinates
         * @param           {number} radius                             Radius of Circle
         * @param           {Stroke} stroke                             Stroke properties
         * @param           {Fill}   fill                               Fill properties
         * @return          {Circle}                                    Circle object
         */
        circle ( point, radius, stroke, fill )
        {
            return new Circle ( point, radius, undefined, new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width ), new Fill ( fill.color, fill.type ), undefined, undefined );
        },

        /**
         * Returns a Ellipse object
         * @protected
         * @function
         * @param           {Point}  point                              X & Y Coordinates
         * @param           {Stroke} stroke                             Stroke properties
         * @param           {Fill}   fill                               Fill properties
         * @return          {Ellipse}                                   Ellipse object
         */
        ellipse ( point, stroke, fill )
        {
            return new Ellipse ( point, new Point ( this.radius, this.radius * 0.5 ), undefined, new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width ), new Fill ( fill.color, fill.type ), undefined, undefined );
        },

        /**
         * Returns a Rectangle object
         * @protected
         * @function
         * @param           {Point}  point                              X & Y Coordinates
         * @param           {Stroke} stroke                             Stroke properties
         * @param           {Fill}   fill                               Fill properties
         * @return          {Rectangle}                                 Rectangle object
         */
        rectangle ( point, stroke, fill )
        {
            return new Rectangle ( point, undefined, undefined, new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width ), new Fill ( fill.color, fill.type ), undefined, undefined );
        },

        /**
         * Returns a RoundedRectangle object
         * @protected
         * @function
         * @param           {Point}  point                              X & Y Coordinates
         * @param           {Stroke} stroke                             Stroke properties
         * @param           {Fill}   fill                               Fill properties
         * @return          {RoundedRectangle}                          Rounded rectangle object
         */
        roundedRectangle ( point, stroke, fill )
        {
            return new RoundedRectangle ( point, undefined, undefined, new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width ), new Fill ( fill.color, fill.type ), undefined, undefined );
        },

        /**
         * Returns a Text object
         * @protected
         * @function
         * @param           {Point}  point                              X & Y Coordinates
         * @param           {Stroke} stroke                             Stroke properties
         * @param           {Fill}   fill                               Fill properties
         * @return          {Text}                                      Text object
         */
        text ( point, text, stroke, fill )
        {
            return new Text ( point, text, undefined, undefined, undefined, undefined, undefined, new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width ), new Fill ( fill.color, fill.type ), undefined );
        },

        /**
         * Returns a Line object
         * @protected
         * @function
         * @param           {Point} startPoint                          Starting point of line
         * @param           {Point} endPoint                            Ending point of line
         * @return          {Line}                                      Line object
         */
        line ( startPoint, endPoint )
        {
            return new Line ( startPoint, endPoint, undefined, undefined, undefined, undefined );
        }
    }

    #config =
    {
        reverse: false
    }

    /**
     * Create a SacredCircles template
     * @property        {Point}            point                    X & Y axis coordinates
     * @property        {number}           [radius=25]              Radius of circle
     * @property        {number}           iterations               Amount of iterations
     * @property        {Rgb|Stroke|Queue} strokes                  Stroke colors
     * @property        {Rgb|Fill|Queue}   fills                    Fill colors
     * @property        {Queue}            degrees                  Degrees for generation
     */
    constructor ( point = { x: undefined, y: undefined }, radius, iterations, strokes, fills, degrees, transitions )
    {
        ////    COMPOSITION     ////////////////////////////

            Object.defineProperty ( this, 'master', PROPERTY_BLOCKS.individual.master );
            Object.defineProperty ( this, 'point',  PROPERTY_BLOCKS.individual.point  );
            Object.defineProperty ( this, 'radius', PROPERTY_BLOCKS.individual.radius );

        this.point       = point;
        this.radius      = radius;
        this.iterations  = iterations;
        this.strokes     = strokes;
        this.fills       = fills;
        this.degrees     = degrees;
        this.transitions = transitions;

        this._tangents   = iterations;
    }

    ////    PROPERTIES    //////////////////////////////////

        ////    [ POINT ]    /////////////////////

            /**
             * Set point
             * @public
             * @function
             * @param           {Point} value                               X & Y coordinates
             * @see             {@link PROPERTY_BLOCKS.individual.point}
             */
            set point ( value ) { }

            /**
             * Get point
             * @public
             * @function
             * @return          {Point}                                     X & Y coordinates
             * @see             {@link PROPERTY_BLOCKS.individual.point}
             */
            get point ( ) { }

        ////    [ RADIUS ]    ////////////////////

            /**
             * Set radius
             * @public
             * @function
             * @param           {number} value                              Radius of circle
             * @see             {@link PROPERTY_BLOCKS.individual.radius}
             */
            set radius ( value ) { }

            /**
             * Get radius
             * @readOnly
             * @function
             * @return          {number}                                    Radius of circle
             * @see             {@link PROPERTY_BLOCKS.individual.radius}
             */
            get radius ( ) { }

        ////    [ ITERATIONS ]    ////////////////

            /**
             * Set iterations value
             * @public
             * @function
             * @param           {number} value                              Number of iterations
             */
            set iterations ( value )
            {
                this._iterations = VERIFY.isNumber ( value ) ? value : this._iterations;
            }

            /**
             * Get iterations value
             * @readOnly
             * @function
             * @return          {number}                                    Number of iterations
             */
            get iterations ( )
            {
                return this._iterations;
            }

        ////    [ DEGREES ]    ///////////////////

            /**
             * Set degrees value
             * @public
             * @function
             * @param           {Array} value                               Array of degrees
             */
            set degrees ( value )
            {
                this._degrees = Array.isArray ( value ) ? new Queue ( value ) : this._degrees;
            }

            /**
             * Get degrees value
             * @readOnly
             * @function
             * @return          {Queue}                                     Queue of degrees
             */
            get degrees ( )
            {
                return this._degrees;
            }

        ////    [ STROKES ]    ///////////////////

            /**
             * Set strokes value
             * @public
             * @function
             * @param           {Array} value                               Array of strokes
             */
            set strokes ( value )
            {
                if ( value != undefined )
                {
                    switch ( value.constructor.name )
                    {
                        case 'Rgb':     this._strokes = new Queue ( new Array ( new Stroke ( value ) ) );   break;

                        case 'Stroke':  this._strokes = new Queue ( new Array ( value ) );                  break;

                        case 'Queue':   this._strokes = value;                                              break;

                        default:

                            Array.isArray ( value )
                            {
                                let _result = new Array;


                                for ( let _entry of value )

                                    switch ( _entry.constructor.name )
                                    {
                                        case 'Rgb':         _result.push ( new Stroke ( _entry ) );         break;

                                        case 'Stroke':      _result.push ( _entry );                        break;
                                    }


                                this._strokes = new Queue ( _result );
                            }
                    }
                }
                else

                    this._strokes = this._strokes;
            }

            /**
             * Get strokes value
             * @readOnly
             * @function
             * @return          {Queue}                                     Queue of strokes
             */
            get strokes ( )
            {
                return this._strokes;
            }

        ////    [ FILLS ]    /////////////////////

            /**
             * Set fills value
             * @public
             * @function
             * @param           {Array} value                               Array of fills
             */
            set fills ( value )
            {
                if ( value != undefined )
                {
                    switch ( value.constructor.name )
                    {
                        case 'Rgb':     this._fills = new Queue ( new Array ( new Fill ( value ) ) );   break;

                        case 'Fill':    this._fills = new Queue ( new Array ( _array ) );               break;

                        case 'Queue':   this._fills = value;                                            break;

                        default:

                            Array.isArray ( value )
                            {
                                let _result = new Array;


                                for ( let _entry of value )

                                    switch ( _entry.constructor.name )
                                    {
                                        case 'Rgb':     _result.push ( new Fill ( _entry ) );   break;

                                        case 'Fill':    _result.push ( _entry );                break;
                                    }


                                this._fills = new Queue ( _result );
                            }

                            Array.isArray ( value )
                            {
                                let _result = new Array;


                                for ( let _item of value )

                                    _result.push ( new Fill ( _item ) );


                                this._fills = new Queue ( _result );
                            }
                    }
                }
                else

                    this._fills = this._fills;
            }

            /**
             * Get fills value
             * @readOnly
             * @function
             * @return          {Queue}                                     Queue of fills
             */
            get fills ( )
            {
                return this._fills;
            }

        ////    [ MASTER ]    ////////////////////

            /**
             * Set master object
             * @public
             * @function
             * @param           {clObject} value                            Canvas Lab object
             * @see             {@link PROPERTY_BLOCKS.individual.master}
             */
            set master ( value ) { }

            /**
             * Get master object
             * @public
             * @function
             * @return          {clObject}                                  Master Canvas Lab object
             * @see             {@link PROPERTY_BLOCKS.individual.master}
             */
            get master ( ) { }

        ////    [ NUMBERS ]    ///////////////////

            /**
             * Set numbers value
             * @private
             * @function
             * @param           {Array} value                               Array of numbers
             */
            set _numbers ( value )
            {
                this.#numbers = Array.isArray ( value ) ? new Queue ( value ) : this.#numbers;
            }

            /**
             * Get numbers value
             * @private
             * @function
             * @param           {Queue}                                     Array of numbers
             */
            get _numbers ( )
            {
                return this.#numbers;
            }

        ////    [ TANGENTS ]    //////////////////

            /**
             * Set tangents value
             * @private
             * @function
             * @param           {number} value                              Number of iterations
             */
            set _tangents ( value )
            {
                this.#tangents = Number.isInteger ( value ) ? this.#getTangents ( value ) : this.#tangents;
            }

        ////    [ GET ]    ///////////////////////

            /**
             * Get get
             * @public
             * @function
             * @return             {number}                                    Get of object
             */
            get get ( )
            {
                return this.#get;
            }

    ////    UTILITIES    ///////////////////////////////////

        ////    # PROTECTED    ///////////////////

            /**
             * Insert initial object
             * @protected
             * @function
             * @param           {Point}  point                              X & Y Coordinate(s)
             * @param           {number} degree                             Degree of movement
             * @param           {Stroke} stroke                             Stroke properties
             * @param           {Fill}   fill                               Fill properties
             * @param           {number} iterator                           Current iterator
             */
            #insertInitialObject ( point, iterator, degree, stroke, fill )
            {
                let _object = this._getObjectPerCollectionType ( point, stroke, fill );


                this._moveObject ( _object, degree, this.radius * iterator );


                this._setObjectPerCollectionType ( _object );
            }

            /**
             * Insert Ensuing objects
             * @protected
             * @function
             * @param           {number} degree                             Degree of movement
             * @param           {Stroke} stroke                             Stroke properties
             * @param           {Fill}   fill                               Fill properties
             */
            #insertEnsuingObjects ( degree, stroke, fill )
            {
                let _object = this._getObjectPerCollectionType ( this.master.circles.endPoint, stroke, fill );


                this._moveObject ( _object, degree, this.radius );


                this._setObjectPerCollectionType ( _object );
            }

            /**
             * Returns an array of all tangents for each iteration
             * @protected
             * @function
             * @return          {Array}                                     Tangents for each iteration
             */
            #getTangents ( )
            {
                let _array = new Array;

                let _count = 0;


                for ( let _i = 1; _i <= this.iterations; _i++ )
                {
                    _array.push ( _count * 6 );

                    _count = _i + _count;
                }


                if ( this.iterations > 1 )

                    _array.shift ( );


                return _array;
            }

        ////    - PRIVATE    /////////////////////

            /**
             * Returns a clObject based on the current collection type
             * @private
             * @function
             * @param           {Point}  point                              X & Y Coordinates
             * @param           {Stroke} stroke                             Stroke properties
             * @param           {Fill}   fill                               Fill properties
             */
            _getObjectPerCollectionType ( point, stroke, fill )
            {
                let _result = undefined;

                let _text   = this.#numbers.next;


                switch ( this.master.constructor.name )
                {
                    case 'Circles':             _result = this.get.circle ( point, this.radius, stroke, fill );     break;

                    case 'Ellipses':            _result = this.get.ellipse ( point, stroke, fill );                 break;

                    case 'Rectangles':          _result = this.get.rectangle ( point, stroke, fill );               break;

                    case 'RoundedRectangles':   _result = this.get.roundedRectangle ( point, stroke, fill );        break;

                    case 'Texts':               _result = this.get.text ( point, _text, stroke, fill );             break;

                    case 'Group':

                                            let _objectA = this.get.circle ( point, this.radius, stroke, fill );

                                            let _objectB = this.get.ellipse ( point, stroke, fill );

                                            let _objectC = this.get.rectangle ( point, stroke, fill );

                                            let _objectD = this.get.roundedRectangle ( point, stroke, fill );

                                            let _objectE = this.get.text ( point, _text, stroke, fill );


                                                _result  = new Array ( _objectA, _objectB, _objectC, _objectD, _objectE );
                }


                return _result;
            }

            /**
             * Moves the passed object in a specific degree & distance
             * @private
             * @function
             * @param           {clObject} object                           Canvas Lab object
             * @param           {number}   degree                           Degree to move
             * @param           {number}   distance                         Distance to move
             */
            _moveObject ( object, degree, distance )
            {
                if ( Array.isArray ( object ) )

                    for ( let _entry of object )

                        _entry.move ( degree, distance );

                else

                    object.move ( degree, distance );
            }

            /**
             * Pushes the passed clObject into the current collection type
             * @private
             * @function
             * @param           {clObject} object                           Canvas Lab object
             */
            _setObjectPerCollectionType ( object )
            {
                let _type = this.master.constructor.name;


                switch ( _type )
                {
                    case 'Group':

                        for ( let _entry of object )
                        {
                            let _type = `${_entry.constructor.name.toLowerCase ( )}s`;

                                _type = ( _type === 'roundedrectangles' ) ? 'roundedRectangles' : _type;


                            this.master [ _type ].push ( _entry );
                        }

                    default:

                        this.master.push ( object );

                        break;
                }
            }

        ////    + PUBLIC    //////////////////////

            /**
             * Get number of total objects
             * @public
             * @function
             * @return          {number}                                    Number of total objects
             */
            get totalObjects ( )
            {
                if ( this.#tangents === undefined )

                    this.#tangents = this.#getTangents ( );


                return this.#tangents [ this.#tangents.length - 1 ];
            }

    ////    INITIALIZER    /////////////////////////////////

        /**
         * Sets this template
         * @public
         * @function
         */
        init ( )
        {
            this._numbers = Array.from ( { length: this.totalObjects }, ( element, index ) => index.toString ( ) );


            for ( let _i = 0; _i < this.iterations; _i++ )
            {
                this.degrees.reset;

                ////    FOUNDATION STONE    ////////////////////////////////////

                let [ _degree, _stroke, _fill ] = [ this.degrees.next, this.strokes.next, this.fills.next ];


                for ( let _stone = 0; _stone < 1; _stone++ )

                     this.#insertInitialObject ( this.point, _i, _degree, _stroke, _fill );

                ////    FILLER STONE(S)    /////////////////////////////////////

                    [ _degree, _stroke, _fill ] = [ this.degrees.next, this.strokes.next, this.fills.next ];        // Number: 01, Degree: 150


                for ( let _stone = 0; _stone <= ( _i - 1 ); _stone++ )

                     this.#insertEnsuingObjects ( _degree, _stroke, _fill );


                    [ _degree, _stroke, _fill ] = [ this.degrees.next, this.strokes.next, this.fills.next ];        // Number: 02,  Degree: 90


                for ( let _stone = 0; _stone <= ( _i - 1 ); _stone++ )

                    this.#insertEnsuingObjects ( _degree, _stroke, _fill );


                    [ _degree, _stroke, _fill ] = [ this.degrees.next, this.strokes.next, this.fills.next ];        // Number: 03,  Degree: 30


                for ( let _stone = 0; _stone <= ( _i - 1 ); _stone++ )

                  this.#insertEnsuingObjects ( _degree, _stroke, _fill );


                    [ _degree, _stroke, _fill ] = [ this.degrees.next, this.strokes.next, this.fills.next ];        // Number: 04, Degree: 330


                for ( let _stone = 0; _stone <= ( _i - 1 ); _stone++ )

                  this.#insertEnsuingObjects ( _degree, _stroke, _fill );


                    [ _degree, _stroke, _fill ] = [ this.degrees.next, this.strokes.next, this.fills.next ];        // Number: 05, Degree: 270


                for ( let _stone = 0; _stone <= ( _i - 1 ); _stone++ )

                  this.#insertEnsuingObjects ( _degree, _stroke, _fill );

                ////    KEYSTONE    ////////////////////////////////////////////

                    [ _degree, _stroke, _fill ] = [ this.degrees.next, this.strokes.next, this.fills.next ];        // Number: 06, Degree: 210


                for ( let _stone = 0; _stone <= ( _i - 2 ); _stone++ )

                  this.#insertEnsuingObjects ( _degree, _stroke, _fill );
            }


            if ( this.#config.reverse )
            {
                this.master.circles.reverse ( );

                this.master.ellipses.reverse ( );

                this.master.rectangles.reverse ( );

                this.master.roundedRectangles.reverse ( );
            }
        }
}
