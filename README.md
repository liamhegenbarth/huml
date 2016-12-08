
# Huml

A simple markup language designed for non-developers to easily create and update config files. 

This module parses Huml into a JSON object.


## Syntax

Based on a natural list writing syntax, subtle differentiation generates Arrays and Objects, something which non-developers should not be expected to know.

Every value in Huml is defined with a starting `-`  to denote a list item.


### Key Value

Defined by starting `-`  character and must contain a `:`  to associate a value. 

Strings can be passed without inverted comma definitions, e.g, `this is a string`  not `'this is a string'` 


### Array

Defined by a Key Value, follow by a list of keys only, starting with `-`  and no `:`  to associate values.


### Object

Defined by a Key Value, follow by a list of keys with values, starting with `-`  and containing a  `:`  to associate values.


### Boolean

Automatically recognised if value is only  `true` or `false` .


### Integer/Float

Automatically recognised if value is only an `integer`  or `float` .


## Example Syntax

```markdown
#! data.huml
- huml : is a markup language
- lang : is easy
- reasons :
    - simple
    - natural
    - obvious
- therefore :
    - developers : true
    - non-developers : true
    - dogs : false
- difficulty : no way, this is super easy!
```


## Example Usage

```javascript
// index.js
const huml = require('huml');
const read = require('fs').readFile;

read('./path/to/data.huml', (err, data) => {

  if ( err )
  {
    throw err;
  }
  
  const config = huml(data);
  console.log(config);
  
});
```
