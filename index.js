const slice = require('slice-iterable-method')

function SliceIterable (iterable) {
    this.iterable = iterable
    this.start = 0
    this.end = Infinity
}

Object.defineProperties(SliceIterable.prototype, {
    slice: {
        value: slice
    },
    [Symbol.iterator]: {
        * value () {
            const iterator = this.iterable[Symbol.iterator]()
            const end = this.end
            const start = this.start
            for (let i = 0; i < end; ++i) {
                const {value, done} = iterator.next()
                if (done) {
                    return
                } else if (i >= start) {
                    yield value
                }
            }
        }
    }
})

module.exports = SliceIterable
