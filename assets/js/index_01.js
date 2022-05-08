$(function() {
    var layer = layui.layer
    getUserInfo()

    // 为退出按钮绑定点击事件
    $('#btnlogout').on('click', function() {
        // console.log('ok');
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1.清空键值对
            localStorage.removeItem('token')
            // 2.返回到登录页面
            location.href = '/login_01.html'
            layer.close(index);
          });
    })
})

// 获取用户的基本信息
function getUserInfo() {

   $.ajax({
      method: 'GET',
      url : '/my/userinfo',
      success: function(res) {
         if(res.status !== 0) {
             return layer.msg('获取用户信息失败')
        }
        //  渲染用户信息头像
        runAvatar(res.data)
        },
        // 不论成功还是失败,都会调用complete函数
        // complete: function(res) {
        //     console.log(res);
        //     // console.log('执行了回调函数');
        //     if(res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！') {
        //         //  1.清空键值对值
        //         localStorage.removeItem('token')
        //         // 2.返回到登录页面
        //         location.href = '/login_01.html'
        //     }
        // }
    })
}

// 渲染用户头像信息
function runAvatar(user) {
    var name = user.nickname|| user.username 
   //   设置欢迎文本
    $('#welcom').html('欢迎&namp&namp'+ name)
    if(user.user_pic !== null) {
    //  设置图片头像
      $('.layui-nav-img').attr('src', user.user_pic).show()
      $('#text_avatar').hide()
    }else{
    // 设置文本头像
    var frist = name[0].toUpperCase()
      $('#text_avatar').html(frist)
      $('.layui-nav-img').hide()
    }
}