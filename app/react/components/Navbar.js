import React from "react";
import {Link} from "react-router";
//import NavbarActions from "../actions/NavbarActions.js";
//import NavbarStore from "../stores/NavbarStore.js";
let count = 0;

//TODO::导航栏从=变成XXX

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = NavbarStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {

        NavbarStore.listen(this.onChange);

        /**
         * 实现悬浮导航 往上滑固定
         */

        var a = $(document).scrollTop();
        var b = $('.ff-navbar').outerHeight();
        $(window).scroll(function () {
            var c = $(document).scrollTop();
            if (c > b) {
                $('.ff-navbar').addClass('gizle');
                toggle3dBlock(false);//关闭上层弹出导航栏
            }
            else {
                $('.ff-navbar').removeClass('gizle');
            }
            if (c > a) {
                $('.ff-navbar').removeClass('sabit');
            }
            else {
                $('.ff-navbar').addClass('sabit');
            }
            a = $(document).scrollTop();
        });
        //

        /**
         * 3d 上层弹出层
         */
        $('.cd-3d-nav-trigger').on('click', function () {
            toggle3dBlock(!$('.cd-3d-nav-container').hasClass('nav-is-visible'));
        });

        //select a new item from the 3d navigation
        $('.cd-3d-nav a').on('click', function () {
            var selected = $(this);
            selected.parent('li').addClass('cd-selected').siblings('li').removeClass('cd-selected');
            updateSelectedNav('close');
        });

        $(window).on('resize', function () {
            window.requestAnimationFrame(updateSelectedNav);
        });

        function toggle3dBlock(addOrRemove) {
            if (typeof(addOrRemove) === 'undefined') addOrRemove = true;

            $('.navbarContain').toggleClass('nav-is-visible', addOrRemove);
            $('.container').toggleClass('nav-is-visible', addOrRemove);
            $('.cd-3d-nav-container').toggleClass('nav-is-visible', addOrRemove);
        }

        //this function update the .cd-marker position
        function updateSelectedNav(type) {
            var selectedItem = $('.cd-selected'),
                selectedItemPosition = selectedItem.index() + 1,
                leftPosition = selectedItem.offset().left,
                backgroundColor = selectedItem.data('color');

            $('.cd-marker').removeClassPrefix('color').addClass('color-' + selectedItemPosition).css({
                'left': leftPosition,
            });
            if (type == 'close') {
                $('.cd-marker').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                    toggle3dBlock(false);
                });
            }
        }

        $.fn.removeClassPrefix = function (prefix) {
            this.each(function (i, el) {
                var classes = el.className.split(" ").filter(function (c) {
                    return c.lastIndexOf(prefix, 0) !== 0;
                });
                el.className = $.trim(classes.join(" "));
            });
            return this;
        };


    }

    componentWillUnmount() {
        NavbarStore.unlisten(this.onChange);
    }

    clickHandle(event) {
        event.preventDefault()
        count += 1;
        //NavbarActions.updateOnlineUsers({onLineUsers: count});
    }


    onChange(state) {
        this.setState(state);
    }

    render() {
        return (
            <div>
                <nav className="cd-3d-nav-container">
                    <ul className="cd-3d-nav">
                        <li className="cd-selected">
                            <a href="##"></a>
                        </li>
                        <li>
                            <a href="##"></a>
                        </li>
                        <li>
                            <Link to="/ff/huoguo/home/homePage2" activeClassName="active">
                            </Link>
                        </li>
                        <li>
                            <a href="##"></a>
                        </li>
                        <li>
                            <a href="##"></a>
                        </li>
                    </ul>
                    <span className="cd-marker color-2"></span>
                </nav>


                <div className="ff-navbar navbarContain">

                    <div className="pure-g">
                        <div className="pure-u-6-24 navbar-menu cd-3d-nav-trigger">
                            <i className="iconfont icon-menu"></i>
                        </div>
                        <div className="pure-u-12-24 navbar-title">
                            <i>
                                <Link to='/ff/huoguo/home/homePage'>
                                    自餐厅
                                </Link>
                            </i>
                        </div>
                        <div className="pure-u-6-24 navbar-user">
                            <Link to='/ff/huoguo/stats'>
                                <i className="iconfont icon-user"></i>
                            </Link>
                        </div>
                    </div>


                </div>
            </div>

        );
    }
}

export default Navbar;

/**
 * TODO:;将悬浮固定顶层导航栏组成React 组件
 * TODO::将点击显示导航栏组成React组件
 */