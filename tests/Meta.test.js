/**
 * Tests the Directory class
 */

'use strict'

const assert = require('chai').assert

const Meta = require('../lib/Meta')


describe('Meta module', () => {

    it('should be extendable', () => {
        class TestObject extends Meta {}

        assert.isDefined(new TestObject())
    })

    it('should handle the options calling', () => {
        class TestObject extends Meta {
            get __defaults__() {
                return {name: 'default'}
            }
        }

        let obj = new TestObject()

        assert.equal(obj.name, 'default', "Did not set the default option")

        obj = new TestObject({
            name: 'name'
        })

        assert.equal(obj.name, 'name', "Did not allow option to be overriden")
    })

})