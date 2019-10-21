/**
 * js-toolkits v1.0.1
 * (c) 2019-2019 weijhfly https://github.com/weijhfly/js-toolkits
 * Licensed under MIT
 * Released on: oct 21, 2019
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.tks = factory());
}(this, function () { 'use strict';

    /**
     * storage-util v1.0.3
     * (c) 2019-2019 weijhfly https://github.com/weijhfly/js-utils
     * Licensed under MIT
     */

    var StorageUtil = /** @class */ (function () {
        function StorageUtil(type, callback) {
            this.type = type ? type : 'sessionStorage';
            this.success = typeof callback === 'object' ? callback.success : function () { };
            this.fail = typeof callback === 'object' ? callback.fail : function () { };
        }
        StorageUtil.prototype.isSupport = function () {
            return this.isCookie() ? document.cookie && navigator.cookieEnabled : typeof window[this.type] != 'undefined';
        };
        StorageUtil.prototype.get = function (key, callback) {
            try {
                var obj = key.split(','), res = this.master(obj, 'get');
                if (callback) {
                    callback.apply(this, res);
                    return this;
                }
                else {
                    return obj.length > 1 ? res : res[0] || null;
                }
            }
            catch (e) {
                console.error(e);
                return null;
            }
        };
        StorageUtil.prototype.set = function (key, value, time) {
            try {
                var obj = {};
                if (typeof key != 'object') {
                    obj[key] = value;
                }
                else {
                    time = value;
                    obj = key;
                }
                this.master(obj, 'set', time);
                this.success();
            }
            catch (e) {
                console.error(e);
                this.fail();
            }
            return this;
        };
        StorageUtil.prototype.remove = function (key) {
            try {
                var obj = key.split(',');
                this.master(obj, 'remove');
            }
            catch (e) {
                console.error(e);
            }
            return this;
        };
        StorageUtil.prototype.setType = function (type) {
            this.type = type || 'sessionStorage';
            return this;
        };
        StorageUtil.prototype.master = function (obj, flag, time) {
            var result = [], isCookie = this.isCookie(), _this = this;
            if (flag == 'get') {
                for (var o in obj) {
                    get(obj[o]);
                }
                return result;
            }
            else if (flag == 'set') {
                for (var o in obj) {
                    set(o, obj[o], time);
                }
            }
            else if (flag == 'remove') {
                for (var o in obj) {
                    remove(obj[o]);
                }
            }
            function get(key) {
                if (isCookie) {
                    var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)"), arr = document.cookie.match(reg), value = arr ? unescape(arr[2]) : null;
                    result.push(_this.isJson(value) || value);
                }
                else {
                    var value = window[_this.type][key];
                    result.push(_this.isJson(value) || value);
                }
            }
            function set(key, value, time) {
                var value = typeof value == 'object' ? JSON.stringify(value) : value;
                if (isCookie) {
                    time = time || 2 * 60 * 60 * 1000;
                    var date = new Date();
                    date.setTime(date.getTime() + time);
                    document.cookie = key + "=" + escape(value) + ";expires=" + date.toUTCString();
                }
                else {
                    window[_this.type][key] = value;
                }
            }
            function remove(key) {
                if (isCookie) {
                    var date = new Date(), value = _this.get(key);
                    date.setTime(date.getTime() - 1);
                    if (value != null)
                        document.cookie = key + "=" + value + ";expires=" + date.toUTCString();
                }
                else {
                    delete window[_this.type][key];
                }
            }
        };
        StorageUtil.prototype.isJson = function (str) {
            var data;
            try {
                data = JSON.parse(str);
            }
            catch (e) {
                return false;
            }
            return data;
        };
        StorageUtil.prototype.isCookie = function () {
            return this.type === 'cookie';
        };
        return StorageUtil;
    }());

    var isFunction = function (obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };
    var isWindow = function (obj) {
        return obj != null && obj === obj.window;
    };
    var isArrayLike = function (obj) {
        var length = !!obj && "length" in obj && obj.length;
        if (isFunction(obj) || isWindow(obj)) {
            return false;
        }
        return toString.call(obj) === "[object Array]" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    };
    var toolkits = {
        /**
         * trim 字符串去除空格
         * @param str {String} 需要处理的字符串
         * @param type {Boolean} 是否去除所有空格
         */
        trim: function (str, type) {
            return type ? str.replace(/\s+/g, '') : str.replace(/^\s+|\s+$/g, '');
        },
        /**
         * each 遍历数组及对象
         * @param obj {Object|Array} 遍历对象
         * @param callback {Function} 回调函数，第一个参数为val，第二个为key，这里与jquery相反
         */
        each: function (obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], obj[i], i) === false) {
                        break;
                    }
                }
            }
            else {
                for (i in obj) {
                    if (callback.call(obj[i], obj[i], i) === false) {
                        break;
                    }
                }
            }
            return obj;
        },
        /**
         * get 获取url参数
         * @param 参数为空时，获取当前url所有参数；
         * @param 参数为1个时，获取当前url的指定参数；
         * @param 参数为2个且第二个参数不为true时，获取指定url的指定参数；
         * @param 参数为2个且第二个参数为true时，获取指定url的所有参数；
         */
        get: function () {
            var args = arguments, len = args.length, url;
            if (len == 1 || len == 0) {
                url = location.search;
            }
            else {
                url = args[0];
            }
            url = url.substring(url.indexOf('?') + 1);
            var arr = url.split('&'), obj = {};
            this.each(arr, function (v, i) {
                if (v.indexOf('=') != -1) {
                    var arg = v.split('='), key = decodeURIComponent(arg[0]), val = decodeURIComponent(arg[1]);
                    obj[key] = val;
                }
            });
            return len == 1 || (len == 2 && args[1] !== true) ? obj[len == 1 ? args[0] : args[1]] || '' : obj;
        },
        /**
         * param 对象转url参数
         * @param obj {Object|Array} 需要转换的对象
         */
        param: function (obj) {
            var arr = [];
            this.each(obj, function (v, i) {
                v = encodeURIComponent(v == null ? "" : v);
                i = encodeURIComponent(i);
                arr.push(i + "=" + v);
            });
            return arr.join('&');
        },
        /**
         * test 常用字符串检测
         * @param type {String} 类型
         * @param str {String} 需要检测的字符串
         */
        test: function (type, str) {
            switch (type) {
                case 'phone':
                    return /^1[3456789]\d{9}$/.test(str);
                case 'email':
                    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
                case 'json':
                    if (typeof str != 'string') {
                        return false;
                    }
                    try {
                        JSON.parse(str);
                        return true;
                    }
                    catch (e) {
                        return false;
                    }
                default:
                    return false;
            }
        },
        /**
         * storage 操作sessionStorage、localStorage、cookie
         * 这里使用了作者的另外一个小插件，具体请参考https://github.com/weijhfly/js-utils/tree/master/storage-util
         * @param type {String} 类型(默认sessionStorage)，其他localStorage、cookie
         */
        storage: function (type) {
            return new StorageUtil(type);
        },
        //数组中最小数值
        min: function (arr) {
            return Math.min.apply(null, arr);
        },
        //数组中最大数值
        max: function (arr) {
            return Math.max.apply(null, arr);
        },
        /**
         * sort 数组sort方法的修复版，支持升序降序
         * @param arr {Array} 数组
         * @param type {Boolean} 非false、0、''、null、undefined开启降序
         */
        sort: function (arr, type) {
            return arr.sort(function (v1, v2) {
                if (v1 < v2) {
                    return type ? 1 : -1;
                }
                else if (v1 > v2) {
                    return type ? -1 : 1;
                }
                else {
                    return 0;
                }
            });
        }
    };

    return toolkits;

}));
