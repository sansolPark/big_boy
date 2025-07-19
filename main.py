<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>냥자 런</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #000;
    }
    canvas {
      display: block;
      width: 100vw;
      height: 100vh;
    }
  </style>
</head>
<body>
  <canvas id="gameCanvas"></canvas>
  <script>
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let bgImage = new Image();
    bgImage.src = "bg.png";

    let runImages = [new Image(), new Image()];
    runImages[0].src = "run1.png";
    runImages[1].src = "run2.png";

    let catX = 100;
    let catY = canvas.height - 200;
    let catWidth = 100;
    let catHeight = 100;

    let frame = 0;
    let bgX = 0;

    function draw() {
      // 배경 스크롤
      bgX -= 2;
      if (bgX <= -canvas.width) {
        bgX = 0;
      }
      ctx.drawImage(bgImage, bgX, 0, canvas.width, canvas.height);
      ctx.drawImage(bgImage, bgX + canvas.width, 0, canvas.width, canvas.height);

      // 냥자 달리기
      let image = runImages[Math.floor(frame / 10) % 2];
      ctx.drawImage(image, catX, catY, catWidth, catHeight);

      frame++;
      requestAnimationFrame(draw);
    }

    bgImage.onload = () => {
      draw();
    };

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  </script>
</body>
</html>

   

   