# Overview

**OmniNav** is the navigation bar designed to work across all our Chapman University websites. It is currently being redesigned to function as an independent remote service (Navbar-as-a-Service) that offers identically styled versions tailored to our different web applications and updated in real-time.


## Adding OmniNav to a web page

Copy and paste the following HTML tags into your page:

```
<!-- Stylesheet in head -->
<link rel="stylesheet" href="https://cdn.chapman.edu/omni-nav/omni-nav.bundle.css">

<!-- Navbar in body -->
<nav id="omni-nav" class="pre-build" data-target="static"></nav>

<!-- Javascript tag near end of body -->
<script src="https://cdn.chapman.edu/omni-nav/omni-nav.bundle.min.js"></script>
```


## Development

OmniNav is developed using [Webpack](https://webpack.js.org/) to build and bundle assets. It includes [Babel](https://babeljs.io/) to support next-generation Javascript.

To install:

    npm install

### Local Server

To run the local server:

    npm start

To see changes, you'll need to run build:

    npm run build

### Tests

    npm test


## Deployment

To build the latest version of the javascript and stylesheets:

    npm run build

Assets should be published to a Chapman site accessible to any Chapman web application. Currently, assets are hosted at https://www2.chapman.edu/omni-nav.

Ideally, it will eventually be hosted at CDN endpoint like:

- https://cdn.chapman.edu/omni-nav/
