// Estado da aplicação persistido no localStorage
const appState = {
  currentRole: 'user', // 'ong' | 'user' | 'guest'
  userProfile: null,
  authMode: 'login', // 'login' | 'signup'
  selectedCategory: 'all',
  searchQuery: '',
  selectedPetForModal: null,
  pets: JSON.parse(localStorage.getItem('doapets_pets')) || [],
  registeredUsers: JSON.parse(localStorage.getItem('doapets_users')) || [],
  news: JSON.parse(localStorage.getItem('doapets_news')) || [],
  interests: JSON.parse(localStorage.getItem('doapets_interests')) || [],
  castrations: JSON.parse(localStorage.getItem('doapets_castrations')) || [],
  approvalsQueue: JSON.parse(localStorage.getItem('doapets_approvals_queue')) || [],
  userPets: JSON.parse(localStorage.getItem('doapets_user_pets')) || []
};

// Telas principais
const screenAuthMain = document.getElementById('screen-auth-main');
const mainApp = document.getElementById('main-app');

// Formulário de Autenticação Unificado
const authFormMain = document.getElementById('auth-form-main');
const tabBtnLogin = document.getElementById('tab-btn-login');
const tabBtnSignup = document.getElementById('tab-btn-signup');
const signupOnlyFields = document.querySelector('.signup-only-fields');
const forgotPasswordWrap = document.getElementById('forgot-password-wrap');
const btnSubmitMainAuth = document.getElementById('btn-submit-main-auth');

const labelName = document.getElementById('label-name');
const labelDoc = document.getElementById('label-doc');
const inputDoc = document.getElementById('doc');
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');

// Elementos da Home, Feed & Perfil
const loggedUserType = document.getElementById('logged-user-type');
const userCheckinAlert = document.getElementById('user-checkin-alert');
const profileApprovalBadge = document.getElementById('profile-approval-badge');
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

// Elementos da Aba osca3 / Doapets
const navBtnOsca3 = document.getElementById('nav-btn-osca3');
const tabOsca3Triagem = document.getElementById('tab-osca3-triagem');
const navBadgeOsca3 = document.getElementById('nav-badge-osca3');
const osca3FeedDescending = document.getElementById('osca3-feed-descending');

// Seções e Itens no Perfil
const settingItemRegisterPet = document.getElementById('setting-item-register-pet');
const settingItemUserPet = document.getElementById('setting-item-user-pet');
const settingItemRequestApproval = document.getElementById('setting-item-request-approval');
const settingItemChangePassword = document.getElementById('setting-item-change-password');
const userPetsSection = document.getElementById('user-pets-section');
const userMyPetsList = document.getElementById('user-my-pets-list');
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

// Modais de Solicitação & Dossiê
const modalRequestApproval = document.getElementById('modal-request-approval');
const btnCloseReqApproval = document.getElementById('btn-close-req-approval');
const formRequestApproval = document.getElementById('form-request-approval');

const modalOsca3Dossier = document.getElementById('modal-osca3-dossier');
const btnCloseDossier = document.getElementById('btn-close-dossier');
const btnDossierApprove = document.getElementById('btn-dossier-approve');
const btnDossierReject = document.getElementById('btn-dossier-reject');
let currentDossierUserEmail = null;

// Modal de Pet do Próprio Usuário
const modalUserPetForm = document.getElementById('modal-user-pet-form');
const btnCloseUserPet = document.getElementById('btn-close-user-pet');
const formUserPet = document.getElementById('form-user-pet');

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

// Verifica se o perfil atual é a unidade avaliadora (osca3 ou Doapets)
function isEvaluationUnit() {
  if (!appState.userProfile) return false;
  const nameClean = (appState.userProfile.name || '').trim().toLowerCase();
  return nameClean === 'osca3' || nameClean === 'doapets';
}

// Alternar entre modo Login e modo Cadastro
function setAuthMode(mode) {
  appState.authMode = mode;
  
  if (mode === 'login') {
    tabBtnLogin.classList.add('active');
    tabBtnSignup.classList.remove('active');
    signupOnlyFields.style.display = 'none';
    forgotPasswordWrap.style.display = 'flex';
    btnSubmitMainAuth.textContent = 'Entrar no Doapets';
    inputName.required = false;
    inputDoc.required = false;
  } else {
    tabBtnSignup.classList.add('active');
    tabBtnLogin.classList.remove('active');
    signupOnlyFields.style.display = 'block';
    forgotPasswordWrap.style.display = 'none';
    btnSubmitMainAuth.textContent = 'Criar Minha Conta';
    inputName.required = true;
    inputDoc.required = true;
    updateRoleLabels();
  }
}

