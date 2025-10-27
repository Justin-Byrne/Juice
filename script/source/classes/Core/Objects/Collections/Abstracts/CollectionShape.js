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
