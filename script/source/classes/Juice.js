/**
 * Juice core application
 * @class
 * @property {Object} canvas   - Main canvas context
 * @property {Array}  canvases - Array of all canvas contexts
 */
class Juice
{
  // Public properties
    _canvas   = undefined;
    _canvases = undefined;

    #get =
    {
        /**
         * Returns a Circle object
         * @param  {Point}  point  - X & Y Coordinates
         * @param  {number} radius - Radius of Circle
         * @param  {Stroke} stroke - Stroke properties
         * @param  {Fill}   fill   - Fill properties
         * @return {Circle}                                    Circle object
         */
        circle ( point, radius, stroke, fill )
        {
            return new Circle ( point, radius, undefined, new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width ), new Fill ( fill.color, fill.type ), undefined, undefined );
        },

        /**
         * Returns a Ellipse object
         * @param  {Point}  point  - X & Y Coordinates
         * @param  {Stroke} stroke - Stroke properties
         * @param  {Fill}   fill   - Fill properties
         * @return {Ellipse}                                   Ellipse object
         */
        ellipse ( point, stroke, fill )
        {
            return new Ellipse ( point, new Point ( this.radius, this.radius * 0.5 ), undefined, new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width ), new Fill ( fill.color, fill.type ), undefined, undefined );
        },

        /**
         * Returns a Rectangle object
         * @param  {Point}  point  - X & Y Coordinates
         * @param  {Stroke} stroke - Stroke properties
         * @param  {Fill}   fill   - Fill properties
         * @return {Rectangle}                                 Rectangle object
         */
        rectangle ( point, stroke, fill )
        {
            return new Rectangle ( point, undefined, undefined, new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width ), new Fill ( fill.color, fill.type ), undefined, undefined );
        },

        /**
         * Returns a RoundedRectangle object
         * @param  {Point}  point  - X & Y Coordinates
         * @param  {Stroke} stroke - Stroke properties
         * @param  {Fill}   fill   - Fill properties
         * @return {RoundedRectangle}                          Rounded rectangle object
         */
        roundedRectangle ( point, stroke, fill )
        {
            return new RoundedRectangle ( point, undefined, undefined, new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width ), new Fill ( fill.color, fill.type ), undefined, undefined );
        },

        /**
         * Returns a Text object
         * @param  {Point}  point  - X & Y Coordinates
         * @param  {Stroke} stroke - Stroke properties
         * @param  {Fill}   fill   - Fill properties
         * @return {Text}                                      Text object
         */
        text ( point, text, stroke, fill )
        {
            return new Text ( point, text, undefined, undefined, undefined, undefined, undefined, new Stroke ( stroke.color, stroke.type, stroke.segments, stroke.width ), new Fill ( fill.color, fill.type ), undefined );
        },

        /**
         * Returns a Line object
         * @param  {Point} startPoint - Starting point of line
         * @param  {Point} endPoint   - Ending point of line
         * @return {Line}
         */
        line ( startPoint, endPoint )
        {
            return new Line ( startPoint, endPoint, undefined, undefined, undefined, undefined );
        }
    }

    /**
     * Create a Juice object
     * @param {string} canvasId - Canvas identifier
     */
    constructor ( canvas )
    {
        this._init ( );

        this.canvas = canvas;
    }

  ////    PROPERTIES    ///////////////////////////////////

    /**
     * Set canvas value
     * @public
     * @param {string} value - Canvas identifier
     */
    set canvas ( value )
    {
        this._canvas = ( this.VERIFY.isInDom ( value ) ) ? document.getElementById ( value ).getContext ( '2d' )

                                                   : this._canvas;
    }

    /**
     * Get canvas value
     * @readOnly
     * @return {string} Canvas identifier
     */
    get canvas ( )
    {
        return this._canvas.canvas.id;
    }

    /**
     * Set canvas value
     * @public
     * @param {string} canvasId - Canvas identifier
     */
    set canvases ( canvasId )
    {
        let _canvas = ( this.VERIFY.isInDom ( canvasId ) ) ? document.getElementById ( canvasId ).getContext ( '2d' )

                                                     : undefined;


        if ( this._canvases == undefined )

            this._canvases = new Array;


        if ( _canvas != undefined )

            this._canvases.push ( _canvas );
    }

    /**
     * Set canvas value
     * @readOnly
     * @return {Array} Array of canvas contexts
     */
    get canvases ( )
    {
        return this._canvases;
    }

    /**
     * Get getters
     * @public
     * @return {Object} Get getters
     */
    get get ( )
    {
        return this.#get;
    }

  ////    UTILITIES    ////////////////////////////////////

    /**
     * Sets the canvas and canvases properties
     * @private
     */
    _setCanvases ( )
    {
        let _canvases = document.getElementsByTagName ( 'canvas' );


        if ( typeof _canvases === 'object' && this._canvases === undefined )

            for ( let _id in _canvases )

                if ( _id == 0 )

                    this.canvas   = _canvases [ _id ].id;

                else

                    this.canvases = _canvases [ _id ].id;
    }

    /**
     * Returns the center X & Y coordinates of the present canvas
     * @public
     * @return {Point} - Center X & Y coordinates
     */
    get center ( )
    {
        return new Point (
                       this._canvas.canvas.clientWidth  / 2,    // X coordinate
                       this._canvas.canvas.clientHeight / 2     // Y coordinate
                   );
    }

    /**
     * Clears canvas
     * @public
     */
    clearCanvas ( )
    {
        let _canvas = document.getElementById ( this.canvas );


        if ( _canvas )  // @TODO: identify why this check has to take place periodically !

            this._canvas.clearRect ( 0, 0, _canvas.width, _canvas.height );
    }

  ////    INITIALIZTION    //////////////////////////////

    /**
     * CanvasLab initializer
     * @private
     */
    _init ( )
    {
        this._setCanvases ( );
    }
}