// Atualizar rótulos com base no perfil selecionado (ONG vs Usuário)
function updateRoleLabels() {
  const isOng = appState.currentRole === 'ong';
  if (isOng) {
    labelName.textContent = 'Nome da ONG / Instituição';
    labelDoc.textContent = 'CNPJ (ou CPF do responsável)';
    inputDoc.placeholder = '00.000.000/0000-00';
  } else {
    labelName.textContent = 'Nome Completo';
    labelDoc.textContent = 'CPF';
    inputDoc.placeholder = '000.000.000-00';
  }
}

tabBtnLogin.addEventListener('click', () => setAuthMode('login'));
tabBtnSignup.addEventListener('click', () => setAuthMode('signup'));

document.querySelectorAll('input[name="auth-role"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    document.querySelectorAll('.role-chip').forEach(chip => chip.classList.remove('active'));
    e.target.closest('.role-chip').classList.add('active');
    appState.currentRole = e.target.value;
    updateRoleLabels();
  });
});

// Modal de Redefinir Senha
btnOpenForgotModal.addEventListener('click', () => {
  formForgotPassword.reset();
  forgotEmail.value = inputEmail.value.trim();
  modalForgotPassword.classList.add('active');
});

btnCloseForgot.addEventListener('click', () => {
  modalForgotPassword.classList.remove('active');
});

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

// =======================================================
// CADASTRO DE PET PELO PRÓPRIO USUÁRIO (PESSOA FÍSICA)
// =======================================================
settingItemUserPet.addEventListener('click', () => {
  formUserPet.reset();
  modalUserPetForm.classList.add('active');
});

btnCloseUserPet.addEventListener('click', () => {
  modalUserPetForm.classList.remove('active');
});

formUserPet.addEventListener('submit', (e) => {
  e.preventDefault();

  const newPet = {
    id: Date.now(),
    ownerEmail: appState.userProfile.email,
    name: document.getElementById('upet-name').value.trim(),
    species: document.getElementById('upet-species').value,
    size: document.getElementById('upet-size').value,
    age: document.getElementById('upet-age').value.trim(),
    vaccinated: document.getElementById('upet-vaccinated').value,
    neutered: document.getElementById('upet-neutered').value,
    notes: document.getElementById('upet-notes').value.trim()
  };

  appState.userPets.unshift(newPet);
  localStorage.setItem('doapets_user_pets', JSON.stringify(appState.userPets));

  alert(`🐾 Animal ${newPet.name} cadastrado no seu histórico com sucesso!`);
  formUserPet.reset();
  modalUserPetForm.classList.remove('active');
  renderUserMyPets();
});

function renderUserMyPets() {
  userMyPetsList.innerHTML = '';
  if (!appState.userProfile || appState.currentRole !== 'user') return;

  const myPets = appState.userPets.filter(p => p.ownerEmail === appState.userProfile.email);

  if (myPets.length === 0) {
    userMyPetsList.innerHTML = '<p style="font-size: 0.8rem; color: var(--text-muted);">Você ainda não cadastrou nenhum pet próprio.</p>';
    return;
  }

  myPets.forEach(p => {
    const card = document.createElement('div');
    card.className = 'my-pet-item';
    card.innerHTML = `
      <div class="my-pet-info">
        <span class="pet-icon-sm">${p.species === 'Gato' ? '🐱' : (p.species === 'Cachorro' ? '🐶' : '🐰')}</span>
        <div>
          <strong>${p.name} (${p.age})</strong>
          <small style="display:block; color: var(--text-muted); font-size: 0.72rem;">${p.size} • ${p.vaccinated} • ${p.neutered}</small>
        </div>
      </div>
    `;
    userMyPetsList.appendChild(card);
  });
}

// =======================================================
// SOLICITAÇÃO DE AVALIAÇÃO PELO USUÁRIO (ENTREVISTA COMPLETA)
// =======================================================
settingItemRequestApproval.addEventListener('click', () => {
  formRequestApproval.reset();
  modalRequestApproval.classList.add('active');
});

