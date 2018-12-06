import fetch from "isomorphic-unfetch";
import { forIn } from "lodash";
import env from "./env";
import { toast } from "react-toastify";
import { getHeaders } from "./header";
import queryString from "query-string";

const codeMessage = {
    200: "服务器成功返回请求的数据",
    201: "新建或修改数据成功。",
    202: "一个请求已经进入后台排队（异步任务）",
    204: "删除数据成功。",
    400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
    401: "用户没有权限。",
    403: "用户得到授权，但是访问是被禁止的。",
    404: "发出的请求针对的是不存在的记录，服务器没有进行操作",
    406: "请求的格式不可得。",
    410: "请求的资源被永久删除，且不会再得到的。",
    422: "当创建一个对象时，发生一个验证错误。",
    500: "服务器发生错误，请检查服务器",
    502: "网关错误",
    503: "服务不可用，服务器暂时过载或维护",
    504: "网关超时"
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    const error = new Error(errortext);
    error.statusCode = response.status;
    error.response = response;
    throw error;
}

export default function request(url, options) {
    const defaultOptions = {
        success: null,
        error: null,
        cacheErr: null,
        req: null
    };
    const mergedOptions = { ...defaultOptions, ...options };
    const { success, error, req, cacheErr } = mergedOptions;
    const headers = getHeaders(req);
    let reqOptions = { headers };
    if (mergedOptions.method === "POST") {
        reqOptions.method = "POST";
        let fm = new FormData();
        forIn(mergedOptions.body, function(value, key) {
            // console.log('value', value);
            // console.log('key', key);
            if(Array.isArray(value)){
              // delete mergedOptions.body[key];
              for (let i = 0; i < value.length; i++) {
                fm.append(`${key}[]`, value[i]);
              }
            }else{
              fm.append(key, value);
            }
        });
        reqOptions.body = fm;
    } else {
        url += "?" + queryString.stringify(mergedOptions.body);
    }
    return fetch(`${url}`, reqOptions)
        .then(checkStatus)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                if (success) {
                    success(data);
                }
            } else {
                if (error) {
                    error(data);
                }
            }
            return data;
        })
        .catch(e => {
            toast.error(e.message);
            if (cacheErr) {
                cacheErr();
            }
        });
}