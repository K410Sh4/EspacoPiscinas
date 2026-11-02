"use strict";

/* Central de Ajuda — mantém a mesma chave de orçamento da página inicial. */
const PRODUCTS = window.EspacoCatalog.products;
const CASES = window.EspacoCatalog.problems;
const STORAGE_KEY = "espaco-piscina-orcamento-v1";
const WHATSAPP_NUMBER = "5535988124020";
const productById = new Map(PRODUCTS.map(item => [item.id, item]));
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
let cart = {};
let activeBrand = "Todas";
let previousFocus = null;
let toastTimer = null;

function safe(value) {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function normalize(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-BR").trim();
}
function icon(id) {
  return '<svg class="icon" aria-hidden="true"><use href="#' + id + '"></use></svg>';
}
function readCart() {
  cart = {};
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (saved && typeof saved === "object" && !Array.isArray(saved)) {
      PRODUCTS.forEach(product => {
        const count = saved[product.id];
        if (Number.isInteger(count) && count > 0) cart[product.id] = Math.min(count, 99);
      });
    }
  } catch (_error) { /* Armazenamento indisponível: usa lista local até sair da página. */ }
}
function saveCart() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
  catch (_error) { announce("Lista salva apenas nesta visita. Seu navegador restringe o armazenamento."); }
}
function itemCount() { return Object.values(cart).reduce((sum, number) => sum + number, 0); }
function amount(id) { return cart[id] || 0; }
function announce(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3000);
}
/* Artes ilustrativas enviadas para a Central de Ajuda.
   Identificam a marca, não representam uma embalagem ou produto específico. */
