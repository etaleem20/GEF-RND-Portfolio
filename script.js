// PHASE 6 FINAL BUILD NOTE:
// This final build is ready for GitHub Pages. Keep the spreadsheet and Drive assets shared as 'Anyone with the link can view' so the public website can fetch CSV data and images.
const SPREADSHEET_ID = '15o08L1BaK0SfPdQzJu8uTCypflCAFjvPpU3XWXaNSdY';

const SHEETS = {
  Settings: 'Settings',
  Team: 'Team',
  Development: 'Development',
  DigitalProjects: 'Digital Projects',
  Training: 'Training',
  Competitions: 'Competitions',
  Publications: 'Publications',
  Resources: 'Resources',
  Gallery: 'Gallery',
  Contact: 'Contact'
};

const SITE_DEFAULTS = {
  whatsappNumber: '923331211244',
  whatsappDisplay: '+92 333 1211244',
  youtube: 'https://www.youtube.com/@etaleem9788',
  facebook: 'https://www.facebook.com/GETetaleem/'
};

const fallbackData = {
  Settings: [
    { Field: 'Site Title', Value: 'GEF Research & Development Department', Status: 'Active' },
    { Field: 'Hero Heading', Value: 'Research & Development Department', Status: 'Active' },
    { Field: 'Hero Tagline', Value: 'Creating educational resources, training systems, digital learning tools, and development initiatives for better school learning.', Status: 'Active' },
    { Field: 'Short Intro', Value: 'The R&D Department of Ghazali Education Foundation supports schools, teachers, students, and parents through educational content, training resources, digital learning projects, competitions, publications, and development initiatives.', Status: 'Active' },
    { Field: 'Logo URL', Value: 'https://drive.google.com/file/d/1l83NLhAFvFmMELJdDtxY80QzKyzCELNc/view?usp=sharing', Status: 'Active' },
    { Field: 'YouTube URL', Value: SITE_DEFAULTS.youtube, Status: 'Active' },
    { Field: 'Facebook URL', Value: SITE_DEFAULTS.facebook, Status: 'Active' },
    { Field: 'Primary Button Text', Value: 'Explore Portfolio', Status: 'Active' },
    { Field: 'Secondary Button Text', Value: 'View Resources', Status: 'Active' }
  ],
  Team: [
    { Name: 'Malik Khan Sial', Designation: 'Manager', Education: 'M.Phil Education', 'Short Bio': 'Leading the R&D Department', 'Main Responsibility': 'Responsible for supervising all R&D desks and overseeing academic development and training initiatives.', 'Photo URL': 'https://drive.google.com/file/d/1mHgZaOfRHYE6Eo4U8xgszpQ0BCJqhqS2/view?usp=sharing', 'Display Order': '1', Status: 'Active' },
    { Name: 'Shahzad-ul-Hassan', Designation: 'Senior Program Officer', Education: 'Master’s in Islamic Studies; Certified in Graphic Designing and Digital Media Skills', 'Short Bio': 'Incharge Creative Designing, Video Editing & Social Media Support', 'Main Responsibility': 'Responsible for creating visual designs, editing educational videos, preparing digital content, and managing R&D social media uploads.', 'Photo URL': 'https://drive.google.com/file/d/1gGW_ctblvxK99ZUtiAdXO8dnqOpmlvQd/view?usp=sharing', 'Display Order': '2', Status: 'Active' },
    { Name: 'Arsalan Shakir', Designation: 'Program Officer', Education: 'Master’s in Mathematics', 'Short Bio': 'Incharge Training & Character Building Desk', 'Main Responsibility': 'Responsible for teacher training, character-building initiatives, and academic planning to improve teaching quality and student outcomes.', 'Photo URL': 'https://drive.google.com/file/d/1Z0-U-YmP2D4lXJxP6h7FFH1o7wCAgWC1/view?usp=sharing', 'Display Order': '3', Status: 'Active' },
    { Name: 'Muhammad Suleman', Designation: 'Program Officer', Education: 'M.Phil Chemistry', 'Short Bio': 'Incharge Examination and Digital Education', 'Main Responsibility': 'Responsible for examination management and promoting digital education initiatives.', 'Photo URL': 'https://drive.google.com/file/d/1X90huiJBxCSLuX9elaZB-dOQ9Y7-_nxM/view?usp=sharing', 'Display Order': '4', Status: 'Active' },
    { Name: 'Asghar Hameed', Designation: 'Program Officer', Education: 'Master’s in English Literature & Linguistics', 'Short Bio': 'Incharge Dawah & Technical Desk', 'Main Responsibility': 'Responsible for teachers’ and students’ religious growth, character-building, and organizational development.', 'Photo URL': 'https://drive.google.com/file/d/1QCcBfLnnA2KM4ZFI4r1ajvHMO8ViMUB8/view?usp=sharing', 'Display Order': '5', Status: 'Active' },
    { Name: 'Yasir Nawaz', Designation: 'Program Officer', Education: 'M.Phil in Mathematics', 'Short Bio': 'Incharge School Development Programs Desk', 'Main Responsibility': 'Leading school development initiatives to enhance educational quality, institutional growth, and effective learning outcomes.', 'Photo URL': 'https://drive.google.com/file/d/163xuF_D3Wy5KfVKeKtMEq20F9p-AzEnr/view?usp=sharing', 'Display Order': '6', Status: 'Active' }
  ],
  Development: [
    { Title: 'Study Circle', Category: 'Professional Development', 'Short Description': 'A structured learning and discussion initiative for teacher growth, academic improvement, and classroom support.', 'Button Text': 'View Details', 'Display Order': '1', Status: 'Draft' }
  ],
  'Digital Projects': [
    { 'Project Title': 'GEF Educational YouTube Channel', Category: 'Video Learning', 'Short Description': 'An educational video platform for students, teachers, parents, and the school community.', 'Project Link': SITE_DEFAULTS.youtube, 'Button Text': 'Watch on YouTube', 'Display Order': '1', Status: 'Active' }
  ],
  Training: [
    { 'Training Title': 'Activity-Based Learning Training', 'Training Type': 'Teacher Training', Audience: 'Teachers', 'Short Description': 'Training resources designed to help teachers make classroom learning more practical, creative, and engaging.', 'Button Text': 'View Training', 'Display Order': '1', Status: 'Draft' }
  ],
  Competitions: [
    { 'Competition Title': 'Poetry Writing Competition', Year: '2026', Category: 'Creative Writing', Participants: 'Students and Teachers', 'Short Description': 'A creative competition to promote poetry, expression, language skills, and appreciation of literary talent.', 'Button Text': 'View Results', 'Display Order': '1', Status: 'Draft' }
  ],
  Publications: [
    { 'Title Name': 'Summer Pack', Category: 'Student Learning Material', 'Class / Level': 'PG to V', 'Short Description': 'A summer learning pack designed to keep children engaged in meaningful educational activities during vacations.', Price: 'Enter price', Availability: 'Available', 'Button Text': 'View Title', 'Display Order': '1', Status: 'Draft' }
  ],
  Resources: [
    { 'Resource Title': 'Teacher Support Resources', Category: 'Teacher Support', 'Short Description': 'Useful resources, guides, and support material for improving classroom teaching.', 'File Type': 'Folder', 'Button Text': 'Open Folder', 'Display Order': '1', Status: 'Draft' }
  ],
  Gallery: [
    { 'Image Title': 'STEM Activity Highlight', Category: 'Development', 'Short Caption': 'Students learning through practical STEM activities.', 'Display Order': '1', Status: 'Draft' }
  ],
  Contact: [
    { Field: 'Department Name', Value: 'Research & Development Department', Status: 'Active' },
    { Field: 'Organization', Value: 'Ghazali Education Foundation', Status: 'Active' },
    { Field: 'YouTube URL', Value: SITE_DEFAULTS.youtube, Status: 'Active' },
    { Field: 'Facebook URL', Value: SITE_DEFAULTS.facebook, Status: 'Active' },
    { Field: 'WhatsApp Number', Value: SITE_DEFAULTS.whatsappDisplay, Status: 'Active' },
    { Field: 'WhatsApp Base Link', Value: `https://wa.me/${SITE_DEFAULTS.whatsappNumber}`, Status: 'Active' }
  ]
};

