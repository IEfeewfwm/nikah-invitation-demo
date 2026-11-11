/* Персонализация: все сведения о событии меняются только здесь.
   Дата содержит явный UTC offset. timeZone должен ему соответствовать.
   RSVP в этом шаблоне — только демонстрация, без отправки и хранения. */
window.INVITATION_CONFIG = {
  demo: true,
  names: { first: 'Амина', second: 'Тимур' },
  date: '2027-07-24T16:00:00+04:00',
  timeZone: 'Europe/Astrakhan',
  timeZoneLabel: 'UTC+4',
  arrivalTime: '15:30',
  venue: 'Сад',
  city: 'Ваш город',
  address: 'Здесь будет адрес вашего торжества',
  // После ввода настоящего адреса установите true. Карта строится из city + address.
  locationReady: false,
  heroMessage: 'Будем рады разделить с вами этот особенный день',
  invitation: [
    'В нашей жизни начинается новая глава. Мы будем счастливы, если в этот день вы будете рядом — с добрыми словами, тёплыми объятиями и искренними пожеланиями.',
    'Приглашаем вас разделить радость нашего никаха и провести этот вечер в кругу самых близких.'
  ],
  schedule: [
    { time: '15:30', title: 'Сбор гостей', description: 'Тёплые встречи, объятия и первые фотографии.' },
    { time: '16:00', title: 'Церемония никаха', description: 'Самый важный момент. Начало нашей общей истории.' },
    { time: '17:00', title: 'Праздничный ужин', description: 'Добрые пожелания и уютный вечер за одним столом.' }
  ],
  rsvp: { show: true, maxGuests: 6 },
  palette: { background: '#F8F5EE', primary: '#123D32', gold: '#B69A62', text: '#252821', surface: '#FFFEFA' },
  images: { hero: 'assets/table.webp', detail: 'assets/paper.webp' },
  portfolio: { show: true, basePrice: 1000 },
  // Для Open Graph укажите полный URL после публикации на своём домене.
  siteUrl: 'https://iefeewfwm.github.io/nikah-invitation-demo/'
};
