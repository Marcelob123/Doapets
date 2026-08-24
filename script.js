// Estado da aplicação persistido no localStorage
const appState = {
  currentRole: null, // 'ong' | 'user' | 'guest'
  userProfile: null,
  authMode: 'signup',
  selectedCategory: 'all',
  searchQuery: '',
  selectedPetForModal: null,
  pets: JSON.parse(localStorage.getItem('doapets_pets')) || [],
  registeredUsers: JSON.parse(localStorage.getItem('doapets_users')) || [],
  news: JSON.parse(localStorage.getItem('doapets_news')) || [],
  interests: JSON.parse(localStorage.getItem('doapets_interests')) || [],
  castrations: JSON.parse(localStorage.getItem('doapets_castrations')) || []
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
const forgotPasswordWrap = document.getElementById('forgot-password-wrap');

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
const badgeInterestCount = document.getElementById('badge-interest-count');

// Seções e Itens no Perfil da ONG
const settingItemRegisterPet = document.getElementById('setting-item-register-pet');
const settingItemChangePassword = document.getElementById('setting-item-change-password');
const ongPetsManageSection = document.getElementById('ong-pets-manage-section');
const ongMyPetsList = document.getElementById('ong-my-pets-list');
const ongCastrationRequestsSection = document.getElementById('ong-castration-requests-section');
const ongCastrationList = document.getElementById('ong-castration-list');

// Avatar
const avatarContainer = document.getElementById('avatar-container');
const avatarInput = document.getElementById('avatar-input');
const avatarPreview = document.getElementById('avatar-preview');

// Modais
const modalPetDetails = document.getElementById('modal-pet-details');
const btnClosePetModal = document.getElementById('btn-close-pet-modal');
const btnModalAdopt = document.getElementById('btn-modal-adopt');

const modalPetForm = document.getElementById('modal-pet-form');
const btnClosePetForm = document.getElementById('btn-close-pet-form');
const formPetRegister = document.getElementById('form-pet-register');
const modalPetFormTitle = document.getElementById('modal-pet-form-title');
const petEditId = document.getElementById('pet-edit-id');

const modalInterest = document.getElementById('modal-interest');
const btnOpenInterestModal = document.getElementById('btn-open-interest-modal');
const btnCloseInterest = document.getElementById('btn-close-interest');
const formInterest = document.getElementById('form-interest');
const interestPetSelect = document.getElementById('interest-pet-select');

// Modal Redefinir Senha
const modalForgotPassword = document.getElementById('modal-forgot-password');
const btnOpenForgotModal = document.getElementById('btn-open-forgot-modal');
const btnCloseForgot = document.getElementById('btn-close-forgot');
const formForgotPassword = document.getElementById('form-forgot-password');
const forgotEmail = document.getElementById('forgot-email');
const forgotDoc = document.getElementById('forgot-doc');
const forgotNewPassword = document.getElementById('forgot-new-password');
const forgotConfirmPassword = document.getElementById('forgot-confirm-password');

// Modal de Castração
const modalCastration = document.getElementById('modal-castration');
const btnOpenCastrationModal = document.getElementById('btn-open-castration-modal');
const btnCloseCastration = document.getElementById('btn-close-castration');
const formCastration = document.getElementById('form-castration');
const castrationOngSelect = document.getElementById('castration-ong-select');

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
  if (!isoDateString) return { day: '--', monthShort: '--', monthNum: '--', year: '----' };
  const [year, month, day] = isoDateString.split('-');
  const monthIdx = parseInt(month, 10) - 1;
  return {
    day: day,
    monthShort: monthShortNames[monthIdx] || '',
    monthNum: month,
    year: year
  };
}

// Modal de Redefinir Senha
btnOpenForgotModal.addEventListener('click', () => {
  formForgotPassword.reset();
  forgotEmail.value = inputEmail.value.trim();
  modalForgotPassword.classList.add('active');
});

btnCloseForgot.addEventListener('click', () => {
  modalForgotPassword.classList.remove('active');
});

// Acesso à redefinição pelo Perfil
settingItemChangePassword.addEventListener('click', () => {
  if (appState.currentRole === 'guest') {
    alert('Visitantes não possuem conta registrada.');
    return;
  }
  formForgotPassword.reset();
  forgotEmail.value = appState.userProfile.email || '';
  forgotDoc.value = appState.userProfile.doc || '';
  modalForgotPassword.classList.add('active');
});

