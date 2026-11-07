"use strict";

/* Feedback encaminhado à Central Privada SAITE. Apenas depoimentos
   aprovados e autorizados em avaliacoes.json são publicados. */
const form = document.getElementById("reviewForm");
const reviewName = document.getElementById("reviewName");
const reviewCity = document.getElementById("reviewCity");
const reviewComment = document.getElementById("reviewComment");
const reviewConsent = document.getElementById("reviewConsent");
const consentBox = document.getElementById("reviewConsentBox");
const ratingFeedback = document.getElementById("ratingFeedback");
const reviewRoute = document.getElementById("reviewRoute");
const reviewError = document.getElementById("reviewError");
const reviewSubmit = document.getElementById("reviewSubmit");
const ratingLabels = [...document.querySelectorAll(".rating-choice")];

function currentRating() {
  const selected = form.querySelector('input[name="rating"]:checked');
  return selected ? Number(selected.value) : 0;
}
function starWord(value) {
  return value === 1 ? "estrela" : "estrelas";
}
function routeFor(rating, consent) {
  if (!rating) return {
    heading:"Escolha sua nota",
    description:"Mostraremos aqui como sua avaliação será enviada à central privada.",
    button:"Continuar para o formulário seguro"
  };
  if (rating <= 3) return {
    heading:"Feedback privado para a loja",
    description:"Sua nota e seu comentário não serão publicados. A mensagem será enviada apenas à central privada.",
    button:"Enviar feedback privado"
  };
  if (consent) return {
    heading:"Solicitação de depoimento público",
    description:"Seu comentário seguirá à central privada para análise. A loja poderá publicar o depoimento autorizado após moderação.",
    button:"Enviar para moderação"
  };
  return {
    heading:"Mensagem privada, sem autorização de publicação",
    description:"A nota de 4 ou 5 estrelas será encaminhada apenas à loja. Marque a autorização se desejar que ela possa aparecer no site após moderação.",
    button:"Enviar elogio privado"
  };
}
function paintRating() {
  const rating = currentRating();
  ratingLabels.forEach((label,index) => {
    label.classList.toggle("is-lit", index < rating);
  });
  ratingFeedback.textContent = rating
    ? rating + " " + starWord(rating) + " selecionada" + (rating === 1 ? "" : "s") + "."
    : "Selecione de 1 a 5 estrelas.";
  consentBox.hidden = rating < 4;
  if (rating < 4) reviewConsent.checked = false;
  const route = routeFor(rating, reviewConsent.checked);
  const strong = reviewRoute.querySelector("strong");
  const paragraph = reviewRoute.querySelector("p");
  strong.textContent = route.heading;
  paragraph.textContent = route.description;
  reviewSubmit.firstChild.textContent = route.button + " ";
  reviewError.hidden = true;
}
function formError(message, focus) {
  reviewError.textContent = message;
  reviewError.hidden = false;
  if (focus) focus.focus();
}
function normalizedLine(value) {
  // Evita introdução de campos falsos em mensagens enviadas à central.
  return value.trim().replace(/[\r\n\t]+/g," ").replace(/\s{2,}/g," ");
}
function buildMessage(rating, name, city, comment, consent) {
  const eligible = rating >= 4 && consent;
  const header = eligible
    ? "AVALIAÇÃO PARA MODERAÇÃO — PODE SER PUBLICADA APÓS APROVAÇÃO"
    : "FEEDBACK PRIVADO — NÃO PUBLICAR";
  const result = [
    "Olá, Espaço Piscina!",
    "Enviei minha avaliação pela página de avaliações do site.",
    "",
    header,
    "Nota: " + rating + " " + starWord(rating),
    "Nome: " + name
  ];
  if (city) result.push("Cidade: " + city);
  if (comment) result.push("Comentário: " + comment);
  else result.push("Comentário: não informado.");
  result.push(
    "",
    eligible
      ? "Autorizo a publicação do meu nome, cidade (se informada), nota e comentário no site após análise da loja."
      : "Não autorizo a publicação deste feedback no site.",
    "",
    "Mensagem preparada pelo cliente para envio confirmado no formulário seguro."
  );
  return result.join("\n");
}
function openPrivateInbox(message,name) {
  try{
    sessionStorage.setItem('saite:pending-request:v1',JSON.stringify({
      source:'espaco-piscina',
      subject:'Avaliação e feedback — Espaço Piscina',
      name:name.slice(0,80),
      message:message.slice(0,3000),
      timestamp:Date.now()
    }));
  }catch(error){console.warn('Pré-preenchimento não disponível neste navegador.')}
  window.location.assign('https://k410sh4.github.io/SAITE/contato.html?origem=espaco-piscina');
}
form.addEventListener("change", event => {
  if (event.target.name === "rating" || event.target === reviewConsent) paintRating();
});
form.addEventListener("submit", event => {
  event.preventDefault();
  const rating = currentRating();
  if (!rating) {
    formError("Selecione de 1 a 5 estrelas para continuar.",form.querySelector('input[name="rating"]'));
    return;
  }
  const name = normalizedLine(reviewName.value);
  const city = normalizedLine(reviewCity.value);
  const comment = reviewComment.value.trim();
  if (!name) {
    formError("Informe seu nome antes de continuar.",reviewName);
    return;
  }
  if (name.length > 80 || city.length > 80 || comment.length > 1200) {
    formError("Revise os campos: nome e cidade até 80 caracteres, comentário até 1200.",reviewName);
    return;
  }
  reviewError.hidden = true;
  openPrivateInbox(buildMessage(rating,name,city,comment,reviewConsent.checked),name);
});

