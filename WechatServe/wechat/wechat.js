const sha1 = require("sha1");
const http = require("http");
const https = require("https");

let wechat = function(config) {
  console.log("config: ", config);
  // 拿出配置文件里面的内容
  this.token = config.token;
  this.appID = config.appID;
  this.appsecret = config.appsecret;

  //鉴权

  wechat.prototype.auth = function(ctx) {
    let that = this;

    // 解析微信服务的请求query
    const { query } = ctx;

    // 微信加密签名
    let signature = query.signature;
    // 时间戳
    let timestamp = query.timestamp;
    // 随机数
    let nonce = query.nonce;
    // 随机字符串
    let echostr = query.echostr;

    //验证

    let arr = [that.token, timestamp, nonce];
    let str = arr.sort().join("");

    //加密
    const resultCode = sha1(str);

    if (resultCode === signature) {
      //验证成功 --> 返回 echostr
      ctx.body = echostr;
    } else {
      // 验证失败
    }
  };

  wechat.prototype.requestGet = function(url, data) {
    return new Promise((resolve, reject) => {
      https.get(url, res => {
        let buffer = [];
        let result = "";

        // 监听传输时间
        res.on("data", data => {
          buffer.push(data);
        });
        //传输完成
        res.on("end", () => {
          result = Buffer.concat(buffer).toString("utf-8");
          resolve(result);
        });
        //监听错误
        res.on("error", err => {
          reject(err);
        });
      });
    });
  }; 

  // 获取access_token

  wechat.prototype.get_accessToken=function()
  {
     

     const urlDomain=
  }
};

module.exports = wechat;