// Processar redefinição de senha
formForgotPassword.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = forgotEmail.value.trim().toLowerCase();
  const doc = forgotDoc.value.trim();
  const newPass = forgotNewPassword.value;
  const confirmPass = forgotConfirmPassword.value;

  if (newPass !== confirmPass) {
    alert('As novas senhas digitadas não coincidem.');
    return;
  }

  const userIndex = appState.registeredUsers.findIndex(
    u => u.email.toLowerCase() === email && u.doc.replace(/\D/g, '') === doc.replace(/\D/g, '')
  );

  if (userIndex === -1) {
    alert('❌ Não encontramos nenhuma conta correspondente com este e-mail e documento informados.');
    return;
  }

  appState.registeredUsers[userIndex].password = newPass;
  localStorage.setItem('doapets_users', JSON.stringify(appState.registeredUsers));

  if (appState.userProfile && appState.userProfile.email.toLowerCase() === email) {
    appState.userProfile.password = newPass;
    localStorage.setItem('doapets_session', JSON.stringify({
      role: appState.currentRole,
      profile: appState.userProfile
    }));
  }

  alert('🎉 Senha redefinida com sucesso! Você já pode utilizá-la para fazer login.');
  formForgotPassword.reset();
  modalForgotPassword.classList.remove('active');
});

// Atualiza a lista suspensa de ONGs no modal de castração
function updateCastrationOngSelect() {
  castrationOngSelect.innerHTML = '<option value="">Escolha a ONG...</option>';
  const ongUsers = appState.registeredUsers.filter(u => u.role === 'ong');
  
  if (ongUsers.length === 0) {
    const opt = document.createElement('option');
    opt.value = "ong-geral";
    opt.textContent = "ONG Central Doapets";
    castrationOngSelect.appendChild(opt);
    return;
  }

  ongUsers.forEach(ong => {
    const opt = document.createElement('option');
    opt.value = ong.email;
    opt.textContent = `${ong.name}`;
    castrationOngSelect.appendChild(opt);
  });
}

function updateInterestPetSelect() {
  interestPetSelect.innerHTML = '<option value="">Escolha um pet...</option>';
  appState.pets.forEach(pet => {
    const opt = document.createElement('option');
    opt.value = pet.id;
    opt.textContent = `${pet.name} (${pet.categoryLabel}) - ${pet.ownerOng || 'ONG'}`;
    interestPetSelect.appendChild(opt);
  });
}

// Renderizar pets na aba Início
function renderPetsFeed() {
  petsFeedList.innerHTML = '';
  updateInterestPetSelect();
  updateCastrationOngSelect();

  const filtered = appState.pets.filter(pet => {
    const matchesCategory = appState.selectedCategory === 'all' || pet.category === appState.selectedCategory;
    const query = appState.searchQuery.toLowerCase();
    const matchesSearch = pet.name.toLowerCase().includes(query) ||
                          pet.description.toLowerCase().includes(query) ||
                          pet.categoryLabel.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    petsFeedList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 20px;">Nenhum animal cadastrado no momento. ONGs podem cadastrar pets na aba Perfil!</p>';
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

    card.addEventListener('click', () => {
      openPetDetailsModal(pet);
    });

    petsFeedList.appendChild(card);
  });
}

// Renderizar pets cadastrados pela ONG logada
function renderOngMyPets() {
  ongMyPetsList.innerHTML = '';
  
  if (!appState.userProfile || appState.currentRole !== 'ong') return;

  const myPets = appState.pets.filter(p => p.ownerEmail === appState.userProfile.email);

  if (myPets.length === 0) {
    ongMyPetsList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.8rem;">Você ainda não cadastrou nenhum pet.</p>';
    return;
  }

  myPets.forEach(pet => {
    const item = document.createElement('div');
    item.className = 'my-pet-item';
    item.innerHTML = `
      <div class="my-pet-info">
        <span class="pet-icon-sm">${pet.icon}</span>
        <div>
          <strong>${pet.name}</strong>
          <small style="display: block; color: var(--text-muted); font-size: 0.75rem;">${pet.age} • ${pet.size}</small>
        </div>
      </div>
      <div class="my-pet-actions">
        <button type="button" class="btn-post-action btn-post-edit btn-edit-pet" data-id="${pet.id}">✏️</button>
        <button type="button" class="btn-post-action btn-post-delete btn-delete-pet" data-id="${pet.id}">🗑️</button>
      </div>
    `;
    ongMyPetsList.appendChild(item);
  });

  document.querySelectorAll('.btn-edit-pet').forEach(btn => {
    btn.addEventListener('click', () => editPet(Number(btn.dataset.id)));
  });

  document.querySelectorAll('.btn-delete-pet').forEach(btn => {
    btn.addEventListener('click', () => deletePet(Number(btn.dataset.id)));
  });
}

