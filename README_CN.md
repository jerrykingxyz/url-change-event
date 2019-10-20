# url-change-event
监听和控制URL的更改事件

## 安装
你可以通过 ```npm install url-change-event``` 引入
```javascript
    /* in ES 5 */
    require('url-change-event')
    /* in ES 6 */
    import 'url-change-event'
```
或者
```html
    <script src="url-change-event.js"></script>
```
> 因为复写了部分history函数，所以你应该在你的代码前引入此库。

## 使用
```javascript
window.addEventlistener('urlchangeevent', function(e) {
    // your code here
})
```
### UrlChangeEvent 实例
属性
* ```oldURL``` {__string__} - 变化前的URL。
* ```nowURL``` {__string__} - 变化后的URL。 __WARNING:__ 当event.action为 __beforeunload__ 时，此项值为空字符串。
* ```action``` {[pushState|replaceState|popstate|beforeunload]} - 导致URL改变的操作。

方法
* ```preventDefault``` - 阻止URL改变

## License
MIT licensed
