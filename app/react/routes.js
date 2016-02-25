import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from "./containers/app/App.js";
import Home from "./components/Home";
import Payment from "./components/pay/Payment.js";

import NoMatch from "./components/NoMatch.js";

import IdentityPhone from "./components/IdentityPhone";

import CheckoutListPage from "./containers/takeout/CheckoutListPage";
import CounterPage from "./containers/CounterPage"
import TakeOutPage from "./containers/takeout/TakeOutPage"
import ChoiceAddressPage from "./containers/ChoiceAddressPage"
import HomePage from "./containers/homepage/HomePage"

import ZaiXianWeiTuoPage from "./containers/zaixianweituo/ZaiXianWeiTuoPage"
import OrderByStepsBasicInfoPage from "./containers/zaixianweituo/OrderByStepsBasicInfoPage"
import OrderByStepsDetaileInfoPage from "./containers/zaixianweituo/OrderByStepsDetaileInfoPage"
import ChaXunDaiKuanJinDu from "./containers/chaxundaikuanjindu/ChaXunDaiKuanJinDu"

import MessageBox from "./components/stepBoxNotify/StepMessageBox"


import config from "./config"

//TODO:按需加载

export default (store) => {
    debugger;
    return (
        <Route path={config.prefixUrl} component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="home">
                <IndexRoute component={HomePage}/>
                <Route path="HomePage" component={HomePage}/>
                <Route path="*" component={NoMatch}/>
            </Route>
            <Route path="component">
                <Route path="MessageBox" component={MessageBox}/>
                <Route path="*" component={NoMatch}/>
            </Route>
            <Route path="choiceAddress" component={ChoiceAddressPage}/>
            <Route path="takeOut" component={TakeOutPage}>
                <Route path=":productId/:isCategory" component={TakeOutPage}/>
                <Route path="*" component={TakeOutPage}/>
            </Route>
            <Route path="counter" component={CounterPage}/>
            <Route path="checkout" component={CheckoutListPage}/>
            <Route path="payment" component={Payment}/>
            <Route path="zaixianweituo" component={ZaiXianWeiTuoPage}>
                <IndexRoute component={OrderByStepsBasicInfoPage}/>
                <Route path="basic" component={OrderByStepsBasicInfoPage}/>
                <Route path="detail" component={OrderByStepsDetaileInfoPage}/>
            </Route>
            <Route path="chaxunjindu" component={ChaXunDaiKuanJinDu}/>

            <Route path="*" component={NoMatch}/>
        </Route>
    );
};