// Renderizar solicitações de castração recebidas no perfil da ONG
function renderOngCastrationRequests() {
  ongCastrationList.innerHTML = '';

  if (!appState.userProfile || appState.currentRole !== 'ong') return;

  const myRequests = appState.castrations.filter(
    req => req.targetOngEmail === appState.userProfile.email || req.targetOngEmail === "ong-geral"
  );

  if (myRequests.length === 0) {
    ongCastrationList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.8rem;">Nenhum pedido de castração recebido até o momento.</p>';
    return;
  }

  myRequests.forEach(req => {
    const cleanPhone = req.tutorPhone.replace(/\D/g, '');
    const whatsappMsg = encodeURIComponent(`Olá ${req.tutorName}! Somos da ONG ${appState.userProfile.name} e recebemos sua solicitação de castração para o pet ${req.petName}.`);
    const whatsappUrl = `https://wa.me/55${cleanPhone}?text=${whatsappMsg}`;

    const card = document.createElement('div');
    card.className = 'castration-card-item';
    card.innerHTML = `
      <div class="castration-card-header">
        <strong>🐾 ${req.petName}</strong>
        <span>${req.date}</span>
      </div>
      <div class="castration-card-body">
        <p>👤 <strong>Tutor:</strong> ${req.tutorName}</p>
        <p>📞 <strong>Contato:</strong> ${req.tutorPhone}</p>
        <p>🏷️ <strong>Espécie/Sexo:</strong> ${req.petType}</p>
        <p>⚖️ <strong>Idade/Peso:</strong> ${req.petWeight}</p>
        <p>📝 <strong>Observações:</strong> ${req.petNotes || 'Nenhuma'}</p>
        <a href="${whatsappUrl}" target="_blank" class="btn-contact-tutor">💬 Chamar Tutor no WhatsApp</a>
      </div>
    `;
    ongCastrationList.appendChild(card);
  });
}

// Modal de Detalhes do Pet
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

btnModalAdopt.addEventListener('click', () => {
  if (appState.currentRole === 'guest') {
    alert('Visitantes não podem realizar interações. Crie uma conta ou faça login para adotar!');
    return;
  }
  
  modalPetDetails.classList.remove('active');
  interestPetSelect.value = appState.selectedPetForModal.id;
  modalInterest.classList.add('active');
});

// Abertura do Modal de Cadastro de Pet pelo item de configuração
settingItemRegisterPet.addEventListener('click', () => {
  formPetRegister.reset();
  petEditId.value = '';
  modalPetFormTitle.textContent = "🐾 Cadastrar Novo Pet";
  modalPetForm.classList.add('active');
});

btnClosePetForm.addEventListener('click', () => {
  modalPetForm.classList.remove('active');
});

function editPet(id) {
  const pet = appState.pets.find(p => p.id === id);
  if (!pet) return;

  petEditId.value = pet.id;
  document.getElementById('pet-name').value = pet.name;
  document.getElementById('pet-icon').value = pet.icon;
  document.getElementById('pet-category').value = pet.category;
  document.getElementById('pet-age').value = pet.age;
  document.getElementById('pet-size').value = pet.size;
  document.getElementById('pet-health').value = pet.health;
  document.getElementById('pet-location').value = pet.location;
  document.getElementById('pet-whatsapp').value = pet.whatsapp || '';
  document.getElementById('pet-description').value = pet.description;

  modalPetFormTitle.textContent = "✏️ Editar Pet";
  modalPetForm.classList.add('active');
}

