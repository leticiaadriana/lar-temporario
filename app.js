const LINK_ENCONTREI = 'https://wa.me/55DDDNUMERO';

const A = Object.fromEntries(Object.entries({
  logo: 'logo_icon.svg',
  hero: 'banner_cats.svg',
  bannerAdocao: 'banner_responsable_adoption.png',
  patasEsq: 'paws_left.svg', patasDir: 'paws_right.svg', patasRoxas: 'purple_paws.svg',
  adotante: 'adoption.svg', doador: 'donator.svg', voluntario: 'volunteer.svg',
  encontrei: 'found_cat.svg', historia: 'history.svg', outrasOngs: 'other_ongs.svg',
  doacaoMonetaria: 'money_donation.svg', doacaoFisica: 'physical_donation.svg', doacaoOnline: 'online_donation.svg',
  volSocializacao: 'socialization_volunteer.svg', volOrganizacao: 'organization_volunteer.svg',
  ongArca: 'ong_arca.svg', ongSantuario: 'ong_santuario.svg', ongProAnimal: 'ong_pro_animal.svg', ongPegadas: 'ong_pegadas.svg',
}).map(([k, v]) => [k, 'assets/' + v]));

let gatoInteresse = '';

const FOTO = 'assets/cats/cat1.jpg';
const GATOS = [
  { nome: 'Ohmberto', sexo: 'Macho', idadeMeses: 8, foto: 'cat1.jpg', descricao: 'Ohmberto é um gato muito amoroso e muito safado. Além disso, ele é um morto de fome que ama petiscos e mia o dia inteiro por mais ração.' },
  { nome: 'Mingau', sexo: 'Macho', idadeMeses: 3, foto: 'cat2.jpg', descricao: 'Mingau é um filhote cheio de energia que corre pela casa como se fosse uma pista de corrida. Cai no sono do nada, quase sempre no colo de quem estiver por perto.' },
  { nome: 'Pipoca', sexo: 'Fêmea', idadeMeses: 5, foto: 'cat3.jpeg', descricao: 'Pipoca é uma gatinha curiosa que precisa investigar cada caixa, sacola e gaveta aberta. Adora brincar com bolinhas de papel e ronrona alto quando ganha carinho.' },
  { nome: 'Luna', sexo: 'Fêmea', idadeMeses: 12, foto: 'cat4.jpeg', descricao: 'Luna é calma e observadora, daquelas que escolhem com cuidado de quem querem ficar perto. Depois que ganha confiança, não sai mais do seu lado e dorme ao pé da cama.' },
  { nome: 'Tigrão', sexo: 'Macho', idadeMeses: 24, foto: 'cat5.jpeg', descricao: 'Tigrão tem pose de valente, mas é um molenga que se derrete com cafuné na barriga. Gosta de brincar de caçar e de vigiar a janela o dia inteiro.' },
  { nome: 'Bolinha', sexo: 'Macho', idadeMeses: 2, foto: 'cat6.jpeg', descricao: 'Bolinha é o caçula do projeto: pequeno, atrapalhado e muito dorminhoco. Ainda está aprendendo a descer do sofá, mas já sabe pedir colo.' },
  { nome: 'Nina', sexo: 'Fêmea', idadeMeses: 7, foto: 'cat7.jpeg', descricao: 'Nina é independente, mas adora um dengo na hora certa. Gosta de brincar de esconde-esconde e se dá bem com outros gatos.' },
  { nome: 'Simba', sexo: 'Macho', idadeMeses: 18, foto: 'cat8.jpeg', descricao: 'Simba é sociável e cumprimenta todo mundo que chega, com direito a miado e esfregada na perna. Adora brincar com varinha de pena e está pronto para uma casa movimentada.' },
  { nome: 'Cacau', sexo: 'Fêmea', idadeMeses: 4, foto: 'cat9.jpeg', descricao: 'Cacau é uma filhote doce e sossegada que adora tirar sonecas ao sol. Ronrona assim que alguém se aproxima e já usa a caixa de areia como uma campeã.' },
  { nome: 'Frida', sexo: 'Fêmea', idadeMeses: 36, foto: 'cat10.jpg', descricao: 'Frida é uma gata adulta, tranquila e cheia de personalidade. Gosta de rotina, de um cantinho só dela e de receber carinho sem pressa.' },
  { nome: 'Thor', sexo: 'Macho', idadeMeses: 10, foto: 'cat11.jpg', descricao: 'Thor é bagunceiro e atlético: sobe em tudo, derruba o que vê pela frente e depois pede desculpas com um olhar inocente. Precisa de brinquedos e espaço para gastar energia.' },
  { nome: 'Maya', sexo: 'Fêmea', idadeMeses: 6, foto: 'cat12.jpg', descricao: 'Maya é falante e adora conversar com miados curtos. Segue a pessoa pela casa e é a primeira a aparecer quando ouve o barulho do pote de ração.' },
].map(({ foto, ...g }, i) => ({ id: i + 1, ...g, fotos: ['assets/cats/' + foto] }));
const faixa = m => (m < 6 ? 'Filhote (até 6 meses)' : m < 12 ? 'Jovem (6 a 12 meses)' : 'Adulto (1 ano ou mais)');
const idadeTxt = m => (m >= 12 ? `${Math.floor(m / 12)} ${m >= 24 ? 'anos' : 'ano'}` : `${m} meses`);

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const img = (src, alt = '', cls = '') => `<img src="${src}" alt="${alt}" class="${cls}" onerror="this.style.visibility='hidden'">`;
const normaliza = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const cardHTML = g => `
  <li><button class="card" data-id="${g.id}" aria-haspopup="dialog" aria-label="Ver detalhes de ${g.nome}">
    ${img(g.fotos[0] || FOTO, '')}
    <span class="card__corpo"><h3>${g.nome}</h3><p>${g.sexo} · ${idadeTxt(g.idadeMeses)}. ${g.descricao}</p></span>
  </button></li>`;

