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