function deletePet(id) {
  if (confirm("Tem certeza de que deseja excluir este pet do Doapets?")) {
    appState.pets = appState.pets.filter(p => p.id !== id);
    localStorage.setItem('doapets_pets', JSON.stringify(appState.pets));
    renderPetsFeed();
    renderOngMyPets();
    alert('Pet excluído com sucesso.');
  }
}

formPetRegister.addEventListener('submit', (e) => {
  e.preventDefault();

  const editId = petEditId.value;
  const categorySelect = document.getElementById('pet-category');
  const categoryLabel = categorySelect.options[categorySelect.selectedIndex].text;

  const petData = {
    name: document.getElementById('pet-name').value.trim(),
    icon: document.getElementById('pet-icon').value,
    category: categorySelect.value,
    categoryLabel: categoryLabel,
    age: document.getElementById('pet-age').value.trim(),
    size: document.getElementById('pet-size').value,
    health: document.getElementById('pet-health').value.trim(),
    location: document.getElementById('pet-location').value.trim(),
    whatsapp: document.getElementById('pet-whatsapp').value.trim().replace(/\D/g, ''),
    description: document.getElementById('pet-description').value.trim(),
    ownerOng: appState.userProfile.name,
    ownerEmail: appState.userProfile.email
  };

  if (editId) {
    const idx = appState.pets.findIndex(p => p.id === Number(editId));
    if (idx !== -1) {
      appState.pets[idx] = { ...appState.pets[idx], ...petData };
      alert('Pet atualizado com sucesso!');
    }
  } else {
    const newPet = {
      id: Date.now(),
      ...petData
    };
    appState.pets.unshift(newPet);
    alert('🐾 Novo pet cadastrado com sucesso!');
  }

  localStorage.setItem('doapets_pets', JSON.stringify(appState.pets));
  renderPetsFeed();
  renderOngMyPets();
  modalPetForm.classList.remove('active');
});

// Modal de Castração (Envio para a ONG)
btnOpenCastrationModal.addEventListener('click', () => {
  if (appState.currentRole === 'guest') {
    alert('Visitantes não podem enviar pedidos. Faça login ou crie sua conta!');
    return;
  }
  updateCastrationOngSelect();
  modalCastration.classList.add('active');
});

btnCloseCastration.addEventListener('click', () => {
  modalCastration.classList.remove('active');
});

formCastration.addEventListener('submit', (e) => {
  e.preventDefault();

  const targetOngEmail = castrationOngSelect.value;
  const targetOngName = castrationOngSelect.options[castrationOngSelect.selectedIndex].text;

  const newRequest = {
    id: Date.now(),
    targetOngEmail: targetOngEmail,
    targetOngName: targetOngName,
    tutorName: document.getElementById('castration-tutor-name').value.trim(),
    tutorPhone: document.getElementById('castration-tutor-phone').value.trim(),
    petName: document.getElementById('castration-pet-name').value.trim(),
    petType: document.getElementById('castration-pet-type').value,
    petWeight: document.getElementById('castration-pet-weight').value.trim(),
    petNotes: document.getElementById('castration-pet-notes').value.trim(),
    date: new Date().toLocaleDateString('pt-BR')
  };

  appState.castrations.unshift(newRequest);
  localStorage.setItem('doapets_castrations', JSON.stringify(appState.castrations));

  alert(`✅ Solicitação de castração enviada com sucesso para ${targetOngName}! A ONG analisará os dados no perfil dela.`);
  formCastration.reset();
  modalCastration.classList.remove('active');
});

// Modal de Interesse e WhatsApp
btnOpenInterestModal.addEventListener('click', () => {
  if (appState.currentRole === 'guest') {
    alert('Visitantes não podem enviar formulários. Faça login ou crie uma conta!');
    return;
  }
  if (appState.pets.length === 0) {
    alert('Nenhum pet disponível no momento.');
    return;
  }
  modalInterest.classList.add('active');
});

btnCloseInterest.addEventListener('click', () => {
  modalInterest.classList.remove('active');
});

