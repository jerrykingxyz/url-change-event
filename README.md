# url-change-event
listen url change & prevent it
[中文](README_CN.md)

## Installation
you can install with ```npm install url-change-event```
```javascript
    /* in ES 5 */
    require('url-change-event')
    /* in ES 6 */
    import 'url-change-event'
```
or
```html
    <script src="url-change-event.js"></script>
```
> Due to override some history method, you should import this lib before your code.

## Usage
```javascript
window.addEventlistener('urlchangeevent', function(e) {
    // your code here
})
```
### UrlChangeEvent instance
Properties
* ```oldURL``` - the url before change, and value is __string__
* ```nowURL``` - the url after change, and value is __string__ or __undefined__, when event.action is __beforeunload__ this value is __undefined__
* ```action``` - the action that causes the url to change, and value in [***pushState*** | ***replaceState*** |***popstate*** | ***beforeunload***]

Method
* ```preventDefault``` - prevent url change

## License
MIT licensed
