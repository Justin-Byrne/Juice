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