const imgc = (src, alt, cls = '') => `<img src="${src}" alt="${alt.replace(/"/g, '&quot;')}"${cls ? ` class="${cls}"` : ''}>`;

const ALT_BANNER = 'A adoção responsável é um compromisso a longo prazo que envolve dedicação e amor!';
const bannerSecao = (extra = '') => `
  <section class="banner ${extra}">
    <img class="banner__patas banner__patas--esq" src="${A.patasEsq}" alt="" aria-hidden="true">
    <img class="banner__patas banner__patas--dir" src="${A.patasDir}" alt="" aria-hidden="true">
    ${imgc(A.bannerAdocao, ALT_BANNER, 'banner__img')}
  </section>`;

const paginas = {
  inicio: () => `
    ${heroSection()}

    <section class="stats" aria-label="Nossos números">
      <div><strong data-conta="130">+130</strong><span>resgatados</span></div>
      <div><strong data-conta="110">+110</strong><span>adoções</span></div>
      <div><strong data-conta="150">+150</strong><span>auxílios</span></div>
    </section>

    <section class="como wrap">
      <h2>Como funciona?</h2>
      <div class="como__lista">
        <div><h3>Formulário de interesse</h3><p>Depois de observar os bichinhos disponíveis para adoção, preencha o nosso formulário de interesse com informações verídicas!</p></div>
        <div><h3>Comprovação dos dados</h3><p>Caso você atenda aos critérios iniciais de adoção responsável, em até 48h, entraremos em contato para solicitar a comprovação das informações fornecidas.</p></div>
        <div><h3>Visita ao projeto</h3><p>Após todos os passos serem concluídos, agendaremos uma visita para buscar o gatinho adotado ou conhecer outros.</p></div>
      </div>
    </section>

    <section class="secao-gatos">
      <div class="wrap">
        <h2 class="secao-titulo">Conheça os gatinhos disponíveis!</h2>
        <ul class="grade">${GATOS.slice(0, 6).map(cardHTML).join('')}</ul>
        <a class="ver-todos" href="#gatinhos">ver todos →</a>
      </div>
    </section>

    ${bannerSecao()}
    <div class="faixa"></div>

    <section class="pap">
      <div class="wrap">
        <h2 class="secao-titulo">Quem é você?</h2>
        <div class="pap__grade">
          <a class="pap__item" href="#doar">${imgc(A.doador, '')}Doador(a)</a>
          <a class="pap__item" href="#adotar">${imgc(A.adotante, '')}Adotante</a>
          <a class="pap__item" href="#voluntariar">${imgc(A.voluntario, '')}Voluntário(a)</a>
        </div>
      </div>
    </section>
    <div class="faixa"></div>

    <section class="pap pap--info">
      <img class="decor" src="${A.patasRoxas}" alt="" aria-hidden="true">
      <div class="wrap">
        <h2 class="secao-titulo">Outras informações</h2>
        <div class="pap__grade">
          <a class="img-link" href="${LINK_ENCONTREI}" target="_blank" rel="noopener">${imgc(A.encontrei, 'Encontrei um gatinho')}<span class="sr">(abre em nova aba)</span></a>
          <a class="img-link" href="#sobre">${imgc(A.historia, 'Nossa história')}</a>
          <a class="img-link" href="#ongs">${imgc(A.outrasOngs, 'Outras ONG’s')}</a>
        </div>
      </div>
    </section>`,

  gatinhos: () => `
    ${topoBanner()}
    <section class="secao-gatos">
      <div class="wrap">
        <h1 class="secao-titulo" style="color:var(--vermelho)">Conheça os gatinhos disponíveis!</h1>
        <form class="busca" role="search" onsubmit="return false">
          <label class="campo"><span class="sr" hidden>Buscar</span>
            <input id="busca" type="search" placeholder="Buscar" autocomplete="off">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
          </label>
          <button type="button" class="filtros-btn" aria-expanded="false" aria-controls="painel">Filtros
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h18l-7 9v6l-4 2v-8z"/></svg>
          </button>
        </form>
        <div id="painel" class="painel" hidden>
          <fieldset><legend>Sexo</legend>
            <label><input type="checkbox" name="sexo" value="Macho"> Macho</label>
            <label><input type="checkbox" name="sexo" value="Fêmea"> Fêmea</label>
          </fieldset>
          <fieldset><legend>Idade</legend>
            ${['Filhote (até 6 meses)', 'Jovem (6 a 12 meses)', 'Adulto (1 ano ou mais)'].map(f => `<label><input type="checkbox" name="idade" value="${f}"> ${f}</label>`).join('')}
          </fieldset>
          <button type="button" class="limpar">Limpar filtros</button>
        </div>
        <p class="status" role="status" aria-live="polite"></p>
        <ul class="grade" id="lista"></ul>
      </div>
    </section>`,
};

const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const PIX = 'lar@temporario.com';
const ENDERECO = 'Rua dos Gatinhos, 123 – Bairro Exemplo, São Carlos – SP';
const LISTA_DESEJOS = '#doar';

const CAMPANHAS = [
  { id: 1, titulo: 'Ajude Patinha a operar a orelha!', desc: 'Patinha foi resgatada com uma infecção na orelha e precisa de uma cirurgia para voltar a ficar bem.', foto: 'assets/cats/cat7.jpeg', arrecadado: 900, meta: 1900 },
  { id: 2, titulo: 'Vacinas para a ninhada do Bolinha', desc: 'Cinco filhotes resgatados precisam completar o ciclo de vacinas antes de irem para a adoção.', foto: 'assets/cats/cat6.jpeg', arrecadado: 450, meta: 1200 },
];
const ONGS = [
  { nome: 'Arca de São Francisco', desc: 'ONG de animais cães e gatos para adoção', img: A.ongArca, url: '#' },
  { nome: 'Santuário Luz dos Bichos', desc: 'Resgate de animais abandonados ou vítimas de maus-tratos.', img: A.ongSantuario, url: '#' },
  { nome: 'Grupo Pró-Animal', desc: 'Salvando vítimas animais de abandonos e/ou maus tratos!', img: A.ongProAnimal, url: '#' },
  { nome: 'Pegadas no Coração', desc: 'Desde 2022 atuando pela defesa e direito dos animais!', img: A.ongPegadas, url: '#' },
];

