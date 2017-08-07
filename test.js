const test = require('tape')
const tapSpec = require('tap-spec')

const SliceArrayLikeIterable = require('./')

const emptySet = new Set()
const emptyMap = new Map()
const arraySet = Object.freeze([1, 2, 3, 4, 5])
const arrayMap = [['one', 1], ['two', 2], ['three', 3]]
const set = new Set(arraySet)
const map = new Map(arrayMap)

test('constructor', function (t) {
    t.test('empty set', function (st) {
        const iterable = new SliceArrayLikeIterable(emptySet)
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('non-empty set', function (st) {
        const iterable = new SliceArrayLikeIterable(set)
        st.deepEqual([...iterable], arraySet,
            'must return an iterable with the same values')
        st.end()
    })

    t.test('empty map', function (st) {
        const iterable = new SliceArrayLikeIterable(emptyMap)
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('non-empty string', function (st) {
        const iterable = new SliceArrayLikeIterable(map)
        st.deepEqual([...iterable], arrayMap,
            'must return an iterable with the same values')
        st.end()
    })

    t.end()
})

test('slice', function (t) {
    t.test('empty array', function (st) {
        const iterable = new SliceArrayLikeIterable(emptySet)
            .slice(0, 6)
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('negative start', function (st) {
        const iterable = new SliceArrayLikeIterable(map).slice(-3, 6)
        st.deepEqual([...iterable], arrayMap,
            'must be equivalent to start to 0')
        st.end()
    })
    t.test('negative end', function (st) {
        const iterable = new SliceArrayLikeIterable(set).slice(0, -6)
        st.deepEqual([...iterable], [],
            'must return empty iterable')
        st.end()
    })
    t.test('positive start and end', function (st) {
        const iterable = new SliceArrayLikeIterable(set).slice(2, 3)
        st.deepEqual([...iterable], arraySet.slice(2, 3),
            'must behave like array slice')
        st.end()
    })
    t.test('chaining', function (st) {
        const iterable = new SliceArrayLikeIterable(map) // (1 2 3 4 5)
            .slice(1, 4) // (2 3 4)
            .slice(0, 2) // (2 3)
            .slice(1, 6) // (3)
        const expected = arrayMap
            .slice(1, 4)
            .slice(0, 2)
            .slice(1, 6)
        st.deepEqual([...iterable], expected,
            'must behave like slice with positive starts and ends')
        st.end()
    })

    t.test('using intermediate iterables', function (st) {
        const intermediate = new SliceArrayLikeIterable(set)
            .slice(0, 4) // (1 2 3 4)
        const first = intermediate.slice(1, 3) // (2 3)
        const second = intermediate.slice(0, 1) // (1)
        const firstExpected = arraySet.slice(0, 4).slice(1, 3)
        const secondExpected = arraySet.slice(0, 4).slice(0, 1)
        st.deepEqual([...first], firstExpected,
            'first result must be correct')
        st.deepEqual([...second], secondExpected,
            'second result must be correct')
        st.end()
    })
    t.end()
})

test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout)
