const MODE_COPY = {
  recruiter: {
    title: "HR 2分钟速览",
    list: [
      "学习机全品类 GTM 负责人，十亿级营收盘子 owner",
      "3 个月追平竞品 3 年渠道商机库能力",
      "IPMS 本土化落地，形成可复制评审机制",
    ],
    footnote: "适合快速判断岗位匹配度与过往产出。",
  },
  ceo: {
    title: "CEO 战略视角",
    list: [
      "从偶发爆品到组织化胜率：流程、机制、复盘闭环齐备",
      "能在高压竞争局面下做跨部门协同与资源优先级决策",
      "已构建 AI x GTM 进化路径（L1-L5），具备组织放大潜力",
    ],
    footnote: "适合评估经营韧性、方法论沉淀与组织放大价值。",
  },
};

const modeButtons = document.querySelectorAll(".mode-btn");
const modeTitle = document.getElementById("mode-title");
const modeList = document.getElementById("mode-list");
const modeFootnote = document.getElementById("mode-footnote");

const renderMode = (mode) => {
  document.body.dataset.mode = mode;
  const copy = MODE_COPY[mode];
  if (!copy) return;

  modeTitle.textContent = copy.title;
  modeFootnote.textContent = copy.footnote;
  modeList.innerHTML = copy.list.map((item) => `<li>${item}</li>`).join("");

  modeButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.mode === mode);
  });
};

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => renderMode(btn.dataset.mode));
});

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);
reveals.forEach((node) => revealObserver.observe(node));

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || "";
      const duration = 1000;
      let startTime = null;

      const tick = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.round(progress * target);
        el.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  },
  { threshold: 0.65 }
);
counters.forEach((counter) => counterObserver.observe(counter));

const panel = document.getElementById("panel");
window.addEventListener("pointermove", (event) => {
  if (window.innerWidth < 1040 || !panel) return;
  const rect = panel.getBoundingClientRect();
  const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
  const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
  panel.style.transform = `rotateX(${dy * -2.4}deg) rotateY(${dx * 2.8}deg)`;
});

document.addEventListener("mouseleave", () => {
  if (!panel) return;
  panel.style.transform = "rotateX(0deg) rotateY(0deg)";
});

renderMode("recruiter");
