/**
 * Created by o3oNet on 16-1-19.
 */
$(function () {


    toastr.options = {
        closeButton: true,
        progressBar: true,
        showMethod: 'slideDown',
        escapeHtml: true,
        timeOut: 4000,
        onShown: function () {
        },
        onHidden: function () {
        }
    };


    socketio = io.connect();
    socketio.on("connect", function () {
        toastr.options.timeOut = 3000;
        toastr.info("恭喜您!连接远端消息服务器成功!")
    });

    socketio.on("disconnect", function () {
        toastr.options.timeOut = 8000;
        toastr.warning("I'm Sorry,服务器似乎开了小差，请刷新页面重试！")
    });

    socketio.on("msg", function (msg) {
        toastr.error(msg.title);
    });


});