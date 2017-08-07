# slice-iterable

[![travis ci][1]][2]
[![npm version][3]][4]
[![Coverage Status][5]][6]
[![Dependency Status][7]][8]

`slice-iterable` exports a class that builds iterables that provide slice method.

## Install

``` bash
$ npm install slice-iterable --save
```

## Usage
``` JavaScript
const SliceIterable = require('slice-iterable')

const iterable = new SliceIterable(new Set([4, 2, 7, 8, 4, 7])) // (4 2 7 8 4 7)
    .slice(0, 5) // (4 2 7 8 7)
    .slice(2, 5) // (7 8 7)
    .slice(1, 2) // (8)

// converting to array:
[...iterable] // [8]

// traversing values:
for (const val of iterable) {
    // ...
}

// creating an iterator that traverses the values
let iterator = iterable[Symbol.iterator]()
iterator.next() // {value: 8, done: false}
iterator.next() // {value: undefined, done: true}

// Infinite iterable
const naturals = {
    [Symbol.iterator]: function* () {
        let i = 1
        while(true) { yield i++ }
    }
} // (1 2 3 4...)

new SliceIterable(naturals) // (1 2 3 4 5 6 7 8 9...)
    .slice(3, 8) // (4 5 6 7 8)
```

## Support
- Node.js >=6
- ES2015 transpilers

## License
MIT

  [1]: https://travis-ci.org/xgbuils/slice-iterable.svg?branch=master
  [2]: https://travis-ci.org/xgbuils/slice-iterable
  [3]: https://badge.fury.io/js/slice-iterable.svg
  [4]: https://badge.fury.io/js/slice-iterable
  [5]: https://coveralls.io/repos/github/xgbuils/slice-iterable/badge.svg?branch=master
  [6]: https://coveralls.io/github/xgbuils/slice-iterable?branch=master
  [7]: https://david-dm.org/xgbuils/slice-iterable.svg
  [8]: https://david-dm.org/xgbuils/slice-iterable
