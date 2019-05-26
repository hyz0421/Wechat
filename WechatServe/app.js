const Koa = require("koa");
const Router = require("koa-router");
const Wechat = require("./wechat/wechat");
const Config = require("./wechat/config.json");

const app = new Koa();

const router = new Router();

const wechatApp = new Wechat(Config);

// 微信验证.
router.get("/wechat", async ctx => {

    //调用微信认证接口
    wechatApp.auth(ctx);
});


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
