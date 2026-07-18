let usuarioLogado = null;
let postagensFeed = [];
let comentariosGlobais = {};
let filtroEspecieAtual = ''; 
let base64FotoAtual = '';

function obterDataHoraAtual() {
    const agora = new Date();
    return agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
}

// ==========================================
// INICIALIZAÇÃO E STORAGE
// ==========================================
window.addEventListener('load', function() {
    setTimeout(function() {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0';
        setTimeout(function() {
            splash.style.display = 'none';
            verificarSessao();
        }, 500);
    }, 2000);
});

function verificarSessao() {
    const dadosSalvos = localStorage.getItem('doaPetsUser');
    if (dadosSalvos) {
        usuarioLogado = JSON.parse(dadosSalvos);
        if(!usuarioLogado.favoritos) usuarioLogado.favoritos = [];
        if(!usuarioLogado.bio) usuarioLogado.bio = "Nenhuma informação cadastrada.";
        iniciarAppPrincipal();
    } else {
        document.getElementById('auth-section').style.display = 'flex';
        mostrarLogin(); // Inicia com a aba de login visível e slider posicionado
    }
}

function carregarBancoDeDadosOffline() {
    const dadosFeed = localStorage.getItem('doaPetsFeed');
    if (dadosFeed) {
        postagensFeed = JSON.parse(dadosFeed);
        postagensFeed.forEach(p => { if(!p.curtidas) p.curtidas = []; });
    } else {
        postagensFeed = [{
            id: Date.now().toString(),
            nomeDono: 'ONG Anjos de Patas',
            tipoDono: 'ONG Protetora',
            bioDono: 'Trabalhamos há 5 anos resgatando animais em situação de risco.',
            nomePet: 'Bolinha',
            especie: 'Cachorro',
            idade: '2 anos',
            local: 'Formiga - MG',
            whats: '5537999999999',
            foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            descricao: 'Resgatamos esse menino lindo nas ruas. Já está vacinado e castrado.',
            dataHora: obterDataHoraAtual(),
            curtidas: [] 
        }];
        salvarFeedOffline();
    }
}

function salvarFeedOffline() { localStorage.setItem('doaPetsFeed', JSON.stringify(postagensFeed)); }

// ==========================================
// CONTROLADORES DA TELA PREMIUM DE LOGIN
// ==========================================
function mostrarLogin() {
    document.getElementById('form-login-container').style.display = 'block';
    document.getElementById('form-cadastro-container').style.display = 'none';
    
    document.getElementById('btn-tab-login').classList.add('active');
    document.getElementById('btn-tab-cadastro').classList.remove('active');
    
    // Move o fundo branco (slider) para a esquerda
    document.getElementById('tab-slider').style.transform = 'translateX(0)';
}

function mostrarCadastro() {
    document.getElementById('form-login-container').style.display = 'none';
    document.getElementById('form-cadastro-container').style.display = 'block';
    
    document.getElementById('btn-tab-login').classList.remove('active');
    document.getElementById('btn-tab-cadastro').classList.add('active');
    
    // Move o fundo branco (slider) para a direita
    document.getElementById('tab-slider').style.transform = 'translateX(100%)';
}

document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    salvarUsuario("Usuário " + email.split('@')[0], "Pessoa/Doador");
});

document.getElementById('form-usuario').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeUsuario').value;
    const tipo = document.getElementById('tipoUsuario');
    const tipoTexto = tipo.options[tipo.selectedIndex].text;
    salvarUsuario(nome, tipoTexto);
});

function salvarUsuario(nome, tipo) {
    usuarioLogado = { nome: nome, tipo: tipo, favoritos: [], bio: "Nenhuma informação cadastrada." };
    localStorage.setItem('doaPetsUser', JSON.stringify(usuarioLogado));
    iniciarAppPrincipal();
}

function iniciarAppPrincipal() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
    
    carregarBancoDeDadosOffline();
    atualizarTelaPerfil();
    renderizarCarrosselHome(); 
    renderizarFeed();
    renderizarFavoritos();
    renderizarParceiros();
}

