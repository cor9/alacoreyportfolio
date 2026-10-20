'use strict';
const cards = [...document.querySelectorAll('.photo-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
const count = document.querySelector('#gallery-count');
const dialog = document.querySelector('#lightbox');
const image = document.querySelector('#lightbox-image');
const title = document.querySelector('#lightbox-title');
const category = document.querySelector('#lightbox-category');
const position = document.querySelector('#lightbox-position');
const original = document.querySelector('#lightbox-original');
let visible = cards;
let current = 0;
let opener;
const originals = {"52": "house_.jpg", "40": "GOOD logo.jpg", "29": "470388827_d82000d557_h.jpg", "27": "4396849617_fb9e3e30ff.jpg", "48": "fire fighter _.jpg", "18": "2478123013_50c2759059_b.jpg", "61": "trash_.jpg", "38": "B5E21311-5703-42F7-8ABB-4FBEBAC90FFE_4_5005_c.jpeg", "44": "carburn_.jpg", "35": "640008847_518d960836_b.jpg", "45": "corn sunset _.jpg", "56": "robbery _.jpg", "0": "02C0873C-30D6-4E73-8FBD-03516F6ABA01_4_5005_c.jpeg", "1": "0B7BD328-D152-4DA1-833F-5D19C01664AC_4_5005_c.jpeg", "2": "1184982004_972027ee7c.jpg", "3": "1250246195_d4cdb61337_w.jpg", "4": "1397924213_a42e1c580f_n.jpg", "5": "1403460082_28fea21eb3_n.jpg", "6": "1639127764_a5258686e4_n.jpg", "7": "1698122922_fb3fccce5e.jpg", "8": "1988930183_1ccfb49681_z.jpg", "9": "2143562397_d50d70c52e.jpg", "10": "2235686352_f4105ea706.jpg", "11": "2242223273_d1c8dbc697.jpg", "12": "2263447676_6a97e57bea.jpg", "13": "2285141208_b769ac1ede.jpg", "14": "2326450223_7fe317d200.jpg", "15": "2326861527_11e4e2ff3c_w.jpg", "16": "2340981153_5ce193483c.jpg", "17": "2425890038_267a211275_w.jpg", "19": "2478123035_207d54e083_w.jpg", "20": "2506202141_eba9c72559.jpg", "21": "2549131222_70baf82ed5.jpg", "22": "32A94839-2E76-4442-96B3-3738A43D52C6_4_5005_c.jpeg", "23": "400234618_3f4ad4fcce_m.jpg", "24": "400237399_7c0e188ec8_w.jpg", "25": "429702179_fdae028364_n.jpg", "26": "4340111132_672397fcea_w.jpg", "28": "4581887361_655d4e0a76_z.jpg", "30": "509576695_53abc56a36_w.jpg", "31": "540923762_82f7e3c71a_c.jpg", "32": "548584126_05e6706c47_n.jpg", "33": "548586952_73ddf3bb2f.jpg", "34": "5B827B81-56F2-406F-9846-0458BE94364A_4_5005_c.jpeg", "36": "99675170-C6F3-4879-A649-C4B2CA33D48B_4_5005_c.jpeg", "37": "A497396D-5506-4C6A-B31E-F9FDE8EF60F1_4_5005_c.jpeg", "39": "F9E727F6-A25E-4643-A11F-B78FAA8E9DA5_4_5005_c.jpeg", "41": "Return Home.jpg", "42": "berry _.jpg", "43": "candle _.jpg", "46": "dive _.jpg", "47": "e_.jpg", "49": "grape rainbow _.jpg", "50": "grape_.jpg", "51": "hay _.jpg", "53": "joannnnnna.jpg", "54": "measure _.jpg", "55": "ready _.jpg", "57": "salute _.jpg", "58": "school lunches _.jpg", "59": "snow_.jpg", "60": "tanning_.jpg", "62": "trashy _.jpg"};
function showImage(index) {
  current = (index + visible.length) % visible.length;
  const card = visible[current];
  const thumbnail = card.querySelector('img');
  image.src = thumbnail.getAttribute('src');
  image.alt = thumbnail.alt;
  title.textContent = thumbnail.alt;
  category.textContent = card.dataset.category;
  position.textContent = `${String(current + 1).padStart(2, '0')} / ${String(visible.length).padStart(2, '0')}`;
  original.href = encodeURIComponent(originals[card.dataset.id]);
}
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  const selected = button.dataset.filter;
  cards.forEach(card => { card.hidden = selected !== 'All' && card.dataset.category !== selected; });
  visible = cards.filter(card => !card.hidden);
  count.textContent = `${visible.length} ${visible.length === 1 ? 'frame' : 'frames'} / ${selected === 'All' ? 'one perspective' : selected.toLowerCase()}`;
}));
cards.forEach(card => card.addEventListener('click', () => {
  opener = card;
  showImage(visible.indexOf(card));
  dialog.showModal();
  document.body.classList.add('viewer-open');
}));
document.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
document.querySelector('.lightbox-prev').addEventListener('click', () => showImage(current - 1));
document.querySelector('.lightbox-next').addEventListener('click', () => showImage(current + 1));
dialog.addEventListener('close', () => {
  document.body.classList.remove('viewer-open');
  opener?.focus({preventScroll: true});
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showImage(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
let touchStart;
image.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, {passive: true});
image.addEventListener('touchend', event => {
  const difference = event.changedTouches[0].clientX - touchStart;
  if (Math.abs(difference) > 60) showImage(current + (difference < 0 ? 1 : -1));
}, {passive: true});
document.querySelector('#year').textContent = new Date().getFullYear();
