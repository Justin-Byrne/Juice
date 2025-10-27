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
