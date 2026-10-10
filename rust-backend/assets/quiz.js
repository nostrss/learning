// Shared quiz widget. Markup:
// <div class="quiz" data-answer="1"><p class="q">…</p>
//   <button class="opt">A</button><button class="opt">B</button>…
//   <p class="explain">…</p></div>
// data-answer is the 0-based index of the correct option.
document.querySelectorAll('.quiz').forEach(function (quiz) {
  var answer = Number(quiz.dataset.answer);
  var opts = quiz.querySelectorAll('.opt');
  opts.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      if (quiz.classList.contains('done')) return;
      quiz.classList.add('done');
      btn.classList.add(i === answer ? 'right' : 'wrong');
      opts[answer].classList.add('right');
    });
  });
});