formInterest.addEventListener('submit', (e) => {
  e.preventDefault();

  const selectedPetId = Number(interestPetSelect.value);
  const targetPet = appState.pets.find(p => p.id === selectedPetId);

  if (!targetPet) {
    alert('Por favor, selecione um pet válido.');
    return;
  }

  const userName = document.getElementById('interest-user-name').value.trim();
  const userCity = document.getElementById('interest-user-city').value.trim();
  const housing = document.getElementById('interest-housing').value;
  const message = document.getElementById('interest-message').value.trim();

  const interestRecord = {
    id: Date.now(),
    petName: targetPet.name,
    petId: targetPet.id,
    userName: userName,
    userCity: userCity,
    housing: housing,
    message: message,
    date: new Date().toLocaleDateString('pt-BR')
  };

  appState.interests.unshift(interestRecord);
  localStorage.setItem('doapets_interests', JSON.stringify(appState.interests));
  badgeInterestCount.textContent = appState.interests.length;

  const phone = targetPet.whatsapp || '5537999999999';
  const whatsappText = encodeURIComponent(
    `🐾 *Olá! Tenho interesse em adotar pelo Doapets.*\n\n` +
    `🐶 *Pet:* ${targetPet.name} (${targetPet.age})\n` +
    `👤 *Meu Nome:* ${userName}\n` +
    `📍 *Localização:* ${userCity}\n` +
    `🏠 *Moradia:* ${housing}\n` +
    `💬 *Mensagem:* ${message || 'Gostaria de agendar uma visita e saber mais!'}`
  );

  const whatsappUrl = `https://wa.me/${phone}?text=${whatsappText}`;
  
  formInterest.reset();
  modalInterest.classList.remove('active');
  window.open(whatsappUrl, '_blank');
});

// Atualizar Badges de Notificação
function updateNewsBadges() {
  const totalNews = appState.news.length;
  badgeNewsCount.textContent = totalNews;
  badgeInterestCount.textContent = appState.interests.length;
  
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

// Calendário
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

// Notícias - Editar e Excluir
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

function deleteNews(id) {
  if (confirm("Tem certeza de que deseja excluir esta publicação?")) {
    appState.news = appState.news.filter(n => n.id !== id);
    localStorage.setItem('doapets_news', JSON.stringify(appState.news));
    renderNewsFeed();
  }
}

// Busca e Categorias
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

// Dropdowns
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('active');
  });
});

// Navegação
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

function setupAuthForm(mode) {
  appState.authMode = mode;
  const isOng = appState.currentRole === 'ong';

  if (mode === 'signup') {
    btnToggleSignup.classList.add('active');
    btnToggleLogin.classList.remove('active');
    signupFields.forEach(f => f.style.display = 'flex');
    forgotPasswordWrap.style.display = 'none';
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
    forgotPasswordWrap.style.display = 'flex';
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
  renderOngMyPets();
  renderOngCastrationRequests();
  
  if (appState.currentRole === 'guest') {
    loggedUserType.textContent = 'Visitante (Leitura)';
    guestAlert.style.display = 'block';
    profileName.textContent = 'Visitante';
    profileEmail.textContent = 'Sem conta conectada';
    ongAdminPanel.style.display = 'none';
    ongPetsManageSection.style.display = 'none';
    ongCastrationRequestsSection.style.display = 'none';
    settingItemRegisterPet.style.display = 'none';
  } else {
    const roleName = appState.currentRole === 'ong' ? 'ONG' : 'Pessoa Física';
    loggedUserType.textContent = `${profileData.name} (${roleName})`;
    profileName.textContent = profileData.name;
    profileEmail.textContent = profileData.email || 'Sem e-mail cadastrado';
    guestAlert.style.display = 'none';
    
    if (appState.currentRole === 'ong') {
      ongAdminPanel.style.display = 'block';
      ongPetsManageSection.style.display = 'block';
      ongCastrationRequestsSection.style.display = 'block';
      settingItemRegisterPet.style.display = 'flex';
    } else {
      ongAdminPanel.style.display = 'none';
      ongPetsManageSection.style.display = 'none';
      ongCastrationRequestsSection.style.display = 'none';
      settingItemRegisterPet.style.display = 'none';
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

// Login e Cadastro
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
      alert('❌ E-mail, senha ou tipo de conta incorretos. Verifique suas credenciais ou use "Esqueceu sua senha?".');
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
