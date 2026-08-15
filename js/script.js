// ==========================================
// BANCO DE DADOS LOCAL (Pets e ONGs)
// ==========================================
const defaultPets = [
    { id: 1, name: "Rex", type: "cachorro", age: "2 anos", gender: "Macho", size: "Médio", vaccinated: true, castrated: true, description: "Muito brincalhão e amoroso. Adora correr.", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { id: 2, name: "Luna", type: "gato", age: "1 ano", gender: "Fêmea", size: "Pequeno", vaccinated: true, castrated: false, description: "Calma e independente.", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
];

const defaultOngs = [
    { id: 1, name: "Amigos de Patas", location: "Belo Horizonte, MG", rating: 4.5, description: "Focados no resgate de cães abandonados. Lutamos por um mundo mais justo para os animais.", image: "https://images.unsplash.com/photo-1588169993307-e816a13221b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
];

let appPets = JSON.parse(localStorage.getItem('doapets_animals')) || defaultPets;
let appOngs = JSON.parse(localStorage.getItem('doapets_ongs')) || defaultOngs;
let currentSelectedPet = null;

// ==========================================
// CONTROLE DE ACESSO E NAVEGAÇÃO
// ==========================================
function handleAuth(event) {
    event.preventDefault(); 
    const role = document.getElementById('auth-role').value;
    const name = document.getElementById('auth-name').value;
    const phone = document.getElementById('auth-phone').value;
    
    localStorage.setItem('doapets_role', role);
    localStorage.setItem('doapets_userName', name);
    localStorage.setItem('doapets_userPhone', phone);
    
    if (role === 'ong') {
        let ongExiste = appOngs.find(o => o.name === name);
        if (!ongExiste) {
            ongExiste = { id: Date.now(), name: name, location: "", rating: 5.0, description: "", image: "" };
            appOngs.push(ongExiste);
            localStorage.setItem('doapets_ongs', JSON.stringify(appOngs));
        }
    }
    checkLoginState();
}

function checkLoginState() {
    const role = localStorage.getItem('doapets_role');
    const name = localStorage.getItem('doapets_userName');
    
    if (!role) return; 
    
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-header').style.display = 'flex';
    document.getElementById('mobile-nav-bar').style.display = 'flex'; 
    
    // Atualiza o nome do usuário na aba Perfil
    document.getElementById('profileUserName').innerText = name.split(' ')[0];
    
    // Mostra/Oculta o ícone de "Adicionar Pet" no menu dependendo se é ONG
    if (role === 'ong') {
        document.getElementById('mob-nav-panel').style.display = 'block';
    } else {
        document.getElementById('mob-nav-panel').style.display = 'none';
    }

    switchSection('pets');
}

function logout() {
    localStorage.removeItem('doapets_role');
    localStorage.removeItem('doapets_userName');
    localStorage.removeItem('doapets_userPhone');
    location.reload(); 
}

window.onload = checkLoginState;

function switchSection(section) {
    // Rola para o topo sempre que trocar de aba
    window.scrollTo(0, 0);

    // Esconde todas as seções
    document.getElementById('section-pets').style.display = 'none';
    document.getElementById('section-ongs').style.display = 'none';
    document.getElementById('section-profile').style.display = 'none';
    document.getElementById('section-panel').style.display = 'none';

    // Mostra a selecionada
    document.getElementById(`section-${section}`).style.display = 'block';

    // Colore o ícone do menu inferior
    document.querySelectorAll('.mobile-nav a').forEach(el => el.classList.remove('active'));
    
    if (section === 'pets') {
        document.getElementById('mob-nav-pets').classList.add('active');
        renderPets('todos');
    }
    if (section === 'ongs') {
        document.getElementById('mob-nav-ongs').classList.add('active');
        renderOngs();
    }
    if (section === 'panel') {
        document.getElementById('mob-nav-panel').classList.add('active');
    }
    if (section === 'profile') {
        document.getElementById('mob-nav-profile').classList.add('active');
    }
}

// ==========================================
// FUNÇÕES DO PERFIL 
// ==========================================
function openMyProfile() {
    const role = localStorage.getItem('doapets_role');
    const name = localStorage.getItem('doapets_userName');
    
    switchSection('profile');

    if (role === 'ong') {
        document.getElementById('ong-profile-area').style.display = 'block';
        const minhaOng = appOngs.find(o => o.name === name);
        if(minhaOng) {
            document.getElementById('ong-profile-name').value = minhaOng.name;
            document.getElementById('ong-profile-location').value = minhaOng.location || "";
            document.getElementById('ong-profile-desc').value = minhaOng.description || "";
            document.getElementById('ong-profile-image').value = minhaOng.image || "";
        }
    } else {
        document.getElementById('ong-profile-area').style.display = 'none';
    }
}

function updateOngProfile(event) {
    event.preventDefault();
    const name = document.getElementById('ong-profile-name').value;
    const location = document.getElementById('ong-profile-location').value;
    const desc = document.getElementById('ong-profile-desc').value;
    const image = document.getElementById('ong-profile-image').value;

    let index = appOngs.findIndex(o => o.name === name);
    if(index !== -1) {
        appOngs[index].location = location;
        appOngs[index].description = desc;
        appOngs[index].image = image;
        localStorage.setItem('doapets_ongs', JSON.stringify(appOngs));
        alert("Perfil da ONG atualizado com sucesso!");
        switchSection('ongs'); 
    }
}

// ==========================================
// FUNÇÕES DA ONG: Cadastrar Pet
// ==========================================
function addNewPet(event) {
    event.preventDefault();
    const newPet = {
        id: Date.now(),
        name: document.getElementById('pet-name').value,
        type: document.getElementById('pet-type').value,
        gender: document.getElementById('pet-gender').value,
        age: document.getElementById('pet-age').value,
        size: document.getElementById('pet-size').value,
        vaccinated: document.getElementById('pet-vaccinated').checked,
        castrated: document.getElementById('pet-castrated').checked,
        description: document.getElementById('pet-description').value,
        image: document.getElementById('pet-image').value
    };
    
    appPets.push(newPet);
    localStorage.setItem('doapets_animals', JSON.stringify(appPets));
    alert(`Sucesso! ${newPet.name} foi adicionado.`);
    document.getElementById('add-pet-form').reset();
    switchSection('pets');
}

// ==========================================
// RENDERIZAÇÃO: ANIMAIS
// ==========================================
function renderPets(filterType = 'todos') {
    const grid = document.getElementById('pets-grid');
    grid.innerHTML = ''; 
    const filteredPets = filterType === 'todos' ? appPets : appPets.filter(pet => pet.type === filterType);

    if (filteredPets.length === 0) {
        grid.innerHTML = '<p style="text-align:center; width:100%; color:#888;">Nenhum animal nesta categoria.</p>';
        return;
    }

    filteredPets.forEach(pet => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" class="card-img">
            <div class="card-info">
                <h3 class="card-title">${pet.name}</h3>
                <div class="card-details"><span>${pet.age}</span> • <span>${pet.gender}</span></div>
                <button class="btn-primary" onclick="openPetModal(${pet.id})">Ver Detalhes</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterPets(type) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderPets(type);
}

// ==========================================
// RENDERIZAÇÃO: ONGs Parceiras
// ==========================================
function renderOngs() {
    const grid = document.getElementById('ongs-grid');
    grid.innerHTML = ''; 
    const validOngs = appOngs.filter(o => o.location && o.description);
    
    if (validOngs.length === 0) {
        grid.innerHTML = '<p style="text-align:center; width:100%; color:#888;">Nenhuma ONG concluiu o cadastro.</p>';
        return;
    }

    const sortedOngs = validOngs.sort((a, b) => b.rating - a.rating);

    sortedOngs.forEach(ong => {
        const card = document.createElement('div');
        card.className = 'card';
        const shortDesc = ong.description.length > 80 ? ong.description.substring(0, 80) + "..." : ong.description;
        
        card.innerHTML = `
            <img src="${ong.image}" alt="${ong.name}" class="card-img">
            <div class="card-info">
                <h3 class="card-title">${ong.name}</h3>
                <p class="ong-location">📍 ${ong.location}</p>
                <p class="ong-rating">★ ${ong.rating.toFixed(1)} / 5.0</p>
                <p class="ong-desc">${shortDesc}</p>
                <button class="btn-primary" onclick="viewOngProfile(${ong.id})">Visualizar Perfil</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ==========================================
// CONTROLE DE MODAIS
// ==========================================
function openPetModal(petId) {
    currentSelectedPet = appPets.find(p => p.id === petId);
    document.getElementById('modalTitle').innerText = currentSelectedPet.name;
    document.getElementById('modalSpecs').innerHTML = `
        <p><strong>Tipo:</strong> ${currentSelectedPet.type === 'cachorro' ? 'Cachorro 🐶' : 'Gato 🐱'}</p>
        <p><strong>Idade:</strong> ${currentSelectedPet.age} | <strong>Porte:</strong> ${currentSelectedPet.size}</p>
        <p><strong>Saúde:</strong> ${currentSelectedPet.vaccinated ? '✔️ Vacinado' : '❌ Não'} | ${currentSelectedPet.castrated ? '✔️ Castrado' : '❌ Não'}</p>
        <p><strong>Sobre:</strong> ${currentSelectedPet.description}</p>
    `;
    document.getElementById('adoptModal').style.display = 'flex';
}

function viewOngProfile(ongId) {
    const ong = appOngs.find(o => o.id === ongId);
    document.getElementById('ongDetailImage').src = ong.image;
    document.getElementById('ongDetailName').innerText = ong.name;
    document.getElementById('ongDetailRating').innerText = `Avaliação: ★ ${ong.rating.toFixed(1)} / 5.0`;
    document.getElementById('ongDetailLocation').innerText = `📍 ${ong.location}`;
    document.getElementById('ongDetailDesc').innerText = ong.description;
    document.getElementById('ongDetailModal').style.display = 'flex';
}

function closeModal(modalId) { document.getElementById(modalId).style.display = 'none'; }
window.onclick = function(e) { if (e.target.classList.contains('modal')) e.target.style.display = 'none'; }
function confirmAdoption() {
    const savedName = localStorage.getItem('doapets_userName');
    alert(`Interesse registrado, ${savedName}! A ONG será notificada em breve.`);
    closeModal('adoptModal');
}