const heroSection = () => `
  <section class="hero">
    <div class="hero__texto">
      <h1>Encontre um novo amigo!</h1>
      <p>Nosso projeto está cheio de gatinhos resgatados procurando por um lar. Venha se tornar a família de algum deles!</p>
    </div>
    ${imgc(A.hero, 'Dois gatinhos resgatados: um filhote tricolor e um gato laranja e branco', 'hero__img')}
  </section>`;
const heroHTML = () => `${heroSection()}
  <div class="faixa-alta"></div>`;
const topoBanner = () => bannerSecao('topo-gatinhos');

const campanhaHTML = c => `
  <article class="camp" data-id="${c.id}">
    <h3>${c.titulo}</h3>
    <div class="camp__corpo">${img(c.foto, '')}<p>${c.desc}</p></div>
    <strong class="camp__rot">Valor:</strong>
    <div class="barra" role="progressbar" aria-label="Progresso da campanha" aria-valuemin="0" aria-valuemax="${c.meta}" aria-valuenow="${c.arrecadado}">
      <div class="barra__cheio"><span>${brl(c.arrecadado)}</span></div><em>${brl(c.meta)}</em>
    </div>
    <div class="camp__rodape">
      <span>Faltam: <b class="falta">${brl(c.meta - c.arrecadado)}</b></span>
      <button type="button" class="btn-doar" aria-expanded="false">Doar!</button>
    </div>
    <div class="camp__opcoes" hidden>
      <span>Escolha um valor:</span>
      ${[10, 25, 50, 100].map(v => `<button type="button" class="chip" data-v="${v}">${brl(v)}</button>`).join('')}
    </div>
  </article>`;

function atualizaCamp(el, c) {
  const pct = Math.round(c.arrecadado / c.meta * 100);
  $('.barra__cheio', el).style.width = Math.max(pct, 28) + '%';
  $('.barra__cheio span', el).textContent = brl(c.arrecadado);
  $('.barra', el).setAttribute('aria-valuenow', c.arrecadado);
  const falta = c.meta - c.arrecadado;
  $('.falta', el).textContent = falta > 0 ? brl(falta) : 'Meta atingida! 🎉';
  if (falta <= 0) { const b = $('.btn-doar', el); b.disabled = true; $('.camp__opcoes', el).hidden = true; }
}

