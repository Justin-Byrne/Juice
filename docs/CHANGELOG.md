# Changelog
All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-10-26
### Added
- Directory structure
- `CHANGELOG.md`
- `README.md`
- Assets
  - Audio files for build scripts
  - General images for this repository
- Build Tools & Scripts
  - `compile.sh` compile's source into a single distributable file
  - `watch.sh` watch's source files for changes to initiate `compile.sh` for assembly
- Object
  - Basic
    - `Shape` base class, for all drawable shapes
    - `ShapeFillable` base class, for all fillable shapes
    - `Circle` class, for rendering circular objects
    - `Ellipse` class, for rendering ellipse objects
    - `Line` class, for rendering linear objects
    - `Rectangle` class, for rendering rectangular objects
    - `RoundedRectangle` class, for rendering rounded rectangular objects
    - `Text` class, for rendering textual objects
    - `aImage`, class, for rendering image objects
  - Complex
    - `Polygon` class, for rending polygon objects
  - Collections
    - `Collection` base class, for all collection array objects
    - `CollectionShape` base class, for all shape collection objects
    - `Circles` class, an array class to group circular objects
    - `Ellipses` class, an array class to group ellipse objects
    - `Lines` class, an array class to group linear objects
    - `Rectangles` class, an array class to group rectangular objects
    - `RoundedRectangles` class, an array class to group rounded rectangular objects
    - `Texts` class, an array class to group textual objects
    - `Group` class, an array class to group any and all object types
- Subject
  - `Stroke` class, base stroke class for drawable objects
  - `Fill` class, base fill class for drawable objects
  - `Shadow` class, base shadow class for drawable objects
  - Color
    - `Rgb` class, base color class
    - Gradient
      - `Gradient` base class, for all gradient types
      - `Stop` class, gradient stop class
      - `Conic` class, conic gradient class
      - `Linear` class, linear gradient class
      - `Radial` class, radial gradient class
  - Staging
  - `Point` class, for X & Y coordinate properties
  - `Angle` class, for angle properties
  - `Aspect` class, for aspect properties
  - `ControlPoints` class, for bezier curve properties
  - `Font` class, for base font properties
  - `Options` class, for grouped option properties
  - `Range` class, for range properties
- Data-Structures
  - `BoundedArray` class, for bounded array objects
  - `Circlet` class, for circular array objects
  - `Queue` class, for linear queue objects
- Templates
  - `SacredCircles` template class, an example of templating a collection of objects
- Components
  - `PROPERTY_BLOCKS` module, for shared accessors & mutators
  - `UTILITIES` module, for shared utility functions
  - `VERIFY` module, for shared validation functions
  - `CSS_COLORS` module, for cached CSS color names
  - `SYMBOLS` module, for shared symbols
  - `KEYCODE` module, for keycode values

## Previous Commits
---

| Version     | Date         | Commit                                                                | Comments                                                                                                                     |
| :---------  | :----------: | :-------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `[1.0.0]`   | `2025-10-26` | `CURRENT`                                                             | <sup>Initial upload.</sup>                                                                                                   |

---

## Types of changes
- `Added` added functions or properties.
- `Changed` changed existing function call names, placement, location, and/or properties.
- `Deprecated` soon-to-be removed features.
- `Fixed` fixed bug.
- `Refactored` refactored existing functionality.
- `Removed` removed features.
- `Security` secured vulnerabilities.

## Copyright

![Byrne-Systems](https://github.com/Justin-Byrne/juice/blob/main/assets/images/cube_sm.png)

==Byrne-Systems © 2025 - All rights reserved.==
