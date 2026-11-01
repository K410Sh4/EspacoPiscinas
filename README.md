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
- O logotipo foi extraído da arte anexada e salvo em `assets/espaco-piscina-logo.png` (versão raster de baixa resolução). O arquivo original vetorial, se disponível, deverá substituí-lo para materiais grandes.
- A foto de fachada em `assets/fachada-espaco-piscina.webp` é um recorte ilustrativo da arte fornecida; não é imagem atualizada e independente da loja.
- O título principal agora segue o posicionamento do material: orientar o cliente antes de comprar produto inadequado para a água da piscina.

Nenhuma identidade societária, autorização comercial ou disponibilidade de estoque é inferida a partir da imagem.
