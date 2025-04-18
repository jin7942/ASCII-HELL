/*!
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 mirz <that.mirz@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
!(function (t, e) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = e())
        : 'function' == typeof define && define.amd
        ? define([], e)
        : 'object' == typeof exports
        ? (exports.aalib = e())
        : (t.aalib = e());
})(this, function () {
    return (function (t) {
        function e(n) {
            if (r[n]) return r[n].exports;
            var o = (r[n] = { i: n, l: !1, exports: {} });
            return t[n].call(o.exports, o, o.exports, e), (o.l = !0), o.exports;
        }
        var r = {};
        return (
            (e.m = t),
            (e.c = r),
            (e.d = function (t, r, n) {
                e.o(t, r) || Object.defineProperty(t, r, { configurable: !1, enumerable: !0, get: n });
            }),
            (e.n = function (t) {
                var r =
                    t && t.__esModule
                        ? function () {
                              return t.default;
                          }
                        : function () {
                              return t;
                          };
                return e.d(r, 'a', r), r;
            }),
            (e.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (e.p = ''),
            e((e.s = 13))
        );
    })([
        function (t, e, r) {
            'use strict';
            function n(t, e, r, n, o) {
                return n + ((o - n) / (r - e)) * (t - e);
            }
            function o(t, e, r) {
                var n = r * (t.width << 2) + (e << 2);
                return { r: t.data[n], g: t.data[n + 1], b: t.data[n + 2] };
            }
            function i(t) {
                return t > 255 ? 255 : t < 0 ? 0 : t;
            }
            function u(t, e) {
                return Array.from(new Array(e - t + 1).keys()).map(function (e) {
                    return e + t;
                });
            }
            function s(t) {
                return t > 255 ? 255 : t < 0 ? 0 : t;
            }
            Object.defineProperty(e, '__esModule', { value: !0 }), (e.mapRange = n), (e.getRGB = o), (e.trunc = i), (e.range = u), (e.clampByte = s);
        },
        function (t, e, r) {
            'use strict';
            function n(t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            }
            Object.defineProperty(e, '__esModule', { value: !0 });
            var o = (function () {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            (n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
                        }
                    }
                    return function (e, r, n) {
                        return r && t(e.prototype, r), n && t(e, n), e;
                    };
                })(),
                i = r(12),
                u = (function (t) {
                    return t && t.__esModule ? t : { default: t };
                })(i),
                s = (function () {
                    function t() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            r = e.width,
                            o = e.height,
                            i = e.colorProcessor,
                            u = e.data,
                            s = void 0 === u ? [] : u,
                            a = e.meta,
                            c = void 0 === a ? {} : a;
                        n(this, t), (this.width = r), (this.height = o), (this.data = s), (this.meta = c), (this.colorProcessor = i);
                    }
                    return (
                        o(
                            t,
                            [
                                {
                                    key: 'getAt',
                                    value: function (t, e) {
                                        return this.data[t + this.width * e];
                                    },
                                },
                                {
                                    key: 'process',
                                    value: function (t) {
                                        var e = this;
                                        return (
                                            this.data.forEach(function (r) {
                                                t(r, e.colorProcessor);
                                            }),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'toImageData',
                                    value: function () {
                                        for (var t = [], e = void 0, r = 0; r < this.data.length; r++)
                                            (e = this.data[r]), (t[t.length] = e.r), (t[t.length] = e.g), (t[t.length] = e.b), (t[t.length] = 255);
                                        return new ImageData(new Uint8ClampedArray(t), this.width, this.height);
                                    },
                                },
                            ],
                            [
                                {
                                    key: 'fromImageData',
                                    value: function (e) {
                                        for (var r = new Uint32Array(e.data.buffer), n = r.length, o = new Array(n), i = n, s = void 0; i--; )
                                            (s = r[i]), (o[i] = { r: 255 & s, g: (s >> 8) & 255, b: (s >> 16) & 255 });
                                        return new t({ data: o, width: e.width, height: e.height, colorProcessor: u.default });
                                    },
                                },
                                {
                                    key: 'fromHTMLImageElement',
                                    value: function (e) {
                                        var r = document.createElement('canvas'),
                                            n = r.getContext('2d'),
                                            o = e.naturalWidth,
                                            i = e.naturalHeight;
                                        return (r.width = o), (r.height = i), n.drawImage(e, 0, 0), t.fromImageData(n.getImageData(0, 0, o, i));
                                    },
                                },
                            ]
                        ),
                        t
                    );
                })();
            e.default = s;
        },
        function (t, e, r) {
            'use strict';
            function n(t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            }
            Object.defineProperty(e, '__esModule', { value: !0 });
            var o = (function () {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            (n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
                        }
                    }
                    return function (e, r, n) {
                        return r && t(e.prototype, r), n && t(e, n), e;
                    };
                })(),
                i = r(3);
            r(23), r(25);
            var u = (function () {
                function t() {
                    n(this, t);
                }
                return (
                    o(t, [
                        {
                            key: 'read',
                            value: function () {
                                var t = this;
                                return i.Observable.create(function (e) {
                                    return t.onRead(e), t.onDispose.bind(t);
                                });
                            },
                        },
                        { key: 'onRead', value: function () {} },
                        { key: 'onDispose', value: function () {} },
                    ]),
                    t
                );
            })();
            e.default = u;
        },
        function (t, e, r) {
            'use strict';
            var n = r(4),
                o = r(16),
                i = r(22),
                u = (function () {
                    function t(t) {
                        (this._isScalar = !1), t && (this._subscribe = t);
                    }
                    return (
                        (t.prototype.lift = function (e) {
                            var r = new t();
                            return (r.source = this), (r.operator = e), r;
                        }),
                        (t.prototype.subscribe = function (t, e, r) {
                            var n = this.operator,
                                i = o.toSubscriber(t, e, r);
                            if (
                                (n ? n.call(i, this.source) : i.add(this.source ? this._subscribe(i) : this._trySubscribe(i)),
                                i.syncErrorThrowable && ((i.syncErrorThrowable = !1), i.syncErrorThrown))
                            )
                                throw i.syncErrorValue;
                            return i;
                        }),
                        (t.prototype._trySubscribe = function (t) {
                            try {
                                return this._subscribe(t);
                            } catch (e) {
                                (t.syncErrorThrown = !0), (t.syncErrorValue = e), t.error(e);
                            }
                        }),
                        (t.prototype.forEach = function (t, e) {
                            var r = this;
                            if (
                                (e ||
                                    (n.root.Rx && n.root.Rx.config && n.root.Rx.config.Promise
                                        ? (e = n.root.Rx.config.Promise)
                                        : n.root.Promise && (e = n.root.Promise)),
                                !e)
                            )
                                throw new Error('no Promise impl found');
                            return new e(function (e, n) {
                                var o;
                                o = r.subscribe(
                                    function (e) {
                                        if (o)
                                            try {
                                                t(e);
                                            } catch (t) {
                                                n(t), o.unsubscribe();
                                            }
                                        else t(e);
                                    },
                                    n,
                                    e
                                );
                            });
                        }),
                        (t.prototype._subscribe = function (t) {
                            return this.source.subscribe(t);
                        }),
                        (t.prototype[i.observable] = function () {
                            return this;
                        }),
                        (t.create = function (e) {
                            return new t(e);
                        }),
                        t
                    );
                })();
            e.Observable = u;
        },
        function (t, e, r) {
            'use strict';
            (function (t) {
                var r = 'undefined' != typeof window && window,
                    n = 'undefined' != typeof self && 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
                    o = void 0 !== t && t,
                    i = r || o || n;
                (e.root = i),
                    (function () {
                        if (!i) throw new Error('RxJS could not find any global context (window, self, global)');
                    })();
            }).call(e, r(15));
        },
        function (t, e, r) {
            'use strict';
            var n =
                    (this && this.__extends) ||
                    function (t, e) {
                        function r() {
                            this.constructor = t;
                        }
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                        t.prototype = null === e ? Object.create(e) : ((r.prototype = e.prototype), new r());
                    },
                o = r(8),
                i = r(17),
                u = r(10),
                s = r(11),
                a = (function (t) {
                    function e(r, n, o) {
                        switch (
                            (t.call(this),
                            (this.syncErrorValue = null),
                            (this.syncErrorThrown = !1),
                            (this.syncErrorThrowable = !1),
                            (this.isStopped = !1),
                            arguments.length)
                        ) {
                            case 0:
                                this.destination = u.empty;
                                break;
                            case 1:
                                if (!r) {
                                    this.destination = u.empty;
                                    break;
                                }
                                if ('object' == typeof r) {
                                    r instanceof e
                                        ? ((this.destination = r), this.destination.add(this))
                                        : ((this.syncErrorThrowable = !0), (this.destination = new c(this, r)));
                                    break;
                                }
                            default:
                                (this.syncErrorThrowable = !0), (this.destination = new c(this, r, n, o));
                        }
                    }
                    return (
                        n(e, t),
                        (e.prototype[s.rxSubscriber] = function () {
                            return this;
                        }),
                        (e.create = function (t, r, n) {
                            var o = new e(t, r, n);
                            return (o.syncErrorThrowable = !1), o;
                        }),
                        (e.prototype.next = function (t) {
                            this.isStopped || this._next(t);
                        }),
                        (e.prototype.error = function (t) {
                            this.isStopped || ((this.isStopped = !0), this._error(t));
                        }),
                        (e.prototype.complete = function () {
                            this.isStopped || ((this.isStopped = !0), this._complete());
                        }),
                        (e.prototype.unsubscribe = function () {
                            this.closed || ((this.isStopped = !0), t.prototype.unsubscribe.call(this));
                        }),
                        (e.prototype._next = function (t) {
                            this.destination.next(t);
                        }),
                        (e.prototype._error = function (t) {
                            this.destination.error(t), this.unsubscribe();
                        }),
                        (e.prototype._complete = function () {
                            this.destination.complete(), this.unsubscribe();
                        }),
                        (e.prototype._unsubscribeAndRecycle = function () {
                            var t = this,
                                e = t._parent,
                                r = t._parents;
                            return (
                                (this._parent = null),
                                (this._parents = null),
                                this.unsubscribe(),
                                (this.closed = !1),
                                (this.isStopped = !1),
                                (this._parent = e),
                                (this._parents = r),
                                this
                            );
                        }),
                        e
                    );
                })(i.Subscription);
            e.Subscriber = a;
            var c = (function (t) {
                function e(e, r, n, i) {
                    t.call(this), (this._parentSubscriber = e);
                    var s,
                        a = this;
                    o.isFunction(r)
                        ? (s = r)
                        : r &&
                          ((s = r.next),
                          (n = r.error),
                          (i = r.complete),
                          r !== u.empty &&
                              ((a = Object.create(r)),
                              o.isFunction(a.unsubscribe) && this.add(a.unsubscribe.bind(a)),
                              (a.unsubscribe = this.unsubscribe.bind(this)))),
                        (this._context = a),
                        (this._next = s),
                        (this._error = n),
                        (this._complete = i);
                }
                return (
                    n(e, t),
                    (e.prototype.next = function (t) {
                        if (!this.isStopped && this._next) {
                            var e = this._parentSubscriber;
                            e.syncErrorThrowable ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t);
                        }
                    }),
                    (e.prototype.error = function (t) {
                        if (!this.isStopped) {
                            var e = this._parentSubscriber;
                            if (this._error)
                                e.syncErrorThrowable
                                    ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                                    : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                            else {
                                if (!e.syncErrorThrowable) throw (this.unsubscribe(), t);
                                (e.syncErrorValue = t), (e.syncErrorThrown = !0), this.unsubscribe();
                            }
                        }
                    }),
                    (e.prototype.complete = function () {
                        var t = this;
                        if (!this.isStopped) {
                            var e = this._parentSubscriber;
                            if (this._complete) {
                                var r = function () {
                                    return t._complete.call(t._context);
                                };
                                e.syncErrorThrowable ? (this.__tryOrSetError(e, r), this.unsubscribe()) : (this.__tryOrUnsub(r), this.unsubscribe());
                            } else this.unsubscribe();
                        }
                    }),
                    (e.prototype.__tryOrUnsub = function (t, e) {
                        try {
                            t.call(this._context, e);
                        } catch (t) {
                            throw (this.unsubscribe(), t);
                        }
                    }),
                    (e.prototype.__tryOrSetError = function (t, e, r) {
                        try {
                            e.call(this._context, r);
                        } catch (e) {
                            return (t.syncErrorValue = e), (t.syncErrorThrown = !0), !0;
                        }
                        return !1;
                    }),
                    (e.prototype._unsubscribe = function () {
                        var t = this._parentSubscriber;
                        (this._context = null), (this._parentSubscriber = null), t.unsubscribe();
                    }),
                    e
                );
            })(a);
        },
        function (t, e, r) {
            'use strict';
            function n(t, e) {
                return function (r) {
                    return o(r, t, e);
                };
            }
            function o(t, e, r) {
                return t.process(function (t, n) {
                    n.mul(t, e).add(t, r).clamp(t);
                });
            }
            Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = n), (e.linearTransformation = o);
        },
        function (t, e, r) {
            'use strict';
            function n(t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            }
            function o(t) {
                return (
                    (t._cache = []),
                    function (e) {
                        return t._cache[e] || (t._cache[e] = t(e));
                    }
                );
            }
            Object.defineProperty(e, '__esModule', { value: !0 }), (e.SIMPLE_CHARSET = e.ASCII_CHARSET = void 0);
            var i = (function () {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            (n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
                        }
                    }
                    return function (e, r, n) {
                        return r && t(e.prototype, r), n && t(e, n), e;
                    };
                })(),
                u = r(0),
                s = r(34),
                a = (function (t) {
                    return t && t.__esModule ? t : { default: t };
                })(s),
                c = (function () {
                    function t(e) {
                        n(this, t),
                            (this.options = Object.assign({}, { charset: f, fontFamily: 'monospace' }, e)),
                            (this.fontmap = t.buildFont(this.options.charset, { fontFamily: this.options.fontFamily })),
                            (this.matchChar = o(this.matchChar.bind(this)));
                    }
                    return (
                        i(
                            t,
                            [
                                {
                                    key: 'render',
                                    value: function (t) {
                                        return this.processImage(t);
                                    },
                                },
                                {
                                    key: 'processImage',
                                    value: function (t) {
                                        for (var e = t.data.length, r = void 0; e--; ) (r = t.data[e]), (r.char = this.matchChar(r.mono));
                                        return t;
                                    },
                                },
                                {
                                    key: 'matchChar',
                                    value: function (t) {
                                        for (var e = { brightness: -1 }, r = 0; r < this.fontmap.length; r++) {
                                            var n = this.fontmap[r];
                                            if (!(Math.abs(t - n.brightness) <= Math.abs(t - e.brightness))) return e.char;
                                            e = n;
                                        }
                                        return e.char;
                                    },
                                },
                            ],
                            [
                                {
                                    key: 'buildFont',
                                    value: function (t, e) {
                                        return (0, a.default)(t, e);
                                    },
                                },
                            ]
                        ),
                        t
                    );
                })();
            e.default = c;
            var f = (e.ASCII_CHARSET = (0, u.range)(32, 126).map(function (t) {
                return String.fromCharCode(t);
            }));
            e.SIMPLE_CHARSET = ['.', ':', '*', 'I', '$', 'V', 'F', 'N', 'M'];
        },
        function (t, e, r) {
            'use strict';
            function n(t) {
                return 'function' == typeof t;
            }
            e.isFunction = n;
        },
        function (t, e, r) {
            'use strict';
            e.errorObject = { e: {} };
        },
        function (t, e, r) {
            'use strict';
            e.empty = {
                closed: !0,
                next: function (t) {},
                error: function (t) {
                    throw t;
                },
                complete: function () {},
            };
        },
        function (t, e, r) {
            'use strict';
            var n = r(4),
                o = n.root.Symbol;
            (e.rxSubscriber = 'function' == typeof o && 'function' == typeof o.for ? o.for('rxSubscriber') : '@@rxSubscriber'),
                (e.$$rxSubscriber = e.rxSubscriber);
        },
        function (t, e, r) {
            'use strict';
            Object.defineProperty(e, '__esModule', { value: !0 });
            var n = r(0);
            e.default = {
                mul: function (t, e) {
                    return (t.r = ~~(t.r * e)), (t.g = ~~(t.g * e)), (t.b = ~~(t.b * e)), this;
                },
                add: function (t, e) {
                    return (t.r += e), (t.g += e), (t.b += e), this;
                },
                addc: function (t, e) {
                    var r = e.r,
                        n = e.g,
                        o = e.b;
                    return (t.r += r), (t.g += n), (t.b += o), this;
                },
                div: function (t, e) {
                    return this.mul(t, 1 / e);
                },
                inverse: function (t) {
                    return (t.r = 255 - t.r), (t.g = 255 - t.g), (t.b = 255 - t.b), this;
                },
                getGrayscale: function (t) {
                    return ~~((t.r + t.g + t.b) / 3);
                },
                desaturate: function (t) {
                    return (t.r = t.g = t.b = this.getGrayscale(t)), this;
                },
                clamp: function (t) {
                    return (t.r = (0, n.clampByte)(t.r)), (t.g = (0, n.clampByte)(t.g)), (t.b = (0, n.clampByte)(t.b)), this;
                },
            };
        },
        function (t, e, r) {
            'use strict';
            function n(t) {
                return t && t.__esModule ? t : { default: t };
            }
            Object.defineProperty(e, '__esModule', { value: !0 }), (e.charset = e.render = e.filter = e.read = e.aa = void 0);
            var o = r(14),
                i = n(o),
                u = r(27),
                s = n(u),
                a = r(28),
                c = n(a),
                f = r(6),
                l = n(f),
                h = r(29),
                p = n(h),
                b = r(30),
                d = n(b),
                y = r(31),
                v = n(y),
                _ = r(32),
                m = n(_),
                g = r(33),
                w = n(g),
                O = r(35),
                E = n(O),
                S = r(7),
                j = r(36),
                x = n(j);
            e.aa = x.default;
            var P = (e.read = {
                    image: { fromHTMLImage: i.default.fromHTMLImage, fromURL: i.default.fromURL },
                    imageData: { fromImageData: c.default.fromImageData, fromCanvas: c.default.fromCanvas },
                    video: { fromVideoElement: s.default.fromVideoElement },
                }),
                T = (e.filter = { linear: l.default, brightness: p.default, contrast: d.default, inverse: v.default, desaturate: m.default }),
                C = (e.render = { html: w.default, canvas: E.default }),
                M = (e.charset = { SIMPLE_CHARSET: S.SIMPLE_CHARSET, ASCII_CHARSET: S.ASCII_CHARSET });
            e.default = { aa: x.default, read: P, filter: T, render: C, charset: M };
        },
        function (t, e, r) {
            'use strict';
            function n(t) {
                return t && t.__esModule ? t : { default: t };
            }
            function o(t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            }
            function i(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || ('object' != typeof e && 'function' != typeof e) ? t : e;
            }
            function u(t, e) {
                if ('function' != typeof e && null !== e) throw new TypeError('Super expression must either be null or a function, not ' + typeof e);
                (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } })),
                    e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e));
            }
            Object.defineProperty(e, '__esModule', { value: !0 });
            var s = (function () {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            (n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
                        }
                    }
                    return function (e, r, n) {
                        return r && t(e.prototype, r), n && t(e, n), e;
                    };
                })(),
                a = r(2),
                c = n(a),
                f = r(1),
                l = n(f),
                h = (function (t) {
                    function e(t) {
                        o(this, e);
                        var r = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                        return (r.url = t), r;
                    }
                    return (
                        u(e, t),
                        s(
                            e,
                            [
                                {
                                    key: 'onRead',
                                    value: function (t) {
                                        var e = document.createElement('img');
                                        e.crossOrigin = 'Anonymous';
                                        var r = function () {
                                                o(), t.next(l.default.fromHTMLImageElement(e)), t.complete();
                                            },
                                            n = function (e) {
                                                o(), t.error(e);
                                            },
                                            o = function () {
                                                e.removeEventListener('load', r), e.removeEventListener('error', n);
                                            };
                                        e.addEventListener('load', r),
                                            e.addEventListener('error', n),
                                            e.complete && e.naturalWidth ? r() : this.url && (e.src = this.url);
                                    },
                                },
                            ],
                            [
                                {
                                    key: 'fromURL',
                                    value: function (t) {
                                        return new e(t).read();
                                    },
                                },
                                {
                                    key: 'fromHTMLImage',
                                    value: function (t) {
                                        return e.fromURL(t.src);
                                    },
                                },
                            ]
                        ),
                        e
                    );
                })(c.default);
            e.default = h;
        },
        function (t, e) {
            var r;
            r = (function () {
                return this;
            })();
            try {
                r = r || Function('return this')() || (0, eval)('this');
            } catch (t) {
                'object' == typeof window && (r = window);
            }
            t.exports = r;
        },
        function (t, e, r) {
            'use strict';
            function n(t, e, r) {
                if (t) {
                    if (t instanceof o.Subscriber) return t;
                    if (t[i.rxSubscriber]) return t[i.rxSubscriber]();
                }
                return t || e || r ? new o.Subscriber(t, e, r) : new o.Subscriber(u.empty);
            }
            var o = r(5),
                i = r(11),
                u = r(10);
            e.toSubscriber = n;
        },
        function (t, e, r) {
            'use strict';
            function n(t) {
                return t.reduce(function (t, e) {
                    return t.concat(e instanceof c.UnsubscriptionError ? e.errors : e);
                }, []);
            }
            var o = r(18),
                i = r(19),
                u = r(8),
                s = r(20),
                a = r(9),
                c = r(21),
                f = (function () {
                    function t(t) {
                        (this.closed = !1), (this._parent = null), (this._parents = null), (this._subscriptions = null), t && (this._unsubscribe = t);
                    }
                    return (
                        (t.prototype.unsubscribe = function () {
                            var t,
                                e = !1;
                            if (!this.closed) {
                                var r = this,
                                    f = r._parent,
                                    l = r._parents,
                                    h = r._unsubscribe,
                                    p = r._subscriptions;
                                (this.closed = !0), (this._parent = null), (this._parents = null), (this._subscriptions = null);
                                for (var b = -1, d = l ? l.length : 0; f; ) f.remove(this), (f = (++b < d && l[b]) || null);
                                if (u.isFunction(h)) {
                                    var y = s.tryCatch(h).call(this);
                                    y === a.errorObject &&
                                        ((e = !0),
                                        (t = t || (a.errorObject.e instanceof c.UnsubscriptionError ? n(a.errorObject.e.errors) : [a.errorObject.e])));
                                }
                                if (o.isArray(p))
                                    for (b = -1, d = p.length; ++b < d; ) {
                                        var v = p[b];
                                        if (i.isObject(v)) {
                                            var y = s.tryCatch(v.unsubscribe).call(v);
                                            if (y === a.errorObject) {
                                                (e = !0), (t = t || []);
                                                var _ = a.errorObject.e;
                                                _ instanceof c.UnsubscriptionError ? (t = t.concat(n(_.errors))) : t.push(_);
                                            }
                                        }
                                    }
                                if (e) throw new c.UnsubscriptionError(t);
                            }
                        }),
                        (t.prototype.add = function (e) {
                            if (!e || e === t.EMPTY) return t.EMPTY;
                            if (e === this) return this;
                            var r = e;
                            switch (typeof e) {
                                case 'function':
                                    r = new t(e);
                                case 'object':
                                    if (r.closed || 'function' != typeof r.unsubscribe) return r;
                                    if (this.closed) return r.unsubscribe(), r;
                                    if ('function' != typeof r._addParent) {
                                        var n = r;
                                        (r = new t()), (r._subscriptions = [n]);
                                    }
                                    break;
                                default:
                                    throw new Error('unrecognized teardown ' + e + ' added to Subscription.');
                            }
                            return (this._subscriptions || (this._subscriptions = [])).push(r), r._addParent(this), r;
                        }),
                        (t.prototype.remove = function (t) {
                            var e = this._subscriptions;
                            if (e) {
                                var r = e.indexOf(t);
                                -1 !== r && e.splice(r, 1);
                            }
                        }),
                        (t.prototype._addParent = function (t) {
                            var e = this,
                                r = e._parent,
                                n = e._parents;
                            r && r !== t ? (n ? -1 === n.indexOf(t) && n.push(t) : (this._parents = [t])) : (this._parent = t);
                        }),
                        (t.EMPTY = (function (t) {
                            return (t.closed = !0), t;
                        })(new t())),
                        t
                    );
                })();
            e.Subscription = f;
        },
        function (t, e, r) {
            'use strict';
            e.isArray =
                Array.isArray ||
                function (t) {
                    return t && 'number' == typeof t.length;
                };
        },
        function (t, e, r) {
            'use strict';
            function n(t) {
                return null != t && 'object' == typeof t;
            }
            e.isObject = n;
        },
        function (t, e, r) {
            'use strict';
            function n() {
                try {
                    return i.apply(this, arguments);
                } catch (t) {
                    return (u.errorObject.e = t), u.errorObject;
                }
            }
            function o(t) {
                return (i = t), n;
            }
            var i,
                u = r(9);
            e.tryCatch = o;
        },
        function (t, e, r) {
            'use strict';
            var n =
                    (this && this.__extends) ||
                    function (t, e) {
                        function r() {
                            this.constructor = t;
                        }
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                        t.prototype = null === e ? Object.create(e) : ((r.prototype = e.prototype), new r());
                    },
                o = (function (t) {
                    function e(e) {
                        t.call(this), (this.errors = e);
                        var r = Error.call(
                            this,
                            e
                                ? e.length +
                                      ' errors occurred during unsubscription:\n  ' +
                                      e
                                          .map(function (t, e) {
                                              return e + 1 + ') ' + t.toString();
                                          })
                                          .join('\n  ')
                                : ''
                        );
                        (this.name = r.name = 'UnsubscriptionError'), (this.stack = r.stack), (this.message = r.message);
                    }
                    return n(e, t), e;
                })(Error);
            e.UnsubscriptionError = o;
        },
        function (t, e, r) {
            'use strict';
            function n(t) {
                var e,
                    r = t.Symbol;
                return 'function' == typeof r ? (r.observable ? (e = r.observable) : ((e = r('observable')), (r.observable = e))) : (e = '@@observable'), e;
            }
            var o = r(4);
            (e.getSymbolObservable = n), (e.observable = n(o.root)), (e.$$observable = e.observable);
        },
        function (t, e, r) {
            'use strict';
            var n = r(3),
                o = r(24);
            n.Observable.prototype.map = o.map;
        },
        function (t, e, r) {
            'use strict';
            function n(t, e) {
                if ('function' != typeof t) throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
                return this.lift(new u(t, e));
            }
            var o =
                    (this && this.__extends) ||
                    function (t, e) {
                        function r() {
                            this.constructor = t;
                        }
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                        t.prototype = null === e ? Object.create(e) : ((r.prototype = e.prototype), new r());
                    },
                i = r(5);
            e.map = n;
            var u = (function () {
                function t(t, e) {
                    (this.project = t), (this.thisArg = e);
                }
                return (
                    (t.prototype.call = function (t, e) {
                        return e.subscribe(new s(t, this.project, this.thisArg));
                    }),
                    t
                );
            })();
            e.MapOperator = u;
            var s = (function (t) {
                function e(e, r, n) {
                    t.call(this, e), (this.project = r), (this.count = 0), (this.thisArg = n || this);
                }
                return (
                    o(e, t),
                    (e.prototype._next = function (t) {
                        var e;
                        try {
                            e = this.project.call(this.thisArg, t, this.count++);
                        } catch (t) {
                            return void this.destination.error(t);
                        }
                        this.destination.next(e);
                    }),
                    e
                );
            })(i.Subscriber);
        },
        function (t, e, r) {
            'use strict';
            var n = r(3),
                o = r(26);
            (n.Observable.prototype.do = o._do), (n.Observable.prototype._do = o._do);
        },
        function (t, e, r) {
            'use strict';
            function n(t, e, r) {
                return this.lift(new u(t, e, r));
            }
            var o =
                    (this && this.__extends) ||
                    function (t, e) {
                        function r() {
                            this.constructor = t;
                        }
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                        t.prototype = null === e ? Object.create(e) : ((r.prototype = e.prototype), new r());
                    },
                i = r(5);
            e._do = n;
            var u = (function () {
                    function t(t, e, r) {
                        (this.nextOrObserver = t), (this.error = e), (this.complete = r);
                    }
                    return (
                        (t.prototype.call = function (t, e) {
                            return e.subscribe(new s(t, this.nextOrObserver, this.error, this.complete));
                        }),
                        t
                    );
                })(),
                s = (function (t) {
                    function e(e, r, n, o) {
                        t.call(this, e);
                        var u = new i.Subscriber(r, n, o);
                        (u.syncErrorThrowable = !0), this.add(u), (this.safeSubscriber = u);
                    }
                    return (
                        o(e, t),
                        (e.prototype._next = function (t) {
                            var e = this.safeSubscriber;
                            e.next(t), e.syncErrorThrown ? this.destination.error(e.syncErrorValue) : this.destination.next(t);
                        }),
                        (e.prototype._error = function (t) {
                            var e = this.safeSubscriber;
                            e.error(t), e.syncErrorThrown ? this.destination.error(e.syncErrorValue) : this.destination.error(t);
                        }),
                        (e.prototype._complete = function () {
                            var t = this.safeSubscriber;
                            t.complete(), t.syncErrorThrown ? this.destination.error(t.syncErrorValue) : this.destination.complete();
                        }),
                        e
                    );
                })(i.Subscriber);
        },
        function (t, e, r) {
            'use strict';
            function n(t) {
                return t && t.__esModule ? t : { default: t };
            }
            function o(t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            }
            function i(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || ('object' != typeof e && 'function' != typeof e) ? t : e;
            }
            function u(t, e) {
                if ('function' != typeof e && null !== e) throw new TypeError('Super expression must either be null or a function, not ' + typeof e);
                (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } })),
                    e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e));
            }
            function s() {
                var t = document.createElement('canvas'),
                    e = t.getContext('2d');
                return function (r) {
                    var n = r.videoWidth,
                        o = r.videoHeight;
                    return (t.width = n), (t.height = o), e.drawImage(r, 0, 0, n, o), e.getImageData(0, 0, n, o);
                };
            }
            Object.defineProperty(e, '__esModule', { value: !0 });
            var a = (function () {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            (n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
                        }
                    }
                    return function (e, r, n) {
                        return r && t(e.prototype, r), n && t(e, n), e;
                    };
                })(),
                c = r(2),
                f = n(c),
                l = r(1),
                h = n(l),
                p = (function (t) {
                    function e(t, r, n) {
                        o(this, e);
                        var u = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                        return (
                            (u.video = t),
                            (u.options = Object.assign({}, { autoplay: !1 }, n)),
                            (u.video.autoplay = u.options.autoplay),
                            (u.captureFrame = r),
                            u
                        );
                    }
                    return (
                        u(e, t),
                        a(
                            e,
                            [
                                {
                                    key: 'onRead',
                                    value: function (t) {
                                        var e = this,
                                            r = this.video;
                                        (this.playbackLoop = function () {
                                            r.paused || r.ended || (t.next(h.default.fromImageData(e.captureFrame(r))), requestAnimationFrame(e.playbackLoop));
                                        }),
                                            (this.onError = function () {
                                                var n = r.src,
                                                    o = r.error,
                                                    i = o.code,
                                                    u = o.message;
                                                r.removeEventListener('play', e.playbackLoop),
                                                    t.error('Error occurred while trying to play ' + n + ': : ' + i + ', ' + u);
                                            }),
                                            r.addEventListener('error', this.onError),
                                            r.addEventListener('play', this.playbackLoop);
                                    },
                                },
                                {
                                    key: 'onDispose',
                                    value: function () {
                                        this.video.removeEventListener('play', this.playbackLoop), this.video.removeEventListener('error', this.onError);
                                    },
                                },
                            ],
                            [
                                {
                                    key: 'fromVideoElement',
                                    value: function (t, r) {
                                        return new e(t, s(), r).read();
                                    },
                                },
                            ]
                        ),
                        e
                    );
                })(f.default);
            e.default = p;
        },
        function (t, e, r) {
            'use strict';
            function n(t) {
                return t && t.__esModule ? t : { default: t };
            }
            function o(t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            }
            function i(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || ('object' != typeof e && 'function' != typeof e) ? t : e;
            }
            function u(t, e) {
                if ('function' != typeof e && null !== e) throw new TypeError('Super expression must either be null or a function, not ' + typeof e);
                (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } })),
                    e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e));
            }
            Object.defineProperty(e, '__esModule', { value: !0 });
            var s = (function () {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            (n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
                        }
                    }
                    return function (e, r, n) {
                        return r && t(e.prototype, r), n && t(e, n), e;
                    };
                })(),
                a = r(2),
                c = n(a),
                f = r(1),
                l = n(f),
                h = (function (t) {
                    function e(t) {
                        o(this, e);
                        var r = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                        return (r.idata = t), r;
                    }
                    return (
                        u(e, t),
                        s(
                            e,
                            [
                                {
                                    key: 'onRead',
                                    value: function (t) {
                                        t.next(l.default.fromImageData(this.idata)), t.complete();
                                    },
                                },
                            ],
                            [
                                {
                                    key: 'fromImageData',
                                    value: function (t) {
                                        return new e(t).read();
                                    },
                                },
                                {
                                    key: 'fromCanvas',
                                    value: function (t, r, n, o, i) {
                                        var u = t.getContext('2d'),
                                            s = u.getImageData(r || 0, n || 0, o || t.width, i || t.height);
                                        return e.fromImageData(s);
                                    },
                                },
                            ]
                        ),
                        e
                    );
                })(c.default);
            e.default = h;
        },
        function (t, e, r) {
            'use strict';
            function n(t) {
                return function (e) {
                    return o(e, t);
                };
            }
            function o(t, e) {
                return (0, u.default)(1, e || 0)(t);
            }
            Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = n), (e.brightness = o);
            var i = r(6),
                u = (function (t) {
                    return t && t.__esModule ? t : { default: t };
                })(i);
        },
        function (t, e, r) {
            'use strict';
            function n(t) {
                return function (e) {
                    return o(e, t);
                };
            }
            function o(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                return (0, i.linearTransformation)(t, e, 0);
            }
            Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = n), (e.contrast = o);
            var i = r(6);
        },
        function (t, e, r) {
            'use strict';
            function n() {
                return function (t) {
                    return o(t);
                };
            }
            function o(t) {
                return t.process(function (t, e) {
                    e.inverse(t).clamp(t);
                });
            }
            Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = n), (e.inverse = o);
        },
        function (t, e, r) {
            'use strict';
            function n() {
                return function (t) {
                    return o(t);
                };
            }
            function o(t) {
                return t.process(function (t, e) {
                    e.desaturate(t);
                });
            }
            Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = n), (e.desaturate = o);
        },
        function (t, e, r) {
            'use strict';
            function n(t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            }
            function o(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || ('object' != typeof e && 'function' != typeof e) ? t : e;
            }
            function i(t, e) {
                if ('function' != typeof e && null !== e) throw new TypeError('Super expression must either be null or a function, not ' + typeof e);
                (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } })),
                    e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e));
            }
            function u(t) {
                var e = new b(t);
                return function (t) {
                    return e.render(t);
                };
            }
            function s(t) {
                var e = function (t) {
                        var e = t.char;
                        return '<span style="color: rgb(' + t.r + ', ' + t.g + ', ' + t.b + ')">' + e + '</span>';
                    },
                    r = c(e);
                return function (e) {
                    return (t.innerHTML = r(e)), t;
                };
            }
            function a(t) {
                var e = c(function (t) {
                    return t.char;
                });
                return function (r) {
                    return (t.textContent = e(r)), t;
                };
            }
            function c(t) {
                return function (e) {
                    for (var r = e.width, n = e.data, o = '', i = r, u = 0, s = n.length; u < s; u++, i--) 0 === i && ((o += '\n'), (i = r)), (o += t(n[u]));
                    return o;
                };
            }
            Object.defineProperty(e, '__esModule', { value: !0 }), (e.HTMLRenderer = e.SIMPLE_CHARSET = e.ASCII_CHARSET = void 0);
            var f = (function () {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            (n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
                        }
                    }
                    return function (e, r, n) {
                        return r && t(e.prototype, r), n && t(e, n), e;
                    };
                })(),
                l = function t(e, r, n) {
                    null === e && (e = Function.prototype);
                    var o = Object.getOwnPropertyDescriptor(e, r);
                    if (void 0 === o) {
                        var i = Object.getPrototypeOf(e);
                        return null === i ? void 0 : t(i, r, n);
                    }
                    if ('value' in o) return o.value;
                    var u = o.get;
                    if (void 0 !== u) return u.call(n);
                },
                h = r(7);
            Object.defineProperty(e, 'ASCII_CHARSET', {
                enumerable: !0,
                get: function () {
                    return h.ASCII_CHARSET;
                },
            }),
                Object.defineProperty(e, 'SIMPLE_CHARSET', {
                    enumerable: !0,
                    get: function () {
                        return h.SIMPLE_CHARSET;
                    },
                }),
                (e.default = u);
            var p = (function (t) {
                    return t && t.__esModule ? t : { default: t };
                })(h),
                b = (e.HTMLRenderer = (function (t) {
                    function e(t) {
                        n(this, e);
                        var r = o(
                            this,
                            (e.__proto__ || Object.getPrototypeOf(e)).call(
                                this,
                                Object.assign({}, { tagName: 'pre', fontSize: 7, background: '#fff', color: '#000' }, t)
                            )
                        );
                        return (
                            (r.el = r.options.el || document.createElement(r.options.tagName)),
                            (r.el.style.fontSize = r.options.fontSize + 'px'),
                            (r.el.style.fontFamily = r.options.fontFamily),
                            (r.el.style.backgroundColor = r.options.background),
                            r
                        );
                    }
                    return (
                        i(e, t),
                        f(e, [
                            {
                                key: 'render',
                                value: function (t) {
                                    return (
                                        l(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), 'render', this).call(this, t),
                                        t.meta.colored || (this.el.style.color = this.options.color),
                                        (t.meta.colored ? s(this.el) : a(this.el))(t)
                                    );
                                },
                            },
                        ]),
                        e
                    );
                })(p.default));
        },
        function (t, e, r) {
            'use strict';
            function n(t, e) {
                for (var r = new Array(t.length), n = 255, i = 0, s = 0; s < t.length; s++) {
                    var a = t[s],
                        c = o(a, e);
                    c < n && (n = c), c > i && (i = c), (r[s] = { char: a, brightness: c });
                }
                return r
                    .map(function (t) {
                        var e = t.char,
                            r = t.brightness;
                        return { char: e, brightness: ~~(0, u.mapRange)(r, n, i, 0, 255) };
                    })
                    .sort(function (t, e) {
                        return t.brightness < e.brightness ? -1 : t.brightness > e.brightness ? 1 : 0;
                    });
            }
            function o(t, e) {
                for (
                    var r = i(t, e),
                        n = r.getContext('2d'),
                        o = n.getImageData(0, 0, r.width, r.height),
                        u = new Uint32Array(o.data.buffer),
                        s = 0,
                        a = u.length,
                        c = void 0,
                        f = void 0,
                        l = void 0,
                        h = void 0;
                    a--;

                )
                    (h = u[a]), (c = 255 & h), (f = (h >> 8) & 255), (l = (h >> 16) & 255), (s += (c + f + l) / 3);
                return (s /= r.width * r.height);
            }
            function i(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = e.fontFamily,
                    n = void 0 === r ? 'monospace' : r,
                    o = s(),
                    i = o.canvas,
                    u = o.ctx;
                return (
                    (u.fillStyle = '#fff'),
                    u.fillRect(0, 0, i.width, i.height),
                    (u.fillStyle = '#000'),
                    (u.textBaseline = 'top'),
                    (u.textAlign = 'left'),
                    (u.font = '20px ' + n),
                    u.fillText(t, 0, 0),
                    i
                );
            }
            Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = n);
            var u = r(0),
                s = (function (t) {
                    return (
                        (t._result = null),
                        function () {
                            return t._result || (t._result = t());
                        }
                    );
                })(function () {
                    var t = document.createElement('canvas'),
                        e = t.getContext('2d', { alpha: !1 });
                    return (t.width = 15), (t.height = 25), { canvas: t, ctx: e };
                });
        },
        function (t, e, r) {
            'use strict';
            function n(t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            }
            function o(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || ('object' != typeof e && 'function' != typeof e) ? t : e;
            }
            function i(t, e) {
                if ('function' != typeof e && null !== e) throw new TypeError('Super expression must either be null or a function, not ' + typeof e);
                (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } })),
                    e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e));
            }
            function u(t) {
                var e = new p(t);
                return function (t) {
                    return e.render(t);
                };
            }
            function s(t, e) {
                return function (r) {
                    for (var n = r.data, o = r.width, i = e.charWidth, u = e.lineHeight, s = void 0, a = void 0, c = void 0, f = n.length; f--; )
                        (s = f % o),
                            (a = ~~(f / o)),
                            (c = n[f]),
                            (t.fillStyle = 'rgb(' + c.r + ', ' + c.g + ', ' + c.b + ')'),
                            t.fillText(n[f].char, s * i, a * u);
                };
            }
            function a(t, e) {
                return function (r) {
                    var n = r.data,
                        o = r.width,
                        i = e.lineHeight,
                        u = void 0,
                        s = '';
                    t.fillStyle = e.color;
                    for (var a = 0, c = n.length; a < c; a += o) {
                        (u = ~~(a / o)), (s = '');
                        for (var f = a; f < a + o; f++) s += n[f].char;
                        t.fillText(s, 0, u * i);
                    }
                };
            }
            Object.defineProperty(e, '__esModule', { value: !0 }), (e.CanvasRenderer = e.SIMPLE_CHARSET = e.ASCII_CHARSET = void 0);
            var c = (function () {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            (n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
                        }
                    }
                    return function (e, r, n) {
                        return r && t(e.prototype, r), n && t(e, n), e;
                    };
                })(),
                f = function t(e, r, n) {
                    null === e && (e = Function.prototype);
                    var o = Object.getOwnPropertyDescriptor(e, r);
                    if (void 0 === o) {
                        var i = Object.getPrototypeOf(e);
                        return null === i ? void 0 : t(i, r, n);
                    }
                    if ('value' in o) return o.value;
                    var u = o.get;
                    if (void 0 !== u) return u.call(n);
                },
                l = r(7);
            Object.defineProperty(e, 'ASCII_CHARSET', {
                enumerable: !0,
                get: function () {
                    return l.ASCII_CHARSET;
                },
            }),
                Object.defineProperty(e, 'SIMPLE_CHARSET', {
                    enumerable: !0,
                    get: function () {
                        return l.SIMPLE_CHARSET;
                    },
                }),
                (e.default = u);
            var h = (function (t) {
                    return t && t.__esModule ? t : { default: t };
                })(l),
                p = (e.CanvasRenderer = (function (t) {
                    function e(t) {
                        n(this, e);
                        var r = o(
                            this,
                            (e.__proto__ || Object.getPrototypeOf(e)).call(
                                this,
                                Object.assign({}, { fontSize: 7, lineHeight: 7, charWidth: 4.2, width: 400, height: 300, background: '#fff', color: '#000' }, t)
                            )
                        );
                        return (
                            (r.el = r.options.el || document.createElement('canvas')),
                            (r.el.width = r.options.width),
                            (r.el.height = r.options.height),
                            (r.el.style.backgroundColor = r.options.background),
                            (r.ctx = r.el.getContext('2d')),
                            (r.ctx.textBaseline = 'top'),
                            (r.ctx.textAlign = 'start'),
                            (r.ctx.font = r.options.fontSize + 'px ' + r.options.fontFamily),
                            r
                        );
                    }
                    return (
                        i(e, t),
                        c(e, [
                            {
                                key: 'render',
                                value: function (t) {
                                    return (
                                        f(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), 'render', this).call(this, t),
                                        this.clearCanvas(),
                                        (t.meta.colored ? s(this.ctx, this.options) : a(this.ctx, this.options))(t),
                                        this.el
                                    );
                                },
                            },
                            {
                                key: 'clearCanvas',
                                value: function () {
                                    this.ctx.clearRect(0, 0, this.el.width, this.el.height);
                                },
                            },
                        ]),
                        e
                    );
                })(h.default));
        },
        function (t, e, r) {
            'use strict';
            function n(t) {
                return t && t.__esModule ? t : { default: t };
            }
            function o(t) {
                return function (e) {
                    return i(e, t);
                };
            }
            function i(t, e) {
                for (
                    var r = e.width,
                        n = e.height,
                        o = e.colored,
                        i = void 0 !== o && o,
                        a = t.width / r,
                        f = t.height / n,
                        h = 255,
                        p = 0,
                        b = new Array(r * n),
                        d = 0,
                        y = 0;
                    y < n;
                    y++
                )
                    for (var v = 0; v < r; v++) {
                        var _ = u(t, ~~(v * a), ~~(y * f), a, f);
                        _.mono > p && (p = _.mono), _.mono < h && (h = _.mono), (b[d++] = _);
                    }
                var m = new c.default({ width: r, height: n, data: b, colorProcessor: l.default, meta: { colored: i } });
                return s(m, h, p), m;
            }
            function u(t, e, r, n, o) {
                for (var i = { r: 0, g: 0, b: 0 }, u = 0, s = 0; s < o; s++) for (var a = 0; a < n; a++) p.default.addc(i, t.getAt(e + a, r + s)), u++;
                return p.default.div(i, u), { r: i.r, g: i.g, b: i.b, mono: p.default.getGrayscale(i) };
            }
            function s(t, e, r) {
                t.process(function (t) {
                    t.mono = ~~(0, b.mapRange)(t.mono, e, r, 0, 255);
                });
            }
            Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = o), (e.aa = i);
            var a = r(1),
                c = n(a),
                f = r(37),
                l = n(f),
                h = r(12),
                p = n(h),
                b = r(0);
        },
        function (t, e, r) {
            'use strict';
            Object.defineProperty(e, '__esModule', { value: !0 });
            var n = r(0);
            e.default = {
                mul: function (t, e) {
                    return (t.mono = ~~(t.mono * e)), this;
                },
                add: function (t, e) {
                    return (t.mono += e), this;
                },
                div: function (t, e) {
                    this.mul(t, 1 / e);
                },
                inverse: function (t) {
                    return (t.mono = 255 - t.mono), this;
                },
                desaturate: function (t) {
                    return (t.r = t.g = t.b = t.mono), t;
                },
                clamp: function (t) {
                    return (t.mono = (0, n.clampByte)(t.mono)), this;
                },
            };
        },
    ]);
});
//# sourceMappingURL=aalib.js.map
