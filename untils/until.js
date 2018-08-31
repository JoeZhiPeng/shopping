module.exports = {
  server: "https://www.test.com:8080",

  // const formatTime = date => {
  //     const year = date.getFullYear()
  //     const month = date.getMonth() + 1
  //     const day = date.getDate()
  //     const hour = date.getHours()
  //     const minute = date.getMinutes()
  //     const second = date.getSeconds()

  //     return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  // },

  // const formatNumber = n => {
  //     n = n.toString()
  //     return n[1] ? n : '0' + n
  // }

  // module.exports = {
  //     formatTime: formatTime  
  // }
  request: function (url, method, header, data, success, fail, complete) {
    wx.request({
      "url": this.server + url, //仅为示例，并非真实的接口地址
      "method": method,
      "header": header,
      "data": data,
      "success": function (res) {
        // console.log(url + ":" + JSON.stringify(res.data));
        if (success) {
          success(res);
        }
      },
      "fail": function (res) {
        if (fail) {
          fail(res);
        }
        wx.showToast({
          title: '请求超时',
          icon: 'loading',
          duration: 2000
        })
      },
      "complete": function (res) {
        if (complete) {
          complete(res);
        }
      }
    })
  },

  post: function (url, data, success, fail, complete) {
    var header = {
      'content-type': 'application/x-www-form-urlencoded'
    };
    header = this.dataAddToken(header);
    this.request(url, "POST", header, this.json2form(data), success, fail, complete);
  },

  get: function (url, data, success, fail, complete) {
    var header = {
      'content-type': 'application/json'
    };
    header = this.dataAddToken(header);
    this.request(url, "GET", header, data, success, fail, complete);
  },

  dataAddToken: function (header) {
    try {
      var value = wx.getStorageSync('token')
      if (value && value != "") {
        header["Authorization"] = "JWT " + value;
      }
      return header;
    } catch (e) {
      // Do something when catch error
    }
  },

  json2form: function (jsonobj) {
    var str = [];
    for (var p in jsonobj) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(jsonobj[p]));
    }
    return str.join("&");
  },
}