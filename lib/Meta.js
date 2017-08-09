/**
 * @module Meta
 * @description A base object for extending that handles common object methods and properties
 *
 * @author Mike Carey <michael.r.carey@att.net>
 */

'use strict'

const _ = require('underscore')
const _options = require('./options')


class Meta {

    /**
     * Returns only the required options
     *
     * @return {Required[]}
     */
    get __required__() {
        let required = []
        _.each(this.__defaults__, (value, key) => {
            if (value instanceof _options.Required) {
                required.push(value)
            }
        })

        return required
    }

    /**
     * The default options that can be provided
     *
     * @type {Object}
     */
    get __defaults__() {
        return {}
    }

    /**
     * Uses the __defaults__ meta to set the default options and check for required options
     *
     * @param  {Object} options Options to be set on the object
     *
     * @constructor
     */
    constructor(options) {
        _options.bind(this)(this.__defaults__, options)
    }

}

exports = module.exports = Meta