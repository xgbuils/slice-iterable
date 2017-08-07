const sliceCalculator = require('slice-calculator')
const reduce = require('fn-reduce')

function descriptorsFactory (props) {
    return reduce((descriptors, prop) => {
        descriptors[prop] = {
            value: props[prop]
        }
        return descriptors
    }, {}, Object.keys(props))
}

class SliceIterable {
    constructor (iterable) {
        Object.defineProperties(this, descriptorsFactory({
            iterable,
            start: 0,
            end: Infinity
        }))
    }

    slice (start, end) {
        const props = sliceCalculator(this, start, end)
        props.iterable = this.iterable
        return Object.create(SliceIterable.prototype,
            descriptorsFactory(props))
    }

    * [Symbol.iterator] () {
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

module.exports = SliceIterable
