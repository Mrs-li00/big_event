$(function() {
    var form = layui.form
    var layer = layui.layer

    $('#link_reg').on('click', function() {
        $('.reg_box').show()
        $('.login_box').hide()
    })

    $('#link_login').on('click', function() {
        $('.login_box').show()
        $('.reg_box').hide()
    })
  
    form.verify ({
        pass: [
            /^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg_box [name=password]').val()
            if(pwd !== value) {
                return ('两次密码不一致')
            }
        } 
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e) {
        e.preventDefault()

        // var data =  {username: $('#form_reg [name=username]').val(), 
        // password: $('#form_reg [name=password]').val()}

        $.post('/api/reguser', $(this).serialize(),
        function(res) {
           if(res.status !== 0) {
               return layer.msg(res.message)
            }
           layer.msg('提交成功')
           //    模拟人的点击行为
           $('#link_login').click()
        
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                location.href= '/index_01.html'
            }
        })
    })
})