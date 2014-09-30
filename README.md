# Overview

**Omni-Nav** is a navigation bar that provides access to all content and services across our Chapman University websites. It offers universal **navigation** of our core services; it offers an in-page **search box** powered by Google; and it offers quick access to **log in** to other Chapman services.


# Adding Omni-Nav to a web page

Copy and paste the following HTML tags into the `<head>` of your page.

```html
<link href="//www2.chapman.edu/omni-nav/dist/omni-nav.min.css" rel="stylesheet">
<script src="//www2.chapman.edu/omni-nav/dist/omni-nav.min.js"></script>
```

Use a server-side include* to pull in this HTML file right before the closing `<body>` tag:

```
//www2.chapman.edu/omni-nav/dist/omni-nav.html (5kb)
```

*It is highly recommended to use server-side caching when including this file in order to increase performance. If the file is unreachable, the server should be configured to serve the cached asset indefinitely.*

### Companion Bar
To add a companion bar to your site, use this HTML code anywhere on the page:
```html
<div id="cu_companion_bar">
    Loyal Companion Bar
</div>
```


# Developing Omni-Nav

Modify the files located in the `/src/` directory:

```
src/omni-nav.js
src/omni-nav.scss
src/omni-nav.svg
src/omni-nav.html
```

Use **grunt** or **grunt watch** in the terminal to compile assets into the `/dist/` directory. 

[Click here to learn how to set up grunt on your machine](http://24ways.org/2013/grunt-is-not-weird-and-hard/)



### Deploying

Assets should be published to: **//www2.chapman.edu/omni-nav/** and all servers should reference these files. This ensures that all versions of the nav bar are updated across all of our web assets in real-time. 