// ==========================================
// ALTERNADOR DE ABAS DO APP
// ==========================================
function trocarAba(aba) {
    document.getElementById('aba-home').style.display = aba === 'home' ? 'block' : 'none';
    document.getElementById('aba-feed').style.display = aba === 'feed' ? 'block' : 'none';
    document.getElementById('aba-parceiros').style.display = aba === 'parceiros' ? 'block' : 'none';
    document.getElementById('aba-perfil').style.display = aba === 'perfil' ? 'block' : 'none';
    
    const navItems = document.querySelectorAll('.premium-nav-item');
    navItems.forEach(item => item.classList.remove('ativo'));
    
    if(aba === 'home') navItems[0].classList.add('ativo');
    if(aba === 'feed') navItems[1].classList.add('ativo');
    if(aba === 'parceiros') navItems[2].classList.add('ativo');
    if(aba === 'perfil') {
        navItems[3].classList.add('ativo');
        alternarAbaPerfil('dados');
    }
}

// ==========================================
// RENDERIZADORES
// ==========================================
function renderizarCarrosselHome() {
    const container = document.getElementById('carrossel-pets');
    container.innerHTML = '';
    if (postagensFeed.length === 0) { container.innerHTML = '<p style="font-size:0.85rem; color:#888;">Nenhum animal listado.</p>'; return; }

    postagensFeed.forEach(post => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('mini-pet-card');
        itemCard.onclick = () => { trocarAba('feed'); document.getElementById('filtro-cidade').value = post.nomePet; renderizarFeed(); };
        itemCard.innerHTML = `<img src="${post.foto}" alt="${post.nomePet}"><div class="mini-pet-name">${post.nomePet}</div>`;
        container.appendChild(itemCard);
    });
}

function abrirModalEscolhaPet() { document.getElementById('modal-escolha-pet').style.display = 'flex'; }
function fecharModalEscolhaPet() { document.getElementById('modal-escolha-pet').style.display = 'none'; }
function selecionarRapidoEspecie(especie) {
    fecharModalEscolhaPet(); trocarAba('feed');
    const botoes = document.querySelectorAll('.btn-filtro-especie');
    if (especie === 'Cachorro') filtrarPorEspecie('Cachorro', botoes[1]);
    if (especie === 'Gato') filtrarPorEspecie('Gato', botoes[2]);
}

function renderizarFeed() {
    const feed = document.getElementById('lista-pets-feed'); feed.innerHTML = '';
    const termoBusca = document.getElementById('filtro-cidade').value.toLowerCase();
    const postsFiltrados = postagensFeed.filter(post => {
        const bateBusca = post.local.toLowerCase().includes(termoBusca) || post.nomePet.toLowerCase().includes(termoBusca);
        const bateEspecie = filtroEspecieAtual === '' || post.especie === filtroEspecieAtual;
        return bateBusca && bateEspecie;
    });

    if(postsFiltrados.length === 0) { feed.innerHTML = '<p style="text-align:center; margin-top:20px; color:#666;">Nenhum companheiro correspondente.</p>'; return; }
    postsFiltrados.slice().reverse().forEach(post => { feed.appendChild(criarElementoPost(post)); });
}

function filtrarFeed() { renderizarFeed(); }
function filtrarPorEspecie(especie, botaoElemento) {
    filtroEspecieAtual = especie;
    const botoes = document.querySelectorAll('.btn-filtro-especie');
    botoes.forEach(b => b.classList.remove('ativo')); botaoElemento.classList.add('ativo');
    renderizarFeed();
}

