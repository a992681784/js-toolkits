# js-toolkits [![NPM Version][npm-image]][npm-url] [![NPM Downloads][downloads-image]][downloads-url] [![size-image]][size-url]

[size-image]: https://badgen.net/bundlephobia/minzip/js-toolkits
[size-url]: https://bundlephobia.com/result?p=js-toolkits
[npm-image]: https://badgen.net/npm/v/js-toolkits
[npm-url]: https://npmjs.org/package/js-toolkits
[downloads-image]: https://badgen.net/npm/dt/js-toolkits
[downloads-url]: https://npmjs.org/package/js-toolkits
一个封装获取url参数，手机号、邮箱正则检测，sessionStorage、localStorage、cookie操作等常用方法的js工具库
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
storage| 操作sessionStorage、<br>localStorage、cookie|@param type {String\|Number} 类型(默认sessionStorage 0)，其他localStorage 1、cookie 2 这里使用了作者的另外一个小插件，具体请参考https://github.com/weijhfly/js-utils/tree/master/storage-util
min|数组最小值|@param arr {Array} 数组
max|数组最大值|@param arr {Array} 数组
sort|数组升降排序|@param arr {Array} 数组<br>@param type {Boolean} 非false、0、''、null、undefined开启降序

## 代码示例
```js
/**
 * trim 字符串去除空格
 * @param str {String} 需要处理的字符串
 * @param type {Boolean} 是否去除所有空格
 */
console.log('trim-----------');

let str1 = tks.trim(' trim ');
let str2 = tks.trim(' trim test ',true);

console.log(str1);
console.log(str2);

/**
 * each 遍历数组及对象
 * @param obj {Object|Array} 遍历对象
 * @param callback {Function} 回调函数，第一个参数为val，第二个为key，这里与jquery相反
 */
console.log('each-----------');

tks.each({aa:1, bb:2, cc:3},(v,i) => {
    console.log(v,i);
})
tks.each([1,3,5,7,9],(v,i) => {
    console.log(v,i);
})

/**
 * param 对象转url参数
 * @param obj {Object|Array} 需要转换的对象
 */
console.log('param-----------');

let p = tks.param({name:'li', age:18});

console.log(p);

/**
 * get 获取url参数
 * @param 参数为空时，获取当前url所有参数；
 * @param 参数为1个时，获取当前url的指定参数；
 * @param 参数为2个且第二个参数不为true时，获取指定url的指定参数；
 * @param 参数为2个且第二个参数为true时，获取指定url的所有参数；
 */
console.log('get-----------');

let arg1 = tks.get();//所有参数
let arg2 = tks.get('name');//指定参数
let arg3 = tks.get('www.baidu.com?xx=1','xx');//指定url，指定参数
let arg4 = tks.get('www.baidu.com?xx=1&yy=2&zz=3',true);//指定url，所有参数

console.log(arg1);
console.log(arg2);
console.log(arg3);
console.log(arg4);

/**
 * test 常用字符串检测
 * @param type {String} 类型
 * @param str {String} 需要检测的字符串
 */
console.log('test-----------');

let test1 = tks.test('phone','18888888888');
let test2 = tks.test('phone','123456');
let test3 = tks.test('email','123456com');
let test4 = tks.test('email','123456@qq.com');

console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);

/**
 * storage 操作sessionStorage、localStorage、cookie
 * 这里使用了作者的另外一个小插件，具体请参考https://github.com/weijhfly/js-utils/tree/master/storage-util
 * @param type {String|Number} 类型(默认sessionStorage 0)，其他localStorage 1、cookie 2
 */
console.log('storage-----------');

//注：Chrome不支持本地html设置cookie
tks.storage().set('msg','你翩翩地路过，').get('msg',function(msg){
    console.log(msg);
}).setType(1).set('msg','以为不曾留下什么，').get('msg',function(msg){
    console.log(msg);
}).setType(2).set('msg','却在我心里有了思念，').get('msg',function(msg){
    console.log(msg);
}).setType().set('msg','若你还记得，').get('msg',function(msg){
    console.log(msg);
}).setType(1).set('msg','那个蝉鸣的夏天，').get('msg',function(msg){
    console.log(msg);
}).setType(2).set('msg','有一个你，也有一个我。').get('msg',function(msg){
    console.log(msg);
})

/*
*	数组最小最大数值
*/
console.log('min max-----------');
let min = tks.min([1,3,5,7,9]);
let max = tks.max([2,4,6,8,10]);

console.log(min,max);

/**
 * sort 数组sort方法的修复版，支持升序降序
 * @param arr {Array} 数组
 * @param type {Boolean} 非false、0、''、null、undefined开启降序
 */
console.log('sort-----------');

let sort1 = [0,1,5,10,15].sort();
let sort2 = tks.sort([0,1,5,10,15]);
let sort3 = tks.sort([0,1,5,10,15],true);

console.log(sort1);
console.log(sort2);
console.log(sort3);
```

## License

MIT