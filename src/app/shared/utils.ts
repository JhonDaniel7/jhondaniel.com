export interface Customer {
  id: number;
  nome: string;
  cognome: string;
  telefono: string;
  dataNascita: string;
  genere: 'Maschio' | 'Femmina';
}

const firstNames = [
  'Alessandro',
  'Andrea',
  'Anna',
  'Chiara',
  'Elena',
  'Francesca',
  'Giulia',
  'Luca',
  'Marco',
  'Martina',
  'Matteo',
  'Simone',
];

const lastNames = [
  'Bianchi',
  'Bruno',
  'Conti',
  'Costa',
  'De Luca',
  'Esposito',
  'Ferrari',
  'Gallo',
  'Greco',
  'Marino',
  'Rossi',
  'Romano',
];

export function generateCustomers(amount: number): Customer[] {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new RangeError('amount deve essere un intero maggiore o uguale a zero');
  }

  return Array.from({ length: amount }, (_, index) => ({
    id: index + 1,
    nome: pickRandom(firstNames),
    cognome: pickRandom(lastNames),
    telefono: generatePhoneNumber(),
    dataNascita: generateBirthDate(),
    genere: Math.random() > 0.5 ? 'Maschio' : 'Femmina',
  }));
}

function pickRandom(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}

function generatePhoneNumber(): string {
  const prefix = pickRandom(['320', '327', '333', '340', '347', '349', '351', '366']);
  const subscriberNumber = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return `+39 ${prefix} ${subscriberNumber.slice(0, 3)} ${subscriberNumber.slice(3)}`;
}

function generateBirthDate(): string {
  const startDate = new Date(1950, 0, 1).getTime();
  const endDate = new Date(2005, 11, 31).getTime();
  const birthDate = new Date(startDate + Math.random() * (endDate - startDate));

  return birthDate.toISOString().slice(0, 10);
}
