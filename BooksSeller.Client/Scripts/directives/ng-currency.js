! function (e, n) {
    "object" == typeof exports && "object" == typeof module ? module.exports = n(require("angular")) : "function" == typeof define && define.amd ? define("ng-currency", ["angular"], n) : "object" == typeof exports ? exports["ng-currency"] = n(require("angular")) : e["ng-currency"] = n(e.angular)
}(this, function (e) {
    return function (e) {
        function n(t) {
            if (r[t]) return r[t].exports;
            var u = r[t] = {
                i: t,
                l: !1,
                exports: {}
            };
            return e[t].call(u.exports, u, u.exports, n), u.l = !0, u.exports
        }
        var r = {};
        return n.m = e, n.c = r, n.d = function (e, r, t) {
            n.o(e, r) || Object.defineProperty(e, r, {
                configurable: !1,
                enumerable: !0,
                get: t
            })
        }, n.n = function (e) {
            var r = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(r, "a", r), r
        }, n.o = function (e, n) {
            return Object.prototype.hasOwnProperty.call(e, n)
        }, n.p = "", n(n.s = 0)
    }([function (e, n, r) {
        "use strict";

        function t(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var u = r(1),
            o = t(u),
            i = r(2),
            a = t(i),
            c = r(3),
            f = t(c),
            l = o.default.module("ng-currency", []);
        l.provider("ngCurrencySettings", a.default), l.directive("ngCurrency", f.default), n.default = l.name
    }, function (n, r) {
        n.exports = e
    }, function (e, n, r) {
        "use strict";

        function t(e, n) {
            if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var u = function () {
            function e(e, n) {
                for (var r = 0; r < n.length; r++) {
                    var t = n[r];
                    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t)
                }
            }
            return function (n, r, t) {
                return r && e(n.prototype, r), t && e(n, t), n
            }
        }(),
            o = function () {
                function e() {
                    t(this, e), this._defaults = {
                        fraction: 2,
                        hardCap: !1,
                        min: void 0,
                        max: void 0,
                        currencySymbol: void 0
                    }
                }
                return u(e, [{
                    key: "$get",
                    value: function () {
                        var e = this;
                        return {
                            get defaults() {
                                return e.defaults
                            }
                        }
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return this._defaults
                    },
                    set: function (e) {
                        this._defaults = e
                    }
                }]), e
            }();
        n.default = o
    }, function (e, n, r) {
        "use strict";

        function t(e, n, r, t) {
            return {
                require: "ngModel",
                link: function (u, o, i, a) {
                    function c() {
                        if (h) {
                            var e = void 0,
                                n = void 0,
                                r = void 0;
                            if (a.$options && (a.$options.getOption ? (n = a.$options.getOption("updateOn"), r = a.$options.getOption("debounce")) : (n = a.$options.updateOn, r = a.$options.debounce)), "blur" === n || r) {
                                e = a.$viewValue;
                                for (var t = a.$parsers.length - 1; t >= 0; t--) e = a.$parsers[t](e)
                            } else e = a.$$rawModelValue;
                            for (var u = a.$formatters.length - 1; u >= 0; u--) e = a.$formatters[u](e);
                            a.$viewValue = e, a.$render()
                        }
                    }

                    function f() {
                        if (a.$validate(), h) {
                            var e = l(a.$$rawModelValue);
                            e !== a.$$rawModelValue && (a.$setViewValue(e.toFixed(x)), a.$commitViewValue(), c())
                        }
                    }

                    function l(e) {
                        return g && (void 0 !== y && e > y ? e = y : void 0 !== b && e < b && (e = b)), e
                    }

                    function d(e) {
                        return RegExp("\\d|\\-|\\" + e, "g")
                    }

                    function s(e) {
                        return RegExp("\\-{0,1}((\\" + e + ")|([0-9]{1,}\\" + e + "?))&?[0-9]{0," + x + "}", "g")
                    }

                    function v(r) {
                        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                        r = String(r);
                        var u = n.NUMBER_FORMATS.DECIMAL_SEP,
                            o = null,
                            i = e("currency")("-1", p(), x),
                            a = RegExp("[0-9." + u + n.NUMBER_FORMATS.GROUP_SEP + "]+");
                        return i.replace(a.exec(i), "") === r.replace(a.exec(r), "") && (r = "-" + a.exec(r)), RegExp("^-[\\s]*$", "g").test(r) && (r = "-0"), d(u).test(r) && (o = r.match(d(u)).join("").match(s(u)) || [""], o = o[0], o = t ? o.replace(u, ".") : o), o || null
                    }

                    function p() {
                        return void 0 === m ? n.NUMBER_FORMATS.CURRENCY_SYM : m
                    }
                    var $ = t.defaults,
                        g = $.hardCap,
                        b = $.min,
                        y = $.max,
                        m = $.currencySymbol,
                        x = $.fraction,
                        O = i.required,
                        h = !0;
                    i.$observe("ngCurrency", function (e) {
                        h = "false" !== e, h ? c() : (a.$viewValue = a.$$rawModelValue, a.$render())
                    }), i.$observe("hardCap", function (e) {
                        g = "true" === e, f()
                    }), i.$observe("min", function (e) {
                        b = e ? Number(e) : void 0, f()
                    }), i.$observe("max", function (e) {
                        y = e ? Number(e) : void 0, f()
                    }), i.$observe("currencySymbol", function (e) {
                        m = e, c()
                    }), i.$observe("required", function (e) {
                        O = e, f()
                    }), i.$observe("fraction", function (e) {
                        x = e || 2, c(), f()
                    }), r(function () {
                        u.$emit("currencyRedraw")
                    }), a.$parsers.push(function (e) {
                        return h && -1 === [void 0, null, ""].indexOf(e) ? (e = v(e), e = l(Number(e))) : e
                    }), a.$formatters.push(function (n) {
                        return h && -1 === [void 0, null, ""].indexOf(n) ? e("currency")(n, p(), x) : n
                    }), a.$validators.min = function (e) {
                        return !(O || -1 === [void 0, null, ""].indexOf(e) && !isNaN(e)) || (!h || -1 !== [void 0, null].indexOf(b) || isNaN(b) || e >= b)
                    }, a.$validators.max = function (e) {
                        return !(O || -1 === [void 0, null, ""].indexOf(e) && !isNaN(e)) || (!h || -1 !== [void 0, null].indexOf(y) || isNaN(y) || e <= y)
                    }, a.$validators.fraction = function (e) {
                        return !h || !e || !isNaN(e)
                    }, u.$on("currencyRedraw", function () {
                        f(), c()
                    }), o.bind("focus", function () {
                        if (h) {
                            var e = v(a.$viewValue, !1);
                            a.$viewValue !== e && (a.$viewValue = e, a.$render(), o.triggerHandler("focus"))
                        }
                    }), o.bind("blur", c)
                }
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = t, t.$inject = ["$filter", "$locale", "$timeout", "ngCurrencySettings"]
    }])
});
//# sourceMappingURL=ng-currency.js.map