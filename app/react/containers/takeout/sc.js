/**
 * Created by Administrator on 2015/12/10.
 */
KISSY.add("mui/scrollspy/index", function (e, t, i, n) {
    "use strict";
    var o = t.all;
    var s, a, l = o("body"), r = window, u = o(r), c, f, d = -1, p = 0, m, h, v = 1, y, _ = 0, g = false, $ = r._tapEvt ? r._tapEvt : "ontouchstart" in r ? "tap" : "click", k = "onorientationchange" in r ? "orientationchange" : "resize", b = "scroll";

    function T(t, i) {
        var n = {
            activeCss: "active",
            floor: "[mui-scrollpay]",
            easing: "linear",
            duration: .6,
            offsetTop: 10,
            attrs: null,
            sticky: false,
            stickyOffsetTop: 0
        };
        this.$el = e.isString(t) ? o(t) : t;
        this.$floors = null;
        this.options = e.mix(n, i, true);
        this._init()
    }

    T.prototype = {
        constructor: T, _init: function () {
            this._render();
            m = this._getFloorOffset();
            this._bindEvt();
            this._updateCurNavIndex()
        }, _bindEvt: function () {
            var t = this, i = 0, d = t.supportSticky();
            if (t.$el.parent().hasClass("mui-zebra-module")) {
                var p = t.$el.parent().attr("id");
                t.$el.attr("id", p).insertBefore(t.$el.parent())
            }
            if (a) {
                s = new n(t.$el.one(".mui-scrollspy-iscroll")[0], {
                    scrollX: true,
                    scrollY: false,
                    preventDefault: false
                })
            }
            t.$el.delegate($, "li", function (e) {
                var i = o(e.currentTarget).index();
                if (t.$el.hasClass("open")) {
                    t.close()
                }
                t.goTo(i);
                e.halt()
            }).delegate($, ".mui-scrollspy-btn", function (e) {
                t.$el.hasClass("open") ? t.close() : t.open();
                e.halt()
            });
            u.on(b, function () {
                if (f)return;
                if (i <= 3) {
                    m = t._getFloorOffset();
                    i++
                }
                t._updateCurNavIndex()
            }).on(k, function () {
                t.refresh()
            });
            c.on($, function (e) {
                t.close();
                e.halt()
            });
            l.on("refresh", function () {
                t.refresh()
            });
            l.on("touchstart", function () {
                g = true
            });
            l.on("touchend touchcancel", function () {
                g = false
            });
            setTimeout(function () {
                if (f)return;
                t._updateCurNavIndex()
            }, 2e3);
            if (t.options.sticky && d) {
                l.addClass("mui-scrollspy-sticky-ios")
            } else if (t.options.sticky && !d) {
                t.elHeight = t.$el.outerHeight();
                l.addClass("mui-scrollspy-sticky-android");
                y = o('<div style="display:none;height: ' + t.elHeight + 'px"></div>').insertAfter(t.$el);
                if (!t.options.stickyOffsetTop) {
                    t.options.stickyOffsetTop = t.$el.offset().top
                }
                u.on("scroll touchmove", e.throttle(t._stickyEvt, 30, t));
                t._stickyEvt()
            }
            if (t.options.sticky) {
                t.$el.on("open", function () {
                    var e = u.scrollTop();
                    if (e < t.options.stickyOffsetTop) {
                        r.scrollTo(0, t.options.stickyOffsetTop)
                    }
                })
            }
        }, _render: function () {
            var t = this;
            if (!t.$el.length) {
                t.$el = o('<div class="mui-scrollspy auto-scrollspy"></div>').prependTo(l)
            }
            var i = l.all(t.options.floor), n = ['<div class="mui-scrollspy-iscroll"><ul>'];
            if (i[0] && o(i[0]).hasAttr("data-floor-order")) {
                var s = Array.prototype.slice.call(i, 0);
                s.sort(function (e, t) {
                    var i = parseInt(o(e).attr("data-floor-order")) || 0;
                    var n = parseInt(o(t).attr("data-floor-order")) || 0;
                    return i > n ? 1 : -1
                });
                i = o(s)
            }
            i.each(function (t, i) {
                var o = e.trim(t.attr("data-title") || t.text());
                if (o) {
                    n.push('<li data-spm-click="gostr=/tmalldqc;locaid=d1' + i + '"><span>' + o + "</span></li>");
                    t.addClass("mui-scrollspy-floor")
                }
            });
            n.push("</ul></div>");
            t.$el.addClass("mui-scrollspy").html(n.join(""));
            t.$floors = i.filter(".mui-scrollspy-floor");
            t._addAttr()
        }, _addAttr: function () {
            var t = this, i = 0;
            t.$navItems = t.$el.all("ul li");
            t.$navItems.each(function (n) {
                i++;
                n.attr(e.mix({"data-x": _}), t.attrs);
                _ += n.outerWidth()
            });
            p = i;
            h = t._getPageWidth();
            if (_ >= h - 20) {
                t.$el.prepend('<div class="mui-scrollspy-text">\u5207\u6362\u697c\u5c42</div><a href="javascript:;" class="mui-scrollspy-btn"></a>');
                _ += 40;
                a = true
            } else {
                t.$el.addClass("mui-scrollspy-flex")
            }
            c = o('<div class="mui-scrollspy-mask"></div>').appendTo(l)
        }, _getPageWidth: function () {
            return this.$el.width()
        }, _getFloorOffset: function () {
            var t = [];
            this.$floors.each(function (i) {
                var n = e.DOM.offset(i).top;
                t.push(n)
            });
            return t
        }, _updateNav: function (e, t) {
            t = t || 0;
            var i = this;
            var n = i.$navItems.item(e), o = n.attr("data-x"), a = i.options.activeCss, l = h - _, r = -(o - h / 2 + n.outerWidth() - 20);
            i.$navItems.filter("." + a).removeClass(a);
            n.addClass(a);
            if (r > 0) {
                r = 0
            } else if (r < l) {
                r = l
            }
            i.$el.attr("scroll-x", r);
            setTimeout(function () {
                if (!i.$el.hasClass("open")) {
                    s && s.scrollTo(r, 0, 200)
                }
            }, t)
        }, _updateCurNavIndex: function () {
            var e = this, t = u.scrollTop(), i = e.options.offsetTop, n = 0;
            for (var o in m) {
                if (t - m[p - o - 1] + i >= -50) {
                    n = p - o - 1;
                    break
                }
            }
            if (d !== n) {
                d = n;
                e._updateNav(n)
            }
        }, _stickyEvt: function () {
            var e = this;
            if (r.scrollY > e.options.stickyOffsetTop) {
                if (v === 1) {
                    v = 0;
                    e.$el.addClass("fixed");
                    y.show()
                }
            } else {
                if (v === 0) {
                    v = 1;
                    e.$el.removeClass("fixed");
                    y.hide()
                }
            }
        }, goTo: function (e) {
            var t = this, n;
            if (d === e || f)return;
            m = t._getFloorOffset();
            n = m[e] - t.options.offsetTop;
            d = e;
            f = true;
            t._updateNav(e, t.options.duration * 1e3);
            new i(window, {scrollTop: n}, {
                duration: t.options.duration,
                easing: t.options.easing,
                queue: false,
                complete: function () {
                    f = false;
                    setTimeout(function () {
                        t._checkPos(e, n)
                    }, 500)
                }
            }).run()
        }, _checkPos: function (e) {
            var t = this.$floors.item(e), i = m[e] - this.options.offsetTop, n;
            if (!t)return;
            n = t.offset().top - this.options.offsetTop;
            if (n !== i && !g) {
                r.$item = t;
                f = true;
                r.scrollTo(0, n);
                setTimeout(function () {
                    f = false
                }, 10)
            }
        }, open: function () {
            var e = this;
            e.$el.fire("open");
            e.$el.add(c).addClass("open");
            e.disable();
            l.on("touchmove", function (e) {
                e.preventDefault()
            })
        }, close: function () {
            var e = this;
            e.$el.fire("close");
            e.$el.add(c).removeClass("open");
            e.enable();
            l.detach("touchmove")
        }, enable: function () {
            var e = +this.$el.attr("scroll-x");
            s.scrollTo(e, 0, 0);
            s.enable()
        }, disable: function () {
            s.scrollTo(0, 0, 0);
            s.disable()
        }, refresh: function () {
            m = this._getFloorOffset();
            h = this._getPageWidth();
            s && s.refresh()
        }, supportSticky: function () {
            var e, t = "-webkit-sticky", i = document.createElement("i");
            i.style.position = t;
            e = i.style.position;
            i = null;
            return e === t
        }, setStickyOffsetTop: function (e) {
            this.options.stickyOffsetTop = e
        }
    };
    return T
});