Object.assign(paginas, {
  voluntariar: () => `
    ${topoBanner()}
    <section class="wrap bloco">
      <h1 class="secao-titulo esq">Qual é o seu tipo de voluntariado?</h1>
      <div class="duo">
        <article class="cartao">
          <span class="num" aria-hidden="true">1</span>
          ${imgc(A.volSocializacao, '', 'cartao__img')}
          <h2>Socialização</h2>
          <ul>
            <li>Passe o tempo com nossos acolhidos, oferecendo carinho, brincadeiras e momentos de interação com tranquilidade;</li>
            <li>Utilize petiscos, elogios e brincadeiras para reforçar comportamentos positivos e criar associações agradáveis;</li>
            <li>Monitore o comportamento dos gatos identificando sinais de estresse ou ansiedade.</li>
          </ul>
        </article>
        <article class="cartao">
          <span class="num" aria-hidden="true">2</span>
          ${imgc(A.volOrganizacao, '', 'cartao__img')}
          <h2>Organização e Limpeza</h2>
          <ul>
            <li>Limpar e organizar os quartos, gaiolas e áreas comuns;</li>
            <li>Troca de areia das caixas higiênicas;</li>
            <li>Repor ração e dar sachê para os gatos;</li>
            <li>Lavar comedouros e potes de água;</li>
            <li>Medicar os gatos, com comprimidos ou outras formas de medicação, quando necessário;</li>
            <li>Colocar cobertores, tapetes e outros itens para lavar na máquina, além de estendê-los.</li>
          </ul>
        </article>
      </div>
    </section>
    <section class="faixa-lilas">
      <form class="form" novalidate aria-labelledby="form-tit" data-sucesso="Recebemos o seu interesse em ser voluntário(a). Entraremos em contato em breve!">
        <h2 id="form-tit">Formulário de interesse</h2>
        <div class="form__passos">
          <div class="passo">
            <div class="cf"><label for="f-nome">Nome completo:</label><input id="f-nome" name="nome" autocomplete="name" required><small class="erro" role="alert"></small></div>
            <div class="cf"><label for="f-tel">Telefone (DDD + número):</label><input id="f-tel" name="tel" type="tel" inputmode="numeric" autocomplete="tel" pattern="\\(?\\d{2}\\)?\\s?9?\\d{4}-?\\d{4}" placeholder="(16) 91234-5678" required><small class="erro" role="alert"></small></div>
            <div class="cf"><label for="f-email">E-mail:</label><input id="f-email" name="email" type="email" autocomplete="email" required><small class="erro" role="alert"></small></div>
            <div class="cf"><label for="f-end">Endereço completo:</label><input id="f-end" name="end" autocomplete="street-address" required><small class="erro" role="alert"></small></div>
            <div class="cf"><label for="f-como">Como conheceu o Projeto Lar Temporário?</label><input id="f-como" name="como" required><small class="erro" role="alert"></small></div>
          </div>
          <div class="passo" hidden>
            <fieldset class="cf"><legend>Você já tem gatos em casa?</legend>
              <label class="op"><input type="radio" name="tem" value="sim" required> Sim</label>
              <label class="op"><input type="radio" name="tem" value="nao"> Não</label>
              <small class="erro" role="alert"></small></fieldset>
            <div class="cf"><label for="f-exp">Qual a sua experiência com gatos?</label><textarea id="f-exp" name="exp" rows="3" required></textarea><small class="erro" role="alert"></small></div>
          </div>
          <div class="passo" hidden>
            <fieldset class="cf"><legend>Qual tipo de voluntariado você prefere?</legend>
              <label class="op"><input type="radio" name="tipo" value="soc" required> Socialização</label>
              <label class="op"><input type="radio" name="tipo" value="limp"> Organização e Limpeza</label>
              <label class="op"><input type="radio" name="tipo" value="ambos"> Os dois</label>
              <small class="erro" role="alert"></small></fieldset>
            <div class="cf"><label for="f-disp">Quais dias e horários você tem disponíveis?</label><input id="f-disp" name="disp" required><small class="erro" role="alert"></small></div>
          </div>
        </div>
        <div class="abas" role="tablist" aria-label="Etapas do formulário">
          <button type="button" role="tab">Geral</button><button type="button" role="tab">Gatos</button><button type="button" role="tab">Voluntariado</button>
        </div>
        <button type="submit" class="btn form__prox">Próximo</button>
      </form>
    </section>`,

  doar: () => `
    ${heroHTML()}
    <section class="wrap bloco centro">
      <h1 class="secao-titulo">Contribua conosco!</h1>
      <p class="sub">Aqui estão algumas informações sobre como nos ajudar!<br>Sinta-se livre para contribuir em qualquer uma das ações.</p>
      <div class="trio">
        <article class="cartao">
          <span class="num" aria-hidden="true">1</span>
          ${imgc(A.doacaoMonetaria, '', 'cartao__img')}
          <h2>Doações Monetárias</h2>
          <p>Realize doações financeiras online para a ONG.<br>Toda doação é bem-vinda!</p>
          <button type="button" class="btn-acao btn-pix">pix: ${PIX}</button>
        </article>
        <article class="cartao">
          <span class="num" aria-hidden="true">2</span>
          ${imgc(A.doacaoFisica, '', 'cartao__img')}
          <h2>Doações Físicas</h2>
          <p>Envie doações de itens que você já tem em casa para a nossa ONG!<br>Lembre-se de verificar se todos os itens estão em bom estado.</p>
          <button type="button" class="btn-acao btn-end" aria-expanded="false" aria-controls="endereco">Endereço</button>
          <p id="endereco" class="end" hidden>${ENDERECO}</p>
        </article>
        <article class="cartao">
          <span class="num" aria-hidden="true">3</span>
          ${imgc(A.doacaoOnline, '', 'cartao__img')}
          <h2>Doações Online</h2>
          <p>Cheque nossa listinha de desejos, compre online e redirecione a ONG. A listinha contém itens de prioridade para nós!</p>
          <a class="btn-acao" href="${LISTA_DESEJOS}" target="_blank" rel="noopener">Lista de desejos<span class="sr"> (abre em nova aba)</span></a>
        </article>
      </div>
    </section>
    <div class="faixa"></div>
    <section class="wrap bloco centro">
      <h2 class="secao-titulo">Doações em aberto</h2>
      <p class="sub">Aqui estão algumas campanhas de doação em aberto!<br>Nos ajude a alcançar a meta!</p>
      <div class="duo camps">${CAMPANHAS.map(campanhaHTML).join('')}</div>
    </section>`,

  ongs: () => `
    ${heroHTML()}
    <section class="wrap bloco centro">
      <h1 class="secao-titulo">Outras ONG’s</h1>
      <p class="sub">Aqui estão algumas ONG’s parceiras, contribua para espalhar o bem!</p>
      <ul class="ongs">
        ${ONGS.map(o => `
          <li><a class="img-link" href="${o.url}" target="_blank" rel="noopener">${imgc(o.img, `${o.nome}: ${o.desc}`)}<span class="sr">(abre em nova aba)</span></a></li>`).join('')}
      </ul>
    </section>`,

  sobre: () => `
    ${topoBanner()}
    <section class="wrap bloco">
      <article class="historia">
        <h1>História do Projeto</h1>
        <p>Fundado em 2021, o Projeto Lar Temporário é mantido com ajuda de padrinhos fixos e doações esporádicas de seguidores.</p>
        <p>Os gatos recebem os cuidados básicos de vermífugo, anti-pulgas, vitamina, comem ração premium, sachês, passam a utilizar a caixa de areia e são socializados. A depender da idade, recebem cuidados mais completos: fazem exames, são vacinados e castrados.</p>
        <p>Após cuidados básicos, eles são disponibilizados para adoções responsáveis, concluindo o nosso propósito como abrigo temporário.</p>
      </article>
    </section>`,
});

const ETAPAS_ADOCAO = [
  'Revise a seção de gatinhos disponíveis e escolha um gato.',
  'Responda o pedido. Leva cerca de dez minutos.',
  'A equipe lê as respostas.',
  'Quem mora em casa recebe uma visita para verificação.',
  'A resposta chega no WhatsApp informado no pedido.',
  'Se o pedido for aprovado, a equipe combina a busca do gato.',
];
const radios = (nome, opcoes) => opcoes.map(([v, t], i) => `<label class="op"><input type="radio" name="${nome}" value="${v}"${i ? '' : ' required'}> ${t}</label>`).join('');

