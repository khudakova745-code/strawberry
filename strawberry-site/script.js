(function() {

  var W = 158;
  var H = 164;
  var COLS = 9;
  var ROWS = 2;

  var field = document.getElementById('berryField');
  if (!field) return;

  var berries = [];
  var drag = null;
  var offX = 0;
  var offY = 0;

  function createBerries() {
    var totalWidth = COLS * W;
    var startX = (window.innerWidth - totalWidth) / 2;
    var startY = window.innerHeight - ROWS * H - 20;

    for (var row = 0; row < ROWS; row++) {
      for (var col = 0; col < COLS; col++) {
        var img = document.createElement('img');
        img.src = 'images/strawberry.png';
        img.className = 'berry';
        img.draggable = false;

        img.style.left = (startX + col * W) + 'px';
        img.style.top = (startY + row * H) + 'px';

        field.appendChild(img);
        berries.push(img);
      }
    }
  }

  function collides(me, x, y) {
    for (var i = 0; i < berries.length; i++) {
      var b = berries[i];
      if (b === me) continue;
      if (b.style.display === 'none') continue;

      var bx = parseFloat(b.style.left);
      var by = parseFloat(b.style.top);

      if (
        x + W > bx + 5 &&
        x < bx + W - 5 &&
        y + H > by + 5 &&
        y < by + H - 5
      ) {
        return true;
      }
    }
    return false;
  }

  function fall(me) {
    var x = parseFloat(me.style.left);
    var y = parseFloat(me.style.top);
    var maxY = window.innerHeight - H;
    var best = y;

    for (var ty = y; ty <= maxY; ty = ty + 3) {
      if (collides(me, x, ty)) break;
      best = ty;
    }

    me.style.transition = 'top 0.2s ease-out';
    me.style.top = best + 'px';
  }

  // МЫШЬ
  document.addEventListener('mousedown', function(e) {
    if (!e.target.classList.contains('berry')) return;

    e.preventDefault();
    drag = e.target;
    drag.style.zIndex = '999';
    drag.style.cursor = 'grabbing';
    drag.style.transition = 'none';

    offX = e.clientX - parseFloat(drag.style.left);
    offY = e.clientY - parseFloat(drag.style.top);
  });

  document.addEventListener('mousemove', function(e) {
    if (!drag) return;

    var x = e.clientX - offX;
    var y = e.clientY - offY;

    var maxX = window.innerWidth - W;
    var maxY = window.innerHeight - H;

    if (x < 0) x = 0;
    if (x > maxX) x = maxX;
    if (y < 0) y = 0;
    if (y > maxY) y = maxY;

    drag.style.left = x + 'px';
    drag.style.top = y + 'px';
  });

  document.addEventListener('mouseup', function() {
    if (!drag) return;

    drag.style.zIndex = '10';
    drag.style.cursor = 'grab';

    fall(drag);

    drag = null;
  });

  // ТАЧ
  document.addEventListener('touchstart', function(e) {
    if (!e.target.classList.contains('berry')) return;

    e.preventDefault();
    drag = e.target;
    drag.style.zIndex = '999';
    drag.style.cursor = 'grabbing';
    drag.style.transition = 'none';

    var touch = e.touches[0];
    offX = touch.clientX - parseFloat(drag.style.left);
    offY = touch.clientY - parseFloat(drag.style.top);
  });

  document.addEventListener('touchmove', function(e) {
    if (!drag) return;
    e.preventDefault();

    var touch = e.touches[0];
    var x = touch.clientX - offX;
    var y = touch.clientY - offY;

    var maxX = window.innerWidth - W;
    var maxY = window.innerHeight - H;

    if (x < 0) x = 0;
    if (x > maxX) x = maxX;
    if (y < 0) y = 0;
    if (y > maxY) y = maxY;

    drag.style.left = x + 'px';
    drag.style.top = y + 'px';
  });

  document.addEventListener('touchend', function() {
    if (!drag) return;

    drag.style.zIndex = '10';
    drag.style.cursor = 'grab';

    fall(drag);

    drag = null;
  });

  createBerries();

})();