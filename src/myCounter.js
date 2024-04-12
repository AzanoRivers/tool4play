class MyCounter {
  constructor(initTime = 0, counter = undefined) {
    let valElements = true;
    if (initTime <= 0 && counter == undefined && (counter instanceof HTMLElement === false)) {
      valElements = false;
    }
    if (!valElements) {
      console.error('Error in params: Mandatory: initTime > 0, counter: htmlElement');
      return false;
    }
    this._time = initTime;
    this._counter = counter;
    this._interval = 0;
    this._play = false;
    this._timejumebaraicon = 4000;
  }
  get time() {
    return this._time;
  }
  #_playSound() {
    let audio = new Audio('sounds/sword1.mp3');
    audio.play();
  }
  #_countDown() {
    const $INPUT = this._counter.querySelector('input'),
      $TIMER = this._counter.querySelector('.timer'),
      $IMG = this._counter.querySelector('img');
    this._time--;
    if (this._time <= 0) {
      if (this._play) {
        $IMG.classList.remove('invisible');
        setTimeout(() => {
          $IMG.classList.add('invisible');
        }, this._timejumebaraicon);
        this.#_playSound();
      }
      this._time = $INPUT.value || 0;
      if ($INPUT.value <= 0) {  // Si se borra el input
        this.#_stop();
      }
    }
    if (!this._play) {
      console.log("stop");
      clearInterval(this._interval);
    }
    $TIMER.textContent = this._time;
  }
  #_controlsTime(event) {
    const $TIMER = this._counter.querySelector('.timer'),
      $CONTROl_PLUS = event.target.closest('.plus'),
      $CONTROl_MINUS = event.target.closest('.minus');
    if (this._play) {
      if ($CONTROl_PLUS) {
        this._time++;
      }
      if ($CONTROl_MINUS) {
        this._time--;
      }
      $TIMER.textContent = this._time;
    } else {
      console.warn('Counter is not running...');
    }

  }
  #_reset() {
    if (this._play) {
      const $INPUT = this._counter.querySelector('input'),
        $TIMER = this._counter.querySelector('.timer');
      this._time = $INPUT.value || 0;
      $TIMER.textContent = $INPUT.value || 0;
    } else {
      const $INPUT = this._counter.querySelector('input'),
        $TIMER = this._counter.querySelector('.timer');
      this._time = 0;
      $TIMER.textContent = 0;
      $INPUT.value = '';
    }
  }
  #_stop() {
    this._play = false;
    const $TIMER = this._counter.querySelector('.timer'),
      $INPUT = this._counter.querySelector('input');
    $INPUT.value = '';
    let newtime = 0;
    this._time = parseInt(newtime, 10);
    $TIMER.textContent = this._time;
  }
  #_start() {
    if (!this._play) {
      this._play = true;
      const $TIMER = this._counter.querySelector('.timer'),
        $INPUT = this._counter.querySelector('input');
      let newtime = parseInt($INPUT.value, 10);
      if (newtime > 0) {
        this._time = newtime;
        $TIMER.textContent = this._time;
        // INTERVALO
        this._interval = setInterval(this.#_countDown.bind(this), 1000);
      } else {
        this._play = false;
        console.warn('Invalid...');
      }
    } else {
      console.warn('Counter is running...');
    }
  }
  init() {
    const $START = this._counter.querySelector('.start'),
      $STOP = this._counter.querySelector('.stop'),
      $RESET = this._counter.querySelector('.reset'),
      $PLUS = this._counter.querySelector('.plus'),
      $MINUS = this._counter.querySelector('.minus');
    $START.addEventListener('click', this.#_start.bind(this));
    $STOP.addEventListener('click', this.#_stop.bind(this));
    $RESET.addEventListener('click', this.#_reset.bind(this));
    $PLUS.addEventListener('click', this.#_controlsTime.bind(this));
    $MINUS.addEventListener('click', this.#_controlsTime.bind(this));
  };
}