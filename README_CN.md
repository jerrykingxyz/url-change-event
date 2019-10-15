# url-change-event
监听url改变 & 阻止url改变

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
* ```oldURL``` - 变化前的URL, 值为 __string__
* ```nowURL``` - 变化后的URL, 值为 __string__ 或 __undefined__，当event.action为 __beforeunload__ 时，此项值为 __undefined__
* ```action``` - 导致URL改变的操作, 值为 [***pushState*** | ***replaceState*** |***popstate*** | ***beforeunload***]

方法
* ```preventDefault``` - 阻止URL改变

## License
MIT licensed