Object.assign(paginas, {
  adotar: () => `
    ${topoBanner()}
    <section class="wrap bloco">
      <h1 class="secao-titulo esq">Como adotar?</h1>
      <ol class="etapas">
        ${ETAPAS_ADOCAO.map((t, i) => `<li class="etapa"><span class="num" aria-hidden="true">${i + 1}</span><p>${t}</p></li>`).join('')}
      </ol>
    </section>
    <section class="faixa-lilas">
      <form class="form" novalidate aria-labelledby="form-tit" data-sucesso="Recebemos o seu pedido de adoção! A equipe vai ler as respostas e responder no WhatsApp informado.">
        <h2 id="form-tit">Formulário de interesse</h2>
        <div class="form__passos">
          <div class="passo">
            <div class="cf"><label for="f-nome">Nome completo:</label><input id="f-nome" name="nome" autocomplete="name" required><small class="erro" role="alert"></small></div>
            <div class="cf"><label for="f-tel">Telefone (DDD + número):</label><input id="f-tel" name="tel" type="tel" inputmode="numeric" autocomplete="tel" pattern="\\(?\\d{2}\\)?\\s?9?\\d{4}-?\\d{4}" placeholder="(16) 91234-5678" required><small class="erro" role="alert"></small></div>
            <div class="cf"><label for="f-email">E-mail:</label><input id="f-email" name="email" type="email" autocomplete="email" required><small class="erro" role="alert"></small></div>
            <div class="cf"><label for="f-end">Endereço completo:</label><input id="f-end" name="end" autocomplete="street-address" required><small class="erro" role="alert"></small></div>
            <div class="cf"><label for="f-gato">Gatinho(a) que tem interesse:</label><input id="f-gato" name="gato" list="lista-gatos" required><datalist id="lista-gatos">${GATOS.map(g => `<option value="${g.nome}">`).join('')}</datalist><small class="erro" role="alert"></small></div>
          </div>
          <div class="passo" hidden>
            <fieldset class="cf"><legend>Você mora em:</legend>${radios('moradia', [['casa', 'Casa'], ['apto', 'Apartamento']])}<small class="erro" role="alert"></small></fieldset>
            <fieldset class="cf"><legend>A moradia tem telas de proteção em janelas e sacadas?</legend>${radios('telas', [['sim', 'Sim'], ['nao', 'Não']])}<small class="erro" role="alert"></small></fieldset>
            <fieldset class="cf"><legend>Todos os moradores concordam com a adoção?</legend>${radios('concordam', [['sim', 'Sim'], ['nao', 'Não']])}<small class="erro" role="alert"></small></fieldset>
          </div>
          <div class="passo" hidden>
            <fieldset class="cf"><legend>Você tem outros animais em casa?</legend>${radios('outros', [['sim', 'Sim'], ['nao', 'Não']])}<small class="erro" role="alert"></small></fieldset>
            <fieldset class="cf"><legend>Você se compromete com vacinas, castração e cuidados veterinários?</legend>${radios('cuidados', [['sim', 'Sim'], ['nao', 'Não']])}<small class="erro" role="alert"></small></fieldset>
            <fieldset class="cf"><legend>Aceita receber uma visita de verificação?</legend>${radios('visita', [['sim', 'Sim'], ['nao', 'Não']])}<small class="erro" role="alert"></small></fieldset>
          </div>
        </div>
        <div class="abas" role="tablist" aria-label="Etapas do formulário">
          <button type="button" role="tab">Geral</button><button type="button" role="tab">Moradia</button><button type="button" role="tab">Responsabilidades</button>
        </div>
        <button type="submit" class="btn form__prox">Próximo</button>
      </form>
    </section>`,
});

function toast(msg, acao) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.textContent = msg;
  if (acao) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'toast__acao'; b.textContent = acao.texto;
    b.addEventListener('click', () => { t.classList.remove('on'); acao.fn(); });
    t.append(b);
  }
  t.classList.add('on');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), acao ? 6000 : 2800);
}

function iniciaForm() {
  const f = $('.form'), passos = $$('.passo', f), abas = $$('.abas button', f), btn = $('.form__prox', f);
  let atual = 0, max = 0;
  const mostra = i => {
    atual = i;
    passos.forEach((p, j) => p.hidden = j !== i);
    abas.forEach((a, j) => { a.setAttribute('aria-selected', j === i); a.disabled = j > max; });
    btn.textContent = i === passos.length - 1 ? 'Enviar' : 'Próximo';
  };
  const valida = () => {
    let primeiro = null;
    $$('input, textarea', passos[atual]).forEach(c => {
      const erro = c.closest('.cf').querySelector('.erro');
      const ok = c.checkValidity();
      c.setAttribute('aria-invalid', !ok);
      erro.textContent = ok ? '' : (c.validity.valueMissing ? 'Preencha este campo.' : 'Confira o formato deste campo.');
      if (!ok && !primeiro) primeiro = c;
    });
    primeiro && primeiro.focus();
    return !primeiro;
  };
  f.addEventListener('input', e => {
    if (e.target.checkValidity()) { e.target.setAttribute('aria-invalid', 'false'); e.target.closest('.cf').querySelector('.erro').textContent = ''; }
  });
  abas.forEach((a, j) => a.addEventListener('click', () => mostra(j)));
  f.addEventListener('submit', e => {
    e.preventDefault();
    if (!valida()) return;
    if (atual < passos.length - 1) { max = Math.max(max, atual + 1); mostra(atual + 1); $('input, textarea', passos[atual]).focus(); }
    else { f.innerHTML = `<h2 tabindex="-1">Obrigado! 🐾</h2><p class="ok">${f.dataset.sucesso}</p>`; $('h2', f).focus(); }
  });
  const g = $('#f-gato'); if (g && gatoInteresse) g.value = gatoInteresse;
  mostra(0);
}

const emBreve = rota => `<section class="em-breve"><h1>Em breve 🐾</h1><p>A página “${rota}” será construída quando você enviar a tela.</p><a class="btn" href="#inicio">Voltar ao início</a></section>`;

const main = $('#conteudo');
function rotear() {
  const rota = location.hash.slice(1) || 'inicio';
  main.innerHTML = (paginas[rota] || (() => emBreve(rota)))();
  $$('.nav__links a').forEach(a => {
    const ativo = a.dataset.rota === rota;
    a.classList.toggle('ativo', ativo);
    ativo ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });
  fechaMenu();
  window.scrollTo(0, 0);
  document.title = `${rota[0].toUpperCase() + rota.slice(1)} · Adoção de gatinhos`;
  if (rota === 'inicio') contadores();
  if (rota === 'gatinhos') iniciaListagem();
  if (rota === 'voluntariar' || rota === 'adotar') iniciaForm();
  if (rota === 'admin') { admLixeira = false; renderAdmin(); }
  if (rota === 'doar') CAMPANHAS.forEach(c => { const el = $(`.camp[data-id="${c.id}"]`); el && atualizaCamp(el, c); });
}
window.addEventListener('hashchange', rotear);

