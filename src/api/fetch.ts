// 对fetch进行二次封装
import qs from 'qs';

const { stringify, parse } = qs;
const baseUrl = process.env.baseUrl || "http://localhost:3001";

const checkStatus = (res: { status: number; statusText: string | undefined; }) => {
  if (200 <= res.status && res.status < 300) {
    return res;
  }
  console.log(`网络请求失败,${res.status}`);
  const error: any = new Error(res.statusText);
  error.response = error;
  throw error;
};

/**
 *  捕获成功登录过期状态码等
 * @param res
 * @returns {*}
 */
const judgeOkState = async (res: { clone: () => { (): any; new(): any; json: { (): any; new(): any; }; }; }) => {
  const cloneRes = await res.clone().json(); 
  
  //TODO:可以在这里管控全局请求
  if (!!cloneRes.code && cloneRes.code !== 200) {
    console.log(`11${cloneRes.msg}${cloneRes.code}`);
  }
  return res;
};

/**
 * 捕获失败
 * @param error
 */
const handleError = (error: any) => {
  if (error instanceof TypeError) {
    console.log(`网络请求失败啦！${error}`);
  }
  return {   //防止页面崩溃，因为每个接口都有判断res.code以及data
    code: -1,
    data: false,
  };
};

class FetchRequest {
  static async staticFetch(url: string, options: any = {}) {
    const _url = url.startsWith('http') ? url : `${baseUrl}${url}`; 
    const defaultOptions: any = {
      /*允许携带cookies*/
      // credentials: 'include',
      /*允许跨域**/
      mode: 'cors',
      cache: 'no-store',
      headers: {
        token: null,
        Authorization: null,
        // 当请求方法是POST，如果不指定content-type是其他类型的话，默认为如下，要求参数传递样式为 key1=value1&key2=value2，但实际场景以json为多
        // 'content-type': 'application/x-www-form-urlencoded',
      },
    }
    if (options.method === 'POST' || 'PUT') {
      defaultOptions.headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    const newOptions = {
      ...defaultOptions,
      ...options,
    }
    return fetch(_url, newOptions)
      .then(checkStatus)
      .then(judgeOkState as any)
      .then((res: any) => res.json())
      .catch(handleError);
  }

  /**
   *post请求方式
   * @param url
   * @returns {Promise<unknown>}
   */
   post(url: string, params = {}, option = {}) {
    console.log('打印baseUrl', baseUrl);
    const options: any = Object.assign({
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    }, option);
    //一般我们常用场景用的是json，所以需要在headers加Content-Type类型
    options.body = JSON.stringify(params);

    //可以是上传键值对形式，也可以是文件，使用append创造键值对数据
    if (options.type === 'FormData' && options.body !== 'undefined') {
      let params = new FormData();
      for (let key of Object.keys(options.body)) {
        params.append(key, options.body[key]);
      }
      options.body = params;
    }
    return FetchRequest.staticFetch(url, options); //类的静态方法只能通过类本身调用
  }

  /**
   * put方法
   * @param url
   * @returns {Promise<unknown>}
   */
  patch(url: string, params = {}, option = {}) {
    const options: any = Object.assign({
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      }
    }, option);
    options.body = JSON.stringify(params);
    return FetchRequest.staticFetch(url, options); //类的静态方法只能通过类本身调用
  }

  /**
   * get请求方式
   * @param url
   * @param option
   */
  get(url: string, option = {}) {
    const options = Object.assign({ method: 'GET' }, option);
    return FetchRequest.staticFetch(url, options);
  }
}

const requestFun = new FetchRequest();
export const {post, get, patch} = requestFun;
export default requestFun;