const BRAND_CARD_IMAGES = Object.freeze({
  HTH: {src:"./assets/marcas/hth-card.jpg",alt:"Arte ilustrativa da marca HTH"},
  Genco: {src:"./assets/marcas/genco-card.jpg",alt:"Arte ilustrativa da marca Genco"},
  Montreal: {src:"./assets/marcas/montreal-card.jpg",alt:"Arte ilustrativa da marca Montreal"},
  Fluidra: {src:"./assets/marcas/fluidra-card.jpg",alt:"Arte ilustrativa da marca Fluidra Brasil"}
});
function brandArtwork(product) {
  const art = BRAND_CARD_IMAGES[product.brand];
  if (!art) return icon("i-droplet");
  return '<img class="support-brand-logo" src="' + art.src + '" alt="' + art.alt + '" loading="lazy" decoding="async" width="640" height="640">';
}
function optionTemplate(product) {
  const count = amount(product.id);
  const brandKey = ({HTH:"hth",Genco:"genco",Montreal:"montreal",Fluidra:"fluidra"})[product.brand] || "generic";
  return '<div class="support-option support-option--' + brandKey + '">' +
    '<div class="support-option-main">' +
    '<div class="support-option-media">' + brandArtwork(product) + '</div>' +
    '<div class="support-option-content">' +
    '<div class="support-option-top"><span class="support-option-brand">' + safe(product.brand) + '</span><span class="product-category">Sob consulta</span></div>' +
    '<h4>' + safe(product.name) + '</h4>' +
    '<p>' + safe(product.description) + '</p>' +
    '<div class="support-option-actions"><a href="' + safe(product.url) + '" target="_blank" rel="noopener noreferrer" aria-label="Informações oficiais do fabricante para ' + safe(product.name) + '">Ficha do fabricante ↗</a>' +
    '<button type="button" class="support-add" data-add="' + safe(product.id) + '" aria-label="Adicionar ' + safe(product.name) + ' à lista">' +
    icon(count ? "i-check" : "i-plus") + (count ? "Adicionar mais" : "Adicionar à lista") + '</button></div>' +
    '</div></div></div>';
}
function caseTemplate(problem, items) {
  return '<article class="support-case" id="problema-' + safe(problem.id) + '">' +
    '<div class="support-case-visual visual-' + safe(problem.imageType) + '">' +
    '<img loading="lazy" decoding="async" width="730" height="410" src="' + safe(problem.photo) + '" alt="' + safe(problem.alt) + '">' +
    '<span class="support-visual-tag">' + safe(problem.label) + '</span>' +
    '<span class="support-visual-label">IMAGEM GERADA POR IA</span></div>' +
    '<div class="support-case-body">' +
    '<span class="support-case-eyebrow">' + safe(problem.eyebrow) + '</span>' +
    '<h3>' + safe(problem.title) + '</h3>' +
    '<div class="support-case-text"><p><strong>O que pode acontecer:</strong> ' + safe(problem.symptoms) + '</p>' +
    '<p><strong>Por que isso pode ocorrer:</strong> ' + safe(problem.explanation) + '</p></div>' +
    '<div class="support-case-hint"><strong>Antes de comprar:</strong> ' + safe(problem.check) + '</div>' +
    '<div class="support-case-products-title">Opções de produtos • marcas alternativas</div>' +
    '<div class="support-option-list">' + items.map(optionTemplate).join("") + '</div>' +
    '<p class="support-case-warning">' + safe(problem.tips) + '</p>' +
    '</div></article>';
}
function renderCases() {
  const term = normalize($("#supportSearch").value);
  const type = $("#supportType").value;
  const matches = CASES.map(problem => {
    const options = problem.products.map(id => productById.get(id)).filter(Boolean)
      .filter(product => activeBrand === "Todas" || product.brand === activeBrand);
    if (!options.length) return null;
    if (type !== "todos" && problem.type !== type) return null;
    const poolText = [problem.title,problem.label,problem.symptoms,problem.explanation,problem.check,
      ...options.map(product => product.name + " " + product.brand + " " + product.description)].join(" ");
    return !term || normalize(poolText).includes(term) ? {problem, options} : null;
  }).filter(Boolean);
  $("#supportGrid").innerHTML = matches.map(({problem, options}) => caseTemplate(problem, options)).join("");
  $("#supportResults").textContent = matches.length + (matches.length === 1 ? " situação encontrada" : " situações encontradas");
  $("#supportEmpty").hidden = matches.length !== 0;
}
function cartTemplate(item) {
  return '<div class="cart-row"><span class="cart-row-icon">' + icon(item.icon || "i-droplet") + '</span>' +
    '<div class="cart-row-details"><strong>' + safe(item.name) + '</strong><small>' +
    safe(item.brand || item.category) + '</small><div class="qty-controls">' +
    '<button type="button" data-dec="' + safe(item.id) + '" aria-label="Diminuir quantidade de ' + safe(item.name) + '">' + icon("i-minus") + '</button>' +
    '<b aria-label="Quantidade">' + amount(item.id) + '</b>' +
    '<button type="button" data-inc="' + safe(item.id) + '" aria-label="Aumentar quantidade de ' + safe(item.name) + '">' + icon("i-plus") + '</button>' +
    '<button type="button" class="remove-item" data-remove="' + safe(item.id) + '">Remover</button></div></div></div>';
}
function renderCart() {
  const selected = PRODUCTS.filter(item => amount(item.id) > 0);
  const count = itemCount();
  $$("[data-cart-count]").forEach(node => { node.textContent = String(count); });
  $("#cartSummary").textContent = count + (count === 1 ? " item na lista" : " itens na lista");
  $("#sendQuote").disabled = count === 0;
  $("#cartItems").innerHTML = selected.length ?
    '<p class="support-drawer-caution">A lista reúne alternativas para consulta. Não misture nem aplique produtos simultaneamente.</p>' +
    selected.map(cartTemplate).join("") :
    '<div class="cart-empty">' + icon("i-bag") +
    '<h3>Sua lista está vazia</h3><p>Selecione uma opção de produto em um dos problemas abaixo.</p>' +
    '<button type="button" class="btn btn-primary" id="exploreCases">Explorar soluções</button></div>';
}
function refresh() { saveCart(); renderCart(); renderCases(); }
function setQuantity(id, count) {
  if (!productById.has(id)) return;
  if (count <= 0) delete cart[id];
  else cart[id] = Math.min(99,count);
  refresh();
}
function openCart() {
  previousFocus = document.activeElement;
  $("#drawerBackdrop").hidden = false;
  $("#cartDrawer").hidden = false;
  document.body.classList.add("no-scroll");
  $("#closeCart").focus();
}
function closeCart() {
  $("#cartDrawer").hidden = true;
  $("#drawerBackdrop").hidden = true;
  document.body.classList.remove("no-scroll");
  if (previousFocus && previousFocus.isConnected && typeof previousFocus.focus === "function") previousFocus.focus();
}
function sendCart() {
  if (!itemCount()) return;
  const lines = [
    "Olá! Gostaria de pedir um orçamento na Espaço Piscina.",
    "Encontrei estas opções na Central de Ajuda:",
    ""
  ];
  PRODUCTS.forEach(product => {
    const count = amount(product.id);
    if (count > 0) lines.push("- " + count + "x " + product.name);
  });
  lines.push("","Os produtos são alternativas para consulta, não para aplicação conjunta.",
    "Podem confirmar a compatibilidade, estoque, preços e o tratamento adequado após análise da água?");
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
$("#supportGrid").addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  if (!add) return;
  const id = add.dataset.add;
  const product = productById.get(id);
  if (!product) return;
  if (amount(id) >= 99) return announce("Limite de 99 unidades por produto.");
  setQuantity(id, amount(id) + 1);
  announce(product.name + " adicionado à lista de orçamento.");
});
$("#supportSearch").addEventListener("input",renderCases);
$("#supportType").addEventListener("change",renderCases);
$$("[data-brand]").forEach(button => button.addEventListener("click", () => {
  activeBrand = button.dataset.brand;
  $$("[data-brand]").forEach(item => {
    const selected = item === button;
    item.classList.toggle("is-selected", selected);
    item.setAttribute("aria-pressed",String(selected));
  });
  renderCases();
}));
$("#resetSupportFilters").addEventListener("click", () => {
  $("#supportSearch").value = "";
  $("#supportType").value = "todos";
  const all = $('[data-brand="Todas"]');
  all.click();
  $("#supportSearch").focus();
});
$("#cartItems").addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.id === "exploreCases") {
    closeCart();
    $("#situacoes").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
    return;
  }
  const id = button.dataset.inc || button.dataset.dec || button.dataset.remove;
  if (!id) return;
  if (button.hasAttribute("data-inc")) setQuantity(id,amount(id)+1);
  else if (button.hasAttribute("data-dec")) setQuantity(id,amount(id)-1);
  else setQuantity(id,0);
});
$$("[data-open-cart]").forEach(el => el.addEventListener("click",openCart));
$("#closeCart").addEventListener("click",closeCart);
$("#drawerBackdrop").addEventListener("click",closeCart);
document.addEventListener("keydown", event => {
  const drawer = $("#cartDrawer");
  if (drawer.hidden) return;
  if (event.key === "Escape") { closeCart(); return; }
  if (event.key !== "Tab") return;
  const focusable = $$("button:not([disabled]),a[href]",drawer).filter(el => el.getClientRects().length > 0);
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length-1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
$("#sendQuote").addEventListener("click",sendCart);
const menu = $("#menuToggle"), nav = $("#mobileNav");
menu.addEventListener("click",() => {
  const opening = nav.hidden;
  nav.hidden = !opening;
  menu.setAttribute("aria-expanded",String(opening));
  menu.setAttribute("aria-label", opening ? "Fechar menu" : "Abrir menu");
  if (opening) $("a",nav).focus();
});
window.matchMedia("(min-width: 901px)").addEventListener("change",event => {
  if (event.matches) {
    nav.hidden = true;
    menu.setAttribute("aria-expanded","false");
    menu.setAttribute("aria-label","Abrir menu");
  }
});
window.addEventListener("storage",event => {
  if (event.key === STORAGE_KEY) { readCart(); renderCart(); renderCases(); }
});
$("#supportYear").textContent = String(new Date().getFullYear());
readCart();
renderCart();
renderCases();