const toggle = $('.nav__toggle'), menu = $('#menu');
function fechaMenu() { menu.classList.remove('aberto'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); }
toggle.addEventListener('click', () => {
  const abre = !menu.classList.contains('aberto');
  menu.classList.toggle('aberto', abre);
  toggle.setAttribute('aria-expanded', abre);
  toggle.setAttribute('aria-label', abre ? 'Fechar menu' : 'Abrir menu');
});

function contadores() {
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const alvo = +e.target.dataset.conta;
    if (reduz) return;
    const ini = performance.now();
    (function passo(t) {
      const p = Math.min((t - ini) / 1200, 1);
      e.target.textContent = '+' + Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(passo);
    })(ini);
  }), { threshold: .6 });
  $$('[data-conta]').forEach(el => io.observe(el));
}

function iniciaListagem() {
  const lista = $('#lista'), busca = $('#busca'), painel = $('#painel'), btn = $('.filtros-btn'), status = $('.status');
  const marcados = n => $$(`input[name=${n}]:checked`, painel).map(i => i.value);

  function filtra() {
    const q = normaliza(busca.value.trim()), sexos = marcados('sexo'), idades = marcados('idade');
    const r = GATOS.filter(g =>
      (!q || normaliza(`${g.nome} ${g.descricao} ${g.sexo}`).includes(q)) &&
      (!sexos.length || sexos.includes(g.sexo)) &&
      (!idades.length || idades.includes(faixa(g.idadeMeses))));
    lista.innerHTML = r.length ? r.map(cardHTML).join('') : `<li class="vazio">Nenhum gatinho encontrado. Tente outro nome ou limpe os filtros.</li>`;
    const nF = sexos.length + idades.length;
    status.textContent = `${r.length} ${r.length === 1 ? 'gatinho encontrado' : 'gatinhos encontrados'}${nF ? ` · ${nF} ${nF === 1 ? 'filtro ativo' : 'filtros ativos'}` : ''}`;
  }
  busca.addEventListener('input', filtra);
  painel.addEventListener('change', filtra);
  $('.limpar', painel).addEventListener('click', () => { $$('input', painel).forEach(i => i.checked = false); filtra(); });
  btn.addEventListener('click', () => { const abre = painel.hidden; painel.hidden = !abre; btn.setAttribute('aria-expanded', abre); });
  filtra();
}

const modal = $('#modal'), card = $('.modal__card', modal);
let gatilho = null;

function abreModal(id, origem) {
  const g = GATOS.find(x => x.id === id); if (!g) return;
  gatilho = origem;
  gatoInteresse = g.nome;
  const fotos = g.fotos.length ? g.fotos : [FOTO];
  $('#m-nome').textContent = g.nome;
  $('#m-tags').innerHTML = `<li>${g.sexo}</li><li>${idadeTxt(g.idadeMeses)}</li>`;
  $('#m-desc').textContent = g.descricao;
  $('#m-foto').alt = `Foto de ${g.nome}`;
  const troca = i => {
    $('#m-foto').src = fotos[i];
    $$('#m-thumbs button').forEach((b, j) => b.setAttribute('aria-current', j === i));
  };
  $('#m-thumbs').innerHTML = fotos.map((f, i) => `<button type="button" aria-label="Foto ${i + 1} de ${fotos.length}"><img src="${f}" alt=""></button>`).join('');
  $$('#m-thumbs button').forEach((b, i) => b.addEventListener('click', () => troca(i)));
  $('#m-thumbs').hidden = fotos.length < 2;
  troca(0);
  modal.hidden = false;
  document.body.classList.add('travado');
  $('.modal__close').focus();
}
function fechaModal() {
  modal.hidden = true;
  document.body.classList.remove('travado');
  gatilho && gatilho.focus();
}
main.addEventListener('click', e => {
  const c = e.target.closest('.card'); if (c && !c.dataset.admin) abreModal(+c.dataset.id, c);
});
$('.modal__close').addEventListener('click', fechaModal);
modal.addEventListener('click', e => { if (!card.contains(e.target)) fechaModal(); });
$('#m-adote').addEventListener('click', fechaModal);
document.addEventListener('keydown', e => {
  const aberto = [modal, modalAdm].find(m => !m.hidden); if (!aberto) return;
  if (e.key === 'Escape') return aberto === modal ? fechaModal() : fechaModalAdm();
  if (e.key === 'Tab') {
    const f = $$('button, a[href], input, select, textarea', aberto).filter(el => !el.disabled && el.offsetParent !== null);
    const a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  }
});

const LIXEIRA = [];
let admLixeira = false;

const ADOCOES = [
  { data: '2026-11-02', nome: 'Mariana Souza', telefone: '(16) 99111-2233', email: 'mariana@exemplo.com', endereco: 'Rua das Flores, 100 – São Carlos', gato: 'Ohmberto', status: 'Em análise' },
  { data: '2026-11-04', nome: 'Carlos Pereira', telefone: '(16) 99222-3344', email: 'carlos@exemplo.com', endereco: 'Av. Brasil, 250 – São Carlos', gato: 'Mingau', status: 'Aguardando visita' },
  { data: '2026-11-07', nome: 'Beatriz Lima', telefone: '(15) 99333-4455', email: 'bia@exemplo.com', endereco: 'Rua Sete, 33 – Sorocaba', gato: 'Luna', status: 'Aprovado' },
  { data: '2026-11-09', nome: 'João Almeida', telefone: '(16) 99444-5566', email: 'joao@exemplo.com', endereco: 'Rua do Sol, 12 – Araraquara', gato: 'Pipoca', status: 'Recusado' },
];

