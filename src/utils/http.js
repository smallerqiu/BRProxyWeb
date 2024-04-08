/**
 * Qiu
 */
// import FileSaver from 'file-saver';
// const XLSX = require('xlsx');
import { Notice } from "kui-vue";
const http = {
  _maps: {},
  cancel: function () {
    for (const id in this._maps) {
      this._maps[id].abort();
      delete this._maps[id]
    }
  },
};
const filter_null = (obj) => {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    }
  }
  return obj
}
http._base = (method, url, data) => {
  const controller = new AbortController();
  const key = Date.now() * 1
  http._maps[key] = controller
  return new Promise((res, rej) => {
    let options = { method: method, signal: controller.signal, headers: {} }
    if (url.indexOf('/es') >= 0) {
      options.headers.Authorization = 'Basic ' + btoa('fb_guest:Fb@123_guest')
    } else if (url.indexOf('/api') >= 0) {

    } else {
      url = process.env.VUE_APP_BASE_API + url
    }
    // url = ((url.indexOf('/api') < 0 || url.indexOf('/es') < 0) ? process.env.VUE_APP_BASE_API : '') + url
    if (method == 'post' || method == 'put') {
      if (data instanceof FormData) {
        options.body = data
      } else if (typeof data === 'object' || Array.isArray(data)) {
        options.headers["Content-Type"] = "application/json"
        options.body = JSON.stringify(data)
      } else {
        options.body = data
      }
    } else {
      if (data) {
        let obj = filter_null(data)
        // console.log(obj)
        let { search } = new URL('https://' + url);
        url += (search ? '&' : '?') + new URLSearchParams(obj).toString()
      }
    }
    fetch(url, options).then(r => {
      // console.log(r)
      if (r.ok) {
        return r.json()
      } else {
        throw new Error(r.statusText)
      }
    }).then((data) => {
      res(data)
    }).catch(err => {
      // console.log(err)
      Notice.destroy()
      Notice.error({ title: '提示', content: err.message || 'Internal Server Error' })
      rej(err)
    }).finally(() => {
      delete http._maps[key]
    })
  })
};


['get', 'post', 'put', 'delete'].forEach(m => {
  http[m] = (url, data) => http._base(m, url, data)
});

export default http