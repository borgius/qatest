# Codeceptjs Multi-Browser Demo
this demo shows some issues I found using the fancy multi-browser feature:

- [ ] safari instances stay open after testrun
- [ ] first resolution in browser/resolution combination will overwrite all other resolutions for that browser. E.g. using a array of [chrome / maximum] and [chrome / 1024] will end up in 2 tests with chrome/maximum (and 'maximum' will be used in both folder-names).


## My Setup

* Install latest version of NodeJs
```sh
npm i -g n && n latest
```
* Update Java http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
* selenium server standalone 3.3.1
```sh
npm install selenium-standalone@latest -g
selenium-standalone install
# run in new console
selenium-standalone start 
```
* codeceptjs@0.6.3 (global install)
```sh
npm i -g codeceptjs
```
* webdriverio@4.7.1 (global install)
```sh
npm i -g webdriverio
```
* npm@4.5.0

## Running the Demo
```sh
codeceptjs run --steps
codeceptjs run-multiple basic --steps
```