const ICO = {
  lixo: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  voltar: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  x: '<svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="#fff" stroke="#1D0A5C" stroke-width="1.6"/><path d="M8 8l8 8M16 8l-8 8" stroke="#1D0A5C" stroke-width="2.2" stroke-linecap="round"/></svg>',
  restaura: '<svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="#fff" stroke="#1D0A5C" stroke-width="1.6"/><path d="M8.5 12a3.6 3.6 0 1 0 1.1-2.6M8.5 7.5v2.6h2.6" fill="none" stroke="#1D0A5C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mais: '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#5B4BA6"/><path d="M12 7v10M7 12h10" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>',
};

paginas.admin = () => `
  <section class="adm-topo"><button type="button" class="btn btn-planilha">Baixar planilha de adoções</button></section>
  <section class="secao-gatos adm">
    <div class="wrap">
      <div class="adm-cab">
        <h1 class="secao-titulo" id="adm-titulo"></h1>
        <button type="button" class="btn btn-lixeira" aria-pressed="false"></button>
        <button type="button" class="btn btn-esvaziar" hidden>Esvaziar lixeira</button>
      </div>
      <p class="status sr" role="status" aria-live="polite"></p>
      <ul class="grade adm-grade" id="adm-lista"></ul>
    </div>
  </section>`;

function renderAdmin() {
  const lista = $('#adm-lista'); if (!lista) return;
  const lixo = admLixeira, itens = lixo ? LIXEIRA : GATOS;
  $('#adm-titulo').textContent = lixo ? 'Lixeira' : 'Painel de Gatinhos';
  const bt = $('.btn-lixeira');
  bt.innerHTML = lixo ? `${ICO.voltar}Voltar ao painel` : `${ICO.lixo}Lixeira${LIXEIRA.length ? ` (${LIXEIRA.length})` : ''}`;
  bt.setAttribute('aria-pressed', lixo);
  $('.btn-esvaziar').hidden = !lixo || !LIXEIRA.length;
  $('.status').textContent = lixo
    ? `${LIXEIRA.length} ${LIXEIRA.length === 1 ? 'gatinho na lixeira' : 'gatinhos na lixeira'}`
    : `${GATOS.length} ${GATOS.length === 1 ? 'gatinho cadastrado' : 'gatinhos cadastrados'}`;

  const novo = lixo ? '' : `<li><button type="button" class="card-novo" data-novo aria-label="Cadastrar novo gatinho"><span aria-hidden="true">+</span></button></li>`;
  const cards = itens.map(g => {
    const miolo = `${img(g.fotos[0] || FOTO, '')}<span class="card__corpo"><h3>${g.nome}</h3></span>`;
    return `<li class="adm-item">
      ${lixo
        ? `<div class="card card--lixo" data-admin>${miolo}</div>
           <button type="button" class="adm-x" data-restaura="${g.id}" aria-label="Restaurar ${g.nome}">${ICO.restaura}</button>`
        : `<button type="button" class="card" data-admin data-id="${g.id}" aria-haspopup="dialog" aria-label="Editar ${g.nome}">${miolo}</button>
           <button type="button" class="adm-x" data-apaga="${g.id}" aria-label="Mover ${g.nome} para a lixeira">${ICO.x}</button>`}
    </li>`;
  }).join('');
  lista.innerHTML = novo + cards + (lixo && !itens.length ? '<li class="vazio">A lixeira está vazia.</li>' : '');
}
const focaPrimeiro = () => { const b = $('#adm-lista button'); b && b.focus(); };

function apaga(id) {
  const i = GATOS.findIndex(g => g.id === id); if (i < 0) return;
  const [g] = GATOS.splice(i, 1);
  LIXEIRA.push({ ...g, _pos: i });
  renderAdmin(); focaPrimeiro();
  toast(`${g.nome} foi para a lixeira.`, { texto: 'Desfazer', fn: () => restaura(g.id) });
}
function restaura(id) {
  const i = LIXEIRA.findIndex(g => g.id === id); if (i < 0) return;
  const [g] = LIXEIRA.splice(i, 1);
  const pos = Math.min(g._pos ?? GATOS.length, GATOS.length); delete g._pos;
  GATOS.splice(pos, 0, g);
  renderAdmin(); focaPrimeiro();
  toast(`${g.nome} voltou para o painel.`);
}

