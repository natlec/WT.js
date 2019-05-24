<br>
<p align="center">
    <img alt="The WT" src="/static/img/logo.png" width="150px">
</p>
<br>
<p align="center">
  An online store web-application made with JQuery, Handlebars & Python.
</p>
<p align="center">
  <b>
    <a href="#introduction">Introduction</a>&nbsp;&nbsp;/&nbsp;&nbsp;
    <a href="#build">Build</a>&nbsp;&nbsp;/&nbsp;&nbsp;
    <a href="#credits">Credits</a>
  </b>
</p>
<br>

Introduction
------------

THE WT is an online store web-application made using JQuery & Handlebars for the frontend and Python for the backend.

The backend of the web-application supports a JSON API, this allows the frontend to fetch JSON lists of product items & cart items and send POST requests to modify cart items refer to the following to access the API:

* `/` — Delivers the index.html template, this is the only URL that users can access directly.
* `/static/<path>` — Delivers static files (CSS, JS, images & fonts)
* `/products` — Delivers a JSON representation of all product items
* `/cart` — Accepts POST requests modify the cart, with form fields:
  * `productid` — id of cart item product
  * `quantity` — quantity of cart item product
  * `update` — if set to 1: quantity of cart item with `productid` is modified; if set to 0: quantity of cart item with `productid` is appended
* `/cart` — Delivers a JSON representation of all cart items

The frontend of the web-application consists of an `index.html` file, which provides the overall structure (view) and also declares templates for the cart & product items to be compiled by Handlebars, and several JavaScript files; the purpose of each JavaScript file is as follows:
* `main.js` — Provides the overall functionality (controller) and imports the `cart.js` & `products.js` models.
* `products.js` — Provides functions for fetching & sorting product data (model) by contacting the JSON APIs mentioned previously.
* `cart.js` — Provides functions for fetching & modifying cart data (model) by contacting the JSON APIs mentioned previously.


Build
-----

To test the application in development, run the `main.py` file in the terminal. The development server can be accessed at `http://127.0.0.1:8010/` as long as the `main.py` file is running in the terminal.

To create a test database with random product items, run the `dbschema.py` file in the terminal.


Credits
-------

This project uses a variety of libraries, plugins & frameworks, feel free to check em' out:
* [**Bottle (MIT)**](https://github.com/bottlepy/bottle) — This is a fast and simple micro-framework for python web-applications.
* [**Bottle-beaker (MIT)**](https://github.com/bottlepy/bottle-beaker) — This is a Bottle plugin to session and caching library with WSGI Middleware.
* [**Handlebars (MIT)**](https://github.com/wycats/handlebars.js/) — This is a JavaScript library for semantic templates.
* [**JQuery (MIT)**](https://github.com/jquery/jquery) — This is a JavaScript library designed to simplify the client-side scripting of HTML.