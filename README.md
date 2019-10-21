# js-toolkits [![NPM Version][npm-image]][npm-url] [![NPM Downloads][downloads-image]][downloads-url] [![size-image]][size-url]

[size-image]: https://badgen.net/bundlephobia/minzip/js-toolkits
[size-url]: https://bundlephobia.com/result?p=js-toolkits
[npm-image]: https://badgen.net/npm/v/js-toolkits
[npm-url]: https://npmjs.org/package/js-toolkits
[downloads-image]: https://badgen.net/npm/dt/js-toolkits
[downloads-url]: https://npmjs.org/package/js-toolkits
一个封装获取url参数，手机号、邮箱正则检测，sessionStorage、localStorage、cookie操作等常用方法小插件
## 使用方式
注：为简化操作，默认命名为"tks"

```js
npm install --save js-tookits
```

### es6
```js
import tks from 'js-tookits'
tks.trim('test')
```
### commonJS
```js
var tks = require('js-tookits');
tks.trim('test')
```
### amd
```js
require(['js-tookits'],function(tks){
 tks.trim('test')
})
```
### cmd
```js
seajs.use('js-tookits',function(undefined){
    //插件没有遵循cmd规范，这里的tks是全局的
    tks.trim('test')
});
```
### 直接引入
```js
<script src="js-toolkits.min.js"></script>
tks.trim('test')
```
## 方法说明
方法名|用途|描述
---|:-:|---
trim|字符串去空格|@param str {String} 需要处理的字符串<br>@param type {Boolean} 是否去除所有空格
each|遍历数值、对象|@param obj {Object\|Array} 遍历对象<br>@param callback {Function} 回调函数，第一个参数为val，第二个为key，这里与jquery相反
param|对象转url参数|@param obj {Object\|Array} 需要转换的对象
get|获取url参数|@param 参数为空时，获取当前url所有参数；<br>@param 参数为1个时，获取当前url的指定参数；<br>@param 参数为2个且第二个参数不为true时，获取指定url的指定参数；<br>@param 参数为2个且第二个参数为true时，获取指定url的所有参数；
test|常用字符串检测|@param type {String} 类型<br>@param str {String} 需要检测的字符串
storage| 操作sessionStorage、<br>localStorage、cookie|@param type {String} 类型(默认sessionStorage)，其他localStorage、cookie<br>这里使用了作者的另外一个小插件，具体请参考https://github.com/weijhfly/js-utils/tree/master/storage-util
min|数组最小值|@param arr {Array} 数组
max|数组最大值|@param arr {Array} 数组
sort|数值升降排序|@param arr {Array} 数组<br>@param type {Boolean} 非false、0、''、null、undefined开启降序

## 代码示例
请参考src/dist index.html
## License

MIT