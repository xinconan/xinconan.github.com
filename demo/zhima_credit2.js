window.onload = function () {
  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      cWidth = canvas.width,
      cHeight = canvas.height,
      score = canvas.attributes['data-score'].value,
      radius = 150,
      deg0 = Math.PI / 9,
      deg1 = Math.PI * 11 / 45;

  if (score < 400 || score > 900) {
    alert('信用分数区间：400~900');
  } else {
    var dot = new Dot(),
        dotSpeed = 0.03,
        textSpeed = Math.round(dotSpeed * 100 / deg1),
        angle = 0,
        credit = 400;

    (function drawFrame() {

      ctx.save();
      ctx.clearRect(0, 0, cWidth, cHeight);
      ctx.translate(cWidth / 2, cHeight / 2);
      ctx.rotate(8 * deg0);

      dot.x = radius * Math.cos(angle);
      dot.y = radius * Math.sin(angle);

      var aim = (score - 400) * deg1 / 100;
      if (angle < aim) {
        angle += dotSpeed;
      }
      dot.draw(ctx);

      // if (credit < score - textSpeed) {
      //   credit += textSpeed;
      // } else if (credit >= score - textSpeed && credit < score) {
      //   credit += 1;
      // }
      // text(credit);

      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
      ctx.arc(0, 0, radius, 0, angle, false);
      ctx.stroke();
      ctx.restore();

      window.requestAnimationFrame(drawFrame);

      ctx.save(); //中间刻度层
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
      ctx.lineWidth = 10;
      ctx.arc(0, 0, 135, 0, 11 * deg0, false);
      ctx.stroke();
      ctx.restore();

      ctx.save(); // 刻度线
      for(var i=0;i<6;i++){
        var _dot = new Dot();
        _dot.x = (radius-10) * Math.cos(angle);
        _dot.y = (radius-10) * Math.sin(angle);
        _dot.draw(ctx);
      }
      // for (var i = 0; i < 6; i++) {
      //   ctx.beginPath();
      //   ctx.lineWidth = 2;
      //   ctx.strokeStyle = 'rgba(255, 255, 255, .3)';
      //   ctx.moveTo(140, 0);
      //   ctx.lineTo(130, 0);
      //   ctx.stroke();
      //   ctx.rotate(deg1);
      // }
      ctx.restore();

      ctx.save(); // 细分刻度线
      // for (i = 0; i < 25; i++) {
      //   if (i % 5 !== 0){
      //     ctx.beginPath();
      //     ctx.lineWidth = 2;
      //     ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
      //     ctx.moveTo(140, 0);
      //     ctx.lineTo(133, 0);
      //     ctx.stroke();
      //   }
      //   ctx.rotate(deg1 / 5);
      // }
      ctx.restore();

      ctx.save(); //信用分数
      ctx.rotate(Math.PI / 2);
      ctx.restore();

      ctx.save(); //分数段
      ctx.rotate(Math.PI / 2 + deg0);
      for (i = 0; i < 5; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, .4)';
        ctx.font = '10px Microsoft yahei';
        ctx.textAlign = 'center';      
        ctx.rotate(deg1);
      }
      ctx.restore();

      ctx.save(); //信用阶段及评估时间文字
      ctx.rotate(10 * deg0);

      ctx.restore();


      // ctx.save(); //最外层轨道
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, .4)';
      ctx.lineWidth = 3;
      ctx.arc(0, 0, radius, 0, 11 * deg0, false);
      ctx.stroke();
      ctx.restore();

    })();
  }

  function Dot() {
    this.x = 0;
    this.y = 0;
    this.draw = function (ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, .7)';
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };
  }

  function text(process) {
    ctx.save();
    ctx.rotate(10 * deg0);
    ctx.fillStyle = '#000';
    ctx.font = '80px Microsoft yahei';
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'top';
    ctx.fillText(process, 0 ,10);
    ctx.restore();
  }
};
