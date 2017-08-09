/**
 * @module options
 * @description
 *
 * @author Mike Carey <michael.r.carey@att.net>
 */

'use strict'

const _ = require('underscore')
const debug = require('debug')('dataprovider:utils')

/**
 * A class to represent
 * @type {[type]}
 */
class Required {
    /**
     * @param  {String} name    The name of the field that is to be provided
     * @param  {Object} options Extra options to provide to the object
     *
     * @constructor
     */
    constructor(name, options) {
        this.name = name
        this.options = options || {}
    }

    /**
     * Returns an instance of an error to be thrown by the function that has been offended
     *
     * @return {RequiredOptionError}
     */
    get error() {
        return new RequiredOptionError(this.name ? this.name + " is required" : "A required option has not been provided")
    }
}

/**
 * An error class to indicate that a required option has not been provided
 */
class RequiredOptionError extends Error {}

/**
 * Verifies and defaults options for an object or function allowing instances of this to be set
 *
 * @param       {Object} skeleton A skeleton of what `this` should receive with defaults
 * @param       {Object} provided The actual provided options
 *
 * @return      {Object}          The modifed object.  If `this` was bound to the function, `this` will be returned; otherwise, an object-literal that was created will be returned
 */
function options(skeleton, provided) {
    skeleton = skeleton || {}
    provided = provided || {}

    let self = this || {}

    _.each(skeleton, (value, name) => {
        if (_.isObject(value) && !_.isArray(value) && !(value instanceof Required)) {
            debug("Nested option for %s", name)
            self[name] = options.bind({})(value, provided[name])
        } else {
            if (!provided.hasOwnProperty(name)) {
                if (value instanceof Required) {
                    debug("%s is required but not provided", name)
                    throw value.error
                }

                debug("Setting skeleton option for %s", name)
                self[name] = skeleton[name]
            } else {
                debug("Found an option for %s", name)
                self[name] = provided[name]
            }
        }
    })

    return self
}

/* Attach the classes used by this function. */
options.Required = Required
options.RequiredOptionError = RequiredOptionError

exports = module.exports = options