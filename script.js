// Base de dados expandida com detalhes completos para cada pet
const samplePets = [
  {
    id: 1,
    name: "Pipoca",
    age: "2 anos",
    size: "Porte Médio",
    category: "cao",
    categoryLabel: "Cachorro",
    health: "Castrado & Vacinado",
    location: "Formiga - MG",
    icon: "🐶",
    description: "Pipoca foi resgatado com muito carinho. Adora correr no quintal, convive super bem com outros cães e crianças. Está 100% vermifugado e pronto para um novo lar!"
  },
  {
    id: 2,
    name: "Mimi",
    age: "4 meses",
    size: "Porte Pequeno",
    category: "filhote",
    categoryLabel: "Filhote",
    health: "Vacinada (1ª dose)",
    location: "Formiga - MG",
    icon: "🐱",
    description: "Mimi é uma gatinha filhote muito curiosa e ronronadora. Já aprendeu a usar a caixinha de areia e busca tutores responsáveis para apartamento com telas."
  },
  {
    id: 3,
    name: "Thor",
    age: "3 anos",
    size: "Porte Grande",
    category: "cao",
    categoryLabel: "Cachorro",
    health: "Castrado & Microchipado",
    location: "Belo Horizonte - MG",
    icon: "🐕",
    description: "Thor é um cão leal, calmo e protetor. Precisa de espaço moderado e passeios diários. Muito dócil com toda a família."
  },
  {
    id: 4,
    name: "Luna",
    age: "1 ano",
    size: "Porte Pequeno",
    category: "gato",
    categoryLabel: "Gato",
    health: "Castrada & Vacinada",
    location: "Divinópolis - MG",
    icon: "🐈",
    description: "Luna adora cochilar no sol e brincar com bolinhas de feltro. É muito calma e carinhosa com pessoas idosas."
  },
  {
    id: 5,
    name: "Floquinho",
    age: "6 meses",
    size: "Porte Pequeno",
    category: "outros",
    categoryLabel: "Outros",
    health: "Acompanhamento Veterinário",
    location: "Formiga - MG",
    icon: "🐰",
    description: "Coelhinho peludo e manso, resgatado de situação de abandono. Alimenta-se de feno e ração apropriada."
  }
];

const defaultNews = [
  {
    id: 1,
    author: "ONG Patas do Bem",
    category: "Campanha",
    title: "Grande Feira de Adoção neste Sábado!",
    content: "Venha conhecer nossos resgatados na Praça Central das 09h às 16h. Traga documentos para adotar.",
    dateType: "Evento agendado para",
    date: "2026-08-29"
  },
  {
    id: 2,
    author: "Instituto Amigo Fiel",
    category: "Urgente",
    title: "Campanha de Arrecadação de Ração",
    content: "Nosso estoque de ração para cães adultos está quase no fim. Qualquer doação é bem-vinda!",
    dateType: "Publicado em",
    date: "2026-08-23"
  }
];

const appState = {
  currentRole: null,
  userProfile: null,
  authMode: 'signup',
  selectedCategory: 'all',
  searchQuery: '',
  selectedPetForModal: null,
  pets: samplePets,
  registeredUsers: JSON.parse(localStorage.getItem('doapets_users')) || [],
  news: JSON.parse(localStorage.getItem('doapets_news')) || defaultNews
};

// Telas principais
const screenProfile = document.getElementById('screen-profile-select');
const screenForm = document.getElementById('screen-form');
const mainApp = document.getElementById('main-app');

// Formulário de Autenticação
const form = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const formSubtitle = document.getElementById('form-subtitle');
const labelName = document.getElementById('label-name');
const labelDoc = document.getElementById('label-doc');
const inputDoc = document.getElementById('doc');
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const btnSubmitAuth = document.getElementById('btn-submit-auth');
const btnToggleSignup = document.getElementById('btn-toggle-signup');
const btnToggleLogin = document.getElementById('btn-toggle-login');
const signupFields = document.querySelectorAll('.signup-field');

// Elementos da Home, Feed & Perfil
const loggedUserType = document.getElementById('logged-user-type');
const guestAlert = document.getElementById('guest-alert');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const ongAdminPanel = document.getElementById('ong-admin-panel');
const ongNewsList = document.getElementById('ong-news-list');
const petsFeedList = document.getElementById('pets-feed-list');
const inputSearchPets = document.getElementById('input-search-pets');
const badgeNewsCount = document.getElementById('badge-news-count');
const navBadgeNews = document.getElementById('nav-badge-news');

