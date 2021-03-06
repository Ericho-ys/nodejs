"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mongodb = require("mongodb");

var _config = require("./config");

var Db = /*#__PURE__*/function () {
  function Db() {
    (0, _classCallCheck2["default"])(this, Db);
    (0, _defineProperty2["default"])(this, "db", null);
    this.connect();
  }

  (0, _createClass2["default"])(Db, [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var client;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (this.db) {
                  _context.next = 6;
                  break;
                }

                client = new _mongodb.MongoClient(_config.url, {
                  useUnifiedTopology: true
                });
                _context.next = 5;
                return client.connect();

              case 5:
                this.db = client.db(_config.datebaseName);

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(collectionName) {
        var json,
            sortDoc,
            pageNum,
            pageSize,
            result,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                json = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                sortDoc = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                pageNum = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : 1;
                pageSize = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : 10;
                _context2.next = 6;
                return Db.getDbInstance.call(this);

              case 6:
                result = this.db.collection(collectionName).find(json).sort(sortDoc).skip((pageNum - 1) * 10).limit(pageSize);
                return _context2.abrupt("return", result.toArray());

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function find(_x) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "findOne",
    value: function () {
      var _findOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(collectionName) {
        var json,
            result,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                json = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return Db.getDbInstance.call(this);

              case 3:
                result = this.db.collection(collectionName).findOne(json);
                return _context3.abrupt("return", result);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findOne(_x2) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }, {
    key: "getCount",
    value: function () {
      var _getCount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(collectionName) {
        var json,
            result,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                json = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 3;
                return Db.getDbInstance.call(this);

              case 3:
                result = this.db.collection(collectionName).find(json).count();
                return _context4.abrupt("return", result);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getCount(_x3) {
        return _getCount.apply(this, arguments);
      }

      return getCount;
    }()
  }, {
    key: "insertOne",
    value: function () {
      var _insertOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(collectionName) {
        var doc,
            _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                doc = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.prev = 1;
                _context5.next = 4;
                return Db.getDbInstance.call(this);

              case 4:
                _context5.next = 6;
                return this.db.collection(collectionName).insertOne(doc);

              case 6:
                return _context5.abrupt("return", _context5.sent);

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](1);
                console.log(_context5.t0);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 9]]);
      }));

      function insertOne(_x4) {
        return _insertOne.apply(this, arguments);
      }

      return insertOne;
    }()
  }, {
    key: "insertMany",
    value: function () {
      var _insertMany = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(collectionName) {
        var docs,
            _args6 = arguments;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                docs = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : [];
                _context6.prev = 1;
                _context6.next = 4;
                return Db.getDbInstance.call(this);

              case 4:
                _context6.next = 6;
                return this.db.collection(collectionName).insertMany(docs);

              case 6:
                return _context6.abrupt("return", _context6.sent);

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](1);
                console.log(_context6.t0);

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 9]]);
      }));

      function insertMany(_x5) {
        return _insertMany.apply(this, arguments);
      }

      return insertMany;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(collectionName) {
        var oldDoc,
            newDoc,
            _args7 = arguments;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                oldDoc = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                newDoc = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
                _context7.prev = 2;
                _context7.next = 5;
                return Db.getDbInstance.call(this);

              case 5:
                _context7.next = 7;
                return this.db.collection(collectionName).update(oldDoc, {
                  $set: newDoc
                });

              case 7:
                return _context7.abrupt("return", _context7.sent);

              case 10:
                _context7.prev = 10;
                _context7.t0 = _context7["catch"](2);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 10]]);
      }));

      function update(_x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }], [{
    key: "getDbInstance",
    value: function () {
      var _getDbInstance = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (this.db) {
                  _context8.next = 3;
                  break;
                }

                _context8.next = 3;
                return this.connect();

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getDbInstance() {
        return _getDbInstance.apply(this, arguments);
      }

      return getDbInstance;
    }()
  }, {
    key: "getInstance",
    value: function getInstance() {
      if (!Db.instance) {
        Db.instance = new Db();
      }

      return Db.instance;
    }
  }]);
  return Db;
}();

var db = Db.getInstance();
var _default = db; // const db = Db.getInstance();
// console.time("start1")
// db.find("person").then(data => {
//     console.timeEnd("start1")
//     console.log(data)
// });
// setTimeout(() => {
//     const db2 = Db.getInstance();
//     console.time("start2")
//     db2.find("person").then(data => {
//         console.timeEnd("start2")
//         console.log(data)
//     });
// }, 10000)

exports["default"] = _default;