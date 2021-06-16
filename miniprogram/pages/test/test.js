let app = getApp();
Page({
  data: {
    canvasWidth:0,
    canvasHeight:0,
    serverImgPre:'https://staticds.fuiou.com/sys/ds/o2oh5/baina_images/',
  },
  onLoad: function (options) {
    this.getCanvasSize();
    this.initCanvas();
  },
  canvas:null,
  initCanvas(){
    var ctx = wx.createCanvasContext('customCanvas');
    this.canvas = ctx;
    this.drawBack();
    // this.setTextBaseline();
  },
  drawBack(){//绘制背景
    let ctx = this.canvas;
    let _this = this;
    wx.getImageInfo({//获取图片信息
      src: this.data.serverImgPre +'sjx/sjx_133.jpg',
      success(res){
        let canvasWidth = _this.data.canvasWidth;
        let x = canvasWidth / 750;
        console.log("getImageInfo:",res)
        ctx.drawImage(res.path,0,0,res.width,res.height);
        ctx.save();

        // ctx.setTextAlign('center');
        ctx.setFillStyle('#fff');
        ctx.setFontSize(16);
        let strLength = ctx.measureText('欢迎使用田田记账本').width;
        // strLength = app.rpxToPx(strLength,canvasWidth);
        ctx.fillText('欢迎使用田田记账本', (canvasWidth-strLength)/2,200*x);
        ctx.save();

        ctx.beginPath();
        ctx.arc(canvasWidth/2,400*x,60,0,2*Math.PI);
        ctx.clip();
        ctx.fillStyle = '#fff'
        ctx.fill();
        ctx.drawImage('/utils/images/qrcode.jpg', (canvasWidth - 100)/2, 400 * x-50,100,100);
        ctx.save();
        
        ctx.draw();

      }
    });
  },
  qrCodeLongpress(){//保存二维码
    let _this = this;
    wx.showActionSheet({
      itemList: ['保存图片'],
      success(res) {
        if(res.tapIndex === 0){
          wx.getSetting({
            success(res) {
              let authSetting = res.authSetting;
              console.log("authSetting:", authSetting)
              if (authSetting['scope.writePhotosAlbum']!=undefined){
                if (authSetting['scope.writePhotosAlbum'] === true){
                  _this.saveQrcode();
                }else{
                  wx.openSetting({
                    success(res){
                      console.log(res.authSetting);
                      if(res.authSetting['scope.writePhotosAlbum'] === true){
                        _this.saveQrcode();
                      }
                    }
                  });
                }
              }else{
                wx.authorize({
                  scope:'scope.writePhotosAlbum',
                  success(){
                    _this.saveQrcode();
                  }
                });
              }
            }
          });
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  saveQrcode(){
    wx.canvasToTempFilePath({
      canvasId: 'customCanvas',
      quality: 1,
      success(tempFile) {
        console.log("canvasToTempFilePath:", tempFile);
        wx.saveImageToPhotosAlbum({
          filePath: tempFile.tempFilePath,
          success(res) {
            app.showModal('保存成功!');
          }
        });
      }
    });
  },
  getCanvasSize(){//获取canvas的宽高
    let systemInfo = wx.getSystemInfoSync();
    console.log("systemInfo:", systemInfo)
    this.setData({
      canvasWidth: systemInfo.windowWidth,
      canvasHeight: systemInfo.windowHeight
    });
  },
  setTransform(){//使用矩阵重新设置（覆盖）当前变换 的方法
    let ctx = this.canvas;

    ctx.draw();
  },
  setTextBaseline(){//设置文字的竖起对齐
    let ctx = this.canvas;

    ctx.setStrokeStyle('red');
    ctx.moveTo(5,75);
    ctx.lineTo(295,75);
    ctx.stroke();

    ctx.fillStyle = 'DarkMagenta';
    ctx.setFontSize(20);

    ctx.setTextBaseline('top');
    ctx.fillText('top',5,75);

    ctx.setTextBaseline('middle');
    ctx.fillText('middle',50,75);

    ctx.setTextBaseline('bottom');
    ctx.fillText('bottom',120,75);

    ctx.setTextBaseline('normal');
    ctx.fillText('normal',200,75);


    ctx.draw();
  },
  setLineAlign(){//设置文字的对齐
    let ctx = this.canvas;

    ctx.setStrokeStyle('red');
    ctx.moveTo(150,20);
    ctx.lineTo(150,170);
    ctx.stroke();

    ctx.setFontSize(15);
    ctx.setTextAlign('left');
    ctx.fillText('textAlign=left',150,60);

    ctx.setTextAlign('center');
    ctx.fillText('textAlign=center',150,80);

    ctx.setTextAlign('right');
    ctx.fillText('textAlign=right',150,100);

    ctx.draw();
  },
  setShadow(){//设定阴影样式
    let ctx = this.canvas;

    ctx.setFillStyle('red');
    ctx.setShadow(10,50,50,'blue');
    ctx.fillRect(10,10,150,70);

    ctx.draw();
  },
  setMiterLimit(){//设置最大斜接长度
    let ctx = this.canvas;

    ctx.beginPath();
    ctx.setLineWidth(10);
    ctx.setLineJoin('miter');
    ctx.setMiterLimit(1);
    ctx.moveTo(10,10);
    ctx.lineTo(100,50);
    ctx.lineTo(10,90);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineWidth(10);
    ctx.setLineJoin('miter');
    ctx.setMiterLimit(2);
    ctx.moveTo(50, 10)
    ctx.lineTo(140, 50)
    ctx.lineTo(50, 90)
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineWidth(10);
    ctx.setLineJoin('miter');
    ctx.setMiterLimit(3);
    ctx.moveTo(90, 10);
    ctx.lineTo(180, 50);
    ctx.lineTo(90, 90);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineWidth(10);
    ctx.setLineJoin('miter');
    ctx.setMiterLimit(4);
    ctx.moveTo(130,10);
    ctx.lineTo(220,50);
    ctx.lineTo(130,90);
    ctx.stroke();
    
    ctx.draw();
  },
  setLineJoin(){//设置线条交点的样式
    let ctx = this.canvas;

    ctx.beginPath();
    ctx.moveTo(10,10);
    ctx.lineTo(100,50);
    ctx.lineTo(10,90);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineJoin('bevel');//斜角
    ctx.setLineWidth(10);
    ctx.moveTo(50,10);
    ctx.lineTo(140,50);
    ctx.lineTo(50,90);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineJoin('round');//圆角
    ctx.setLineWidth(10);
    ctx.moveTo(90,10);
    ctx.lineTo(180,50);
    ctx.lineTo(90,90);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineJoin('miter');//尖角
    ctx.setLineWidth('10');
    ctx.moveTo(130,10);
    ctx.lineTo(220,50);
    ctx.lineTo(130,90);
    ctx.stroke();

    ctx.draw();
  },
  setLineDash(){//设置虚线样式
    let ctx = this.canvas;

    ctx.setLineDash([5,10,15,20],5);

    ctx.beginPath();
    ctx.moveTo(0,100);
    ctx.lineTo(400,100);
    ctx.stroke();

    ctx.draw();
  },
  setLineCap(){//设置线条的端点样式
    let ctx = this.canvas;
    ctx.beginPath();
    ctx.moveTo(10,10);
    ctx.lineTo(150,10);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineCap('butt');//向线条的每个末端添加平直的边缘
    ctx.setLineWidth(10);
    ctx.moveTo(10,30);
    ctx.lineTo(150,30);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineCap('round');//向线条的每个末端添加圆形线帽。
    ctx.setLineWidth(10);
    ctx.moveTo(10,50);
    ctx.lineTo(150,50);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineCap('square');//向线条的每个末端添加正方形线帽
    ctx.setLineWidth(10);
    ctx.moveTo(10,70);
    ctx.lineTo(150,70);
    ctx.stroke();

    ctx.draw();
  },
  setGlobalAlpha(){//设置透明度
    let ctx = this.canvas;

    ctx.setFillStyle('red');
    ctx.fillRect(10,10,150,100);
    ctx.setGlobalAlpha(0.2);
    ctx.setFillStyle('blue');
    ctx.fillRect(50,50,150,100);
    ctx.setFillStyle('yellow');
    ctx.fillRect(100,100,150,100);

    ctx.draw();
  },
  scale(){//缩放，多次调用 倍数会相乘
    let ctx = this.canvas;
    ctx.strokeRect(10,10,25,15);
    ctx.scale(2,2);
    ctx.strokeRect(10,10,25,15);
    ctx.scale(2,2);
    ctx.strokeRect(10,10,25,15);

    ctx.draw();
  },
  rotate(){//以原点为中心顺时针旋转当前坐标轴
    let ctx = this.canvas;
    ctx.strokeRect(100,10,150,100);
    ctx.rotate(20*Math.PI/180);
    ctx.strokeRect(100,10,150,100);
    ctx.rotate(20*Math.PI/100);
    ctx.strokeRect(100,10,150,100);

    ctx.draw();
  },
  quadraticCurveTo() {//二次贝塞尔曲线
    let ctx = this.canvas;
    ctx.beginPath();
    ctx.arc(20,20,2,0,2*Math.PI);
    ctx.setFillStyle('red');
    ctx.fill();

    ctx.beginPath();
    ctx.arc(200,20,2,0,2*Math.PI);
    ctx.setFillStyle('lightgreen');
    ctx.fill();

    ctx.beginPath();
    ctx.arc(20,100,2,0,2*Math.PI);
    ctx.setFillStyle('blue');
    ctx.fill();

    ctx.setFillStyle('black');
    ctx.setFontSize(12);

    //draw guides
    ctx.beginPath();
    ctx.moveTo(20,20);
    ctx.lineTo(20,100);
    ctx.lineTo(200,20);
    ctx.setStrokeStyle('#aaaaaa');
    ctx.stroke();

    //draw quadratic curve
    ctx.beginPath();
    ctx.moveTo(20,20);
    ctx.quadraticCurveTo(20,100,200,20);
    ctx.setStrokeStyle('black');
    ctx.stroke();

    ctx.draw();
  },
  measureText(){//测量文本尺寸信息
    let ctx = this.canvas;
    ctx.font = 'italic bold 20px cursive';
    let metrics = ctx.measureText('Hello World');
    console.log(metrics.width);
  },
  fill(){//填充,不会把fillRect()包含进去
    let ctx = this.canvas;
    ctx.rect(10,10,100,30);
    ctx.setFillStyle('yellow');
    ctx.fill();

    ctx.beginPath();
    ctx.rect(10,40,100,30);
    ctx.setFillStyle('blue');
    ctx.fillRect(10,70,100,30);

    ctx.rect(10,100,100,30);
    ctx.setFillStyle('red');
    ctx.fill();
    ctx.draw();
  },
  pattern(){//对指定的图像创建模式
    let ctx = this.canvas;
    let pattern = ctx.createPattern('/utils/images/avatar.jpg','repeat-x');
    ctx.fillStyle = pattern;
    ctx.fillRect(0,0,400,400);
    ctx.draw();
  },
  linearGradient(){//创建一个线性渐变
    let ctx = this.canvas;
    let grd = ctx.createLinearGradient(10,10,100,100);
    grd.addColorStop(0,'red');
    grd.addColorStop(0.5,'orange');
    grd.addColorStop(1,'yellow');
    ctx.setFillStyle(grd);
    ctx.fillRect(10,10,150,80);
    ctx.draw();
  },
  circularGradient(){//圆形渐变
    let ctx = this.canvas;
    let grd = ctx.createCircularGradient(75,50,50);
    grd.addColorStop(0,'red');
    grd.addColorStop(1,'white');
    ctx.setFillStyle(grd);
    ctx.fillRect(10,10,150,80);
    ctx.draw();
  },
  bezierCurveTo(){//贝塞尔曲线
    let ctx = this.canvas;
    ctx.beginPath();
    ctx.arc(20,20,2,0,2*Math.PI);
    ctx.setFillStyle('red');
    ctx.fill();

    ctx.beginPath();
    ctx.arc(200,20,2,0,2*Math.PI);
    ctx.setFillStyle('lightgreen');
    ctx.fill();

    ctx.beginPath();
    ctx.arc(20,100,2,0,2*Math.PI);
    ctx.arc(200,100,2,0,2*Math.PI);
    ctx.setFillStyle('blue');
    ctx.fill();

    ctx.setFillStyle('black');
    ctx.setFontSize(12);

    ctx.beginPath();
    ctx.moveTo(20,20);
    ctx.lineTo(20,100);
    ctx.lineTo(150,75);

    ctx.moveTo(200,20);
    ctx.lineTo(200,100);
    ctx.lineTo(75,70);
    ctx.setStrokeStyle('#aaaaaa');
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(20,20);
    ctx.bezierCurveTo(20,100,200,100,200,20);
    ctx.setStrokeStyle('black');
    ctx.stroke();

    ctx.draw();
  },
  drawImage(){//绘制图片并保存到相册
    let ctx = this.canvas,
        _this = this;
    // 网络图片
    let serverImgPre = 'https://staticds.fuiou.com/sys/ds/o2oh5/baina_images/';
    ctx.save();
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, 2 *Math.PI,false);//画一个圆形裁剪区域
    ctx.clip();
    wx.getImageInfo({
      src: serverImgPre+'sjx/sjx_133.jpg',
      success(res){
        ctx.drawImage(res.path,0,0,100,100);
        ctx.draw();
        wx.canvasToTempFilePath({//生成一张图片
          canvasId: 'customCanvas',
          fileType: 'jpg',
          success(res) {
            console.log("canvasToTempFilePath:", res);
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success() {
                    wx.showToast({
                      title: '图片保存成功'
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  },
  drawAvatar(){//绘制头像
    this.canvas.drawImage('/utils/images/avatar.jpg', 0, 0, 100, 100);
    this.canvas.draw();
    wx.canvasToTempFilePath({//生成一张图片
      canvasId:'customCanvas',
      fileType:'jpg',
      success(res){
        console.log("canvasToTempFilePath:",res);
        wx.authorize({
          scope:'scope.writePhotosAlbum',
          success(){
            wx.saveImageToPhotosAlbum({
              filePath:res.tempFilePath,
              success(){
                wx.showToast({
                  title:'图片保存成功'
                });
              }
            });
          }
        });
      }
    });
  },
  fillText(){//绘制文字
    let ctx = this.canvas;
    ctx.setFillStyle('#5f6fee');
    ctx.setFontSize(20);
    ctx.fillText('TXY',20,20);
    ctx.draw();
  },
  onHide: function () {

  },
})