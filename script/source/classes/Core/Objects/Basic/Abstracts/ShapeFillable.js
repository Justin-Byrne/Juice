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
