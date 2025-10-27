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