function criarElementoPost(post) {
    const postDiv = document.createElement('div'); postDiv.classList.add('post-card');
    const inicial = post.nomeDono.charAt(0).toUpperCase();
    const isFavorito = usuarioLogado.favoritos.includes(post.id); const corEstrela = isFavorito ? 'salvo' : '';
    const bioSegura = post.bioDono ? post.bioDono.replace(/'/g, "\\'") : "Nenhuma descrição informada.";
    const dataHora = post.dataHora || 'Recentemente';
    if(!post.curtidas) post.curtidas = [];
    const jaCurtiu = post.curtidas.includes(usuarioLogado.nome);
    const textoCurtir = jaCurtiu ? '🐾 Curtiu!' : '👍 Curtir'; const classeCurtiu = jaCurtiu ? 'curtido' : '';

    postDiv.innerHTML = `
        <div class="post-header" onclick="abrirPerfilPublico('${post.nomeDono}', '${post.tipoDono}', '${inicial}', '${bioSegura}')">
            <div class="post-avatar">${inicial}</div>
            <div class="post-user-info"><h4>${post.nomeDono}</h4><p>${post.tipoDono}</p></div>
            <div class="post-data-hora">${dataHora}</div>
        </div>
        <div class="post-body">
            <p class="post-desc"><strong>${post.nomePet}</strong>: ${post.descricao}</p>
            <div class="post-tags"><span class="tag">🐾 ${post.especie}</span><span class="tag">🕒 ${post.idade}</span><span class="tag">📍 ${post.local}</span></div>
        </div>
        <img src="${post.foto}" alt="Foto do pet" class="post-img">
        <div class="post-footer">
            <div class="post-interacoes">
                <button class="btn-interacao ${classeCurtiu}" onclick="curtirPost('${post.id}', this, event)">${textoCurtir} (${post.curtidas.length})</button>
                <button class="btn-interacao" onclick="abrirComentarios('${post.id}', '${post.nomePet}')">💬 Comentar</button>
                <button class="btn-interacao favoritar ${corEstrela}" onclick="alternarFavorito('${post.id}', this)">⭐ Salvar</button>
            </div>
            <button class="btn-adotar-destaque" onclick="abrirChat('${post.nomeDono}', '${post.whats}', '${post.nomePet}')">🐾 Quero Adotar</button>
        </div>
    `;
    return postDiv;
}

function curtirPost(idPost, btnElemento, event) {
    const post = postagensFeed.find(p => p.id === idPost); if (!post) return;
    if (!post.curtidas) post.curtidas = []; const indexUser = post.curtidas.indexOf(usuarioLogado.nome);
    if (indexUser === -1) { post.curtidas.push(usuarioLogado.nome); btnElemento.classList.add('curtido'); animarCurtir(btnElemento, event); } 
    else { post.curtidas.splice(indexUser, 1); btnElemento.classList.remove('curtido'); }
    const texto = post.curtidas.includes(usuarioLogado.nome) ? '🐾 Curtiu!' : '👍 Curtir';
    btnElemento.innerHTML = `${texto} (${post.curtidas.length})`; salvarFeedOffline();
}

function animarCurtir(btn, event) {
    const patinha = document.createElement('span'); patinha.innerText = '🐾'; patinha.classList.add('patinha-animada');
    const rect = btn.getBoundingClientRect(); const x = event.clientX - rect.left - 10; const y = event.clientY - rect.top - 10;
    patinha.style.left = x + 'px'; patinha.style.top = y + 'px'; btn.appendChild(patinha); setTimeout(() => { patinha.remove(); }, 800);
}

function alternarAbaPerfil(aba) {
    const tabDados = document.getElementById('tab-meus-dados'); const tabFav = document.getElementById('tab-meus-favoritos');
    const contDados = document.getElementById('conteudo-dados-perfil'); const contFav = document.getElementById('conteudo-favoritos-perfil');
    if(aba === 'dados') { tabDados.classList.add('ativo'); tabFav.classList.remove('ativo'); contDados.style.display = 'block'; contFav.style.display = 'none'; } 
    else { tabFav.classList.add('ativo'); tabDados.classList.remove('ativo'); contFav.style.display = 'block'; contDados.style.display = 'none'; renderizarFavoritos(); }
}

function alternarFavorito(idPost, botaoElemento) {
    const index = usuarioLogado.favoritos.indexOf(idPost);
    if (index === -1) { usuarioLogado.favoritos.push(idPost); botaoElemento.classList.add('salvo'); } 
    else { usuarioLogado.favoritos.splice(index, 1); botaoElemento.classList.remove('salvo'); }
    localStorage.setItem('doaPetsUser', JSON.stringify(usuarioLogado)); renderizarFavoritos();
}

function renderizarFavoritos() {
    const lista = document.getElementById('lista-favoritos'); lista.innerHTML = '';
    if (usuarioLogado.favoritos.length === 0) { lista.innerHTML = '<p style="color:#888; text-align:center; grid-column: span 2;">Você ainda não possui fotos salvas.</p>'; return; }
    usuarioLogado.favoritos.forEach(id => {
        const p = postagensFeed.find(x => x.id === id);
        if(p) {
            const favDiv = document.createElement('div'); favDiv.classList.add('fav-foto-card');
            favDiv.onclick = () => { abrirChat(p.nomeDono, p.whats, p.nomePet); };
            favDiv.innerHTML = `<img src="${p.foto}"><div class="fav-nome-overlay">⭐ ${p.nomePet}</div>`; lista.appendChild(favDiv);
        }
    });
}

function renderizarParceiros() {
    const lista = document.getElementById('lista-cupons');
    const parceiros = [
        { icone: '🛒', nome: 'Loja Zema - Formiga', desc: '10% de desconto em eletrodomésticos para quem adotar nesta semana.' },
        { icone: '⛽', nome: 'Posto Ouro Verde', desc: 'Desconto especial no abastecimento para voluntários de resgate.' },
        { icone: '🏥', nome: 'VetVida Clínica', desc: 'Primeira consulta gratuita para animais adotados pelo DoaPets.' }
    ];
    lista.innerHTML = ''; parceiros.forEach(p => { lista.innerHTML += `<div class="cupom-card"><div class="cupom-icone">${p.icone}</div><div class="cupom-info"><h4>${p.nome}</h4><p>${p.desc}</p></div></div>`; });
}

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal-cadastro-pet')) fecharModalPet();
    if (event.target === document.getElementById('modal-comentarios')) fecharComentarios();
    if (event.target === document.getElementById('modal-perfil-publico')) fecharPerfilPublico();
    if (event.target === document.getElementById('modal-chat')) fecharChat();
    if (event.target === document.getElementById('modal-escolha-pet')) fecharModalEscolhaPet();
});