document.addEventListener('DOMContentLoaded', init);

async function init() {
  setupNavigation();
  setYear();
  const data = await loadAllData();

  applySettings(data.Settings || fallbackData.Settings);
  renderTeam(data.Team || []);
  renderDevelopment(data.Development || []);
  renderDigitalProjects(data[SHEETS.DigitalProjects] || []);
  renderTraining(data.Training || []);
  renderCompetitions(data.Competitions || []);
  renderPublications(data.Publications || []);
  renderResources(data.Resources || []);
  renderGallery(data.Gallery || []);
  applyContact(data.Contact || fallbackData.Contact);
}

function setupNavigation() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

async function loadAllData() {
  const status = document.getElementById('dataStatus');
  const data = {};
  const entries = Object.values(SHEETS);

  try {
    await Promise.all(entries.map(async sheetName => {
      data[sheetName] = await fetchSheet(sheetName);
    }));
    if (status) status.textContent = 'Live Google Sheet data connected.';
    return data;
  } catch (error) {
    console.warn('Using fallback data because Google Sheet fetch failed:', error);
    if (status) status.textContent = 'Using safe fallback data. Check Google Sheet sharing or published CSV access.';
    return fallbackData;
  }
}

async function fetchSheet(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to fetch ${sheetName}`);
  const csv = await response.text();
  return csvToObjects(csv);
}

function csvToObjects(csv) {
  const rows = parseCSV(csv).filter(row => row.some(cell => clean(cell)));
  if (!rows.length) return [];
  const headers = rows[0].map(h => clean(h));
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      if (header) obj[header] = clean(row[index] || '');
    });
    return obj;
  });
}

function parseCSV(csv) {
  const rows = [];
  let row = [];
  let value = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      value += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(value);
      value = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i++;
      row.push(value);
      rows.push(row);
      row = [];
      value = '';
    } else {
      value += char;
    }
  }
  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }
  return rows;
}

function clean(value) {
  return String(value || '').trim();
}

function activeRows(rows) {
  return (rows || [])
    .filter(row => clean(row.Status).toLowerCase() === 'active')
    .sort((a, b) => Number(a['Display Order'] || 999) - Number(b['Display Order'] || 999));
}

function settingsMap(rows) {
  return activeRows(rows).reduce((map, row) => {
    if (row.Field) map[row.Field] = row.Value || '';
    return map;
  }, {});
}

function applySettings(rows) {
  const settings = settingsMap(rows);
  setText('brandTitle', settings['Site Title'] || 'GEF R&D');
  setText('heroHeading', settings['Hero Heading'] || 'Research & Development Department');
  setText('heroTagline', settings['Hero Tagline'] || '');
  setText('shortIntro', settings['Short Intro'] || '');

  const logo = document.getElementById('siteLogo');
  const logoUrl = driveImage(settings['Logo URL']);
  if (logo && logoUrl) logo.src = logoUrl;

  const primaryBtn = document.getElementById('primaryBtn');
  if (primaryBtn && settings['Primary Button Text']) primaryBtn.textContent = settings['Primary Button Text'];

  const secondaryBtn = document.getElementById('secondaryBtn');
  if (secondaryBtn && settings['Secondary Button Text']) secondaryBtn.textContent = settings['Secondary Button Text'];
}

function applyContact(rows) {
  const contact = settingsMap(rows);
  const youtube = contact['YouTube URL'] || SITE_DEFAULTS.youtube;
  const facebook = contact['Facebook URL'] || SITE_DEFAULTS.facebook;
  const whatsapp = contact['WhatsApp Base Link'] || `https://wa.me/${SITE_DEFAULTS.whatsappNumber}`;

  setLink('youtubeLink', youtube);
  setLink('facebookLink', facebook);
  setLink('whatsappLink', whatsapp);

  const panel = document.getElementById('contactPanel');
  if (panel) {
    panel.innerHTML = `
      <p><strong>Department:</strong> ${escapeHTML(contact['Department Name'] || 'Research & Development Department')}</p>
      <p><strong>Organization:</strong> ${escapeHTML(contact.Organization || 'Ghazali Education Foundation')}</p>
      <p><strong>WhatsApp:</strong> ${escapeHTML(contact['WhatsApp Number'] || SITE_DEFAULTS.whatsappDisplay)}</p>
      ${contact.Email ? `<p><strong>Email:</strong> ${escapeHTML(contact.Email)}</p>` : ''}
      ${contact['Office / Address'] ? `<p><strong>Office:</strong> ${escapeHTML(contact['Office / Address'])}</p>` : ''}
    `;
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.textContent = value;
}

function setLink(id, href) {
  const el = document.getElementById(id);
  if (el && href) el.href = href;
}

function renderTeam(rows) {
  const active = activeRows(rows);
  renderGrid('teamGrid', active, row => `
    <article class="card team-card">
      ${imageTag(row['Photo URL'], row.Name, 'card-image')}
      <h3>${escapeHTML(row.Name)}</h3>
      <div class="meta">
        ${chip(row.Designation)}
        ${chip(row.Education)}
      </div>
      <p><strong>${escapeHTML(row['Short Bio'] || '')}</strong></p>
      <p>${escapeHTML(row['Main Responsibility'] || '')}</p>
    </article>
  `, 'No active team records found. Add Active rows in the Team sheet.');
}

function renderDevelopment(rows) {
  const active = activeRows(rows);
  renderGrid('developmentGrid', active, row => standardCard({
    image: row['Image URL'],
    title: row.Title,
    category: row.Category,
    description: row['Short Description'],
    url: row['PDF / Folder URL'],
    button: row['Button Text'] || 'View Details'
  }), 'No active development work is available yet. Change selected rows from Draft to Active in the Development sheet.');
}

function renderDigitalProjects(rows) {
  const active = activeRows(rows);
  renderGrid('digitalGrid', active, row => standardCard({
    image: row['Image URL'],
    title: row['Project Title'],
    category: row.Category,
    description: row['Short Description'],
    url: row['Project Link'],
    button: row['Button Text'] || 'Open Project'
  }), 'No active digital projects are available yet.');
}

function renderTraining(rows) {
  const active = activeRows(rows);
  renderGrid('trainingGrid', active, row => standardCard({
    image: row['Image URL'],
    title: row['Training Title'],
    category: row['Training Type'],
    extra: row.Audience,
    description: row['Short Description'],
    url: row['PDF / Folder URL'],
    button: row['Button Text'] || 'View Training',
    date: row['Date / Session']
  }), 'No active training records are available yet. Change selected rows from Draft to Active in the Training sheet.');
}

function renderCompetitions(rows) {
  const active = activeRows(rows);
  renderGrid('competitionsGrid', active, row => standardCard({
    image: row['Image URL'],
    title: row['Competition Title'],
    category: row.Category,
    extra: row.Participants,
    date: row.Year,
    description: row['Short Description'],
    url: row['Result PDF URL'] || row['Gallery / Folder URL'],
    secondUrl: row['Gallery / Folder URL'],
    button: row['Button Text'] || 'View Details',
    secondButton: row['Gallery / Folder URL'] ? 'Open Gallery' : ''
  }), 'No active competitions are available yet. Change selected rows from Draft to Active in the Competitions sheet.');
}

let allActivePublications = [];

function renderPublications(rows) {
  allActivePublications = activeRows(rows);
  setupPublicationFilters(allActivePublications);
  renderFilteredPublications();
}

function setupPublicationFilters(rows) {
  const searchInput = document.getElementById('publicationSearch');
  const categoryFilter = document.getElementById('publicationCategoryFilter');
  const availabilityFilter = document.getElementById('publicationAvailabilityFilter');

  if (!searchInput || !categoryFilter || !availabilityFilter) return;

  fillSelectOptions(categoryFilter, uniqueValues(rows, 'Category'), 'All Categories');
  fillSelectOptions(availabilityFilter, uniqueValues(rows, 'Availability'), 'All Availability');

  [searchInput, categoryFilter, availabilityFilter].forEach(control => {
    control.oninput = renderFilteredPublications;
    control.onchange = renderFilteredPublications;
  });
}

function renderFilteredPublications() {
  const searchValue = clean(document.getElementById('publicationSearch')?.value).toLowerCase();
  const categoryValue = clean(document.getElementById('publicationCategoryFilter')?.value).toLowerCase();
  const availabilityValue = clean(document.getElementById('publicationAvailabilityFilter')?.value).toLowerCase();

  const filtered = allActivePublications.filter(row => {
    const searchableText = [
      row['Title Name'], row.Category, row['Class / Level'], row['Short Description'], row.Price, row.Availability
    ].map(clean).join(' ').toLowerCase();

    const matchesSearch = !searchValue || searchableText.includes(searchValue);
    const matchesCategory = !categoryValue || clean(row.Category).toLowerCase() === categoryValue;
    const matchesAvailability = !availabilityValue || clean(row.Availability).toLowerCase() === availabilityValue;

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  renderGrid('publicationsGrid', filtered, publicationCard, allActivePublications.length
    ? 'No publication matches the selected search/filter.'
    : 'No active publications are available yet. Change selected rows from Draft to Active in the Publications sheet.');
}

function publicationCard(row) {
  const title = row['Title Name'] || 'Untitled Publication';
  const previewUrl = row['PDF Preview URL'];
  const price = clean(row.Price);
  const availability = clean(row.Availability) || 'Availability not listed';

  return `
    <article class="card publication-card">
      ${imageTag(row['Cover Image URL'], title, 'card-image publication-cover')}
      <div class="publication-card-body">
        <h3>${escapeHTML(title)}</h3>
        <div class="meta">
          ${chip(row.Category)}
          ${chip(row['Class / Level'])}
        </div>
        <p>${escapeHTML(row['Short Description'] || '')}</p>
        <div class="price-row">
          <span><strong>Price:</strong> ${escapeHTML(displayPrice(price))}</span>
          <span class="availability ${availabilityClass(availability)}">${escapeHTML(availability)}</span>
        </div>
        <div class="card-actions publication-actions">
          ${actionButton(previewUrl, 'PDF Preview', 'secondary')}
          ${whatsappOrderButton(title)}
        </div>
      </div>
    </article>
  `;
}

function fillSelectOptions(select, values, firstLabel) {
  const current = select.value;
  select.innerHTML = `<option value="">${escapeHTML(firstLabel)}</option>` +
    values.map(value => `<option value="${escapeAttribute(value)}">${escapeHTML(value)}</option>`).join('');
  if ([...select.options].some(option => option.value === current)) select.value = current;
}

function uniqueValues(rows, key) {
  return [...new Set((rows || []).map(row => clean(row[key])).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function displayPrice(price) {
  if (!price || price.toLowerCase().startsWith('enter ')) return 'Not listed';
  return price;
}

function availabilityClass(value) {
  const lowered = clean(value).toLowerCase();
  if (lowered.includes('available')) return 'is-available';
  if (lowered.includes('out') || lowered.includes('unavailable')) return 'is-unavailable';
  if (lowered.includes('coming')) return 'is-coming';
  return 'is-neutral';
}

function whatsappOrderButton(title) {
  const message = `Hello R&D Team, I am interested in this publication/title: ${title}`;
  const href = `https://wa.me/${SITE_DEFAULTS.whatsappNumber}?text=${encodeURIComponent(message)}`;
  return `<a class="btn primary order-btn" href="${escapeAttribute(href)}" target="_blank" rel="noopener" aria-label="Order ${escapeAttribute(title)} on WhatsApp">Order on WhatsApp</a>`;
}

function renderResources(rows) {
  const active = activeRows(rows);
  renderGrid('resourcesGrid', active, row => standardCard({
    image: row['Image URL'],
    title: row['Resource Title'],
    category: row.Category,
    extra: row['File Type'],
    description: row['Short Description'],
    url: row['PDF / Folder URL'],
    button: row['Button Text'] || 'Open Resource'
  }), 'No active resources are available yet. Change selected rows from Draft to Active in the Resources sheet.');
}

function renderGallery(rows) {
  const active = activeRows(rows);
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  if (!active.length) {
    grid.innerHTML = '<div class="empty-state">No active gallery images are available yet. Change selected rows from Draft to Active in the Gallery sheet.</div>';
    return;
  }
  grid.innerHTML = active.map(row => `
    <article class="gallery-item">
      ${imageTag(row['Image URL'], row['Image Title'], '')}
      <div class="gallery-caption">
        <strong>${escapeHTML(row['Image Title'] || 'Gallery Image')}</strong>
        ${chip(row.Category)}
        <p>${escapeHTML(row['Short Caption'] || '')}</p>
      </div>
    </article>
  `).join('');
}

function standardCard({ image, title, category, extra, date, description, url, secondUrl, button, secondButton }) {
  return `
    <article class="card">
      ${imageTag(image, title, 'card-image')}
      <h3>${escapeHTML(title || 'Untitled')}</h3>
      <div class="meta">
        ${chip(category)}
        ${chip(extra)}
        ${chip(date)}
      </div>
      <p>${escapeHTML(description || '')}</p>
      <div class="card-actions">
        ${actionButton(url, button)}
        ${secondUrl ? actionButton(secondUrl, secondButton || 'Open Link', 'ghost') : ''}
      </div>
    </article>
  `;
}

function renderGrid(id, rows, template, emptyMessage) {
  const grid = document.getElementById(id);
  if (!grid) return;
  if (!rows.length) {
    grid.innerHTML = `<div class="empty-state">${escapeHTML(emptyMessage)}</div>`;
    return;
  }
  grid.innerHTML = rows.map(template).join('');
}

function chip(value) {
  return value ? `<span>${escapeHTML(value)}</span>` : '';
}

function actionButton(url, text, style = 'secondary') {
  const safeUrl = clean(url);
  if (!safeUrl || safeUrl.toLowerCase().startsWith('paste ')) return '';
  return `<a class="btn ${style}" href="${escapeAttribute(normalizeLink(safeUrl))}" target="_blank" rel="noopener">${escapeHTML(text || 'Open')}</a>`;
}

function imageTag(url, alt, className = '') {
  const src = driveImage(url);
  const safeAlt = escapeAttribute(alt || 'R&D portfolio image');
  const placeholder = placeholderImage(alt || 'GEF R&D');
  return `<img class="${className}" src="${escapeAttribute(src || placeholder)}" alt="${safeAlt}" loading="lazy" onerror="this.onerror=null;this.src='${placeholder}';" />`;
}

function driveImage(url) {
  const cleaned = clean(url);
  if (!cleaned || cleaned.toLowerCase().startsWith('paste ')) return '';
  const fileMatch = cleaned.match(/\/file\/d\/([^/]+)/);
  const idMatch = cleaned.match(/[?&]id=([^&]+)/);
  const id = fileMatch?.[1] || idMatch?.[1];
  if (id) return `https://drive.google.com/uc?export=view&id=${id}`;
  return cleaned;
}

function normalizeLink(url) {
  return driveImage(url) || url;
}

function placeholderImage(label) {
  const text = encodeURIComponent(label || 'GEF R&D');
  return `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='600' viewBox='0 0 900 600'%3E%3Crect width='900' height='600' fill='%23fff8ea'/%3E%3Crect x='42' y='42' width='816' height='516' rx='34' fill='%23ffffff' stroke='%237a1114' stroke-opacity='.20'/%3E%3Ccircle cx='450' cy='245' r='88' fill='%23f5b51b' fill-opacity='.35'/%3E%3Ctext x='450' y='340' text-anchor='middle' font-family='Arial, sans-serif' font-size='44' font-weight='700' fill='%237a1114'%3E${text}%3C/text%3E%3Ctext x='450' y='395' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%236f6262'%3EResearch %26 Development%3C/text%3E%3C/svg%3E`;
}

function escapeHTML(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttribute(value) {
  return escapeHTML(value).replaceAll('`', '&#096;');
}