const list = document.getElementById("reviewList");
function appendText(tag,text,parent,className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  parent.appendChild(node);
  return node;
}
function clearReviews() {
  list.replaceChildren();
}
function showEmpty(message) {
  clearReviews();
  const wrapper = document.createElement("div");
  wrapper.className = "public-review-empty";
  wrapper.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-sparkle"></use></svg>';
  appendText("strong","Nenhum depoimento publicado ainda",wrapper);
  appendText("p",message,wrapper);
  const link = document.createElement("a");
  link.href = "#avaliar";
  link.textContent = "Compartilhar minha experiência";
  wrapper.appendChild(link);
  list.appendChild(wrapper);
}
function validatedReview(item) {
  return item && item.approved === true && item.consent === true &&
    Number.isInteger(item.rating) && [4,5].includes(item.rating) &&
    typeof item.name === "string" && item.name.trim().length > 0 && item.name.length <= 80 &&
    typeof item.comment === "string" && item.comment.trim().length > 0 && item.comment.length <= 1200 &&
    (item.city === undefined || item.city === "" || (typeof item.city === "string" && item.city.length <= 80)) &&
    typeof item.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
    !Number.isNaN(Date.parse(item.date+"T12:00:00Z"));
}
function renderReview(item) {
  const card = document.createElement("article");
  card.className = "public-review-card";
  appendText("div","★".repeat(item.rating) + "☆".repeat(5-item.rating),card,"public-review-stars")
    .setAttribute("aria-label",item.rating+" de 5 estrelas");
  appendText("blockquote",item.comment.trim(),card);
  const footer = document.createElement("footer");
  appendText("span",item.name.trim().charAt(0).toLocaleUpperCase("pt-BR"),footer,"public-review-avatar")
    .setAttribute("aria-hidden","true");
  const meta = document.createElement("div");
  meta.className = "public-review-meta";
  appendText("strong",item.name.trim(),meta);
  const localDate = item.date.split("-").reverse().join("/");
  appendText("small",(item.city ? item.city.trim() + " • " : "") + localDate,meta);
  footer.appendChild(meta);
  card.appendChild(footer);
  list.appendChild(card);
}
async function loadApprovedReviews() {
  try {
    const response = await fetch("./avaliacoes.json",{cache:"no-store"});
    if (!response.ok) throw new Error("Não foi possível ler os depoimentos.");
    const json = await response.json();
    if (!Array.isArray(json)) throw new Error("Formato inválido do catálogo.");
    const approved = json.filter(validatedReview)
      .sort((a,b) => b.date.localeCompare(a.date)).slice(0,30);
    clearReviews();
    if (!approved.length) showEmpty("Ainda não há avaliações com autorização e moderação concluídas. Você pode enviar a sua experiência pelo formulário.");
    else approved.forEach(renderReview);
  } catch (_error) {
    showEmpty("Não conseguimos consultar os depoimentos agora. Você ainda pode deixar uma avaliação para a loja.");
  } finally {
    list.setAttribute("aria-busy","false");
  }
}
const toggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
toggle.addEventListener("click", () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  toggle.setAttribute("aria-expanded",String(opening));
  toggle.setAttribute("aria-label",opening ? "Fechar menu" : "Abrir menu");
  if (opening) mobileNav.querySelector("a").focus();
});
window.matchMedia("(min-width: 901px)").addEventListener("change", event => {
  if (!event.matches) return;
  mobileNav.hidden = true;
  toggle.setAttribute("aria-expanded","false");
  toggle.setAttribute("aria-label","Abrir menu");
});
document.getElementById("reviewYear").textContent = String(new Date().getFullYear());
paintRating();
loadApprovedReviews();
