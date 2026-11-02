# Espaço Piscina — site de vendas por orçamento

Vitrine digital responsiva para a **Espaço Piscina Alfenas**, seguindo o **Protocolo Mestre UX/UI V3.3**. Não são exibidos preços inventados, disponibilidade de estoque ou falsa confirmação de compra.

## Recursos da V1
- Landing page visual com imagens ilustrativas de licença Unsplash.
- Catálogo de 12 linhas de interesse, busca instantânea e filtro por categoria.
- Lista de orçamento com quantidades e remoção; persistência local no próprio navegador quando disponível.
- Encaminhamento da lista ou de um formulário curto ao WhatsApp, somente após clique.
- Links de telefone, endereço e mapa; FAQ; layout mobile-first, foco de teclado e movimento reduzido.
- SEO básico, metadados sociais, favicon e dados estruturados de loja.
- Validação de JavaScript e referências essenciais no GitHub Actions.

## Publicar em GitHub Pages

1. Acesse **Settings → Pages** neste repositório.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Abra **Actions → Publicar site no GitHub Pages**. Se não houver execução automática, clique em **Run workflow** na branch `main`.
4. Aguarde o status **success** e use o endereço publicado exibido em Pages. URL esperada (confirmar antes de divulgar): https://k410sh4.github.io/EspacoPiscinas/

Cada novo push em `main` executa verificação e publicação. O GitHub Pages é uma hospedagem **estática**: não aceita pagamentos, autenticação ou pedidos armazenados no servidor sem infraestrutura adicional.

## Configurar

- Contato WhatsApp: variável `WHATSAPP_NUMBER` em `app.js`; atualizar também links diretos no `index.html`.
- Informações de endereço, horário e textos: `index.html`.
- Categorias ilustrativas e descrições: array `products` em `app.js`.
- Identidade visual, tokens e responsividade: `styles.css`.
- Publicação: `.github/workflows/deploy.yml`.

**Antes de divulgação oficial:** obter autorização da empresa para uso do nome, confirmar WhatsApp, endereço, horário de funcionamento, serviços, categorias, condições de entrega e identidade de marca. Os itens no catálogo são categorias de interesse, **não estoque ou ofertas comerciais confirmadas**.

## Privacidade e limitações

Nenhum dado do formulário é enviado pelo site ou salvo em servidor. O usuário abre uma mensagem pré-preenchida no WhatsApp e decide se a enviará. A lista de orçamento guarda apenas identificadores de categorias e quantidades no `localStorage` do próprio navegador; pode ser apagada junto com os dados do site. A comunicação pelo WhatsApp segue as regras da plataforma.

Sem checkout online, preço, estoque em tempo real, área administrativa ou integração de pagamento. A venda é concluída fora do site, diretamente com a loja.

## Fotos e autoria

Duas fotografias de ambientação usadas sob a licença Unsplash; **não representam instalações ou trabalhos da empresa**:
- Luis Redondo: https://unsplash.com/photos/beautiful-pool-and-wooden-deck-in-a-sunny-backyard-JxrJfclnPDc
- Alexander Mass: https://unsplash.com/photos/a-curved-blue-swimming-pool-with-an-outdoor-bar-ORGeoT5pUTE

O código deste site não inclui licença de reutilização. Verifique direitos de marca e conteúdo antes de redistribuir. O protocolo V3.3 fornecido orientou escolhas de UX/UI, mas testes manuais em navegadores reais devem ser realizados antes do lançamento.

## Identidade visual recebida

A revisão de identidade utiliza a arte publicitária fornecida como referência:
- Azul-marinho aproximado `#06254e` e turquesa `#05f3db`.
- O logotipo foi extraído da arte anexada e salvo em `assets/espaco-piscina-logo.svg` (versão raster de baixa resolução). O arquivo original vetorial, se disponível, deverá substituí-lo para materiais grandes.
- A foto de fachada em `assets/fachada-espaco-piscina.webp` é um recorte ilustrativo da arte fornecida; não é imagem atualizada e independente da loja.
- O título principal agora segue o posicionamento do material: orientar o cliente antes de comprar produto inadequado para a água da piscina.

Nenhuma identidade societária, autorização comercial ou disponibilidade de estoque é inferida a partir da imagem.

## Logo e favicon vetoriais

- `assets/espaco-piscina-logo.svg`: reconstrução vetorial a partir da imagem de alta resolução fornecida; utilizada no cabeçalho e rodapé.
- `assets/favicon.svg`: ícone da aba com o símbolo da onda e gotas sobre fundo azul-marinho.
- O cabeçalho adotou o fundo azul-marinho para manter contraste suficiente com a logo branca.
- As imagens são traçadas com curvas aproximadas, não arquivos oficiais editáveis originais da empresa.

## Carrossel do mural principal — dia e noite

