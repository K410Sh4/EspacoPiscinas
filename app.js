"use strict";

const WHATSAPP_NUMBER = "5535988124020";
const STORAGE_KEY = "espaco-piscina-orcamento-v1";
const products = Object.freeze([
 {id:"piscina-fibra",name:"Piscinas de fibra",category:"Piscinas",description:"Consulte modelos, tamanhos e opções para seu espaço.",icon:"i-pool",art:["#ddfbf8","#a2e7ef","#05869a"]},
 {id:"piscina-projeto",name:"Piscinas de vinil e alvenaria",category:"Piscinas",description:"Converse sobre alternativas para seu projeto.",icon:"i-wave",art:["#d9f1ff","#b8d5f8","#4977b5"]},
 {id:"cloro",name:"Cloro e sanitizantes",category:"Tratamento",description:"Opções de tratamento para manter a água cuidada.",icon:"i-droplet",art:["#e1f9ef","#b3eed8","#159781"]},
 {id:"algicida",name:"Algicidas e clarificantes",category:"Tratamento",description:"Produtos para a rotina de tratamento da piscina.",icon:"i-sparkle",art:["#f0e9fe","#dad2fd","#8765bc"]},
 {id:"filtros",name:"Filtros para piscina",category:"Equipamentos",description:"Equipamentos de filtragem para consultar conforme a necessidade.",icon:"i-filter",art:["#e5f3ff","#bedcf9","#4686bf"]},
 {id:"bombas",name:"Bombas de circulação",category:"Equipamentos",description:"Consulte alternativas de circulação e motobombas.",icon:"i-pump",art:["#e2f5fa","#a9dfea","#177b9d"]},
 {id:"aquecedores",name:"Aquecimento de piscinas",category:"Aquecimento",description:"Opções de aquecimento e conforto para sua área de lazer.",icon:"i-sun",art:["#fff3d8","#ffe1a1","#d28d26"]},
 {id:"capas",name:"Capas e proteção",category:"Acessórios",description:"Converse sobre soluções de cobertura e proteção.",icon:"i-wave",art:["#dff5f4","#b6e2dd","#169c91"]},
 {id:"limpeza",name:"Aspiradores e kits de limpeza",category:"Acessórios",description:"Itens práticos para cuidados e limpeza regulares.",icon:"i-tool",art:["#fff0e4","#ffd5bd","#ca7954"]},
 {id:"led",name:"Iluminação LED",category:"Iluminação",description:"Destaque a beleza da sua piscina com iluminação.",icon:"i-light",art:["#e9e8ff","#c6c8fc","#6e6fcb"]},
 {id:"spa",name:"Spas e banheiras",category:"Bem-estar",description:"Explore possibilidades de descanso e bem-estar.",icon:"i-spa",art:["#fdece9","#ffc9c2","#c36e7e"]},
 {id:"pecas",name:"Peças e reposição",category:"Equipamentos",description:"Peças e componentes: informe o modelo ao consultar.",icon:"i-tool",art:["#e8f3f5","#c5e0e7","#47869a"]}
]);

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
const grid = $("#productGrid");
const searchInput = $("#searchInput");
const filterSelect = $("#categoryFilter");
const resultsStatus = $("#resultsStatus");
const emptyState = $("#emptyState");
const cartDrawer = $("#cartDrawer");
const backdrop = $("#drawerBackdrop");
const cartItems = $("#cartItems");
const cartSummary = $("#cartSummary");
const sendQuote = $("#sendQuote");
const menuButton = $("#menuToggle");
const mobileNav = $("#mobileNav");
const toast = $("#toast");
let cart = {};
let lastFocus = null;
let toastTimeout = null;

