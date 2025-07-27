# Configuration

::: tip Angles definitions
Photo Sphere Viewer uses a lot of angles for its configuration, most of them can be defined in radians by using a simple number (`3.5`) or in degrees using the "deg" suffix (`'55deg'`).
:::

## Standard options

#### `container` (required)

-   type: `HTMLElement | string`

HTML element which will contain the panorama, or identifier of the element.

```js
container: document.querySelector('.viewer');
container: '.viewer'; // will target [class="viewer"]
container: 'viewer'; // will target [id="viewer"]
```

#### `panorama` (required)

-   type: `*`

Path to the panorama. Must be a single URL for the default equirectangular adapter. Other adapters support other values.

#### `adapter`

-   default: `equirectangular`

Which [adapter](./adapters/) used to load the panorama.

#### `plugins`

-   type: `array`

List of enabled [plugins](../plugins/).

#### `caption`

-   type: `string`

A text displayed in the navbar. If the navbar is disabled, the caption won't be visible. HTML is allowed.

#### `description`

-   type: `string`

A text displayed in the side panel when the user clicks the "i" button. HTML is allowed.

#### `downloadUrl`

-   type: `string`
-   default: `=panorama` for equirectangular panoramas

Define the file which will be downloaded with the `download` button. This is particularly useful for adapters that use multiple files, like the CubemapAdapter or the EquirectangularTilesAdapter.

#### `downloadName`

-   type: `string`
-   default: `=downloadUrl` filename

Overrides the filename when downloading the panorama. This is mostly useful if the panorama is provided as base64.

#### `size`

-   type: `{ width: integer, height: integer }`

The final size of the panorama container. By default the size of `container` is used and is followed when resized.

#### `navbar`

Configuration of the [navbar](./navbar.md).

#### `minFov`

-   type: `integer`
-   default: `30`

Minimal field of view (maximum zoom), between 1 and `maxFov`.

#### `maxFov`

-   type: `integer`
-   default: `90`

Maximal field of view (minimum zoom), between `minFov` and 180.

#### `defaultZoomLvl`

-   type: `integer`
-   default: `50`

Initial zoom level, between 0 (for `maxFov`) and 100 (for `minfov`).

#### `fisheye`

-   type: `boolean | double`
-   default: `false`

Enable fisheye effect with `true` or specify the effect strength (`true` = `1.0`).

<DemoButton href="/demos/basic/fisheye.html"/>

::: warning
This mode can have side-effects on markers rendering and some adapters.
:::

#### `defaultYaw`

-   type: `double | string`
-   default: `0`

Initial horizontal angle, between 0 and 2π.

#### `defaultPitch`

-   type: `double | string`
-   default: `0`

Initial vertical angle, between -π/2 and π/2.

#### `lang`

-   type: `object`
-   default:

```js:line-numbers
lang: {
  zoom: 'Zoom',
  zoomOut: 'Zoom out',
  zoomIn: 'Zoom in',
  moveUp: 'Move up',
  moveDown: 'Move down',
  moveLeft: 'Move left',
  moveRight: 'Move right',
  description: 'Description',
  download: 'Download',
  fullscreen: 'Fullscreen',
  loading: 'Loading...',
  menu: 'Menu',
  close: 'Close',
  twoFingers: 'Use two fingers to navigate',
  ctrlZoom: 'Use ctrl + scroll to zoom the image',
  loadError: 'The panorama cannot be loaded',
  webglError: 'Your browser does not seem to support WebGL',
}
```

Various texts used in the viewer.

#### `loadingImg`

-   type: `string`

Path to an image displayed in the center of the loader.

#### `loadingTxt`

-   type: `string`
-   default: `lang.loading`

Text displayed in the center of the loader, only used if `loadingImg` is not provided.

#### `mousewheel`

-   type: `boolean`
-   default: `true`

Enables zoom with the mouse wheel.

#### `mousemove`

-   type: `boolean`
-   default: `true`

Enables panorama rotation with mouse click+move or with a finger swipe on touch screens.

#### `keyboard`

-   type: `boolean | 'fullscreen' | 'always'`
-   default: `'fullscreen'` (same as `true`)

