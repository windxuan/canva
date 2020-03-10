// 在完成一段程序之前，首先。我们要知道完整的流程，应该如何去做：

// 1.生成随机字符串，包括0~9+a~Z 在其中随机选取6个，组成需要的验证码
// 2.填充
// 3.对比验证码正确性 ： 点击提交 --> 判断 --> 正确/错误

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
for (var i = 65; i < 122; i++) {
    if (i > 90 && i < 97) {
        continue;
    }
    arr.push(String.fromCharCode(i));
}

var value;

function createCanvas() {
    var canvasStr = '';
    value = '';
    for (var i = 0; i < 6; i++) {
        var a = arr[Math.floor(Math.random() * arr.length)];
        canvasStr += a + ' ';
        value += a;
    }
    // 填充
    var myCanvas = document.getElementById('myCanvas');
    var ctx = myCanvas.getContext('2d');
    var oImg = new Image();
    oImg.src = './images/bg-pic.jpg';
    // 在背景加载完成的时候，才画文字部分
    oImg.onload = function () {
        var pattern = ctx.createPattern(oImg, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ccc';
        ctx.font = '46px Roboto Slab';
        ctx.setTransform(1, -0.12, 0.3, 1, 0, 12);
        ctx.fillText(canvasStr, myCanvas.width / 2, 60);
    }
}

createCanvas();

// 对比验证码正确性
$('.submit').on('click', function () {
    showResult();
})

$('.refresh').on('click', function () {
    createCanvas();
})

function showResult() {
    var inputValue = $('.inputBox input').val();
    if (value == inputValue) {
        $('.inputBox span').css({
            background: 'url("./images/yes.png") no-repeat',
            'background-size': '100%',
            'display': 'inline-block',
        })
        $('.error').css({
            display: 'none'
        })
        createCanvas();
    } else {
        $('.inputBox span').css({
            background: 'url("./images/no.png") no-repeat',
            'background-size': '100%',
            'display': 'inline-block'
        })
        $('.error').css({
            display: 'block'
        }).html("验证码输入错误！请重新输入");
        createCanvas();
    }
}