// Avatar
const avatarContainer = document.getElementById('avatar-container');
const avatarInput = document.getElementById('avatar-input');
const avatarPreview = document.getElementById('avatar-preview');

// Modais
const modalPetDetails = document.getElementById('modal-pet-details');
const btnClosePetModal = document.getElementById('btn-close-pet-modal');
const btnModalAdopt = document.getElementById('btn-modal-adopt');

const btnOpenReport = document.getElementById('btn-open-report');
const btnCloseReport = document.getElementById('btn-close-report');
const modalReport = document.getElementById('modal-report');
const formReport = document.getElementById('form-report');

const btnOpenNewsModal = document.getElementById('btn-open-news-modal');
const btnCloseNews = document.getElementById('btn-close-news');
const modalNews = document.getElementById('modal-news');
const formNews = document.getElementById('form-news');
const modalNewsTitleHeader = document.getElementById('modal-news-title-header');
const newsEditId = document.getElementById('news-edit-id');
const newsDate = document.getElementById('news-date');
const newsDateType = document.getElementById('news-date-type');
const btnSaveNews = document.getElementById('btn-save-news');

// Modal Calendário
const modalCalendar = document.getElementById('modal-calendar');
const btnCloseCalendar = document.getElementById('btn-close-calendar');
const calendarMonthYear = document.getElementById('calendar-month-year');
const calendarDays = document.getElementById('calendar-days');
const calendarFooterText = document.getElementById('calendar-footer-text');

// Formatação de Datas
const monthShortNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function parseDateComponents(isoDateString) {
  const [year, month, day] = isoDateString.split('-');
  const monthIdx = parseInt(month, 10) - 1;
  return {
    day: day,
    monthShort: monthShortNames[monthIdx],
    monthNum: month,
    year: year
  };
}

// Renderizar lista de Pets com layout horizontal e foto arredondada
function renderPetsFeed() {
  petsFeedList.innerHTML = '';

  const filtered = appState.pets.filter(pet => {
    const matchesCategory = appState.selectedCategory === 'all' || pet.category === appState.selectedCategory;
    const query = appState.searchQuery.toLowerCase();
    const matchesSearch = pet.name.toLowerCase().includes(query) ||
                          pet.description.toLowerCase().includes(query) ||
                          pet.categoryLabel.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    petsFeedList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 20px;">Nenhum animal encontrado para esta pesquisa.</p>';
    return;
  }

  filtered.forEach(pet => {
    const card = document.createElement('div');
    card.className = 'pet-row-card';
    card.dataset.id = pet.id;

    card.innerHTML = `
      <div class="pet-circle-avatar">${pet.icon}</div>
      <div class="pet-row-info">
        <div class="pet-row-header">
          <h3>${pet.name}</h3>
          <span class="pet-category-tag">${pet.categoryLabel}</span>
        </div>
        <span class="pet-row-meta">${pet.age} • ${pet.size}</span>
        <p class="pet-row-desc">${pet.description}</p>
      </div>
      <span class="pet-row-arrow">›</span>
    `;

    // Ao clicar no card, abre o pop-up com as informações completas do animal
    card.addEventListener('click', () => {
      openPetDetailsModal(pet);
    });

    petsFeedList.appendChild(card);
  });
}

// Abertura do Modal de Detalhes do Pet
function openPetDetailsModal(pet) {
  appState.selectedPetForModal = pet;
  
  document.getElementById('pet-modal-title').textContent = `🐾 Perfil de ${pet.name}`;
  document.getElementById('pet-modal-avatar').textContent = pet.icon;
  document.getElementById('pet-modal-name').textContent = `${pet.name} (${pet.age})`;
  document.getElementById('pet-modal-tag').textContent = pet.categoryLabel;
  document.getElementById('pet-modal-age').textContent = pet.age;
  document.getElementById('pet-modal-size').textContent = pet.size;
  document.getElementById('pet-modal-health').textContent = pet.health;
  document.getElementById('pet-modal-location').textContent = pet.location;
  document.getElementById('pet-modal-description').textContent = pet.description;

  modalPetDetails.classList.add('active');
}

btnClosePetModal.addEventListener('click', () => {
  modalPetDetails.classList.remove('active');
});

// Ação de Adotar dentro do Pop-up
btnModalAdopt.addEventListener('click', () => {
  if (appState.currentRole === 'guest') {
    alert('Visitantes não podem realizar interações. Crie uma conta ou faça login para adotar!');
  } else {
    alert(`🎉 Parabéns! Você manifestou interesse em adotar ${appState.selectedPetForModal.name}. A instituição entrará em contato!`);
    modalPetDetails.classList.remove('active');
  }
});

// Atualizar Badges de Notificação com a contagem arredondada
function updateNewsBadges() {
  const totalNews = appState.news.length;
  badgeNewsCount.textContent = totalNews;
  
  if (totalNews > 0) {
    navBadgeNews.textContent = totalNews;
    navBadgeNews.style.display = 'block';
  } else {
    navBadgeNews.style.display = 'none';
  }
}

// Renderizar notícias
function renderNewsFeed() {
  ongNewsList.innerHTML = '';
  updateNewsBadges();
  
  if (appState.news.length === 0) {
    ongNewsList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem;">Nenhuma publicação cadastrada.</p>';
    return;
  }

  appState.news.forEach(item => {
    const card = document.createElement('div');
    card.className = 'news-card';
    
    const isOwnerOng = appState.currentRole === 'ong' && appState.userProfile && appState.userProfile.name === item.author;
    const dateComp = parseDateComponents(item.date);

    card.innerHTML = `
      <div class="news-card-header">
        <div class="news-card-author-info">
          <span class="news-author">🏠 ${item.author}</span>
          <span class="news-tag">${item.category}</span>
        </div>
        
        <button type="button" class="date-badge-btn" data-date="${item.date}" data-type="${item.dateType}" title="Ver no calendário">
          <span class="date-badge-month">${dateComp.monthShort}</span>
          <span class="date-badge-day">${dateComp.day}</span>
        </button>
      </div>

      <div class="news-date-label">📅 ${item.dateType}: <strong>${dateComp.day}/${dateComp.monthNum}/${dateComp.year}</strong></div>
      <h4>${item.title}</h4>
      <p>${item.content}</p>
      
      ${isOwnerOng ? `
        <div class="news-actions">
          <button type="button" class="btn-post-action btn-post-edit" data-id="${item.id}">✏️ Editar</button>
          <button type="button" class="btn-post-action btn-post-delete" data-id="${item.id}">🗑️ Excluir</button>
        </div>
      ` : ''}
    `;
    ongNewsList.appendChild(card);
  });

  document.querySelectorAll('.date-badge-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openCalendarModal(btn.dataset.date, btn.dataset.type);
    });
  });

  document.querySelectorAll('.btn-post-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      editNews(Number(btn.dataset.id));
    });
  });

  document.querySelectorAll('.btn-post-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteNews(Number(btn.dataset.id));
    });
  });
}

