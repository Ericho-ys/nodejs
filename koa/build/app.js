"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _path = require("path");

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _mong = _interopRequireDefault(require("./module/mong"));

var app = new _koa["default"]();
var router = new _koaRouter["default"](); // 中间件

app.use((0, _koaStatic["default"])((0, _path.resolve)(__dirname, "../static")));
app.use((0, _koaBodyparser["default"])()); // app.use(async (ctx, next) => {
//     console.log(`这是第一个中间件，执行顺序${1}`)
//     next()
//     console.log(`匹配完成之后第一个中间件逻辑，执行顺序${3}`)
// })
// app.use(async (ctx, next) => {
//     console.log(`这是第二个中间件, 执行顺序${4}`)
//     next()
//     console.log(`匹配完成之后第二个中间件，执行顺序${5}`)
// })
// 注册路由
// router.get('/news', (ctx, next) => {
//   console.log(`匹配路由，执行顺序${2}`)
//   ctx.body = "这是一个新闻页面"
// })

router.post("/regist", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var params, data, insertData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = ctx.request.body;
            _context.next = 3;
            return _mong["default"].find("person", {//"username": params.username
            });

          case 3:
            data = _context.sent;
            _context.next = 6;
            return _mong["default"].insertMany("person", [{
              "username": "dy1"
            }, {
              "username": "dy2"
            }]);

          case 6:
            insertData = _context.sent;

            if (insertData.result.ok) {
              console.log(insertData);
            }

            ctx.body = params;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
//# sourceMappingURL=app.js.map