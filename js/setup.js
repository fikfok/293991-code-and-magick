'use strict';

var firstNames = {
  values: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  counter: 0
};
var secondNames = {
  values: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  counter: 0
};
var coatColors = {
  values: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  counter: 0
};
var eyesColors = {
  values: ['black', 'red', 'blue', 'yellow', 'green'],
  counter: 0
};

/**
 * Возвращение случайного элемента из переданного массива. Применяется перестановка Фишера
 * @param {Object} arrayOfElements - массив, из которого будет возвращён случайный элемент
 * @return {*}
 */
var getAnyElement = function (arrayOfElements) {
  var elementPosition = Math.round(Math.random() * ((arrayOfElements.values.length - 1) - arrayOfElements.counter) + arrayOfElements.counter);
  var element = arrayOfElements.values[elementPosition];
  arrayOfElements.values[elementPosition] = arrayOfElements.values.splice(arrayOfElements.counter, 1, arrayOfElements.values[elementPosition])[0];
  arrayOfElements.counter++;
  return element;
};

/**
 * Создание случайного набора свойств для одного мага
 * @return {{name: string, coatColor, eyesColor}}
 *    name - ФИО мага
 *    coatColor - цвет одеяния
 *    eyesColor - цвет глаз
 */
var generateWizard = function () {
  return {name: getAnyElement(firstNames) + ' ' + getAnyElement(secondNames),
    coatColor: getAnyElement(coatColors),
    eyesColor: getAnyElement(eyesColors)};
};

/**
 * Генерация HTML разметки для одного мага путём клонирования из шаблона
 * @param {Object} properties - набор свойств, которые будут внесены в данную разметку
 * @return {Node}
 */
var renderWizard = function (properties) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  writeProperties(wizardElement, properties);
  return wizardElement;
};

/**
 * Внесение свойств конкретного мага в сгенерированную разметку
 * @param  {Object} currentWizard - DOM узел сгенерированного мага
 * @param {Object} properties - набор свойств для конкретного мага
 */
var writeProperties = function (currentWizard, properties) {
  currentWizard.querySelector('.setup-similar-label').textContent = properties.name;
  currentWizard.querySelector('.wizard-coat').style.fill = properties.coatColor;
  currentWizard.querySelector('.wizard-eyes').style.fill = properties.eyesColor;
};

var arrayOfWizards = [];
for (var i = 0; i < 4; i++) {
  arrayOfWizards.push(generateWizard());
}
var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');

var similarListElement = setupWindow.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var fragment = document.createDocumentFragment();
for (var i = 0; i < arrayOfWizards.length; i++) {
  fragment.appendChild(renderWizard(arrayOfWizards[i]));
}

similarListElement.appendChild(fragment);
setupWindow.querySelector('.setup-similar').classList.remove('hidden');