// Pop-up do Calendário
function openCalendarModal(dateStr, typeStr) {
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const targetYear = parseInt(yearStr, 10);
  const targetMonth = parseInt(monthStr, 10) - 1;
  const targetDay = parseInt(dayStr, 10);

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  calendarMonthYear.textContent = `${monthNames[targetMonth]} de ${targetYear}`;
  calendarFooterText.textContent = `${typeStr || 'Data'}: ${targetDay} de ${monthNames[targetMonth]} de ${targetYear}`;
  calendarDays.innerHTML = '';

  const firstDayIndex = new Date(targetYear, targetMonth, 1).getDay();
  const totalDaysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

  for (let i = 0; i < firstDayIndex; i++) {
    const emptySlot = document.createElement('div');
    emptySlot.className = 'calendar-day empty';
    calendarDays.appendChild(emptySlot);
  }

  for (let d = 1; d <= totalDaysInMonth; d++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = d;

    if (d === targetDay) {
      dayElement.classList.add('highlight');
    }

    calendarDays.appendChild(dayElement);
  }

  modalCalendar.classList.add('active');
}

btnCloseCalendar.addEventListener('click', () => {
  modalCalendar.classList.remove('active');
});

// Editar notícia
function editNews(id) {
  const post = appState.news.find(n => n.id === id);
  if (!post) return;

  newsEditId.value = post.id;
  document.getElementById('news-title').value = post.title;
  document.getElementById('news-category').value = post.category;
  document.getElementById('news-date-type').value = post.dateType || "Publicado em";
  document.getElementById('news-date').value = post.date;
  document.getElementById('news-content').value = post.content;

  modalNewsTitleHeader.textContent = "✏️ Editar Publicação / Evento";
  btnSaveNews.textContent = "Salvar Alterações";

  modalNews.classList.add('active');
}

// Excluir notícia
function deleteNews(id) {
  if (confirm("Tem certeza de que deseja excluir esta publicação?")) {
    appState.news = appState.news.filter(n => n.id !== id);
    localStorage.setItem('doapets_news', JSON.stringify(appState.news));
    renderNewsFeed();
  }
}

