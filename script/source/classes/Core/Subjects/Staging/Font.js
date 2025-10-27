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
