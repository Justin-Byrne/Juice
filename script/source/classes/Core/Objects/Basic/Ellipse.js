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