Enables keyboard controls when in fullscreen or always. The different keys can be configured with [`keyboardActions`](#keyboardactions).

::: warning
Keys are listened globally to the page, and thus can be in conflict with other components if configured to `'always'`.
:::

#### `mousewheelCtrlKey`

-   type: `boolean`
-   default: `false`

Requires to use the ctrl key to zoom the panorama. This allows to scroll on the page without interfering with the viewer. If enabled, an overlay asking the user to use ctrl + scroll is displayed when ctrl key is not pressed.

#### `touchmoveTwoFingers`

-   type: `boolean`
-   default: `false`

Requires two fingers to rotate the panorama. This allows standard touch-scroll navigation in the page containing the viewer. If enabled, an overlay asking the user to use two fingers is displayed when only one finger is detected.

## Advanced options

#### `sphereCorrection`

-   type: `{ pan: double | string, tilt: double | string, roll: double | string }`
-   default: `{ pan:0, tilt:0, roll: 0 }`

Allows to fix the panorama orientation.

**Note:** if the XMP data contains pose heading/pitch/roll data, they will be applied before `sphereCorrection`.

![pan-tilt-toll](/images/pan-tilt-roll.png)

#### `panoData`

-   type: `PanoData | function<Image, PanoData, PanoData>`

Overrides XMP data found in the panorama file.
All parameters are optional.

```js:line-numbers
panoData: {
  fullWidth: 6000,
  fullHeight: 3000, // optional
  croppedWidth: 4000, // optional
  croppedHeight: 2000, // optional
  croppedX: 1000,
  croppedY: 500,
}
```

It can also be a function to dynamically compute the cropping config depending on the loaded image (note that a [default setting](./adapters/equirectangular.md#default-parameters) is already applied when no data is found).

```js:line-numbers
panoData: (image, xmpData) => ({
    fullWidth: image.width,
    fullHeight: Math.round(image.width / 2),
    croppedWidth: image.width,
    croppedHeight: image.height,
    croppedX: 0,
    croppedY: Math.round((image.width / 2 - image.height) / 2),
});
```

#### `defaultTransition`

-   type: `TransitionOptions`
-   default: `{ speed: 1500, rotation: true, effect: "fade" }`

Configures the default transition between panoramas. All parameters can be changed when calling `setPanorama()` method.

Possible `effect` are `fade, black, white`.  
The `speed` is either a duration in milliseconds or a string containing the speed in revolutions per minute (`2rpm`).


<DemoButton href="/demos/basic/transition.html"></DemoButton>

#### `moveSpeed`

-   type: `double`
-   default `1`

Speed multiplicator for panorama moves. Used for click move, touch move and navbar buttons.

#### `zoomSpeed`

-   type: `double`
-   default `1`

Speed multiplicator for panorama zooms. Used for mouse wheel, touch pinch and navbar buttons.

#### `moveInertia`

-   type: `boolean | number`
-   default: `0.8`

Applies damping to the camera movement, higher value mean stronger damping (`true` is default damping factor, `false` is not damping).

#### `requestHeaders`

-   type: `object | function<string, object>`

Sets the HTTP headers when loading the images files.

```js
requestHeaders: {
    header: 'value',
}
```

It can also be a function to dynamically set the request headers before every call. This can be useful when adding a Bearer, which is temporarily valid, to the Authorization header.

```js
requestHeaders: (url) => ({
    header: 'value',
});
```

#### `withCredentials`

-   type: `boolean | function<string, boolean>`
-   default: `false`

Use credentials for HTTP requests.

It can also be a function to dynamically change the option before every call.

```js
withCredentials: (url) => !url.includes('amazonaws');
```

#### `keyboardActions`

-   type: `object`
-   default:

```js:line-numbers
keyboardActions: {
  'ArrowUp': 'ROTATE_UP',
  'ArrowDown': 'ROTATE_DOWN',
  'ArrowRight': 'ROTATE_RIGHT',
  'ArrowLeft': 'ROTATE_LEFT',
  'PageUp': 'ZOOM_IN',
  'PageDown': 'ZOOM_OUT',
  '+': 'ZOOM_IN',
  '-': 'ZOOM_OUT',
}
```

Configure keyboard actions. It is a map defining key code->action. (all the available actions are listed above)

You can also configure an arbitrary callback to any key (including modifiers `Ctrl`,`Shift`,`Alt`,`Meta`), it receives the viewer itself and the original keyboard event as parameters.

```js:line-numbers
import { DEFAULTS } from '@photo-sphere-viewer/core';

keyboardActions: {
    ...DEFAULTS.keyboardActions,
    'h': (viewer, evt) => {
        // do something when H is pressed
    },
    'Ctrl+1': (viewer) => {
        // do something when Ctrl + 1 is pressed
    },
},
```

<DemoButton href="/demos/advanced/keyboard-actions.html"/>

::: warning
Keyboard actions will only be available in fullscreen by default, this can be changed with the [`keyboard` option](#keyboard).
:::

#### `canvasBackground`

-   type: `string`
-   default: `#000`

Background of the canvas, which will be visible when using cropped panoramas. Can be any valid CSS `background` value.

#### `rendererParameters`

-   type: [`WebGLRendererParameters`](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)
-   default: `{ alpha: true, antialias: true }`

Configuration of the ThreeJS WebGLRenderer.

## Cache

Photo Sphere Viewer contains a cache system to save resources when switching back and forth between multiple panoramas.
This cache is global and shared across viewers (_note:_ is not related to ThreeJS Cache, which should not be enabled).

To get the cache instance, import it from `@photo-sphere-viewer/core`, then you can configure it.

```js
import { Cache } from '@photo-sphere-viewer/core';

Cache.enabled = false;
Cache.ttl = 300;
Cache.maxItems = 3;
```

#### `enabled`

-   type: `boolean`
-   default: `true`

Allows to completely disable the cache.

#### `ttl`

-   type: `number`
-   default: `600`

Maximum retention duration in minutes.

#### `maxItems`

-   type: `number`
-   default: `10`

Maximum number of items stored in the case.

_Note:_ the actual number of files will be greater with cubemap and tiles adapters.
