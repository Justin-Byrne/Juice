# ![Juice](https://github.com/Justin-Byrne/Juice/blob/main/assets/images/logo/juice_logo-small.png)
![license](https://img.shields.io/github/license/Justin-Byrne/Juice?style=flat-square)
<img src="https://img.shields.io/badge/Chrome-142.0.7444.60-yellow?style=flat-square&logo=googlechrome&logoColor=white" />
![issues](https://img.shields.io/github/issues/Justin-Byrne/Juice?style=flat-square)
<img src="https://img.shields.io/github/languages/code-size/Justin-Byrne/Juice?style=flat-square" />

JavaScript Unified Interactive Creation Engine

- [Overview](#overview)
- [Core Features](#core-features)
- [Why Use Juice](#why-use-juice)
- [Example](#example)
- [Usage Examples](#usage-examples)
  - [Gradient Fill](#Gradient-Fill)
  - [Collections and Templates](#Collections-and-Templates)
  - [Movement and Animation](#Movement-and-Animation)
  - [Conic Gradients and Artistic Effects](#Conic-Gradients-and-Artistic-Effects)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Requirements](#-requirements)
- [Development](#-development)
  - [Prerequisites](#Prerequisites)
  - [Build](#Build)
  - [Watch](#Watch)
  - [Configuration](#Configuration)
  - [Troubleshooting](#Troubleshooting)
- [Support](#support)
- [Structure](#structure)

## Overview

**Juice** brings structure, power, and elegance to canvas-based rendering.
It's a **modular, extensible engine** designed for **artists, developers, and educators** who want to create visually rich, interactive experiences with clean, reusable code.

## Core Features

- **Object-oriented graphics engine** — manage every element as a class instance
- **Unified property system** — consistent accessors & mutators across shapes and collections
- **Rich styling tools** — supports RGB color models, gradients (linear, radial, conic), patterns, and shadows
- **Mathematical precision** — clean handling of points, angles, ranges, and geometric aspects
- **Interactive utilities** — move, animate, and manipulate objects programmatically
- **Extensible architecture** — easily define your own templates, shapes, or transitions
- **Zero dependencies** — lightweight, standalone, and easy to integrate

## Why Use Juice?

Juice is designed to make **creative coding intuitive and scalable**.
Instead of juggling low-level canvas calls, you work with **intelligent objects** that know how to draw, move, and interact.

✨ **Perfect for:**
- Generative & procedural art
- Visualization systems
- Game prototypes
- Interactive teaching tools
- Digital installations
- Experimental UI/UX design

---

## Example

Here's how simple it is to start creating with Juice:

```js
// Create a circle
const circle = new Circle ( new Point ( 150, 150 ), 50 );

// Style it
circle.fill.color   = new Rgb ( 255, 100, 100 );
circle.stroke.color = new Rgb ( 30, 30, 30 );
circle.stroke.width = 2;

// Draw it to the canvas
circle.draw ( 'myCanvas' );
```

Juice automatically manages your canvas context, making it easy to **focus on creativity, not configuration**.

---

## Usage Examples

### Gradient Fill
Create smooth, colorful transitions between two hues:

```js
const gradient = new Linear (
  new Point ( 0, 0 ),
  new Point ( 200, 200 ),
  [ new Stop ( new Rgb(255, 0, 100 ), 0 ), new Stop ( new Rgb ( 0, 150, 255 ), 1 ) ]
);

const rect         = new Rectangle ( new Point ( 50, 50 ), new Aspect ( 200, 200 ) );
rect.fill.type     = 'linear';
rect.fill.gradient = gradient;

rect.draw ( 'myCanvas' );
```

---

### Collections and Templates
Group and manage multiple objects as a single collection:

```js
const circles = new Circles ( );

for ( let i = 0; i < 5; i++ )
{
  const circle = new Circle ( new Point ( 50 + i * 60, 150 ), 25 );
  circle.fill.color = new Rgb ( 100 + i * 30, 150, 255 - i * 40 );
  circles.push ( circle );
}

circles.draw ( 'myCanvas' );
```

Collections make it easy to **clone, transform, or animate** entire groups at once.

---

### Movement and Animation
Bring your shapes to life with a few simple calls:

```js
const ball = new Circle ( new Point ( 100, 200 ), 20 );
ball.fill.color = new Rgb ( 255, 200, 0 );

function animate ( )
{
  const ctx = document.getElementById ( 'myCanvas' ).getContext ( '2d' );

  ctx.clearRect ( 0, 0, 600, 400 );

  ball.move ( 2, 3 );   // Move 2° forward by 3 units
  ball.draw ( 'myCanvas' );

  requestAnimationFrame ( animate );
}

animate (  );
```

---

### Conic Gradients and Artistic Effects
Experiment with expressive rendering styles:

```js
const conic = new Conic (
  Math.PI / 3,
  new Point ( 150, 150 ),
  [
    new Stop ( new Rgb ( 255, 0, 0 ), 0 ),
    new Stop ( new Rgb ( 0, 255, 0 ), 0.5 ),
    new Stop ( new Rgb ( 0, 0, 255 ), 1 )
  ]
);

const shape         = new Circle ( new Point ( 150, 150 ), 80 );
shape.fill.type     = 'conic';
shape.fill.gradient = conic;

shape.draw ( 'myCanvas' );
```

---

## 🧬 Architecture

Juice is built around modular, reusable classes such as:

- `Point`, `Aspect`, and `Angle` for geometry
- `Rgb`, `Fill`, `Stroke`, and `Gradient` for color and rendering
- `Circle`, `Rectangle`, `Line`, and `Text` for drawing primitives
- `Collections` and `Templates` for grouping and procedural generation
- `VERIFY`, `UTILITIES`, and `PROPERTY_BLOCKS` for validation and shared logic

This consistent structure allows every component to **speak the same design language**.

---

## 🚀 Getting Started

1. **Include Juice in your project**
   ```html
   <script src="juice.js"></script>
   <canvas id="myCanvas" width="600" height="400"></canvas>
   ```
2. **Create your first object**
   ```js
   const rect      = new Rectangle ( new Point ( 100, 100 ), new Aspect ( 200, 100 ) );
   rect.fill.color = new Rgb ( 0, 150, 255 );
   rect.draw ( 'myCanvas' );
   ```
3. **Experiment and expand** — combine objects, animate them, or generate procedural art.

---

## 🔧 Requirements

- JavaScript ES6+
- Modern browser with HTML5 Canvas support

---

It provides a unified architecture for shapes, collections, gradients, shadows, and effects — everything you need to build dynamic, procedural, or generative art with ease.

---

## 🏗 Development

Juice provides a **custom build system** written entirely in Bash to manage project compilation, minification, and live development.

| File | Purpose |
|------|----------|
| **`compile.sh`** | Compiles and minifies the full Juice framework. |
| **`watch.sh`** | Watches `/script/source` for file changes and automatically recompiles. |
| **`settings.json`** | Holds project version info and browser reload settings. |

### Prerequisites
| Tool | Install |
|------|----------|
| Bash 3.2.57+ | _(preinstalled)_ |
| Node.js + npm | `brew install node` |
| UglifyJS | `npm install -g uglify-js` |
| fswatch | `brew install fswatch` |

### Build
```bash
cd build
bash compile.sh
```

### Watch
```bash
cd build
bash watch.sh
```

### Configuration
Edit `build/settings.json` to update version and browser info.

### Troubleshooting
| Issue | Fix |
|-------|-----|
| Missing `fswatch` | `brew install fswatch` |
| Missing `uglifyjs` | `npm install -g uglify-js` |
| Permission denied | `chmod +x build/*.sh` |

## Support
Please [open an issue](https://github.com/Justin-Byrne/Juice/issues/new) for support.

## Structure
```
.
├── assets
│   └── audio
│       ├── compile
│       │   ├── devSuite.mp3
│       │   ├── distro.mp3
│       │   └── engine.mp3
│       ├── failure.mp3
│       ├── minify.mp3
│       └── success.mp3
├── build
│   ├── browser
│   │   ├── chrome
│   │   │   └── disable-web-security.sh
│   │   ├── compile_focus.sh
│   │   ├── compile_reload.sh
│   │   ├── focus.scpt
│   │   └── reload.scpt
│   ├── compile.sh
│   ├── settings.json
│   └── watch.sh
├── docs
│   └── CHANGELOG.md
├── script
│   ├── distro
│   │   ├── juice-v1.0.0.js
│   │   ├── juice-v1.0.0.min.js
│   │   └── juice-v1.0.0.min.js.map
│   └── source
│       ├── classes
│       │   ├── Core
│       │   │   ├── Objects
│       │   │   │   ├── Basic
│       │   │   │   │   ├── Abstracts
│       │   │   │   │   │   ├── Shape.js
│       │   │   │   │   │   └── ShapeFillable.js
│       │   │   │   │   ├── Circle.js
│       │   │   │   │   ├── Ellipse.js
│       │   │   │   │   ├── Line.js
│       │   │   │   │   ├── Rectangle.js
│       │   │   │   │   ├── RoundedRectangle.js
│       │   │   │   │   ├── Text.js
│       │   │   │   │   └── aImage.js
│       │   │   │   ├── Collections
│       │   │   │   │   ├── Abstracts
│       │   │   │   │   │   ├── Collection.js
│       │   │   │   │   │   └── CollectionShape.js
│       │   │   │   │   ├── Circles.js
│       │   │   │   │   ├── Ellipses.js
│       │   │   │   │   ├── Group.js
│       │   │   │   │   ├── Lines.js
│       │   │   │   │   ├── Rectangles.js
│       │   │   │   │   ├── RoundedRectangles.js
│       │   │   │   │   └── Texts.js
│       │   │   │   └── Complex
│       │   │   │       ├── Arrow.js
│       │   │   │       └── Polygon.js
│       │   │   └── Subjects
│       │   │       ├── Color
│       │   │       │   ├── Gradient
│       │   │       │   │   ├── Abstracts
│       │   │       │   │   │   └── Gradient.js
│       │   │       │   │   ├── Properties
│       │   │       │   │   │   └── Stop.js
│       │   │       │   │   ├── Conic.js
│       │   │       │   │   ├── Linear.js
│       │   │       │   │   └── Radial.js
│       │   │       │   └── Rgb.js
│       │   │       ├── Staging
│       │   │       │   ├── Properties
│       │   │       │   │   ├── Options.js
│       │   │       │   │   └── Range.js
│       │   │       │   ├── Angle.js
│       │   │       │   ├── Aspect.js
│       │   │       │   ├── ControlPoints.js
│       │   │       │   ├── Font.js
│       │   │       │   └── Point.js
│       │   │       ├── Fill.js
│       │   │       ├── Shadow.js
│       │   │       └── Stroke.js
│       │   ├── Data-Structures
│       │   │   ├── BoundedArray.js
│       │   │   ├── Circlet.js
│       │   │   └── Queue.js
│       │   ├── Templates
│       │   │   └── SacredCircles.js
│       │   └── Juice.js
│       ├── components
│       │   ├── Types
│       │   │   └── Prototypes.js
│       │   ├── Utilities
│       │   │   ├── CssColors.js
│       │   │   ├── Keycode.js
│       │   │   ├── PropertyBlocks.js
│       │   │   ├── Symbols.js
│       │   │   ├── Utilities.js
│       │   │   └── Verify.js
│       │   └── Precompute.js
│       └── typedef
│           └── typedef.js
├── LICENSE
└── README.md
```


## Copyright
![Byrne-Systems](https://github.com/Justin-Byrne/Juice/blob/main/assets/images/logo/cube-small.png)


= Byrne-Systems © 2025 - All rights reserved. =