function abrirModalPet() { document.getElementById('modal-cadastro-pet').style.display = 'flex'; }
function fecharModalPet() { document.getElementById('modal-cadastro-pet').style.display = 'none'; }

function alternarTipoFoto(tipo) {
    const inputUrl = document.getElementById('fotoPetUrl'); const inputArquivo = document.getElementById('fotoPetArquivo');
    const btnUrl = document.getElementById('btn-usar-url'); const btnArq = document.getElementById('btn-usar-arquivo'); const preview = document.getElementById('preview-foto');
    if(tipo === 'url') {
        inputUrl.style.display = 'block'; inputUrl.required = true; inputArquivo.style.display = 'none'; inputArquivo.required = false;
        btnUrl.classList.add('ativo'); btnArq.classList.remove('ativo');
        if(inputUrl.value) { preview.src = inputUrl.value; preview.style.display = 'block'; } else { preview.style.display = 'none'; }
    } else {
        inputUrl.style.display = 'none'; inputUrl.required = false; inputArquivo.style.display = 'block'; inputArquivo.required = true;
        btnArq.classList.add('ativo'); btnUrl.classList.remove('ativo');
        if(base64FotoAtual) { preview.src = base64FotoAtual; preview.style.display = 'block'; } else { preview.style.display = 'none'; }
    }
}

document.getElementById('fotoPetArquivo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if(file) { const reader = new FileReader(); reader.onload = function(evt) { base64FotoAtual = evt.target.result; const preview = document.getElementById('preview-foto'); preview.src = base64FotoAtual; preview.style.display = 'block'; }; reader.readAsDataURL(file); }
});

document.getElementById('fotoPetUrl').addEventListener('input', function(e) {
    const preview = document.getElementById('preview-foto');
    if(e.target.value) { preview.src = e.target.value; preview.style.display = 'block'; } else { preview.style.display = 'none'; }
});

document.getElementById('form-pet').addEventListener('submit', function(event) {
    event.preventDefault();
    const tipoFotoAtivo = document.getElementById('btn-usar-url').classList.contains('ativo') ? 'url' : 'arquivo';
    const fotoEscolhida = tipoFotoAtivo === 'url' ? document.getElementById('fotoPetUrl').value : base64FotoAtual;
    if(!fotoEscolhida) { alert("Adicione um link ou arquivo de imagem."); return; }

    const novoPost = {
        id: Date.now().toString(), nomeDono: usuarioLogado.nome, tipoDono: usuarioLogado.tipo, bioDono: usuarioLogado.bio,
        nomePet: document.getElementById('nomePet').value, especie: document.getElementById('especie').value,
        idade: document.getElementById('idade').value, local: document.getElementById('localPet').value,
        whats: document.getElementById('whatsPet').value, foto: fotoEscolhida,
        descricao: document.getElementById('descricao').value, dataHora: obterDataHoraAtual(), curtidas: []
    };
    postagensFeed.push(novoPost); salvarFeedOffline(); document.getElementById('form-pet').reset();
    document.getElementById('preview-foto').style.display = 'none'; base64FotoAtual = ''; fecharModalPet();
    renderizarCarrosselHome(); renderizarFeed(); trocarAba('home');
});