btnCloseReqApproval.addEventListener('click', () => {
  modalRequestApproval.classList.remove('active');
});

formRequestApproval.addEventListener('submit', (e) => {
  e.preventDefault();

  const phone = document.getElementById('req-phone').value.trim();
  const address = document.getElementById('req-address').value.trim();
  const housing = document.getElementById('req-housing').value;
  const residenceType = document.getElementById('req-residence-type').value;
  const familyAgrees = document.getElementById('req-family-agrees').value;
  const aloneTime = document.getElementById('req-alone-time').value;
  const emergencyPlan = document.getElementById('req-emergency-plan').value.trim();
  const financial = document.getElementById('req-financial-readiness').value;
  const motivation = document.getElementById('req-motivation').value.trim();

  const existingIdx = appState.approvalsQueue.findIndex(q => q.email === appState.userProfile.email);

  const requestData = {
    id: Date.now(),
    name: appState.userProfile.name,
    email: appState.userProfile.email,
    doc: appState.userProfile.doc,
    phone: phone,
    address: address,
    housing: housing,
    residenceType: residenceType,
    familyAgrees: familyAgrees,
    aloneTime: aloneTime,
    emergencyPlan: emergencyPlan,
    financial: financial,
    motivation: motivation,
    date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    status: 'pending'
  };

  if (existingIdx !== -1) {
    appState.approvalsQueue[existingIdx] = requestData;
  } else {
    appState.approvalsQueue.unshift(requestData);
  }

  const userIdx = appState.registeredUsers.findIndex(u => u.email === appState.userProfile.email);
  if (userIdx !== -1) {
    appState.registeredUsers[userIdx].approvalStatus = 'pending';
    localStorage.setItem('doapets_users', JSON.stringify(appState.registeredUsers));
  }

  appState.userProfile.approvalStatus = 'pending';
  localStorage.setItem('doapets_session', JSON.stringify({
    role: appState.currentRole,
    profile: appState.userProfile
  }));

  localStorage.setItem('doapets_approvals_queue', JSON.stringify(appState.approvalsQueue));

  alert('📋 Sua entrevista de avaliação foi enviada para análise da unidade osca3 / Doapets!');
  formRequestApproval.reset();
  modalRequestApproval.classList.remove('active');
  updateUserCheckinBanner();
});

// =======================================================
// ABA DE TRIAGEM EM FEED DECRESCENTE (osca3 / Doapets)
// =======================================================
function renderOsca3FeedDescending() {
  osca3FeedDescending.innerHTML = '';

  if (!isEvaluationUnit()) {
    navBtnOsca3.style.display = 'none';
    return;
  }

  navBtnOsca3.style.display = 'flex';

  const sortedQueue = [...appState.approvalsQueue].sort((a, b) => b.id - a.id);
  
  const pendingCount = sortedQueue.filter(q => q.status === 'pending').length;
  if (pendingCount > 0) {
    navBadgeOsca3.textContent = pendingCount;
    navBadgeOsca3.style.display = 'block';
  } else {
    navBadgeOsca3.style.display = 'none';
  }

  if (sortedQueue.length === 0) {
    osca3FeedDescending.innerHTML = '<p style="text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 20px;">Nenhuma solicitação de aprovação na fila no momento.</p>';
    return;
  }

  sortedQueue.forEach(item => {
    const statusText = item.status === 'approved' ? '✅ Aprovado (Apto)' : (item.status === 'rejected' ? '❌ Reprovado' : '⏳ Em Análise');
    const statusClass = item.status === 'approved' ? 'pill-approved' : (item.status === 'rejected' ? 'pill-rejected' : 'pill-pending');

    const card = document.createElement('div');
    card.className = 'osca3-feed-item-card';
    card.innerHTML = `
      <div class="osca3-feed-header">
        <strong class="osca3-user-title">👤 ${item.name}</strong>
        <span class="profile-checkin-pill ${statusClass}" style="margin: 0;">${statusText}</span>
      </div>
      <div class="osca3-feed-details">
        <p><strong>📄 CPF:</strong> ${item.doc || 'Não informado'}</p>
        <p><strong>📧 E-mail:</strong> ${item.email}</p>
        <p><strong>📞 Contato:</strong> ${item.phone}</p>
        <p><strong>🏠 Moradia:</strong> ${item.housing}</p>
        <p><strong>🕒 Data da Solicitação:</strong> ${item.date}</p>
      </div>
      <button type="button" class="btn-open-dossier" data-email="${item.email}">
        🔍 Ver Dossiê Completo & Tratar Avaliação
      </button>
    `;
    osca3FeedDescending.appendChild(card);
  });

  document.querySelectorAll('.btn-open-dossier').forEach(btn => {
    btn.addEventListener('click', () => openUserDossierModal(btn.dataset.email));
  });
}

