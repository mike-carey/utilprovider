/**
 * Tests the Directory class
 */

'use strict'

const assert = require('chai').assert

const options = require('../lib/options')
const Required = options.Required
const RequiredOptionError = options.RequiredOptionError

describe('options module', () => {


    it('should default unprovided options', () => {
        let skel = {
            foo: 'bar'
        }
        let opts = options(skel, {})

        assert.equal(opts.foo, 'bar', "Did not default unprovided option")
    })

    it('should throw error when a Required value is present and not provided', () => {
        let skel = {
            foo: new Required('foo')
        }

        assert.throws(() => {
            options(skel, {})
        })
    })

    it('Should not throw error when a Required value is present but provided', () => {
        let skel = {
            foo: new Required('foo')
        }

        assert.doesNotThrow(() => {
            options(skel, {foo: 'baz'})
        })
    })

    describe('Required class', () => {

        it('can be constructed', () => {
            let required = new Required()

            assert.instanceOf(required, Required)

            assert.isUndefined(required.name, "Did not let name be undefined")
            assert.deepEqual(required.options, {}, "Did not default options to an empty object-literal")

            required = new Required('name')

            assert.equal(required.name, 'name', "Did not set the name field properly")

            let opts = {foo: 'bar'}

            required = new Required('name', opts)

            assert.deepEqual(required.options, opts, "Did not set options properly")
        })

        it('can create an error', () => {
            let required = new Required('name')

            assert.instanceOf(required.error, RequiredOptionError)
        })

    })

    describe('RequiredOptionError class', () => {

        it('can be constructed', () => {
            let error = new RequiredOptionError()

            assert.instanceOf(error, RequiredOptionError)
        })

    })

})