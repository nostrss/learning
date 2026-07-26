// 공유 퀴즈 위젯 — 즉각 피드백 MCQ
// 사용법: <div class="quiz" id="quiz1"></div> 후
//   renderQuiz('quiz1', [{stem, choices: [...], answer: index, why}])
// 선택지는 렌더 시 셔플된다. 각 선택지 텍스트는 같은 단어 수로 작성할 것.
function renderQuiz(id, questions) {
  const root = document.getElementById(id);
  questions.forEach((q, qi) => {
    const box = document.createElement('div');
    box.className = 'quiz-q';
    const stem = document.createElement('p');
    stem.className = 'stem';
    stem.textContent = `Q${qi + 1}. ${q.stem}`;
    box.appendChild(stem);

    const order = q.choices.map((_, i) => i).sort(() => Math.random() - 0.5);
    const feedback = document.createElement('p');
    feedback.className = 'feedback';

    order.forEach((ci) => {
      const btn = document.createElement('button');
      btn.className = 'choice';
      btn.textContent = q.choices[ci];
      btn.onclick = () => {
        if (box.dataset.done) return;
        box.dataset.done = '1';
        const ok = ci === q.answer;
        btn.classList.add(ok ? 'correct' : 'wrong');
        if (!ok) {
          [...box.querySelectorAll('button.choice')].forEach((b) => {
            if (b.textContent === q.choices[q.answer]) b.classList.add('correct');
          });
        }
        feedback.textContent = (ok ? '정답. ' : '오답. ') + q.why;
        feedback.classList.add('show');
        feedback.style.color = ok ? 'var(--ok)' : 'var(--bad)';
      };
      box.appendChild(btn);
    });
    box.appendChild(feedback);
    root.appendChild(box);
  });
}