// Abrir Dossiê Completo com dados de entrevista e animais
function openUserDossierModal(email) {
  currentDossierUserEmail = email;
  const item = appState.approvalsQueue.find(q => q.email === email);
  if (!item) return;

  document.getElementById('dossier-name').textContent = item.name;
  document.getElementById('dossier-doc').textContent = item.doc || 'Não informado';
  document.getElementById('dossier-email').textContent = item.email;
  document.getElementById('dossier-phone').textContent = item.phone;
  document.getElementById('dossier-address').textContent = item.address || 'Não informado';

  document.getElementById('dossier-housing').textContent = item.housing;
  document.getElementById('dossier-residence-type').textContent = item.residenceType || 'Não informado';
  document.getElementById('dossier-family-agrees').textContent = item.familyAgrees || 'Não informado';
  document.getElementById('dossier-alone-time').textContent = item.aloneTime || 'Não informado';
  document.getElementById('dossier-emergency-plan').textContent = item.emergencyPlan || 'Não informado';
  document.getElementById('dossier-financial').textContent = item.financial || 'Não informado';
  document.getElementById('dossier-motivation').textContent = item.motivation;

  const userPets = appState.userPets.filter(p => p.ownerEmail === email);
  const containerPets = document.getElementById('dossier-pets-list');
  containerPets.innerHTML = '';

  if (userPets.length === 0) {
    containerPets.innerHTML = '<p style="font-size: 0.78rem; color: var(--text-muted);">Nenhum animal cadastrado no histórico deste usuário.</p>';
  } else {
    userPets.forEach(p => {
      const petDiv = document.createElement('div');
      petDiv.className = 'dossier-pet-item';
      petDiv.innerHTML = `
        <strong>${p.species}: ${p.name} (${p.age}) - ${p.size || 'Porte Médio'}</strong><br>
        <small>💉 Vacinas: ${p.vaccinated} • Castração: ${p.neutered}</small>
        ${p.notes ? `<br><small style="color: var(--text-muted);">Obs: ${p.notes}</small>` : ''}
      `;
      containerPets.appendChild(petDiv);
    });
  }

  modalOsca3Dossier.classList.add('active');
}

btnCloseDossier.addEventListener('click', () => {
  modalOsca3Dossier.classList.remove('active');
});

btnDossierApprove.addEventListener('click', () => {
  if (currentDossierUserEmail) {
    updateUserApprovalStatus(currentDossierUserEmail, 'approved');
    modalOsca3Dossier.classList.remove('active');
  }
});

btnDossierReject.addEventListener('click', () => {
  if (currentDossierUserEmail) {
    updateUserApprovalStatus(currentDossierUserEmail, 'rejected');
    modalOsca3Dossier.classList.remove('active');
  }
});

function updateUserApprovalStatus(targetEmail, newStatus) {
  const qIdx = appState.approvalsQueue.findIndex(q => q.email === targetEmail);
  if (qIdx !== -1) {
    appState.approvalsQueue[qIdx].status = newStatus;
    localStorage.setItem('doapets_approvals_queue', JSON.stringify(appState.approvalsQueue));
  }

  const uIdx = appState.registeredUsers.findIndex(u => u.email === targetEmail);
  if (uIdx !== -1) {
    appState.registeredUsers[uIdx].approvalStatus = newStatus;
    localStorage.setItem('doapets_users', JSON.stringify(appState.registeredUsers));
  }

  if (appState.userProfile && appState.userProfile.email === targetEmail) {
    appState.userProfile.approvalStatus = newStatus;
    localStorage.setItem('doapets_session', JSON.stringify({
      role: appState.currentRole,
      profile: appState.userProfile
    }));
  }

  const label = newStatus === 'approved' ? 'APROVADO (Apto a receber pets)' : 'REPROVADO (Não Apto)';
  alert(`Decisão da unidade osca3 salva com sucesso!\nStatus definido como: ${label}`);
  renderOsca3FeedDescending();
  updateUserCheckinBanner();
}

