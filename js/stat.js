'use strict';

window.renderStatistics = function (ctx, names, times) {
  var WHITE_COLOR = 'rgb(255, 255, 255)';
  var BLACK_COLOR = 'rgba(0, 0, 0, 0.7)';

  var rect = {
    x: 110,
    y: 20,
    width: 420,
    height: 270
  };

  var histogram = {
    height: 150,
    barWidth: 40,
    barMargin: 50,
    barColorMe: 'rgba(255, 0, 0, 1)',
    getBarColorOthers: function () {
      return 'rgba(0, 0, ' + parseInt(Math.random() * 255, 10).toString() + ', 1)';
    }
  };

  var drawRect = function (context, color, rectangle) {
    context.fillStyle = color;
    context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  };

  var drawText = function (context, color, x, y, text) {
    context.fillStyle = color;
    context.textAlign = 'start';
    context.textBaseline = 'hanging';
    context.font = 'bold 16px PT Mono';
    context.fillText(text, x, y);
  };

  var findMaxTime = function (array) {
    return Math.max.apply(null, array);
  };

  var titles = ['Ура вы победили!', 'Список результатов:'];

  drawRect(ctx, BLACK_COLOR, rect);
  rect.x -= 10;
  rect.y -= 10;
  drawRect(ctx, WHITE_COLOR, rect);
  drawText(ctx, BLACK_COLOR, rect.x + rect.width / 2 - ctx.measureText(titles[0]).width / 2, rect.y + 10, titles[0]);
  drawText(ctx, BLACK_COLOR, rect.x + rect.width / 2 - ctx.measureText(titles[1]).width / 2, rect.y + 30, titles[1]);

  var maxValue = findMaxTime(times);
  var arrLength = names.length;
  rect.y = 250;
  rect.width = histogram.barWidth;
  for (var i = 0; i < arrLength; i++) {
    rect.x += histogram.barWidth + ((i > 0) ? histogram.barMargin : 0);
    rect.height = -1 * times[i] / maxValue * histogram.height;
    var currentBarColor = (names[i] === 'Вы') ? histogram.barColorMe : histogram.getBarColorOthers();
    drawRect(ctx, currentBarColor, rect);
    drawText(ctx, BLACK_COLOR, rect.x, rect.y + 5, names[i]);
    drawText(ctx, BLACK_COLOR, rect.x, rect.y + rect.height - 20, parseInt(times[i], 10));
  }
};