const csvCel = v => `"${String(v).replace(/"/g, '""')}"`;
function baixaPlanilha() {
  const cols = [['data', 'Data do pedido'], ['nome', 'Nome'], ['telefone', 'Telefone'], ['email', 'E-mail'], ['endereco', 'Endereço'], ['gato', 'Gatinho'], ['status', 'Situação']];
  const linhas = [cols.map(c => csvCel(c[1])).join(';'),
    ...ADOCOES.map(a => cols.map(([k]) => csvCel(k === 'data' ? a.data.split('-').reverse().join('/') : a[k])).join(';'))];
  const url = URL.createObjectURL(new Blob(['﻿' + linhas.join('\r\n')], { type: 'text/csv;charset=utf-8' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: 'adocoes.csv' });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Planilha de adoções baixada.');
}

main.addEventListener('click', e => {
  if (!$('#adm-lista')) return;
  if (e.target.closest('.btn-planilha')) return baixaPlanilha();
  if (e.target.closest('.btn-lixeira')) { admLixeira = !admLixeira; renderAdmin(); return; }
  if (e.target.closest('.btn-esvaziar')) {
    if (confirm('Apagar para sempre todos os gatinhos da lixeira? Isso não pode ser desfeito.')) { LIXEIRA.length = 0; renderAdmin(); toast('Lixeira esvaziada.'); }
    return;
  }
  const a = e.target.closest('[data-admin][data-id]'); if (a) return abreModalAdm(+a.dataset.id, a);
  const n = e.target.closest('[data-novo]'); if (n) return abreModalAdm(null, n);
  const d = e.target.closest('[data-apaga]'); if (d) return apaga(+d.dataset.apaga);
  const r = e.target.closest('[data-restaura]'); if (r) restaura(+r.dataset.restaura);
});

const modalAdm = $('#modal-admin');
let rasc = null, sujo = false, gatilhoAdm = null, fotoAtual = 0;

function desenhaFotos() {
  const f = rasc.fotos, foto = $('#a-foto');
  fotoAtual = Math.min(fotoAtual, Math.max(f.length - 1, 0));
  foto.hidden = !f.length; $('#a-vazio').hidden = !!f.length; $('#a-rem').hidden = !f.length;
  if (f.length) { foto.src = f[fotoAtual]; foto.alt = `Foto ${fotoAtual + 1} de ${rasc.nome || 'novo gatinho'}`; }
  const th = f.map((src, i) => `<button type="button" data-i="${i}" aria-label="Ver foto ${i + 1}" aria-current="${i === fotoAtual}"><img src="${src}" alt=""></button>`);
  if (f.length < 4) th.push(`<button type="button" class="thumb-mais" data-add aria-label="Adicionar foto">${ICO.mais}</button>`);
  $('#a-thumbs').innerHTML = th.join('');
}

function abreModalAdm(id, origem) {
  const g = id ? GATOS.find(x => x.id === id) : null;
  if (id && !g) return;
  gatilhoAdm = origem;
  rasc = g ? { ...g, fotos: [...g.fotos] } : { id: null, nome: '', sexo: 'Macho', idadeMeses: 2, descricao: '', fotos: [] };
  sujo = false; fotoAtual = 0;
  $('#a-nome').value = rasc.nome; $('#a-sexo').value = rasc.sexo;
  $('#a-idade').value = rasc.idadeMeses; $('#a-desc').value = rasc.descricao;
  $('#a-erro').textContent = '';
  $('#a-apagar').hidden = !g;
  $('#a-salvar').textContent = g ? 'Salvar alterações' : 'Cadastrar gatinho';
  desenhaFotos();
  modalAdm.hidden = false;
  document.body.classList.add('travado');
  $('.modal__close', modalAdm).focus();
}
function fechaModalAdm(forcar) {
  if (!forcar && sujo && !confirm('Descartar as alterações que você fez?')) return;
  modalAdm.hidden = true; sujo = false;
  document.body.classList.remove('travado');
  if (gatilhoAdm && document.contains(gatilhoAdm)) gatilhoAdm.focus(); else focaPrimeiro();
}

$('.modal__close', modalAdm).addEventListener('click', () => fechaModalAdm());
modalAdm.addEventListener('input', () => { sujo = true; });
$('#a-thumbs').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.add !== undefined) return $('#a-file').click();
  fotoAtual = +b.dataset.i; desenhaFotos();
  $(`#a-thumbs [data-i="${fotoAtual}"]`).focus();
});
$('#a-rem').addEventListener('click', () => { rasc.fotos.splice(fotoAtual, 1); sujo = true; desenhaFotos(); $('#a-thumbs button').focus(); });
$('#a-file').addEventListener('change', e => {
  const arq = e.target.files[0]; e.target.value = ''; if (!arq) return;
  if (!arq.type.startsWith('image/')) return toast('Escolha um arquivo de imagem.');
  if (arq.size > 5 * 1024 * 1024) return toast('A imagem deve ter até 5 MB.');
  const r = new FileReader();
  r.onload = () => { rasc.fotos.push(r.result); fotoAtual = rasc.fotos.length - 1; sujo = true; desenhaFotos(); $(`#a-thumbs [data-i="${fotoAtual}"]`).focus(); };
  r.readAsDataURL(arq);
});

$('#a-salvar').addEventListener('click', () => {
  const nome = $('#a-nome').value.trim(), idade = $('#a-idade').value, erro = $('#a-erro');
  if (!nome) { erro.textContent = 'Dê um nome ao gatinho.'; return $('#a-nome').focus(); }
  if (idade === '' || +idade < 0) { erro.textContent = 'Informe a idade em meses.'; return $('#a-idade').focus(); }
  erro.textContent = '';
  Object.assign(rasc, { nome, sexo: $('#a-sexo').value, idadeMeses: Math.round(+idade), descricao: $('#a-desc').value.trim() });
  const novo = !rasc.id;
  if (novo) { rasc.id = Math.max(0, ...GATOS.map(g => g.id), ...LIXEIRA.map(g => g.id)) + 1; GATOS.push(rasc); }
  else GATOS[GATOS.findIndex(g => g.id === rasc.id)] = rasc;
  renderAdmin(); fechaModalAdm(true);
  const c = $(`.card[data-id="${rasc.id}"]`); c && c.focus();
  toast(novo ? `${nome} foi cadastrado.` : `Alterações em ${nome} salvas.`);
});
$('#a-apagar').addEventListener('click', () => { const id = rasc.id; fechaModalAdm(true); apaga(id); });

main.addEventListener('click', e => {
  const pix = e.target.closest('.btn-pix');
  if (pix) {
    (navigator.clipboard ? navigator.clipboard.writeText(PIX) : Promise.reject())
      .then(() => toast('Chave pix copiada!'), () => toast(`Chave pix: ${PIX}`));
    return;
  }
  const end = e.target.closest('.btn-end');
  if (end) { const p = $('#endereco'); p.hidden = !p.hidden; end.setAttribute('aria-expanded', !p.hidden); return; }
  const doar = e.target.closest('.btn-doar');
  if (doar) { const op = $('.camp__opcoes', doar.closest('.camp')); op.hidden = !op.hidden; doar.setAttribute('aria-expanded', !op.hidden); return; }
  const chip = e.target.closest('.chip');
  if (chip) {
    const art = chip.closest('.camp'), c = CAMPANHAS.find(x => x.id == art.dataset.id), v = +chip.dataset.v;
    c.arrecadado = Math.min(c.meta, c.arrecadado + v);
    atualizaCamp(art, c);
    toast(`Obrigado! Doação de ${brl(v)} registrada (simulação).`);
  }
});

rotear();
