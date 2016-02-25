import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import {connect} from "react-redux"

class App extends Component {

    componentDidMount() {
        debugger;
        //wx.getLocation({
        //    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        //    success: function (res) {
        //        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        //        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        //        var speed = res.speed; // 速度，以米/每秒计
        //        var accuracy = res.accuracy; // 位置精度
        //        alert(JSON.stringify(res));
        //    },
        //    fail: function (error) {
        //        alert(error);
        //    }
        //});
        //
        //if (navigator.geolocation) {
        //    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
        //        // 指示浏览器获取高精度的位置，默认为false
        //        enableHighAccuracy: true,
        //        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
        //        timeout: 10000,
        //        // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
        //        maximumAge: 3000
        //    });
        //} else {
        //    alert("Your browser does not support Geolocation!");
        //}

        function locationError(error) {
            debugger;
            switch (error.code) {
                case error.TIMEOUT:
                    alert("A timeout occured! Please try again!");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert('We can\'t detect your location. Sorry!');
                    break;
                case error.PERMISSION_DENIED:
                    alert('Please allow geolocation access for this to work.');
                    break;
                case error.UNKNOWN_ERROR:
                    alert('An unknown error occured!');
                    break;
            }
        }

        function locationSuccess(position) {
            debugger;
            var coords = position.coords;
            var longitude = position.coords.longitude;
            var latitude = position.coords.latitude;
            alert("坐标经度为：" + latitude + "， 纬度为：" + longitude);
        }
    }

    render() {
        //全局
        global.appStyles = require('./App.scss');

        const {children} = this.props;
        return (
            <div className={appStyles.app}>
                {children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

App.propsTypes = {
    children: PropTypes.node
}

export default connect(mapStateToProps, {})(App)