function atualizarTelaPerfil() { document.getElementById('info-perfil-nome').innerHTML = `<strong>Nome:</strong> ${usuarioLogado.nome}`; document.getElementById('info-perfil-tipo').innerHTML = `<strong>Perfil:</strong> ${usuarioLogado.tipo}`; document.getElementById('info-perfil-bio').innerHTML = `<strong>Sobre:</strong> ${usuarioLogado.bio}`; }
function editarPerfil() { const n = prompt("Novo nome:", usuarioLogado.nome); if(n){ usuarioLogado.nome=n; localStorage.setItem('doaPetsUser', JSON.stringify(usuarioLogado)); atualizarTelaPerfil(); } }
function editarBio() { const b = prompt("Sobre sua ONG/Perfil:", usuarioLogado.bio); if(b!==null){ usuarioLogado.bio=b||"Nenhuma informação."; localStorage.setItem('doaPetsUser', JSON.stringify(usuarioLogado)); atualizarTelaPerfil(); } }
function excluirBio() { if(confirm("Limpar campo?")){ usuarioLogado.bio="Nenhuma informação cadastrada."; localStorage.setItem('doaPetsUser', JSON.stringify(usuarioLogado)); atualizarTelaPerfil(); } }
function excluirConta() { if(confirm("Sair do app?")){ localStorage.removeItem('doaPetsUser'); window.location.reload(); } }

function abrirPerfilPublico(nome, tipo, inicial, bio) { document.getElementById('modal-perfil-publico').style.display = 'flex'; document.getElementById('foto-perfil-publico').innerText = inicial; document.getElementById('nome-perfil-publico').innerText = nome; document.getElementById('tipo-perfil-publico').innerText = tipo; document.getElementById('bio-perfil-publico').innerText = bio || "Sem descrição."; }
function fecharPerfilPublico() { document.getElementById('modal-perfil-publico').style.display = 'none'; }
function abrirChat(nomeDono, whats, nomePet) { document.getElementById('modal-chat').style.display = 'flex'; document.getElementById('titulo-chat').innerText = `Conversando com: ${nomeDono}`; document.getElementById('btn-ir-whatsapp').onclick = function() { window.open(`https://wa.me/${whats.replace(/\D/g, '')}?text=${encodeURIComponent('Olá! Vi o post do(a) '+nomePet+' no DoaPets!')}`, '_blank'); fecharChat(); }; }
function fecharChat() { document.getElementById('modal-chat').style.display = 'none'; }

let idPostAtualComentario = null;
function abrirComentarios(idPost, nomePet) {
    idPostAtualComentario = idPost; document.getElementById('modal-comentarios').style.display = 'flex'; document.getElementById('titulo-comentarios').innerText = `Comentários: ${nomePet}`;
    const lista = document.getElementById('lista-comentarios'); lista.innerHTML = '';
    if(!comentariosGlobais[idPost] || comentariosGlobais[idPost].length === 0) { lista.innerHTML = `<p style="color:#888; text-align:center; margin-top:20px;" id="msg-sem-coment">Seja o primeiro a comentar!</p>`; } 
    else { comentariosGlobais[idPost].forEach(c => renderizarComentarioHtml(c.nome, c.texto, c.data)); }
}
function fecharComentarios() { document.getElementById('modal-comentarios').style.display = 'none'; }
function renderizarComentarioHtml(nome, texto, data) { const lista = document.getElementById('lista-comentarios'); const msgVazia = document.getElementById('msg-sem-coment'); if(msgVazia) msgVazia.remove(); const divComentario = document.createElement('div'); divComentario.classList.add('comentario-item'); divComentario.innerHTML = `<strong>${nome}:</strong> ${texto}<span class="comentario-data">${data}</span>`; lista.appendChild(divComentario); lista.scrollTop = lista.scrollHeight; }

document.getElementById('form-comentario').addEventListener('submit', function(e) {
    e.preventDefault(); const input = document.getElementById('input-comentario'); const texto = input.value.trim(); if(!texto || !idPostAtualComentario) return;
    const dataAtual = obterDataHoraAtual(); if(!comentariosGlobais[idPostAtualComentario]) comentariosGlobais[idPostAtualComentario] = [];
    comentariosGlobais[idPostAtualComentario].push({nome: usuarioLogado.nome, texto: texto, data: dataAtual});
    renderizarComentarioHtml(usuarioLogado.nome, texto, dataAtual); input.value = '';
});
