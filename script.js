// Estado da sessão
const appState = {
  currentRole: null, // 'ong' | 'user' | 'guest'
  userProfile: null
};

// Telas principais
const screenProfile = document.getElementById('screen-profile-select');
const screenForm = document.getElementById('screen-form');
const mainApp = document.getElementById('main-app');

// Formulário de Cadastro
const form = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const labelName = document.getElementById('label-name');
const labelDoc = document.getElementById('label-doc');
const inputDoc = document.getElementById('doc');

// Elementos da Home & Perfil
const loggedUserType = document.getElementById('logged-user-type');
const guestAlert = document.getElementById('guest-alert');
const btnAction = document.querySelector('.btn-action');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');

// Avatar
const avatarContainer = document.getElementById('avatar-container');
const avatarInput = document.getElementById('avatar-input');
const avatarPreview = document.getElementById('avatar-preview');

// Modal de Denúncia
const btnOpenReport = document.getElementById('btn-open-report');
const btnCloseReport = document.getElementById('btn-close-report');
const modalReport = document.getElementById('modal-report');
const formReport = document.getElementById('form-report');

// Navegação entre telas de entrada vs App principal
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

// Configura formulário conforme perfil escolhido
function setupForm(role) {
  appState.currentRole = role;
  
  if (role === 'ong') {
    formTitle.textContent = 'Cadastro de ONG';
    labelName.textContent = 'Nome da ONG / Instituição';
    labelDoc.textContent = 'CNPJ (ou CPF do responsável)';
    inputDoc.placeholder = '00.000.000/0000-00';
  } else {
    formTitle.textContent = 'Cadastro Pessoa Física';
    labelName.textContent = 'Nome Completo';
    labelDoc.textContent = 'CPF';
    inputDoc.placeholder = '000.000.000-00';
  }

  showScreen('form');
}

// Entrar no aplicativo principal
function enterHome(profileData) {
  appState.userProfile = profileData;
  
  if (appState.currentRole === 'guest') {
    loggedUserType.textContent = 'Visitante (Leitura)';
    guestAlert.style.display = 'block';
    profileName.textContent = 'Visitante';
    profileEmail.textContent = 'Sem conta conectada';
    
    // Bloqueia ações de interação para visitante
    btnAction.classList.add('disabled');
    btnAction.onclick = () => alert('Visitantes não podem realizar interações.');
  } else {
    const roleName = appState.currentRole === 'ong' ? 'ONG' : 'Pessoa Física';
    loggedUserType.textContent = `${profileData.name} (${roleName})`;
    profileName.textContent = profileData.name;
    profileEmail.textContent = profileData.email || 'Sem e-mail cadastrado';
    guestAlert.style.display = 'none';
    
    btnAction.classList.remove('disabled');
    btnAction.onclick = () => alert('Ação iniciada com sucesso!');
  }

  // Define a primeira aba como Feed por padrão
  switchTab('tab-feed');
  showScreen('app');
}

// Alternar abas inferiores (Feed / Perfil)
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  const targetTab = document.getElementById(tabId);
  const targetBtn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);

  if (targetTab) targetTab.classList.add('active');
  if (targetBtn) targetBtn.classList.add('active');
}

// Upload de foto do perfil (arredondada)
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

// Modal de Denúncia
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

// Eventos de Navegação e Autenticação
document.querySelectorAll('.role-card').forEach(btn => {
  btn.addEventListener('click', () => setupForm(btn.dataset.role));
});

document.getElementById('btn-guest').addEventListener('click', () => {
  appState.currentRole = 'guest';
  enterHome({ name: 'Visitante' });
});

document.getElementById('btn-back-profile').addEventListener('click', () => {
  showScreen('profile-select');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    doc: document.getElementById('doc').value
  };
  form.reset();
  enterHome(userData);
});

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

document.getElementById('btn-logout').addEventListener('click', () => {
  appState.currentRole = null;
  appState.userProfile = null;
  showScreen('profile-select');
});