O mural do início possui dois slides ilustrativos:
- **Dia:** fotografia de piscina com deck e card sobre cuidados com a água (fotografia já existente, Luis Redondo/Unsplash).
- **Noite:** piscina iluminada, com card de orientação para consultar iluminação LED própria para piscinas (Luan Fonseca/Unsplash: https://unsplash.com/photos/illuminated-swimming-pool-at-night-surrounded-by-palm-trees-zZkRzighcII).

Controles: setas, indicadores, deslizar no celular e avanço automático a cada oito segundos.
O avanço para quando o usuário interage, quando o mouse está sobre o mural, durante foco de teclado e quando a página está oculta. Respeita `prefers-reduced-motion`. A alteração de slide não dispara anúncios excessivos de leitores de tela. O layout e as dicas são responsivos. Não representa trabalhos realizados pela loja.

No projeto HTML/CSS/JS, os arquivos relacionados são `index.html` (estrutura), `styles.css` (aparência), `app.js` (navegação e pausa).

## Digitação do título principal

O trecho “em Alfenas?” aparece letra a letra uma vez no carregamento. A primeira parte do título fica fixa, e uma camada invisível reserva a largura final para impedir deslocamentos. O texto permanece disponível integralmente a leitores de tela. A animação não inicia quando a preferência do sistema é por movimento reduzido, e pode ser interrompida por essa preferência. O conteúdo completo é exibido normalmente com JavaScript desativado.

## Central de Ajuda — marcas e situações

Rota: `/suporte.html`. O botão chamativo com fotografia ilustrativa no início do site e o menu levam à página.

As seis situações são: água verde, água turva, pH alto, pH baixo, manchas/coloração por possíveis metais e bordas sujas. Há opções para orçamento das marcas Montreal, Genco, HTH e Fluidra, com links ao fabricante e filtros de busca/marca. **Os 22 itens são referências de produto verificadas em catálogos oficiais, mas não indicam disponibilidade real na Espaço Piscina.** Não há preços inventados.

Arquitetura:
- `catalog.js`: fonte única de dados, problemas, produtos, marcas, links e cuidados; aproveitada pela loja e pelo suporte;
- `suporte.html`, `support.css` e `support.js`: página e funcionalidades de suporte;
- `app.js`: loja preservada, carregando agora a mesma fonte de produtos; `supportOnly` esconde itens de suporte do catálogo genérico, mas não os impede de aparecer na lista;
- `localStorage` na chave `espaco-piscina-orcamento-v1` compartilha a lista entre as duas páginas;
- GitHub Actions publica ambas as páginas e verifica os arquivos.

**Segurança:** a aparência não diagnostica pH, metais ou algas de maneira inequívoca. As fotos são **simulações visuais**, feitas com filtros sobre a fotografia ilustrativa da piscina, e não fotografias de problemas reais nem evidência de tratamento. Sempre medir água, conferir volume, filtração, rótulo/FDS, segurança e compatibilidade; produtos de marcas diferentes são opções alternativas e não devem ser misturados. Sem dosagens automáticas nem recomendação de tratamento químico simultâneo.

Referências oficiais consultadas:
- Montreal: https://www.montrealpiscinas.com.br/tratamentos/ e https://www.montrealpiscinas.com.br/produtos/
- GENCO: https://www.genco.com.br/linha-de-produtos/ e https://www.genco.com.br/genfloc/
- HTH: https://hth.com.br/produtos e https://hth.com.br/como-tratar/agua-verde
- Fluidra: https://fluidra.com.br/categorias_produtos/tratamento-quimico-para-piscinas/

A página não coleta fotos nem faz análise automatizada; o botão de ajuda abre WhatsApp para o usuário enviar voluntariamente seu caso e a foto. Vendas continuam mediante confirmação direta com a loja.

## Área de avaliações — `/avaliacoes.html`

A página de avaliações permite nota de 1 a 5 estrelas, nome obrigatório, cidade opcional e comentário opcional.

- **Notas 1–3:** abre WhatsApp com mensagem marcada **feedback privado — não publicar**.
- **Notas 4–5:** com autorização explícita, abre WhatsApp com mensagem para moderação e possível publicação; sem autorização, também permanece privada.
- **Não há envio automático ao preencher**. O visitante precisa enviar a mensagem pelo WhatsApp, onde seu número ficará visível à loja.
- **Não há banco de dados nem backend**: apenas um arquivo público de depoimentos autorizados e aprovados, `avaliacoes.json`, editado manualmente no GitHub. Não é uma nota média imparcial.
- **Nenhuma avaliação fictícia** foi inserida no arquivo inicial (`[]`).

Para moderar: confirme pelo WhatsApp a autorização de uso de nome, cidade, nota e comentário. Após revisar o relato, adicione um registro no arquivo `avaliacoes.json`:

```json
{
  "approved": true,
  "consent": true,
  "rating": 5,
  "name": "Nome autorizado",
  "city": "Cidade opcional",
  "comment": "Comentário autorizado",
  "date": "2026-11-01"
}
```

Isso é apenas um **exemplo de formato**, não uma avaliação real. Publicar um comentário real requer consentimento de quem o fez. Excluir o registro no GitHub não garante remoção das versões anteriores do histórico público do repositório; evite armazenar dados privados ou sensíveis. Atenda pedidos de correção ou retirada.

Os depoimentos públicos são explicitamente **selecionados** (apenas 4–5 estrelas autorizadas). O site avisa que notas 1–3 permanecem privadas e não representa essa seleção como a média de todas as opiniões recebidas.
