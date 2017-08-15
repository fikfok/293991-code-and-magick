'use strict';

window.renderStatistics = function (ctx, names, times) {
  var WHITE_COLOR = 'rgb(255, 255, 255)';
  var BLACK_COLOR = 'rgba(0, 0, 0, 0.7)';

  var scoreBoard = {
    x: 100,
    y: 10,
    width: 420,
    height: 270
  };

  var histogram = {
    height: 150,
    barWidth: 40,
    barMargin: 50,
    getBarColor: function (firstValue, secondValue) {
      return (firstValue.toLowerCase() === secondValue.toLowerCase()) ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, ' + Math.round(Math.random() * 105 + 150) + ', 1)';
    }
  };

  var textProperty = {
    textAlign: 'start',
    textBaseline: 'hanging',
    font: 'bold 16px PT Mono'
  };

  var drawRect = function (context, color, rectangle) {
    context.fillStyle = color;
    context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  };

  var drawText = function (context, color, x, y, text) {
    context.fillStyle = color;
    context.textAlign = textProperty.textAlign;
    context.textBaseline = textProperty.textBaseline;
    context.font = textProperty.font;
    context.fillText(text, x, y);
  };

  var findMaxTime = function (array) {
    return Math.max.apply(null, array);
  };

  var titles = ['Ура вы победили!', 'Список результатов:'];
  drawRect(ctx, BLACK_COLOR, {x: scoreBoard.x + 10, y: scoreBoard.y + 10, width: scoreBoard.width, height: scoreBoard.height});
  drawRect(ctx, WHITE_COLOR, scoreBoard);
  drawText(ctx, BLACK_COLOR, scoreBoard.x + scoreBoard.width / 2 - ctx.measureText(titles[0]).width / 2, scoreBoard.y + 10, titles[0]);
  drawText(ctx, BLACK_COLOR, scoreBoard.x + scoreBoard.width / 2 - ctx.measureText(titles[1]).width / 2, scoreBoard.y + 30, titles[1]);

  var maxValue = findMaxTime(times);
  var arrLength = names.length;
  var histogramBottom = 250;
  for (var i = 0; i < arrLength; i++) {
    var x = scoreBoard.x + histogram.barMargin + (histogram.barWidth + histogram.barMargin) * i;
    var height = -1 * times[i] / maxValue * histogram.height;
    drawRect(ctx, histogram.getBarColor(names[i], 'Вы'), {x: x, y: histogramBottom, width: histogram.barWidth, height: height});
    drawText(ctx, BLACK_COLOR, x, histogramBottom + 5, names[i]);
    drawText(ctx, BLACK_COLOR, x, histogramBottom + height - 20, Math.round(times[i]));
  }
};
