# 🦊🌮 Fox Taco

En enkel kontaktlista för kompisar och födelsedagar byggd med React och Express. Ett demo för studenter för att börja titta på hur front-end och back-end kan struktureras.

## Funktioner

- Lägg till, redigera och ta bort kontakter
- Spara namn, telefon, e-post, födelsedag och emoji per kontakt
- Se vilka kompisar som har födelsedag snart, sorterat på dagar kvar
- Data sparas i en JSON-fil på servern mellan körningar

## Teknikstack

**Frontend**

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) – dev-server och byggverktyg
- CSS Modules – komponentscoped css

**Backend**

- [Express.js](https://expressjs.com/) – REST API
- [cors](https://www.npmjs.com/package/cors) – CORS-hantering
- [dotenv](https://www.npmjs.com/package/dotenv) – miljövariabler
- `node:fs/promises` – fillagring

## Projektstruktur

```
fox-taco/
├── client/                     – React-app (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Birthdays.jsx
│   │   │   ├── Birthdays.module.css
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactForm.module.css
│   │   │   ├── ContactList.jsx
│   │   │   └── ContactList.module.css
│   │   ├── App.jsx
│   │   ├── App.module.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── .env.example            – mall för miljövariabler
│   ├── package.json
│   └── server.js               – Express API
├── .gitignore
└── README.md
```

## Kom igång

### Krav

- Node.js 18 eller senare
- npm

### Installation

```bash
git clone https://github.com/ditt-användarnamn/fox-taco.git
cd fox-taco
```

Installera backend:

```bash
cd server
npm install
cp .env.example .env
```

Installera frontend:

```bash
cd ../client
npm install
```

### Starta

Starta backend (i `server/`):

```bash
npm run dev
```

Starta frontend i ett annat terminalfönster (i `client/`):

```bash
npm run dev
```

Öppna [http://localhost:5173](http://localhost:5173) i webbläsaren.

## API

| Metod  | Route             | Beskrivning               |
| ------ | ----------------- | ------------------------- |
| GET    | /api/contacts     | Hämta alla kontakter      |
| GET    | /api/contacts/:id | Hämta en specifik kontakt |
| POST   | /api/contacts     | Skapa en ny kontakt       |
| PUT    | /api/contacts/:id | Uppdatera en kontakt      |
| DELETE | /api/contacts/:id | Ta bort en kontakt        |

### POST /api/contacts

```json
{
	"name": "Anna Svensson",
	"phone": "070-000 00 00",
	"email": "anna@exempel.se",
	"birthday": "1995-03-15",
	"emoji": "🦊"
}
```

`name` är obligatoriskt. Övriga fält är valfria.

## Licens

MIT
