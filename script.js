
// C# DevLab — interacções da página
const toolInfo = {
  visual: {
    title: "Visual Studio",
    text: "O Visual Studio é um IDE da Microsoft. Junta num único ambiente um editor, ferramentas de compilação, depuração e gestão de projectos. É uma opção muito completa para desenvolver aplicações em C#, especialmente em Windows.",
    url: "https://visualstudio.microsoft.com/"
  },
  vscode: {
    title: "Visual Studio Code",
    text: "O Visual Studio Code é um editor de código da Microsoft. É mais leve e pode ser adaptado através de extensões. Para trabalhar com C#, é possível instalar as extensões adequadas e o .NET SDK.",
    url: "https://code.visualstudio.com/"
  },
  rider: {
    title: "JetBrains Rider",
    text: "O Rider é um IDE da JetBrains direccionado para o desenvolvimento .NET. Inclui ferramentas de análise, navegação, depuração e refactorização de código, estando disponível para Windows, macOS e Linux.",
    url: "https://www.jetbrains.com/rider/"
  }
};

const detailsPanel = document.querySelector("#details-panel");
const detailsTitle = document.querySelector("#details-title");
const detailsText = document.querySelector("#details-text");
const detailsLink = document.querySelector("#details-link");

document.querySelectorAll("[data-tool]").forEach((button) => {
  button.addEventListener("click", () => {
    const info = toolInfo[button.dataset.tool];
    if (!info) return;

    detailsTitle.textContent = info.title;
    detailsText.textContent = info.text;
    detailsLink.href = info.url;
    detailsPanel.hidden = false;
    detailsPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

document.querySelector("#close-details").addEventListener("click", () => {
  detailsPanel.hidden = true;
});

const nameInput = document.querySelector("#user-name");
const output = document.querySelector("#output");

document.querySelector("#run-code").addEventListener("click", () => {
  const name = nameInput.value.trim();
  output.replaceChildren();

  if (!name) {
    const message = document.createElement("span");
    message.className = "muted";
    message.textContent = "Erro: escreve primeiro o teu nome.";
    output.append(message);
    nameInput.focus();
    return;
  }

  const result = document.createElement("span");
  result.textContent = `Olá, ${name}! Bem-vindo ao C# DevLab.`;
  output.append(result);
});

nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.querySelector("#run-code").click();
  }
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  });
});

// Animação discreta ao entrar no ecrã
const revealItems = document.querySelectorAll(".reveal");

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
	