function updateUserCheckinBanner() {
  if (appState.currentRole !== 'user') {
    userCheckinAlert.style.display = 'none';
    profileApprovalBadge.style.display = 'none';
    return;
  }

  const latestData = appState.registeredUsers.find(u => u.email === appState.userProfile.email);
  const status = latestData ? latestData.approvalStatus : (appState.userProfile.approvalStatus || 'not_requested');

  userCheckinAlert.style.display = 'block';
  profileApprovalBadge.style.display = 'inline-block';

  if (status === 'approved') {
    userCheckinAlert.className = 'checkin-status-banner status-approved';
    userCheckinAlert.innerHTML = `<strong>✅ Check-in de Aptidão: Aprovado!</strong><br>Você foi avaliado e aprovado pela unidade <strong>osca3</strong>. Está apto(a) a adotar e receber pets.`;
    
    profileApprovalBadge.className = 'profile-checkin-pill pill-approved';
    profileApprovalBadge.textContent = '✅ Aprovado pela osca3 (Apto)';
  } else if (status === 'rejected') {
    userCheckinAlert.className = 'checkin-status-banner status-rejected';
    userCheckinAlert.innerHTML = `<strong>❌ Check-in de Aptidão: Reprovado</strong><br>Na tratativa da unidade <strong>osca3</strong>, seu cadastro não foi considerado apto para adoção no momento.`;
    
    profileApprovalBadge.className = 'profile-checkin-pill pill-rejected';
    profileApprovalBadge.textContent = '❌ Não Apto (osca3)';
  } else if (status === 'pending') {
    userCheckinAlert.className = 'checkin-status-banner status-pending';
    userCheckinAlert.innerHTML = `<strong>⏳ Check-in de Aptidão: Em Análise</strong><br>Seus dados estão <em>sujeitos à avaliação da unidade osca3</em> para verificar se você está apto(a) a receber pets.`;
    
    profileApprovalBadge.className = 'profile-checkin-pill pill-pending';
    profileApprovalBadge.textContent = '⏳ Avaliação Pendente (osca3)';
  } else {
    userCheckinAlert.className = 'checkin-status-banner status-pending';
    userCheckinAlert.innerHTML = `<strong>ℹ️ Avaliação de Aptidão não solicitada</strong><br>Para poder adotar, acesse o seu <strong>Perfil</strong> e clique em <em>Solicitar Avaliação de Aptidão</em>.`;
    
    profileApprovalBadge.className = 'profile-checkin-pill pill-pending';
    profileApprovalBadge.textContent = 'ℹ️ Não Solicitado';
  }
}

btnModalAdopt.addEventListener('click', () => {
  if (appState.currentRole === 'guest') {
    alert('Visitantes não podem realizar interações. Crie uma conta ou faça login para adotar!');
    return;
  }

  const user = appState.registeredUsers.find(u => u.email === appState.userProfile.email);
  const status = user ? user.approvalStatus : (appState.userProfile.approvalStatus || 'not_requested');

  if (status === 'not_requested') {
    alert('⚠️ Você ainda não solicitou sua avaliação de aptidão!\nAcesse a aba Perfil e clique em "Solicitar Avaliação de Aptidão" para responder à entrevista da unidade osca3.');
    return;
  }

  if (status === 'pending') {
    alert('⏳ Seu questionário está em análise pela unidade osca3!\nAguarde a aprovação da sua tratativa para poder adotar.');
    return;
  }

  if (status === 'rejected') {
    alert('❌ Seu cadastro não foi aprovado na tratativa da unidade osca3 para receber animais.');
    return;
  }
  
  modalPetDetails.classList.remove('active');
  interestPetSelect.value = appState.selectedPetForModal.id;
  modalInterest.classList.add('active');
});

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

