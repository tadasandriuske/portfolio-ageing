/* perfect-scrollbar v0.8.1 */ ! function t(e, n, r) {
    function o(i, s) {
        if (!n[i]) {
            if (!e[i]) {
                var a = "function" == typeof require && require;
                if (!s && a) return a(i, !0);
                if (l) return l(i, !0);
                var c = new Error("Cannot find module '" + i + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = n[i] = {
                exports: {}
            };
            e[i][0].call(u.exports, function(t) {
                var n = e[i][1][t];
                return o(n ? n : t)
            }, u, u.exports, t, e, n, r)
        }
        return n[i].exports
    }
    for (var l = "function" == typeof require && require, i = 0; i < r.length; i++) o(r[i]);
    return o
}({
    1: [function(t, e, n) {
        "use strict";

        function r(t) {
            t.fn.perfectScrollbar = function(t) {
                return this.each(function() {
                    if ("object" == typeof t || "undefined" == typeof t) {
                        var e = t;
                        l.get(this) || o.initialize(this, e)
                    } else {
                        var n = t;
                        "update" === n ? o.update(this) : "destroy" === n && o.destroy(this)
                    }
                })
            }
        }
        var o = t("../main"),
            l = t("../plugin/instances");
        if ("function" == typeof define && define.amd) define(["jquery"], r);
        else {
            var i = window.jQuery ? window.jQuery : window.$;
            "undefined" != typeof i && r(i)
        }
        e.exports = r
    }, {
        "../main": 6,
        "../plugin/instances": 17
    }],
    2: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            return window.getComputedStyle(t)[e]
        }

        function o(t, e, n) {
            return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t
        }

        function l(t, e) {
            for (var n in e) {
                var r = e[n];
                "number" == typeof r && (r = r.toString() + "px"), t.style[n] = r
            }
            return t
        }
        var i = {};
        i.create = function(t, e) {
            var n = document.createElement(t);
            return n.className = e, n
        }, i.appendTo = function(t, e) {
            return e.appendChild(t), t
        }, i.css = function(t, e, n) {
            return "object" == typeof e ? l(t, e) : "undefined" == typeof n ? r(t, e) : o(t, e, n)
        }, i.matches = function(t, e) {
            return "undefined" != typeof t.matches ? t.matches(e) : t.msMatchesSelector(e)
        }, i.remove = function(t) {
            "undefined" != typeof t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
        }, i.queryChildren = function(t, e) {
            return Array.prototype.filter.call(t.childNodes, function(t) {
                return i.matches(t, e)
            })
        }, e.exports = i
    }, {}],
    3: [function(t, e, n) {
        "use strict";
        var r = function(t) {
            this.element = t, this.events = {}
        };
        r.prototype.bind = function(t, e) {
            "undefined" == typeof this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1)
        }, r.prototype.unbind = function(t, e) {
            var n = "undefined" != typeof e;
            this.events[t] = this.events[t].filter(function(r) {
                return !(!n || r === e) || (this.element.removeEventListener(t, r, !1), !1)
            }, this)
        }, r.prototype.unbindAll = function() {
            for (var t in this.events) this.unbind(t)
        };
        var o = function() {
            this.eventElements = []
        };
        o.prototype.eventElement = function(t) {
            var e = this.eventElements.filter(function(e) {
                return e.element === t
            })[0];
            return "undefined" == typeof e && (e = new r(t), this.eventElements.push(e)), e
        }, o.prototype.bind = function(t, e, n) {
            this.eventElement(t).bind(e, n)
        }, o.prototype.unbind = function(t, e, n) {
            this.eventElement(t).unbind(e, n)
        }, o.prototype.unbindAll = function() {
            for (var t = 0; t < this.eventElements.length; t++) this.eventElements[t].unbindAll()
        }, o.prototype.once = function(t, e, n) {
            var r = this.eventElement(t),
                o = function(t) {
                    r.unbind(e, o), n(t)
                };
            r.bind(e, o)
        }, e.exports = o
    }, {}],
    4: [function(t, e, n) {
        "use strict";
        e.exports = function() {
            function t() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }
            return function() {
                return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
            }
        }()
    }, {}],
    5: [function(t, e, n) {
        "use strict";

        function r(t) {
            var e, n = ["ps--in-scrolling"];
            return e = "undefined" == typeof t ? ["ps--x", "ps--y"] : ["ps--" + t], n.concat(e)
        }
        var o = t("./dom"),
            l = n.toInt = function(t) {
                return parseInt(t, 10) || 0
            };
        n.isEditable = function(t) {
            return o.matches(t, "input,[contenteditable]") || o.matches(t, "select,[contenteditable]") || o.matches(t, "textarea,[contenteditable]") || o.matches(t, "button,[contenteditable]")
        }, n.removePsClasses = function(t) {
            for (var e = 0; e < t.classList.length; e++) {
                var n = t.classList[e];
                0 === n.indexOf("ps-") && t.classList.remove(n)
            }
        }, n.outerWidth = function(t) {
            return l(o.css(t, "width")) + l(o.css(t, "paddingLeft")) + l(o.css(t, "paddingRight")) + l(o.css(t, "borderLeftWidth")) + l(o.css(t, "borderRightWidth"))
        }, n.startScrolling = function(t, e) {
            for (var n = r(e), o = 0; o < n.length; o++) t.classList.add(n[o])
        }, n.stopScrolling = function(t, e) {
            for (var n = r(e), o = 0; o < n.length; o++) t.classList.remove(n[o])
        }, n.env = {
            isWebKit: "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style,
            supportsTouch: "undefined" != typeof window && ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
            supportsIePointer: "undefined" != typeof window && null !== window.navigator.msMaxTouchPoints
        }
    }, {
        "./dom": 2
    }],
    6: [function(t, e, n) {
        "use strict";
        var r = t("./plugin/destroy"),
            o = t("./plugin/initialize"),
            l = t("./plugin/update");
        e.exports = {
            initialize: o,
            update: l,
            destroy: r
        }
    }, {
        "./plugin/destroy": 8,
        "./plugin/initialize": 16,
        "./plugin/update": 20
    }],
    7: [function(t, e, n) {
        "use strict";
        e.exports = function() {
            return {
                handlers: ["click-rail", "drag-scrollbar", "keyboard", "wheel", "touch"],
                maxScrollbarLength: null,
                minScrollbarLength: null,
                scrollXMarginOffset: 0,
                scrollYMarginOffset: 0,
                suppressScrollX: !1,
                suppressScrollY: !1,
                swipePropagation: !0,
                swipeEasing: !0,
                useBothWheelAxes: !1,
                wheelPropagation: !1,
                wheelSpeed: 1,
                theme: "default"
            }
        }
    }, {}],
    8: [function(t, e, n) {
        "use strict";
        var r = t("../lib/helper"),
            o = t("../lib/dom"),
            l = t("./instances");
        e.exports = function(t) {
            var e = l.get(t);
            e && (e.event.unbindAll(), o.remove(e.scrollbarX), o.remove(e.scrollbarY), o.remove(e.scrollbarXRail), o.remove(e.scrollbarYRail), r.removePsClasses(t), l.remove(t))
        }
    }, {
        "../lib/dom": 2,
        "../lib/helper": 5,
        "./instances": 17
    }],
    9: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n(t) {
                return t.getBoundingClientRect()
            }
            var r = function(t) {
                t.stopPropagation()
            };
            e.event.bind(e.scrollbarY, "click", r), e.event.bind(e.scrollbarYRail, "click", function(r) {
                var o = r.pageY - window.pageYOffset - n(e.scrollbarYRail).top,
                    s = o > e.scrollbarYTop ? 1 : -1;
                i(t, "top", t.scrollTop + s * e.containerHeight), l(t), r.stopPropagation()
            }), e.event.bind(e.scrollbarX, "click", r), e.event.bind(e.scrollbarXRail, "click", function(r) {
                var o = r.pageX - window.pageXOffset - n(e.scrollbarXRail).left,
                    s = o > e.scrollbarXLeft ? 1 : -1;
                i(t, "left", t.scrollLeft + s * e.containerWidth), l(t), r.stopPropagation()
            })
        }
        var o = t("../instances"),
            l = t("../update-geometry"),
            i = t("../update-scroll");
        e.exports = function(t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {
        "../instances": 17,
        "../update-geometry": 18,
        "../update-scroll": 19
    }],
    10: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n) {
                var o = r + n * e.railXRatio,
                    i = Math.max(0, e.scrollbarXRail.getBoundingClientRect().left) + e.railXRatio * (e.railXWidth - e.scrollbarXWidth);
                o < 0 ? e.scrollbarXLeft = 0 : o > i ? e.scrollbarXLeft = i : e.scrollbarXLeft = o;
                var s = l.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.railXRatio * e.scrollbarXWidth)) - e.negativeScrollAdjustment;
                c(t, "left", s)
            }
            var r = null,
                o = null,
                s = function(e) {
                    n(e.pageX - o), a(t), e.stopPropagation(), e.preventDefault()
                },
                u = function() {
                    l.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", s)
                };
            e.event.bind(e.scrollbarX, "mousedown", function(n) {
                o = n.pageX, r = l.toInt(i.css(e.scrollbarX, "left")) * e.railXRatio, l.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
            })
        }

        function o(t, e) {
            function n(n) {
                var o = r + n * e.railYRatio,
                    i = Math.max(0, e.scrollbarYRail.getBoundingClientRect().top) + e.railYRatio * (e.railYHeight - e.scrollbarYHeight);
                o < 0 ? e.scrollbarYTop = 0 : o > i ? e.scrollbarYTop = i : e.scrollbarYTop = o;
                var s = l.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.railYRatio * e.scrollbarYHeight));
                c(t, "top", s)
            }
            var r = null,
                o = null,
                s = function(e) {
                    n(e.pageY - o), a(t), e.stopPropagation(), e.preventDefault()
                },
                u = function() {
                    l.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", s)
                };
            e.event.bind(e.scrollbarY, "mousedown", function(n) {
                o = n.pageY, r = l.toInt(i.css(e.scrollbarY, "top")) * e.railYRatio, l.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
            })
        }
        var l = t("../../lib/helper"),
            i = t("../../lib/dom"),
            s = t("../instances"),
            a = t("../update-geometry"),
            c = t("../update-scroll");
        e.exports = function(t) {
            var e = s.get(t);
            r(t, e), o(t, e)
        }
    }, {
        "../../lib/dom": 2,
        "../../lib/helper": 5,
        "../instances": 17,
        "../update-geometry": 18,
        "../update-scroll": 19
    }],
    11: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation
                }
                var l = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === l && n < 0 || l >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }
            var r = !1;
            e.event.bind(t, "mouseenter", function() {
                r = !0
            }), e.event.bind(t, "mouseleave", function() {
                r = !1
            });
            var i = !1;
            e.event.bind(e.ownerDocument, "keydown", function(c) {
                if (!(c.isDefaultPrevented && c.isDefaultPrevented() || c.defaultPrevented)) {
                    var u = l.matches(e.scrollbarX, ":focus") || l.matches(e.scrollbarY, ":focus");
                    if (r || u) {
                        var d = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                        if (d) {
                            if ("IFRAME" === d.tagName) d = d.contentDocument.activeElement;
                            else
                                for (; d.shadowRoot;) d = d.shadowRoot.activeElement;
                            if (o.isEditable(d)) return
                        }
                        var p = 0,
                            f = 0;
                        switch (c.which) {
                            case 37:
                                p = c.metaKey ? -e.contentWidth : c.altKey ? -e.containerWidth : -30;
                                break;
                            case 38:
                                f = c.metaKey ? e.contentHeight : c.altKey ? e.containerHeight : 30;
                                break;
                            case 39:
                                p = c.metaKey ? e.contentWidth : c.altKey ? e.containerWidth : 30;
                                break;
                            case 40:
                                f = c.metaKey ? -e.contentHeight : c.altKey ? -e.containerHeight : -30;
                                break;
                            case 33:
                                f = 90;
                                break;
                            case 32:
                                f = c.shiftKey ? 90 : -90;
                                break;
                            case 34:
                                f = -90;
                                break;
                            case 35:
                                f = c.ctrlKey ? -e.contentHeight : -e.containerHeight;
                                break;
                            case 36:
                                f = c.ctrlKey ? t.scrollTop : e.containerHeight;
                                break;
                            default:
                                return
                        }
                        a(t, "top", t.scrollTop - f), a(t, "left", t.scrollLeft + p), s(t), i = n(p, f), i && c.preventDefault()
                    }
                }
            })
        }
        var o = t("../../lib/helper"),
            l = t("../../lib/dom"),
            i = t("../instances"),
            s = t("../update-geometry"),
            a = t("../update-scroll");
        e.exports = function(t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {
        "../../lib/dom": 2,
        "../../lib/helper": 5,
        "../instances": 17,
        "../update-geometry": 18,
        "../update-scroll": 19
    }],
    12: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation
                }
                var l = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === l && n < 0 || l >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }

            function r(t) {
                var e = t.deltaX,
                    n = -1 * t.deltaY;
                return "undefined" != typeof e && "undefined" != typeof n || (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e !== e && n !== n && (e = 0, n = t.wheelDelta), t.shiftKey ? [-n, -e] : [e, n]
            }

            function o(e, n) {
                var r = t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");
                if (r) {
                    var o = window.getComputedStyle(r),
                        l = [o.overflow, o.overflowX, o.overflowY].join("");
                    if (!l.match(/(scroll|auto)/)) return !1;
                    var i = r.scrollHeight - r.clientHeight;
                    if (i > 0 && !(0 === r.scrollTop && n > 0 || r.scrollTop === i && n < 0)) return !0;
                    var s = r.scrollLeft - r.clientWidth;
                    if (s > 0 && !(0 === r.scrollLeft && e < 0 || r.scrollLeft === s && e > 0)) return !0
                }
                return !1
            }

            function s(s) {
                var c = r(s),
                    u = c[0],
                    d = c[1];
                o(u, d) || (a = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (d ? i(t, "top", t.scrollTop - d * e.settings.wheelSpeed) : i(t, "top", t.scrollTop + u * e.settings.wheelSpeed), a = !0) : e.scrollbarXActive && !e.scrollbarYActive && (u ? i(t, "left", t.scrollLeft + u * e.settings.wheelSpeed) : i(t, "left", t.scrollLeft - d * e.settings.wheelSpeed), a = !0) : (i(t, "top", t.scrollTop - d * e.settings.wheelSpeed), i(t, "left", t.scrollLeft + u * e.settings.wheelSpeed)), l(t), a = a || n(u, d), a && (s.stopPropagation(), s.preventDefault()))
            }
            var a = !1;
            "undefined" != typeof window.onwheel ? e.event.bind(t, "wheel", s) : "undefined" != typeof window.onmousewheel && e.event.bind(t, "mousewheel", s)
        }
        var o = t("../instances"),
            l = t("../update-geometry"),
            i = t("../update-scroll");
        e.exports = function(t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {
        "../instances": 17,
        "../update-geometry": 18,
        "../update-scroll": 19
    }],
    13: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            e.event.bind(t, "scroll", function() {
                l(t)
            })
        }
        var o = t("../instances"),
            l = t("../update-geometry");
        e.exports = function(t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {
        "../instances": 17,
        "../update-geometry": 18
    }],
    14: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n() {
                var t = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer
            }

            function r() {
                c || (c = setInterval(function() {
                    return l.get(t) ? (s(t, "top", t.scrollTop + u.top), s(t, "left", t.scrollLeft + u.left), void i(t)) : void clearInterval(c)
                }, 50))
            }

            function a() {
                c && (clearInterval(c), c = null), o.stopScrolling(t)
            }
            var c = null,
                u = {
                    top: 0,
                    left: 0
                },
                d = !1;
            e.event.bind(e.ownerDocument, "selectionchange", function() {
                t.contains(n()) ? d = !0 : (d = !1, a())
            }), e.event.bind(window, "mouseup", function() {
                d && (d = !1, a())
            }), e.event.bind(window, "keyup", function() {
                d && (d = !1, a())
            }), e.event.bind(window, "mousemove", function(e) {
                if (d) {
                    var n = {
                            x: e.pageX,
                            y: e.pageY
                        },
                        l = {
                            left: t.offsetLeft,
                            right: t.offsetLeft + t.offsetWidth,
                            top: t.offsetTop,
                            bottom: t.offsetTop + t.offsetHeight
                        };
                    n.x < l.left + 3 ? (u.left = -5, o.startScrolling(t, "x")) : n.x > l.right - 3 ? (u.left = 5, o.startScrolling(t, "x")) : u.left = 0, n.y < l.top + 3 ? (l.top + 3 - n.y < 5 ? u.top = -5 : u.top = -20, o.startScrolling(t, "y")) : n.y > l.bottom - 3 ? (n.y - l.bottom + 3 < 5 ? u.top = 5 : u.top = 20, o.startScrolling(t, "y")) : u.top = 0, 0 === u.top && 0 === u.left ? a() : r()
                }
            })
        }
        var o = t("../../lib/helper"),
            l = t("../instances"),
            i = t("../update-geometry"),
            s = t("../update-scroll");
        e.exports = function(t) {
            var e = l.get(t);
            r(t, e)
        }
    }, {
        "../../lib/helper": 5,
        "../instances": 17,
        "../update-geometry": 18,
        "../update-scroll": 19
    }],
    15: [function(t, e, n) {
        "use strict";

        function r(t, e, n, r) {
            function o(n, r) {
                var o = t.scrollTop,
                    l = t.scrollLeft,
                    i = Math.abs(n),
                    s = Math.abs(r);
                if (s > i) {
                    if (r < 0 && o === e.contentHeight - e.containerHeight || r > 0 && 0 === o) return !e.settings.swipePropagation
                } else if (i > s && (n < 0 && l === e.contentWidth - e.containerWidth || n > 0 && 0 === l)) return !e.settings.swipePropagation;
                return !0
            }

            function a(e, n) {
                s(t, "top", t.scrollTop - n), s(t, "left", t.scrollLeft - e), i(t)
            }

            function c() {
                w = !0
            }

            function u() {
                w = !1
            }

            function d(t) {
                return t.targetTouches ? t.targetTouches[0] : t
            }

            function p(t) {
                return (!t.pointerType || "pen" !== t.pointerType || 0 !== t.buttons) && (!(!t.targetTouches || 1 !== t.targetTouches.length) || !(!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE))
            }

            function f(t) {
                if (p(t)) {
                    Y = !0;
                    var e = d(t);
                    g.pageX = e.pageX, g.pageY = e.pageY, v = (new Date).getTime(), null !== y && clearInterval(y), t.stopPropagation()
                }
            }

            function h(t) {
                if (!Y && e.settings.swipePropagation && f(t), !w && Y && p(t)) {
                    var n = d(t),
                        r = {
                            pageX: n.pageX,
                            pageY: n.pageY
                        },
                        l = r.pageX - g.pageX,
                        i = r.pageY - g.pageY;
                    a(l, i), g = r;
                    var s = (new Date).getTime(),
                        c = s - v;
                    c > 0 && (m.x = l / c, m.y = i / c, v = s), o(l, i) && (t.stopPropagation(), t.preventDefault())
                }
            }

            function b() {
                !w && Y && (Y = !1, e.settings.swipeEasing && (clearInterval(y), y = setInterval(function() {
                    return l.get(t) && (m.x || m.y) ? Math.abs(m.x) < .01 && Math.abs(m.y) < .01 ? void clearInterval(y) : (a(30 * m.x, 30 * m.y), m.x *= .8, void(m.y *= .8)) : void clearInterval(y)
                }, 10)))
            }
            var g = {},
                v = 0,
                m = {},
                y = null,
                w = !1,
                Y = !1;
            n ? (e.event.bind(window, "touchstart", c), e.event.bind(window, "touchend", u), e.event.bind(t, "touchstart", f), e.event.bind(t, "touchmove", h), e.event.bind(t, "touchend", b)) : r && (window.PointerEvent ? (e.event.bind(window, "pointerdown", c), e.event.bind(window, "pointerup", u), e.event.bind(t, "pointerdown", f), e.event.bind(t, "pointermove", h), e.event.bind(t, "pointerup", b)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", c), e.event.bind(window, "MSPointerUp", u), e.event.bind(t, "MSPointerDown", f), e.event.bind(t, "MSPointerMove", h), e.event.bind(t, "MSPointerUp", b)))
        }
        var o = t("../../lib/helper"),
            l = t("../instances"),
            i = t("../update-geometry"),
            s = t("../update-scroll");
        e.exports = function(t) {
            if (o.env.supportsTouch || o.env.supportsIePointer) {
                var e = l.get(t);
                r(t, e, o.env.supportsTouch, o.env.supportsIePointer)
            }
        }
    }, {
        "../../lib/helper": 5,
        "../instances": 17,
        "../update-geometry": 18,
        "../update-scroll": 19
    }],
    16: [function(t, e, n) {
        "use strict";
        var r = t("./instances"),
            o = t("./update-geometry"),
            l = {
                "click-rail": t("./handler/click-rail"),
                "drag-scrollbar": t("./handler/drag-scrollbar"),
                keyboard: t("./handler/keyboard"),
                wheel: t("./handler/mouse-wheel"),
                touch: t("./handler/touch"),
                selection: t("./handler/selection")
            },
            i = t("./handler/native-scroll");
        e.exports = function(t, e) {
            t.classList.add("ps");
            var n = r.add(t, "object" == typeof e ? e : {});
            t.classList.add("ps--theme_" + n.settings.theme), n.settings.handlers.forEach(function(e) {
                l[e](t)
            }), i(t), o(t)
        }
    }, {
        "./handler/click-rail": 9,
        "./handler/drag-scrollbar": 10,
        "./handler/keyboard": 11,
        "./handler/mouse-wheel": 12,
        "./handler/native-scroll": 13,
        "./handler/selection": 14,
        "./handler/touch": 15,
        "./instances": 17,
        "./update-geometry": 18
    }],
    17: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n() {
                t.classList.add("ps--focus")
            }

            function r() {
                t.classList.remove("ps--focus")
            }
            var o = this;
            o.settings = a();
            for (var l in e) o.settings[l] = e[l];
            o.containerWidth = null, o.containerHeight = null, o.contentWidth = null, o.contentHeight = null, o.isRtl = "rtl" === c.css(t, "direction"), o.isNegativeScroll = function() {
                var e = t.scrollLeft,
                    n = null;
                return t.scrollLeft = -1, n = t.scrollLeft < 0, t.scrollLeft = e, n
            }(), o.negativeScrollAdjustment = o.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, o.event = new u, o.ownerDocument = t.ownerDocument || document, o.scrollbarXRail = c.appendTo(c.create("div", "ps__scrollbar-x-rail"), t), o.scrollbarX = c.appendTo(c.create("div", "ps__scrollbar-x"), o.scrollbarXRail), o.scrollbarX.setAttribute("tabindex", 0), o.event.bind(o.scrollbarX, "focus", n), o.event.bind(o.scrollbarX, "blur", r), o.scrollbarXActive = null, o.scrollbarXWidth = null, o.scrollbarXLeft = null, o.scrollbarXBottom = s.toInt(c.css(o.scrollbarXRail, "bottom")), o.isScrollbarXUsingBottom = o.scrollbarXBottom === o.scrollbarXBottom, o.scrollbarXTop = o.isScrollbarXUsingBottom ? null : s.toInt(c.css(o.scrollbarXRail, "top")), o.railBorderXWidth = s.toInt(c.css(o.scrollbarXRail, "borderLeftWidth")) + s.toInt(c.css(o.scrollbarXRail, "borderRightWidth")), c.css(o.scrollbarXRail, "display", "block"), o.railXMarginWidth = s.toInt(c.css(o.scrollbarXRail, "marginLeft")) + s.toInt(c.css(o.scrollbarXRail, "marginRight")), c.css(o.scrollbarXRail, "display", ""), o.railXWidth = null, o.railXRatio = null, o.scrollbarYRail = c.appendTo(c.create("div", "ps__scrollbar-y-rail"), t), o.scrollbarY = c.appendTo(c.create("div", "ps__scrollbar-y"), o.scrollbarYRail), o.scrollbarY.setAttribute("tabindex", 0), o.event.bind(o.scrollbarY, "focus", n), o.event.bind(o.scrollbarY, "blur", r), o.scrollbarYActive = null, o.scrollbarYHeight = null, o.scrollbarYTop = null, o.scrollbarYRight = s.toInt(c.css(o.scrollbarYRail, "right")), o.isScrollbarYUsingRight = o.scrollbarYRight === o.scrollbarYRight, o.scrollbarYLeft = o.isScrollbarYUsingRight ? null : s.toInt(c.css(o.scrollbarYRail, "left")), o.scrollbarYOuterWidth = o.isRtl ? s.outerWidth(o.scrollbarY) : null, o.railBorderYWidth = s.toInt(c.css(o.scrollbarYRail, "borderTopWidth")) + s.toInt(c.css(o.scrollbarYRail, "borderBottomWidth")), c.css(o.scrollbarYRail, "display", "block"), o.railYMarginHeight = s.toInt(c.css(o.scrollbarYRail, "marginTop")) + s.toInt(c.css(o.scrollbarYRail, "marginBottom")), c.css(o.scrollbarYRail, "display", ""), o.railYHeight = null, o.railYRatio = null
        }

        function o(t) {
            return t.getAttribute("data-ps-id")
        }

        function l(t, e) {
            t.setAttribute("data-ps-id", e)
        }

        function i(t) {
            t.removeAttribute("data-ps-id")
        }
        var s = t("../lib/helper"),
            a = t("./default-setting"),
            c = t("../lib/dom"),
            u = t("../lib/event-manager"),
            d = t("../lib/guid"),
            p = {};
        n.add = function(t, e) {
            var n = d();
            return l(t, n), p[n] = new r(t, e), p[n]
        }, n.remove = function(t) {
            delete p[o(t)], i(t)
        }, n.get = function(t) {
            return p[o(t)]
        }
    }, {
        "../lib/dom": 2,
        "../lib/event-manager": 3,
        "../lib/guid": 4,
        "../lib/helper": 5,
        "./default-setting": 7
    }],
    18: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
        }

        function o(t, e) {
            var n = {
                width: e.railXWidth
            };
            e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft, e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, i.css(e.scrollbarXRail, n);
            var r = {
                top: t.scrollTop,
                height: e.railYHeight
            };
            e.isScrollbarYUsingRight ? e.isRtl ? r.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : r.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? r.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : r.left = e.scrollbarYLeft + t.scrollLeft, i.css(e.scrollbarYRail, r), i.css(e.scrollbarX, {
                left: e.scrollbarXLeft,
                width: e.scrollbarXWidth - e.railBorderXWidth
            }), i.css(e.scrollbarY, {
                top: e.scrollbarYTop,
                height: e.scrollbarYHeight - e.railBorderYWidth
            })
        }
        var l = t("../lib/helper"),
            i = t("../lib/dom"),
            s = t("./instances"),
            a = t("./update-scroll");
        e.exports = function(t) {
            var e = s.get(t);
            e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight;
            var n;
            t.contains(e.scrollbarXRail) || (n = i.queryChildren(t, ".ps__scrollbar-x-rail"), n.length > 0 && n.forEach(function(t) {
                i.remove(t)
            }), i.appendTo(e.scrollbarXRail, t)), t.contains(e.scrollbarYRail) || (n = i.queryChildren(t, ".ps__scrollbar-y-rail"), n.length > 0 && n.forEach(function(t) {
                i.remove(t)
            }), i.appendTo(e.scrollbarYRail, t)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = r(e, l.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = l.toInt((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = r(e, l.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = l.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), o(t, e), e.scrollbarXActive ? t.classList.add("ps--active-x") : (t.classList.remove("ps--active-x"), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, a(t, "left", 0)), e.scrollbarYActive ? t.classList.add("ps--active-y") : (t.classList.remove("ps--active-y"), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, a(t, "top", 0))
        }
    }, {
        "../lib/dom": 2,
        "../lib/helper": 5,
        "./instances": 17,
        "./update-scroll": 19
    }],
    19: [function(t, e, n) {
        "use strict";
        var r = t("./instances"),
            o = function(t) {
                var e = document.createEvent("Event");
                return e.initEvent(t, !0, !0), e
            };
        e.exports = function(t, e, n) {
            if ("undefined" == typeof t) throw "You must provide an element to the update-scroll function";
            if ("undefined" == typeof e) throw "You must provide an axis to the update-scroll function";
            if ("undefined" == typeof n) throw "You must provide a value to the update-scroll function";
            "top" === e && n <= 0 && (t.scrollTop = n = 0, t.dispatchEvent(o("ps-y-reach-start"))), "left" === e && n <= 0 && (t.scrollLeft = n = 0, t.dispatchEvent(o("ps-x-reach-start")));
            var l = r.get(t);
            "top" === e && n >= l.contentHeight - l.containerHeight && (n = l.contentHeight - l.containerHeight, n - t.scrollTop <= 2 ? n = t.scrollTop : t.scrollTop = n, t.dispatchEvent(o("ps-y-reach-end"))), "left" === e && n >= l.contentWidth - l.containerWidth && (n = l.contentWidth - l.containerWidth, n - t.scrollLeft <= 2 ? n = t.scrollLeft : t.scrollLeft = n, t.dispatchEvent(o("ps-x-reach-end"))), void 0 === l.lastTop && (l.lastTop = t.scrollTop), void 0 === l.lastLeft && (l.lastLeft = t.scrollLeft), "top" === e && n < l.lastTop && t.dispatchEvent(o("ps-scroll-up")), "top" === e && n > l.lastTop && t.dispatchEvent(o("ps-scroll-down")), "left" === e && n < l.lastLeft && t.dispatchEvent(o("ps-scroll-left")), "left" === e && n > l.lastLeft && t.dispatchEvent(o("ps-scroll-right")), "top" === e && n !== l.lastTop && (t.scrollTop = l.lastTop = n, t.dispatchEvent(o("ps-scroll-y"))), "left" === e && n !== l.lastLeft && (t.scrollLeft = l.lastLeft = n, t.dispatchEvent(o("ps-scroll-x")))
        }
    }, {
        "./instances": 17
    }],
    20: [function(t, e, n) {
        "use strict";
        var r = t("../lib/helper"),
            o = t("../lib/dom"),
            l = t("./instances"),
            i = t("./update-geometry"),
            s = t("./update-scroll");
        e.exports = function(t) {
            var e = l.get(t);
            e && (e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, o.css(e.scrollbarXRail, "display", "block"), o.css(e.scrollbarYRail, "display", "block"), e.railXMarginWidth = r.toInt(o.css(e.scrollbarXRail, "marginLeft")) + r.toInt(o.css(e.scrollbarXRail, "marginRight")), e.railYMarginHeight = r.toInt(o.css(e.scrollbarYRail, "marginTop")) + r.toInt(o.css(e.scrollbarYRail, "marginBottom")), o.css(e.scrollbarXRail, "display", "none"), o.css(e.scrollbarYRail, "display", "none"), i(t), s(t, "top", t.scrollTop), s(t, "left", t.scrollLeft), o.css(e.scrollbarXRail, "display", ""), o.css(e.scrollbarYRail, "display", ""))
        }
    }, {
        "../lib/dom": 2,
        "../lib/helper": 5,
        "./instances": 17,
        "./update-geometry": 18,
        "./update-scroll": 19
    }]
}, {}, [1]);