function icon(id, klass="icon") {
  return '<svg class="' + klass + '" aria-hidden="true" focusable="false"><use href="#' + id + '"></use></svg>';
}
function safeText(value) {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function normalized(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-BR").trim();
}
function productById(id) { return products.find(item => item.id === id); }
function quantity(id) { return Number.isInteger(cart[id]) ? cart[id] : 0; }
function totalItems() { return Object.values(cart).reduce((acc, num) => acc + num, 0); }
function persistCart() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
  catch (_error) { /* A lista segue funcional durante esta visita. */ }
}
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (saved && typeof saved === "object" && !Array.isArray(saved)) {
      for (const item of products) {
        const count = saved[item.id];
        if (Number.isInteger(count) && count > 0) cart[item.id] = Math.min(count,99);
      }
    }
  } catch (_error) { cart = {}; }
}
function announce(text) {
  toast.textContent = text;
  toast.hidden = false;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { toast.hidden = true; }, 3200);
}
function renderProducts() {
  const term = normalized(searchInput.value);
  const category = filterSelect.value;
  const visible = products.filter(item =>
    (category === "Todos" || item.category === category) &&
    (!term || normalized(item.name + " " + item.description + " " + item.category).includes(term))
  );
  grid.innerHTML = visible.map(item => {
    const count = quantity(item.id);
    const colors = item.art;
    return '<article class="product-card">' +
      '<div class="product-art" style="--art-a:' + colors[0] + ';--art-b:' + colors[1] + ';--art-ink:' + colors[2] + '">' +
      '<span class="product-badge">SOB CONSULTA</span><span class="product-icon">' + icon(item.icon) + '</span></div>' +
      '<div class="product-body"><span class="product-category">' + safeText(item.category) + '</span>' +
      '<h3>' + safeText(item.name) + '</h3><p>' + safeText(item.description) + '</p>' +
      '<div class="product-footer"><small>Solicite orçamento</small>' +
      '<button type="button" class="add-button" data-add="' + item.id + '" aria-label="Adicionar ' + safeText(item.name) + ' à lista">' +
      icon(count ? "i-check" : "i-plus") + (count ? "Adicionar mais" : "Adicionar") + '</button></div></div></article>';
  }).join("");
  resultsStatus.textContent = visible.length + (visible.length === 1 ? " opção encontrada" : " opções encontradas");
  emptyState.hidden = visible.length !== 0;
}
function updateCartCounts() {
  $$("[data-cart-count]").forEach(el => { el.textContent = String(totalItems()); });
}
function renderCart() {
  const selected = products.filter(item => quantity(item.id) > 0);
  if (selected.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">' + icon("i-bag") + '<h3>Sua lista está vazia</h3>' +
      '<p>Explore as categorias e adicione o que deseja consultar.</p><button class="btn btn-primary" type="button" id="emptyExplore">Explorar produtos</button></div>';
  } else {
    cartItems.innerHTML = selected.map(item => (
      '<div class="cart-row"><div class="cart-row-icon">' + icon(item.icon) + '</div><div class="cart-row-details">' +
      '<strong>' + safeText(item.name) + '</strong><small>' + safeText(item.category) + '</small>' +
      '<div class="qty-controls"><button type="button" aria-label="Diminuir quantidade de ' + safeText(item.name) + '" data-dec="' + item.id + '">' + icon("i-minus") + '</button>' +
      '<b aria-label="Quantidade">' + quantity(item.id) + '</b><button type="button" aria-label="Aumentar quantidade de ' + safeText(item.name) + '" data-inc="' + item.id + '">' + icon("i-plus") + '</button>' +
      '<button type="button" class="remove-item" data-remove="' + item.id + '">Remover</button></div></div></div>'
    )).join("");
  }
  const count = totalItems();
  cartSummary.textContent = count + (count === 1 ? " item na sua lista" : " itens na sua lista");
  sendQuote.disabled = count === 0;
  updateCartCounts();
}
function updateUI() {
  persistCart();
  updateCartCounts();
  renderProducts();
  renderCart();
}
function setItem(id, nextQuantity) {
  if (!productById(id)) return;
  if (nextQuantity <= 0) delete cart[id];
  else cart[id] = Math.min(nextQuantity,99);
  updateUI();
}
function openCart() {
  lastFocus = document.activeElement;
  backdrop.hidden = false;
  cartDrawer.hidden = false;
  document.body.classList.add("no-scroll");
  $("#closeCart").focus();
}
function closeCart() {
  backdrop.hidden = true;
  cartDrawer.hidden = true;
  document.body.classList.remove("no-scroll");
  if (lastFocus && lastFocus.isConnected && typeof lastFocus.focus === "function") lastFocus.focus();
}
function openWhatsApp(message) {
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
function preparedCartMessage() {
  const lines = ["Olá! Gostaria de solicitar um orçamento à Espaço Piscina.","","Itens de interesse:"];
  for (const item of products) {
    const count = quantity(item.id);
    if (count) lines.push("- " + count + "x " + item.name);
  }
  lines.push("","Por favor, informem opções, preços e disponibilidade. Obrigado!");
  return lines.join("\n");
}

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const id = button.dataset.add;
  const item = productById(id);
  if (!item) return;
  if (quantity(id) >= 99) return announce("Quantidade máxima de 99 unidades por categoria.");
  setItem(id, quantity(id) + 1);
  announce(item.name + " adicionado à sua lista.");
});
cartItems.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.id === "emptyExplore") {
    closeCart();
    $("#catalogo").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
    return;
  }
  const id = button.dataset.inc || button.dataset.dec || button.dataset.remove;
  if (!id || !productById(id)) return;
  if (button.hasAttribute("data-inc")) setItem(id, quantity(id)+1);
  else if (button.hasAttribute("data-dec")) setItem(id, quantity(id)-1);
  else setItem(id,0);
});
$$("[data-open-cart]").forEach(button => button.addEventListener("click", openCart));
$("#closeCart").addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);
document.addEventListener("keydown", event => {
  if (cartDrawer.hidden) return;
  if (event.key === "Escape") { closeCart(); return; }
  if (event.key !== "Tab") return;
  const focusable = $$('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled])',cartDrawer).filter(el => el.getClientRects().length > 0);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length-1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
sendQuote.addEventListener("click", () => {
  if (totalItems() > 0) openWhatsApp(preparedCartMessage());
});
searchInput.addEventListener("input", renderProducts);
filterSelect.addEventListener("change", renderProducts);
$("#clearFilters").addEventListener("click", () => {
  searchInput.value = "";
  filterSelect.value = "Todos";
  renderProducts();
  searchInput.focus();
});
$$("[data-category-link]").forEach(link => link.addEventListener("click", () => {
  const category = link.dataset.categoryLink;
  if (!Array.from(filterSelect.options).some(option => option.value === category)) return;
  searchInput.value = "";
  filterSelect.value = category;
  renderProducts();
}));
$("#quickQuoteForm").addEventListener("submit", event => {
  event.preventDefault();
  const type = $("#quoteType").value;
  if (!type) { $("#quoteType").focus(); return; }
  const name = $("#quoteName").value.trim();
  const details = $("#quoteMessage").value.trim();
  const lines = ["Olá! Gostaria de solicitar um orçamento à Espaço Piscina.","","Tenho interesse em: " + type];
  if (name) lines.push("Meu nome: " + name);
  if (details) lines.push("Detalhes: " + details);
  lines.push("","Poderiam me ajudar com informações e disponibilidade?");
  openWhatsApp(lines.join("\n"));
});
menuButton.addEventListener("click", () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  menuButton.setAttribute("aria-expanded",String(opening));
  menuButton.setAttribute("aria-label",opening ? "Fechar menu" : "Abrir menu");
  if (opening) $("a",mobileNav).focus();
});
$$("a",mobileNav).forEach(link => link.addEventListener("click", () => {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded","false");
  menuButton.setAttribute("aria-label","Abrir menu");
}));
window.matchMedia("(min-width: 901px)").addEventListener("change", event => {
  if (!event.matches) return;
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded","false");
  menuButton.setAttribute("aria-label","Abrir menu");
});
$("#year").textContent = new Date().getFullYear().toString();
loadCart();
updateCartCounts();
renderProducts();
renderCart();


/* Mural dia/noite: controles reais, rotação respeitosa e suporte a toque. */
function setupHeroCarousel() {
  const carousel = $("#heroCarousel");
  if (!carousel) return;
  const slides = $$("[data-hero-slide]", carousel);
  const dots = $$("[data-slide-to]", carousel);
  const prev = $("#heroPrev");
  const next = $("#heroNext");
  const status = $("#heroSlideStatus");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const names = ["Piscina durante o dia", "Piscina à noite com iluminação"];
  let active = 0;
  let autoTimer = null;
  let userSelected = false;
  let pointerInside = false;
  let touchStart = null;

  function showSlide(nextIndex, announceChange=false) {
    active = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const selected = i === active;
      slide.classList.toggle("is-active", selected);
      slide.setAttribute("aria-hidden", String(!selected));
    });
    dots.forEach((dot, i) => {
      const selected = i === active;
      dot.classList.toggle("is-active", selected);
      dot.setAttribute("aria-pressed", String(selected));
    });
    // Mudanças automáticas não inundam anúncios dos leitores de tela.
    if (announceChange) status.textContent = names[active];
  }

  function pauseAuto() {
    if (autoTimer !== null) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function canAutoPlay() {
    return !userSelected && !pointerInside && !document.hidden &&
      !reducedMotion.matches && !carousel.contains(document.activeElement);
  }

  function scheduleAuto() {
    pauseAuto();
    if (!canAutoPlay()) return;
    autoTimer = window.setInterval(() => {
      if (!canAutoPlay()) { pauseAuto(); return; }
      showSlide(active + 1, false);
    }, 8000);
  }

  function navigate(index) {
    userSelected = true;
    pauseAuto();
    showSlide(index, true);
  }

  prev.addEventListener("click", () => navigate(active - 1));
  next.addEventListener("click", () => navigate(active + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => navigate(i)));

  carousel.addEventListener("mouseenter", () => {
    pointerInside = true;
    pauseAuto();
  });
  carousel.addEventListener("mouseleave", () => {
    pointerInside = false;
    scheduleAuto();
  });
  carousel.addEventListener("focusin", pauseAuto);
  carousel.addEventListener("focusout", () => {
    window.requestAnimationFrame(scheduleAuto);
  });
  document.addEventListener("visibilitychange", scheduleAuto);
  reducedMotion.addEventListener("change", scheduleAuto);

  carousel.addEventListener("touchstart", event => {
    if (event.touches.length !== 1) return;
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  carousel.addEventListener("touchend", event => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      navigate(active + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
  carousel.addEventListener("touchcancel", () => { touchStart = null; });

  showSlide(0);
  scheduleAuto();
}
setupHeroCarousel();


/* Revela "em Alfenas?" apenas uma vez, preservando a frase para leitores de tela
   e exibindo imediatamente o texto completo se o usuário reduz animações. */
function setupHeroTyping() {
  const output = document.getElementById("heroTypingOutput");
  if (!output) return;

  const fullText = output.textContent;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return;

  const characters = Array.from(fullText);
  let position = 0;
  let intervalId = null;
  let initialDelay = null;
  let finishDelay = null;

  const finish = () => {
    clearTimeout(initialDelay);
    clearInterval(intervalId);
    clearTimeout(finishDelay);
    output.textContent = fullText;
    output.classList.remove("is-typing");
  };

  const onMotionChange = () => {
    if (reducedMotion.matches) {
      finish();
      reducedMotion.removeEventListener("change", onMotionChange);
    }
  };
  reducedMotion.addEventListener("change", onMotionChange);

  output.textContent = "";
  output.classList.add("is-typing");
  initialDelay = window.setTimeout(() => {
    intervalId = window.setInterval(() => {
      position += 1;
      output.textContent = characters.slice(0, position).join("");
      if (position >= characters.length) {
        clearInterval(intervalId);
        finishDelay = window.setTimeout(() => {
          output.classList.remove("is-typing");
          reducedMotion.removeEventListener("change", onMotionChange);
        }, 850);
      }
    }, 105);
  }, 400);
}
setupHeroTyping();