settingItemRegisterPet.addEventListener('click', () => {
  formPetRegister.reset();
  petEditId.value = '';
  modalPetFormTitle.textContent = "🐾 Cadastrar Novo Pet (ONG)";
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

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('active');
  });
});

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
  renderUserMyPets();
  renderOngCastrationRequests();
  renderOsca3FeedDescending();
  updateUserCheckinBanner();
  
  screenAuthMain.classList.remove('active');
  mainApp.classList.add('active');

  if (appState.currentRole === 'guest') {
    loggedUserType.textContent = 'Visitante (Leitura)';
    guestAlert.style.display = 'block';
    profileName.textContent = 'Visitante';
    profileEmail.textContent = 'Sem conta conectada';
    ongAdminPanel.style.display = 'none';
    ongPetsManageSection.style.display = 'none';
    userPetsSection.style.display = 'none';
    ongCastrationRequestsSection.style.display = 'none';
    settingItemRegisterPet.style.display = 'none';
    settingItemUserPet.style.display = 'none';
    settingItemRequestApproval.style.display = 'none';
  } else if (appState.currentRole === 'ong') {
    loggedUserType.textContent = `${profileData.name} (ONG)`;
    profileName.textContent = profileData.name;
    profileEmail.textContent = profileData.email || 'Sem e-mail cadastrado';
    guestAlert.style.display = 'none';
    
    ongAdminPanel.style.display = 'block';
    ongPetsManageSection.style.display = 'block';
    userPetsSection.style.display = 'none';
    ongCastrationRequestsSection.style.display = 'block';
    settingItemRegisterPet.style.display = 'flex';
    settingItemUserPet.style.display = 'none';
    settingItemRequestApproval.style.display = 'none';
  } else {
    loggedUserType.textContent = `${profileData.name} (Pessoa Física)`;
    profileName.textContent = profileData.name;
    profileEmail.textContent = profileData.email || 'Sem e-mail cadastrado';
    guestAlert.style.display = 'none';
    
    ongAdminPanel.style.display = 'none';
    ongPetsManageSection.style.display = 'none';
    userPetsSection.style.display = 'block';
    ongCastrationRequestsSection.style.display = 'none';
    settingItemRegisterPet.style.display = 'none';
    settingItemUserPet.style.display = 'flex';
    settingItemRequestApproval.style.display = 'flex';
  }

  switchTab('tab-home');
}

// Alternância estrita entre abas
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const targetTab = document.getElementById(tabId);
  const targetBtn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);

  if (targetTab) {
    targetTab.classList.add('active');
  }
  if (targetBtn) {
    targetBtn.classList.add('active');
  }
}

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

document.getElementById('btn-guest').addEventListener('click', () => {
  appState.currentRole = 'guest';
  enterHome({ name: 'Visitante' }, false);
});

authFormMain.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = inputEmail.value.trim().toLowerCase();
  const password = inputPassword.value;

  if (appState.authMode === 'signup') {
    const exists = appState.registeredUsers.some(u => u.email === email);
    if (exists) {
      alert('Este e-mail já está cadastrado. Alterne para a aba "Entrar".');
      return;
    }

    const userName = inputName.value.trim();
    const initialApproval = appState.currentRole === 'user' ? 'not_requested' : 'approved';

    const newUser = {
      role: appState.currentRole,
      name: userName,
      email: email,
      doc: inputDoc.value.trim(),
      password: password,
      approvalStatus: initialApproval,
      registeredAt: new Date().toLocaleDateString('pt-BR')
    };

    appState.registeredUsers.push(newUser);
    localStorage.setItem('doapets_users', JSON.stringify(appState.registeredUsers));
    
    alert('🎉 Cadastro realizado com sucesso!');
    authFormMain.reset();
    enterHome(newUser, true);
  } else {
    const userFound = appState.registeredUsers.find(
      u => u.email === email && u.password === password && u.role === appState.currentRole
    );

    if (userFound) {
      alert(`👋 Bem-vindo(a) de volta, ${userFound.name}!`);
      authFormMain.reset();
      enterHome(userFound, true);
    } else {
      alert('❌ E-mail, senha ou tipo de perfil incorretos. Verifique suas credenciais.');
    }
  }
});

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem('doapets_session');
  appState.currentRole = 'user';
  appState.userProfile = null;
  mainApp.classList.remove('active');
  screenAuthMain.classList.add('active');
  setAuthMode('login');
});

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
  } else {
    setAuthMode('login');
  }
})();