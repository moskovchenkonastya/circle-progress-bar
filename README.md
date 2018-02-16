# Прототип блока Progress

Прототип блока Progress для использования в мобильных web-приложениях. Основное предназначение блока отображать процесс выполнения процессов и их прогресс выполнения.

Demo - gh-pages: https://moskovchenkonastya.github.io/circle-progress-bar/main.html

Результат выполнения задачи представлен в виде небольшого
приложения с элементами управления:

![Макет](https://github.com/moskovchenkonastya/circle-progress-bar/blob/master/Screen%20Shot%202018-02-16%20at%2020.09.44.png)

Value - текстовый ввод числа от 0 до 100. 
- limitLength() - валидация значений value.
- updateValue() - обновление данных при введении нового значения.
- drawCircle() - отрисовка круга с помощью canvas. Круг в канвасе рисуется при помощи функции .arc(centerX, centerY, radius, startAngle, endAngle, clockwise) и .stroke(). При помощи параметров .lineWidth и .strokeStyle меняются цвет заливки, толщина и цвет линии.
- drawAnimateBar(val) - динамическая отрисовка круга, выполняется при выборе состояния - "Animate". 
- hideProgress() - скрытие блока, выполняется при выборе состояния - "Hide"
 
