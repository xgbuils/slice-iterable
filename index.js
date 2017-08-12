class SliceIterable {
    constructor (iterable) {
        this.iterable = iterable
        this.start = 0
        this.end = Infinity
    }

    slice (start, end) {
        start = Math.max(start, 0)
        const newEnd = Math.min(this.start + end, this.end)
        if (start === 0 && newEnd === this.end) {
            return this
        }
        const obj = Object.create(SliceIterable.prototype)
        obj.start = this.start + start
        obj.end = newEnd
        obj.iterable = this.iterable
        return obj
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
