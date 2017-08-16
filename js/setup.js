'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

/**
 * Возвращение случайного элемента из переданного массива
 * @param {Object} arrayOfElements - массив, из которого будет возвращён случайный элемент
 * @returns {*}
 */
var getAnyElement = function (arrayOfElements) {
  return arrayOfElements[Math.round(Math.random() * (arrayOfElements.length - 1))];
};

/**
 * Создание случайного набора свойств для одного мага
 * @returns {{name: string, coatColor, eyesColor}}
 *    name - ФИО мага
 *    coatColor - цвет одеяния
 *    eyesColor - цвет глаз
 */
var generateWizard = function () {
  return {name: getAnyElement(FIRST_NAMES) + ' ' + getAnyElement(SECOND_NAMES),
    coatColor: getAnyElement(COAT_COLORS),
    eyesColor: getAnyElement(EYES_COLORS)};
};

/**
 * Генерация HTML разметки для одного мага путём клонирования из шаблона
 * @param {Object} properties - набор свойств, которые будут внесены в данную разметку
 * @returns {Node}
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

var fourWizards = [generateWizard(), generateWizard(), generateWizard(), generateWizard()];
var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');

var similarListElement = setupWindow.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var fragment = document.createDocumentFragment();
for (var i = 0; i < fourWizards.length; i++) {
  fragment.appendChild(renderWizard(fourWizards[i]));
}

similarListElement.appendChild(fragment);
setupWindow.querySelector('.setup-similar').classList.remove('hidden');
