# Modular Haxe JS with Webpack

This project demonstrates the creation of a Haxe-JavaScript modular project leveraging Webpack 
for bundling (code and assets) and lazy loading.

It's really easy and absolutely transparent in the code!

## How it works

### Leveraging Webpack features

You will need to get familiar with how Webpack works - thankfully the documentation
is excellent nowadays: [https://webpack.js.org/]()

A project aims at creating a Webpack loader for Haxe:
[https://github.com/jasononeil/webpack-haxe-loader]()

Every asset dependency should be explictely required, so Webpack knows what to include 
in the output folder. With the right configuration, small assets can even be inlined in 
the bundle to reduce the number of requests.

```haxe
Webpack.require('./index.css');

var img = new Image();
img.src = Webpack.require('./logo.png');
```

Even the HTML page is generated by a plugin, so everything has to go through Webpack.

### Haxe JS code splitting

Haxe JS isn't normally capable of code splitting, but the core functionality was 
developped within the (Webpack-free) Haxe Modular project:
[https://github.com/elsassph/haxe-modular]()

The Haxe Webpack loader will leverage the code splitting feature when you request
modules asynchronously:

```haxe
import com.Foo;
...
// Extract Foo (and dependencies) into a separate bundle
Webpack.aync(Foo).then(function(_) {
	// Foo is now loaded
	var foo = new Foo();
});
```

### Webpack config

Webpack's "magic" is configured in the `webpack.config.js`. It is a very powerful and
flexible system which is documented here: [https://webpack.js.org/]()

The basics is that the `haxe-loader` allow to "require" an 
[HXML file](https://haxe.org/manual/compiler-usage-hxml.html), 
which in turn will provide the (splitted) JS output to Webpack.

This feature is added as a "rule" in the config:
```
{
	test: /\.hxml$/,
	loader: 'haxe-loader',
	options: {
		extra: `-D some_extra=arguments`
	}
},
```

HXMLs can be require directly from JS code, or as an entry point, which allows to
make a pure Haxe Webpack project:
```
entry: {
	app: './build.hxml'
},
```

## Development

### Tools

Using [yarn](https://yarnpkg.com) for node modules is recommended:

	npm install yarn -g

Using [hmm](https://github.com/andywhite37/hmm) for haxelibs is recommended:

	haxelib --global install hmm
	haxelib --global run hmm setup

### Installation

Install npm and haxe dependencies:

	yarn install
	hmm install

### Running

Then start Webpack webserver, open `http://localhost:9000`, and enjoy live reload:

	yarn start

### Releasing

To build the project statically, run:

	yarn build