// Eventos da Barra de Pesquisa e Classificações
inputSearchPets.addEventListener('input', (e) => {
  appState.searchQuery = e.target.value;
  renderPetsFeed();
});

document.querySelectorAll('.category-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    appState.selectedCategory = chip.dataset.category;
    renderPetsFeed();
  });
});

// Alternar Dropdowns
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('active');
  });
});

// Navegação entre telas
function showScreen(screenType) {
  screenProfile.classList.remove('active');
  screenForm.classList.remove('active');
  mainApp.style.display = 'none';

  if (screenType === 'profile-select') {
    screenProfile.classList.add('active');
  } else if (screenType === 'form') {
    screenForm.classList.add('active');
  } else if (screenType === 'app') {
    mainApp.style.display = 'flex';
  }
}

// Configuração do formulário de Cadastro/Login
function setupAuthForm(mode) {
  appState.authMode = mode;
  const isOng = appState.currentRole === 'ong';

  if (mode === 'signup') {
    btnToggleSignup.classList.add('active');
    btnToggleLogin.classList.remove('active');
    signupFields.forEach(f => f.style.display = 'flex');
    inputName.required = true;
    inputDoc.required = true;

    if (isOng) {
      formTitle.textContent = 'Cadastro de ONG';
      formSubtitle.textContent = 'Crie a conta da sua instituição';
      labelName.textContent = 'Nome da ONG / Instituição';
      labelDoc.textContent = 'CNPJ (ou CPF do responsável)';
      inputDoc.placeholder = '00.000.000/0000-00';
    } else {
      formTitle.textContent = 'Cadastro Pessoa Física';
      formSubtitle.textContent = 'Crie seu perfil no Doapets';
      labelName.textContent = 'Nome Completo';
      labelDoc.textContent = 'CPF';
      inputDoc.placeholder = '000.000.000-00';
    }

    btnSubmitAuth.textContent = 'Criar Conta';
  } else {
    btnToggleLogin.classList.add('active');
    btnToggleSignup.classList.remove('active');
    signupFields.forEach(f => f.style.display = 'none');
    inputName.required = false;
    inputDoc.required = false;

    formTitle.textContent = isOng ? 'Login de ONG' : 'Login de Usuário';
    formSubtitle.textContent = 'Entre com seu e-mail e senha cadastrados';
    btnSubmitAuth.textContent = 'Entrar no App';
  }
}

function startAuthFlow(role) {
  appState.currentRole = role;
  setupAuthForm('signup');
  showScreen('form');
}

function enterHome(profileData, shouldSaveSession = true) {
  appState.userProfile = profileData;
  
  if (shouldSaveSession && appState.currentRole !== 'guest') {
    localStorage.setItem('doapets_session', JSON.stringify({
      role: appState.currentRole,
      profile: profileData
    }));
  }

  renderPetsFeed();
  renderNewsFeed();
  
  if (appState.currentRole === 'guest') {
    loggedUserType.textContent = 'Visitante (Leitura)';
    guestAlert.style.display = 'block';
    profileName.textContent = 'Visitante';
    profileEmail.textContent = 'Sem conta conectada';
    ongAdminPanel.style.display = 'none';
  } else {
    const roleName = appState.currentRole === 'ong' ? 'ONG' : 'Pessoa Física';
    loggedUserType.textContent = `${profileData.name} (${roleName})`;
    profileName.textContent = profileData.name;
    profileEmail.textContent = profileData.email || 'Sem e-mail cadastrado';
    guestAlert.style.display = 'none';
    
    if (appState.currentRole === 'ong') {
      ongAdminPanel.style.display = 'block';
    } else {
      ongAdminPanel.style.display = 'none';
    }
  }

  switchTab('tab-home');
  showScreen('app');
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  const targetTab = document.getElementById(tabId);
  const targetBtn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);

  if (targetTab) targetTab.classList.add('active');
  if (targetBtn) targetBtn.classList.add('active');
}

// Avatar
avatarContainer.addEventListener('click', () => {
  if (appState.currentRole === 'guest') {
    alert('Visitantes não podem alterar foto de perfil.');
    return;
  }
  avatarInput.click();
});

avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      avatarPreview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Publicação da ONG
btnOpenNewsModal.addEventListener('click', () => {
  formNews.reset();
  newsEditId.value = '';
  newsDate.value = new Date().toISOString().split('T')[0];
  modalNewsTitleHeader.textContent = "✍️ Nova Publicação / Evento da ONG";
  btnSaveNews.textContent = "Postar no Feed";
  modalNews.classList.add('active');
});

