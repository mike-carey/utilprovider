# Util Provider


## Installation
```
npm install utilprovider
```

## Usage
```javascript
let options = require('utilprovider').options
let Required = options.Required

const DEFAULT_OPTIONS = {
    name: new Required('name'),
    message: "This is a default message",
    nested: {
        one: "Option One",
        two: "Option Two"
    }
}

// Missing required option
// Throws RequiredOptionError
let _ = options(DEFAULT_OPTIONS, {})  // Error: name is required

let a = options(DEFAULT_OPTIONS, {name: 'a'})
/*
 * { name: 'a',
 *  message: 'This is a default message',
 *  nested: { one: 'Option One', two: 'Option Two' } }
 */

// Only replaces the nested.b option
let b = options(DEFAULT_OPTIONS, {name: 'b', nested: {two: "b's two"}})
/*
 * { name: 'b',
 *  message: 'This is a default message',
 *  nested: { one: 'Option One', two: 'b\'s two' } }
 */
```
