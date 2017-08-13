'use strict';

var WHITE_COLOR = 'rgb(255, 255, 255)';
var BLACK_COLOR = 'rgba(0, 0, 0, 0.7)';

var scoreBoard = {
  x: 100,
  y: 10,
  width: 420,
  height: 270
};
var scoreBoardTitle = {
  title: ['Ура вы победили!', 'Список результатов:'],
  horizontalAlign: 'start',
  baseLine: 'hanging',
  font: 'bold 16px PT Mono'
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

var drawRect = function (ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, names, times) {
  drawRect(ctx, BLACK_COLOR, scoreBoard.x + 10, scoreBoard.y + 10, scoreBoard.width, scoreBoard.height);
  drawRect(ctx, WHITE_COLOR, scoreBoard.x, scoreBoard.y, scoreBoard.width, scoreBoard.height);

  ctx.fillStyle = BLACK_COLOR;
  ctx.textAlign = scoreBoardTitle.horizontalAlign;
  ctx.textBaseline = scoreBoardTitle.baseLine;
  ctx.font = scoreBoardTitle.font;
  ctx.fillText(scoreBoardTitle.title[0], scoreBoard.x + scoreBoard.width / 2 - ctx.measureText(scoreBoardTitle.title[0]).width / 2, scoreBoard.y + 10);
  ctx.fillText(scoreBoardTitle.title[1], scoreBoard.x + scoreBoard.width / 2 - ctx.measureText(scoreBoardTitle.title[1]).width / 2, scoreBoard.y + 30);

  var maxValue = findMaxTime(times);
  for (var i = 0; i < names.length; i++) {
    var x = histogram.barMargin + scoreBoard.x + (histogram.barWidth + histogram.barMargin) * i;
    var barHeight = times[i] / maxValue * histogram.height;
    drawRect(ctx, names[i] === 'Вы' ? histogram.barColorMe : histogram.getBarColorOthers(), x, scoreBoard.y + (histogram.height - barHeight) + 80, histogram.barWidth, barHeight);
    ctx.fillStyle = BLACK_COLOR;
    ctx.fillText(names[i], x, scoreBoard.y + scoreBoard.height - 25);
    ctx.fillText(parseInt(times[i], 10), x, scoreBoard.y + (histogram.height - barHeight) + 55);
  }
};

var findMaxTime = function (times) {
  return Math.max.apply(null, times);
};

