core-web-api
============

My web class core web api.

## Installation Note

### Requirements

Base Applications

* [Node.js](http://nodejs.org), see [Installing Node.js](http://www.webizly.com/node/35)

It's only tested in Ubuntu Linux 12.04, 12.10 and 13.04

Several npm packages needs to be installed globally (using `sudo npm install -g [package name]`), they are:
* [grunt-cli](https://github.com/gruntjs/grunt-cli) (task runner)
* [jshint](https://github.com/jshint/jshint) (code style checker)

### Installation Notes

Clone the repository:

```sh
$ git clone git@github.com:mywebclass/core-web-api.git
```

Install the dependencies:

```sh
$ npm install
```

Or to run it in development mode:
```sh
$ grunt server
```

If you are running this application in *production* mode, you need *Redis* server started installed for sessions.
Server needs to work with default sessings - it listen on 6379 port of localhost. Password *IS NOT SET*!

## Running Tests

then run the tests:

```sh
$ grunt test
```