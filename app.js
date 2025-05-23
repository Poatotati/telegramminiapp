// --- Données dynamiques (modifiables individuellement) ---
// Types de produits (modifiable individuellement)
const types = [
  { id: 1, name: 'Détente' },
  { id: 2, name: 'Féstif' }
  // Ajoute, modifie ou supprime des types ici
];

// Catégories par type (modifiable individuellement)
const categories = {
  1: [ // Détente
    { id: 1, name: 'Hash Jaune Mousseux' },
    { id: 2, name: 'Hash Filtré' },
    { id: 3, name: 'Beuh' },
    { id: 4, name: 'Extraction' },
    { id: 5, name: 'Edibles' },
    { id: 6, name: 'Vape' },
    { id: 7, name: 'Accéssoires' }
  ],
  2: [ // Féstif
    { id: 1, name: 'Kétamines' },
    { id: 2, name: 'Cocaine' },
    { id: 3, name: 'MDMA' },
    { id: 4, name: 'Extazies' },
    { id: 5, name: 'LSD' },
    { id: 6, name: '3-MMC' },
    { id: 7, name: '2-CB' },
    { id: 8, name: 'Tucibi' },
    { id: 9, name: 'Champignon Hallucinogène' } , 
    { id: 10, name: 'Speed' }
  ]
  // Ajoute, modifie ou supprime des catégories ici
};

// Produits par type et catégorie (modifiable individuellement)
const products = {
  1: { // Détente
    1: [ // Infusions
      { id: 1, name: 'Jaune Prenium 1ere presse', price: [
  { format: '10g', value: '60€' },
  { format: '50g', value: '200€' },
  { format: '100g', value: '350€' },
  { format: '200g', value: '660€' }
], image: 'https://placehold.co/200x200/232735/4fd1c5?text=Infusion+Relax' },
      { id: 2, name: 'Infusion Nuit', price: '8,90 €', image: 'https://placehold.co/200x200/232735/4fd1c5?text=Infusion+Nuit' },
      { id: 3, name: 'Infusion Zen', price: '10,90 €', image: 'https://placehold.co/200x200/232735/4fd1c5?text=Infusion+Zen' },
      { id: 4, name: 'Infusion Vitalité', price: '11,90 €', image: 'https://placehold.co/200x200/232735/4fd1c5?text=Infusion+Vitalite' },
      { id: 5, name: 'Infusion Douceur', price: '12,90 €', image: 'https://placehold.co/200x200/232735/4fd1c5?text=Infusion+Douceur' }
    ],
    2: [ /* ... autres produits de la catégorie Huiles ... */ ],
    // ... autres catégories ...
  },
  2: { // Féstif
    9: [ // Champignon Hallucinogène
      {
        id: 1,
        name: 'True Albinos Teacher',
        price: [
          { format: '10g', value: '70€' },
          { format: '25g', value: '150€' },
          { format: '50g', value: '250€' },
          { format: '100g', value: '450€' },
          { format: '250g', value: '1.100€' },
          { format: '500g', value: '2.000€' },
          { format: '1.000g', value: '3.500€' }
        ],
        image: 'true-albinos-teacher.jpg'
      }
    ]
    // Les autres catégories du type 2 sont vides ou absentes
  }
  // Ajoute, modifie ou supprime des produits ici
};
// Pour chaque type et catégorie, tu peux ajouter ou éditer les produits individuellement.


// --- Navigation State ---
let navStack = [];

function renderMain() {
  setMainContent(`
    <div class="main-btns">
      ${types.map(type => `<button class="btn" onclick="gotoType(${type.id})">${type.name}</button>`).join('')}
    </div>
  `);
  navStack = [];
}

function gotoType(typeId) {
  navStack.push(renderMain);
  setMainContent(`
    <div class="category-btns">
      ${categories[typeId].map(cat => `<button class="category-btn" onclick="gotoCategory(${typeId},${cat.id})">${cat.name}</button>`).join('')}
    </div>
    <button class="back-btn" onclick="goBack()">Retour</button>
  `);
}

function gotoCategory(typeId, catId) {
  navStack.push(() => gotoType(typeId));
  setMainContent(`
    <div class="product-btns">
      ${(products[typeId] && products[typeId][catId] && products[typeId][catId].length > 0)
        ? products[typeId][catId].map(prod => `
          <button class="product-btn" onclick="gotoProduct(${typeId},${catId},${prod.id})">
            <img src="${prod.image}" alt="${prod.name}" style="width:40px;height:40px;border-radius:6px;margin-right:12px;vertical-align:middle;">
            <span style="vertical-align:middle;">${prod.name} - <span class="product-price">${Array.isArray(prod.price) ? prod.price.map(p => `${p.format} : ${p.value}`).join(' / ') : prod.price}</span></span>
          </button>
        `).join('')
        : '<div style="color:#888;text-align:center;margin:32px 0;">Aucun produit disponible dans cette catégorie.</div>'}
    </div>
    <button class="back-btn" onclick="goBack()">Retour</button>
  `);
}

function gotoProduct(typeId, catId, prodId) {
  navStack.push(() => gotoCategory(typeId, catId));
  const prod = products[typeId][catId].find(p => p.id === prodId);
  setMainContent(`
    <div class="product-card">
      <img src="${prod.image}" alt="${prod.name}">
      <div class="product-name">${prod.name}</div>
      <div class="product-price">
        ${Array.isArray(prod.price) ? prod.price.map(p => `<div>${p.format} : <b>${p.value}</b></div>`).join('') : prod.price}
      </div>
    </div>
    <button class="back-btn" onclick="goBack()">Retour</button>
  `);
}

function goBack() {
  if (navStack.length > 0) {
    const prev = navStack.pop();
    prev();
  }
}

function setMainContent(html) {
  document.getElementById('main-content').innerHTML = html;
}

// --- Bannière cliquable ---
const banner = document.getElementById('banner');
const logo = document.getElementById('logo');
if (banner) banner.onclick = renderMain;
if (logo) logo.onclick = renderMain;

// --- SDK Telegram ---
if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

// --- Initialisation ---
renderMain();
