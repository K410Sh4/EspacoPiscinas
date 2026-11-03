/* Previews oficiais: preencher apenas com URLs reais e públicas de posts/Reels da conta.
 * Ex.: {url:"https://www.instagram.com/reel/CODIGO/",titulo:"Dica publicada pela loja",
 *       imagem:"./assets/miniatura-autorizada.webp",legenda:"Publicação oficial"}
 * Sem links verificados, a página mostra uma vitrine ilustrativa com acesso ao perfil oficial.
 */
const PUBLICACOES_INSTAGRAM = [];

(() => {
  "use strict";
  const perfil = "https://www.instagram.com/espacopiscinamg/";
  const menu = document.getElementById("menuToggle");
  const mobile = document.getElementById("mobileNav");
  if (menu && mobile) {
    menu.addEventListener("click", () => {
      const aberto = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", String(!aberto));
      menu.setAttribute("aria-label", aberto ? "Abrir menu" : "Fechar menu");
      mobile.hidden = aberto;
    });
    mobile.addEventListener("click", (evento) => {
      if (!evento.target.closest("a")) return;
      mobile.hidden = true;
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Abrir menu");
    });
  }

  const grade = document.getElementById("igReels");
  const aviso = document.getElementById("igDisclosure");
  const modal = document.getElementById("igModal");
  const conteudo = document.getElementById("igModalContent");
  const linkExterno = document.getElementById("igModalLink");

  const codigoDaPublicacao = (url) => {
    try {
      const u = new URL(url);
      if (u.protocol !== "https:" || !["www.instagram.com", "instagram.com"].includes(u.hostname)) return null;
      const m = u.pathname.match(/^\/(?:reel|reels|p)\/([a-zA-Z0-9_-]+)\/?$/);
      return m ? m[1] : null;
    } catch { return null; }
  };

  const abrirReel = (publicacao) => {
    const codigo = codigoDaPublicacao(publicacao.url);
    if (!codigo || !modal || !conteudo || !linkExterno || !modal.showModal) {
      window.open(publicacao.url || perfil, "_blank", "noopener,noreferrer");
      return;
    }
    conteudo.replaceChildren();
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.instagram.com/p/" + encodeURIComponent(codigo) + "/embed/";
    iframe.title = "Publicação do Instagram da Espaço Piscina";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    conteudo.append(iframe);
    linkExterno.href = publicacao.url;
    modal.showModal();
  };
  if (modal) {
    modal.querySelector(".ig-modal-close")?.addEventListener("click", () => modal.close());
    modal.addEventListener("close", () => conteudo?.replaceChildren());
    modal.addEventListener("click", (evento) => { if (evento.target === modal) modal.close(); });
  }

  if (!Array.isArray(PUBLICACOES_INSTAGRAM) || !grade) return;
  const validas = PUBLICACOES_INSTAGRAM.filter(item => item && codigoDaPublicacao(item.url));
  if (!validas.length) return;
  grade.replaceChildren();
  validas.slice(0, 8).forEach((post, index) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "ig-card";
    botao.setAttribute("aria-label", "Assistir publicação: " + (post.titulo || "Vídeo da loja"));
    const img = document.createElement("img");
    img.src = post.imagem || "./assets/fachada-espaco-piscina-3072.png";
    img.alt = post.legenda || "Prévia da publicação da Espaço Piscina";
    img.loading = index === 0 ? "eager" : "lazy";
    img.width = 540; img.height = 720;
    const sombra = document.createElement("span");
    sombra.className = "ig-card-shade";
    const selo = document.createElement("span");
    selo.className = "ig-card-badge";
    selo.textContent = "REEL OFICIAL";
    const acao = document.createElement("span");
    acao.className = "ig-card-icon";
    acao.setAttribute("aria-hidden", "true");
    acao.textContent = "▶";
    const legendas = document.createElement("span");
    legendas.className = "ig-card-caption";
    const titulo = document.createElement("strong");
    titulo.textContent = post.titulo || "Publicação da loja";
    const detalhe = document.createElement("small");
    detalhe.textContent = post.legenda || "@espacopiscinamg";
    legendas.append(titulo, detalhe);
    botao.append(img, sombra, selo, acao, legendas);
    botao.addEventListener("click", () => abrirReel(post));
    grade.append(botao);
  });
  if (aviso) aviso.textContent = "Publicações oficiais do @espacopiscinamg. A reprodução incorporada depende das permissões e da disponibilidade do Instagram; use 'Abrir publicação' se necessário.";
})();