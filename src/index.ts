import StorageUtil from '../node_modules/storage-util/dist/storage-util.es';

let isFunction = (obj: any) => {
	return typeof obj === "function" && typeof obj.nodeType !== "number";
}
let isWindow = (obj: any) => {
	return obj != null && obj === obj.window;
}
let isArrayLike = (obj: any) => {
	let length = !!obj && "length" in obj && obj.length;

	if (isFunction(obj) || isWindow(obj)) {
		return false;
	}

	return toString.call(obj) === "[object Array]" || length === 0 ||
		typeof length === "number" && length > 0 && (length - 1) in obj;
};

let toolkits = {
	/**
	 * trim 字符串去除空格
	 * @param str {String} 需要处理的字符串
	 * @param type {Boolean} 是否去除所有空格
	 */
	trim(str: string, type: Boolean): string {
		return type ? str.replace(/\s+/g, '') : str.replace(/^\s+|\s+$/g, '');
	},
	/**
	 * each 遍历数组及对象
	 * @param obj {Object|Array} 遍历对象
	 * @param callback {Function} 回调函数，第一个参数为val，第二个为key，这里与jquery相反
	 */
	each(obj: Array<any>, callback: Function): Array<any> {
		let length: number,
			i: number | string = 0;

		if (isArrayLike(obj)) {
			length = obj.length;
			for (; i < length; i++) {
				if (callback.call(obj[i], obj[i], i) === false) {
					break;
				}
			}
		} else {
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
	get(): string | Object {
		let args = arguments,
			len = args.length,
			url: string;

		if (len == 1 || len == 0) {
			url = location.search;
		} else {
			url = args[0];
		}
		url = url.substring(url.indexOf('?') + 1);
		let arr = url.split('&'),
			obj: string | Object = {};

		this.each(arr, (v, i) => {
			if (v.indexOf('=') != -1) {
				let arg = v.split('='),
					key = decodeURIComponent(arg[0]),
					val = decodeURIComponent(arg[1]);

				obj[key] = val;
			}
		})

		return len == 1 || (len == 2 && args[1] !== true) ? obj[len == 1 ? args[0] : args[1]] || '' : obj;
	},
	/**
	 * param 对象转url参数
	 * @param obj {Object|Array} 需要转换的对象
	 */
	param(obj: Object): string {
		let arr = [];

		this.each(obj, (v, i) => {
			v = encodeURIComponent(v == null ? "" : v);
			i = encodeURIComponent(i);

			arr.push(`${i}=${v}`);
		})

		return arr.join('&');
	},
	/**
	 * test 常用字符串检测
	 * @param type {String} 类型
	 * @param str {String} 需要检测的字符串
	 */
	test(type: string, str: string): Boolean {
		switch (type) {
			case 'phone':
				return /^1[3456789]\d{9}$/.test(str);
			case 'email':
				return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
			case 'json':
				if (typeof str != 'string') { return false; }

				try {
					JSON.parse(str);
					return true;
				} catch (e) {
					return false;
				}
			default:
				return false;
		}
	},
	/**
	 * storage 操作sessionStorage、localStorage、cookie
	 * 这里使用了作者的另外一个小插件，具体请参考https://github.com/weijhfly/js-utils/tree/master/storage-util
	 * @param type {String|Number} 类型(默认sessionStorage 0)，其他localStorage 1、cookie 2
	 */
	storage(type: string) {
		return new StorageUtil(type);
	},
	//数组中最小数值
	min(arr: Array<number>): number {
		return Math.min.apply(null, arr);
	},
	//数组中最大数值
	max(arr: Array<number>): number {
		return Math.max.apply(null, arr);
	},
	/**
	 * sort 数组sort方法的修复版，支持升序降序
	 * @param arr {Array} 数组
	 * @param type {Boolean} 非false、0、''、null、undefined开启降序
	 */
	sort(arr: Array<number>, type: Boolean): Array<number> {
		return arr.sort((v1, v2) => {
			if (v1 < v2) {
				return type ? 1 : -1;
			} else if (v1 > v2) {
				return type ? -1 : 1;
			} else {
				return 0;
			}
		})
	}
}
export default toolkits;