btnCloseNews.addEventListener('click', () => {
  modalNews.classList.remove('active');
});

formNews.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const editId = newsEditId.value;
  const title = document.getElementById('news-title').value;
  const category = document.getElementById('news-category').value;
  const dateType = document.getElementById('news-date-type').value;
  const dateValue = document.getElementById('news-date').value;
  const content = document.getElementById('news-content').value;

  if (editId) {
    const postIndex = appState.news.findIndex(n => n.id === Number(editId));
    if (postIndex !== -1) {
      appState.news[postIndex].title = title;
      appState.news[postIndex].category = category;
      appState.news[postIndex].dateType = dateType;
      appState.news[postIndex].date = dateValue;
      appState.news[postIndex].content = content;
      alert('Publicação atualizada com sucesso!');
    }
  } else {
    const newPost = {
      id: Date.now(),
      author: appState.userProfile.name,
      category: category,
      title: title,
      content: content,
      dateType: dateType,
      date: dateValue
    };
    appState.news.unshift(newPost);
    alert('📢 Postagem publicada no Feed!');
  }

  localStorage.setItem('doapets_news', JSON.stringify(appState.news));
  renderNewsFeed();
  formNews.reset();
  modalNews.classList.remove('active');
  switchTab('tab-feed');
});

// Denúncia
btnOpenReport.addEventListener('click', () => {
  if (appState.currentRole === 'guest') {
    alert('Visitantes não podem enviar denúncias. Faça login ou cadastre-se.');
    return;
  }
  modalReport.classList.add('active');
});

btnCloseReport.addEventListener('click', () => {
  modalReport.classList.remove('active');
});

formReport.addEventListener('submit', (e) => {
  e.preventDefault();
  const reportData = {
    tipo: document.getElementById('report-type').value,
    info: document.getElementById('report-pet-info').value,
    local: document.getElementById('report-location').value,
    detalhes: document.getElementById('report-details').value
  };

  alert(`🚨 Denúncia enviada com sucesso para as ONGs cadastradas!\nMotivo: ${reportData.tipo}\nLocal: ${reportData.local}`);
  formReport.reset();
  modalReport.classList.remove('active');
});

// Eventos de Autenticação
btnToggleSignup.addEventListener('click', () => setupAuthForm('signup'));
btnToggleLogin.addEventListener('click', () => setupAuthForm('login'));

document.querySelectorAll('.role-card').forEach(btn => {
  btn.addEventListener('click', () => startAuthFlow(btn.dataset.role));
});

document.getElementById('btn-guest').addEventListener('click', () => {
  appState.currentRole = 'guest';
  enterHome({ name: 'Visitante' }, false);
});

document.getElementById('btn-back-profile').addEventListener('click', () => {
  showScreen('profile-select');
});

// Processamento de Cadastro e Login
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = inputEmail.value.trim().toLowerCase();
  const password = inputPassword.value;

  if (appState.authMode === 'signup') {
    const exists = appState.registeredUsers.some(u => u.email === email);
    if (exists) {
      alert('Este e-mail já está cadastrado. Alterne para a aba "Fazer Login".');
      return;
    }

    const newUser = {
      role: appState.currentRole,
      name: inputName.value.trim(),
      email: email,
      doc: inputDoc.value.trim(),
      password: password
    };

    appState.registeredUsers.push(newUser);
    localStorage.setItem('doapets_users', JSON.stringify(appState.registeredUsers));
    
    alert('🎉 Cadastro realizado com sucesso!');
    form.reset();
    enterHome(newUser, true);
  } else {
    const userFound = appState.registeredUsers.find(u => u.email === email && u.password === password && u.role === appState.currentRole);

    if (userFound) {
      alert(`👋 Bem-vindo(a) de volta, ${userFound.name}!`);
      form.reset();
      enterHome(userFound, true);
    } else {
      alert('❌ E-mail, senha ou tipo de conta incorretos. Verifique suas credenciais.');
    }
  }
});

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Logout
document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem('doapets_session');
  appState.currentRole = null;
  appState.userProfile = null;
  showScreen('profile-select');
});

// Inicialização automática
(function checkAutoLogin() {
  const savedSession = localStorage.getItem('doapets_session');
  if (savedSession) {
    try {
      const { role, profile } = JSON.parse(savedSession);
      if (role && profile) {
        appState.currentRole = role;
        enterHome(profile, false);
      }
    } catch (e) {
      localStorage.removeItem('doapets_session');
    }
  }
})();
