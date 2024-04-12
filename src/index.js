const $COUNTER_1 = document.getElementById('counter1'),
    $COUNTER_2 = document.getElementById('counter2'),
    $COUNTER_3 = document.getElementById('counter3');
let box1 = new MyCounter('30', $COUNTER_1),
    box2 = new MyCounter('30', $COUNTER_2),
    box3 = new MyCounter('30', $COUNTER_3);
box1.init();
box2.init();
box3.init();