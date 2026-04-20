# Guida per principianti: deploy del backend su Render.com

Questa guida spiega passo passo come pubblicare online il **server Node.js** (Express) del progetto, dopo aver già messo il **frontend** su Netlify. È pensata per chi non ha mai fatto il deploy di un backend.

---

## Indice

1. [Concetti base: cosa stai facendo](#1-concetti-base-cosa-stai-facendo)
2. [Cos’è Nodemailer](#2-cosè-nodemailer)
3. [Cosa serve prima di iniziare](#3-cosa-serve-prima-di-iniziare)
4. [MongoDB Atlas (database in cloud)](#4-mongodb-atlas-database-in-cloud)
5. [Render.com: creare il Web Service](#5-rendercom-creare-il-web-service)
6. [Variabili d’ambiente: elenco e significato](#6-variabili-dambiente-elenco-e-significato)
7. [CORS spiegato semplice](#7-cors-spiegato-semplice)
8. [Collegare il frontend (Netlify) al backend](#8-collegare-il-frontend-netlify-al-backend)
9. [Checklist finale e problemi comuni](#9-checklist-finale-e-problemi-comuni)

---

## 1. Concetti base: cosa stai facendo

### Frontend e backend sono due programmi diversi

- **Frontend** (React su Netlify): sono i file che il **browser** scarica (HTML, JavaScript, CSS). Netlify li serve come un sito “statico”. Non esegue il tuo codice Node.
- **Backend** (Express su Render): è un **programma che gira su un computer remoto** (un server) sempre acceso (o quasi). Risponde alle richieste tipo “dammi le foto della galleria”, “effettua login”, “salva questa immagine”.

Finché il backend resta solo sul tuo PC (`localhost:5000`), **solo tu** puoi usarlo. **Deploy** significa: installare e avviare quel programma su una macchina di un fornitore (qui **Render**), così ottiene un indirizzo pubblico tipo `https://nome-servizio.onrender.com`.

### Perché Render

Render è un servizio che:

- prende il codice dal tuo **GitHub**;
- esegue `npm install` e avvia il server con `npm start`;
- ti dà **HTTPS** e un **URL** stabile.

Esistono alternative (Railway, Fly.io, VPS): la logica è simile (codice + variabili d’ambiente + avvio).

### Monorepo: cartella `server`

Il repository contiene più cartelle. Il backend sta in **`server/`**. Su Render devi dire **Root Directory = `server`**, così i comandi `npm install` e `npm start` girano **dentro** quella cartella, dove c’è il `package.json` del backend.

---

## 2. Cos’è Nodemailer

**Nodemailer** è una **libreria Node.js** per **inviare email** dal server.

Nel progetto viene usata nella rotta del **form Contatti**: quando un visitatore compila il modulo, il backend riceve nome, email e messaggio e **manda un’email** (tramite SMTP, di solito **Gmail** o altro provider) verso l’indirizzo configurato.

- **Non** è un servizio di posta: è solo il “ponte” nel codice che parla con un server SMTP usando user e password (o password per app) che metti nelle variabili d’ambiente.
- Senza Nodemailer installato nel `package.json`, il server **crasherebbe** all’avvio quando carica il file che fa `import nodemailer`.

Per questo nella guida tecnica si è aggiunta la dipendenza **`nodemailer`** e lo script **`npm start`** (`node src/server.js`) per l’ambiente di produzione.

---

## 3. Cosa serve prima di iniziare

- Account **GitHub** con il repository aggiornato (stesso repo del frontend).
- Account **Render** (gratuito possibile, con limiti).
- Account **MongoDB Atlas** (tier gratuito ok per iniziare) con stringa di connessione.
- Account **Cloudinary** (per caricare immagini): nome cloud, API key, API secret.
- Per il form contatti: una coppia **email SMTP** (es. Gmail + **password per le app**, non la password normale del account Google).

---

## 4. MongoDB Atlas (database in cloud)

Il backend **non** salva i dati dentro Render: usa **MongoDB**. In cloud, Atlas ospita il database.

### Passi essenziali

1. Crea un **cluster** (se non ce l’hai già).
2. Crea un **utente database** con username e password (salvali in posto sicuro).
3. **Network Access**: aggiungi l’accesso dalla rete di Render. Il modo più semplice per iniziare è **Allow access from anywhere** (`0.0.0.0/0`). In produzione “stretta” si possono usare regole più restrittive; per imparare va bene aprire, sapendo che la sicurezza dipende anche da **password forte** e **stringa URI segreta**.
4. Copia la **connection string** (URI). Sostituisci `<password>` con la password dell’utente DB (se contiene caratteri speciali, potrebbe servire l’**URL encoding**). La userai come valore di **`MONGO_URI`** su Render.

Se Atlas blocca gli IP di Render, il server non parte o va in errore all’avvio: controlla sempre **Network Access**.

---

## 5. Render.com: creare il Web Service

1. Vai su [dashboard.render.com](https://dashboard.render.com) e accedi.
2. **New +** → **Web Service**.
3. Collega il **repository GitHub** (autorizza Render se richiesto) e scegli il repo del progetto.
4. Compila i campi principali:

| Campo | Valore consigliato |
|--------|---------------------|
| **Name** | Es. `francescagandelli-api` (influenza l’URL: `https://nome.onrender.com`) |
| **Region** | Es. Frankfurt (UE) se i visitatori sono in Europa |
| **Branch** | `main` (o il branch che usi per la produzione) |
| **Root Directory** | **`server`** |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

5. **Piano Free**: utile per prove; il servizio può **andare in “sleep”** dopo un periodo senza traffico. La **prima richiesta** dopo lo sleep può tardare decine di secondi.

6. **Environment**: aggiungi tutte le variabili della sezione successiva **prima** o subito dopo la creazione (puoi modificarle in seguito e fare **Manual Deploy**).

7. Clicca **Create Web Service** e attendi il log di build. Se tutto va bene, vedrai l’URL del servizio e, aprendo la root nel browser, un messaggio tipo che il server è OK.

---

## 6. Variabili d’ambiente: elenco e significato

Sono **coppie nome = valore** che **non** vanno scritte nel codice sorgente pubblico. Render le inietta nel processo Node all’avvio.

| Nome | Cosa è |
|------|--------|
| **`MONGO_URI`** | Stringa di connessione completa a MongoDB Atlas. |
| **`JWT_SECRET`** | Chiave segreta lunga e casuale per firmare i token di login admin. Deve restare **segreta** e **uguale** tra ambienti solo se vuoi riutilizzare i token (in pratica: una per produzione, non condividerla). |
| **`CLOUDINARY_CLOUD_NAME`** | Identificativo del tuo account Cloudinary. |
| **`CLOUDINARY_API_KEY`** | Chiave pubblica API Cloudinary. |
| **`CLOUDINARY_API_SECRET`** | Segreto API Cloudinary: **mai** nel frontend o su Git pubblico. |
| **`EMAIL_USER`** | Indirizzo email usato per autenticarsi sul server SMTP (es. Gmail). |
| **`EMAIL_PASS`** | Password per l’SMTP: con Gmail di solito è una **password per le app** generata dalle impostazioni di sicurezza Google. |
| **`CONTACT_MAIL_TO`** | (Opzionale) Email di destinazione dei messaggi del form se non si usa altro nel DB. |
| **`ALLOWED_ORIGINS`** | Lista di **origini** consentite per il browser, separate da **virgola**, **senza spazio** dopo la virgola o con spazi trimmati dal codice. Esempio: `https://tuosito.netlify.app`. Serve per **CORS** (vedi sotto). |
| **`PORT`** | Su Render **non serve impostarla**: la piattaforma la assegna da sola. Il codice usa `process.env.PORT` con fallback a `5000` in locale. |

---

## 7. CORS spiegato semplice

Il **browser** blocca, per sicurezza, molte richieste da un sito (es. Netlify) verso un altro dominio (es. Render), a meno che il **server** dica esplicitamente: “accetto richieste da questo dominio”.

Quello è il meccanismo **CORS**.

Nel progetto, il server accetta:

- `http://localhost:5173` e `http://localhost:4173` (sviluppo locale Vite);
- più tutti gli URL che elenchi in **`ALLOWED_ORIGINS`**.

**Devi** inserire l’URL **esatto** del sito Netlify (con `https://`, senza slash finale, salvo che il tuo codice non lo richieda diversamente), ad esempio:

`https://francescagandelli-photographer.netlify.app`

Se sbagli o dimentichi questa variabile, in console del browser vedrai errori tipo “blocked by CORS policy”.

---

## 8. Collegare il frontend (Netlify) al backend

Oggi il frontend nel codice punta spesso a **`http://localhost:5000`**. In produzione **non funziona**: il browser degli utenti non ha il tuo PC.

Devi far puntare tutte le chiamate API all’URL Render, ad esempio:

`https://TUO-SERVIZIO.onrender.com`

Le rotte API nel progetto iniziano con `/api/...`, quindi la **base** sarà qualcosa come:

`https://TUO-SERVIZIO.onrender.com/api`

(con la **s** di https).

**Passi consigliati:**

1. Verifica nel browser: `https://TUO-SERVIZIO.onrender.com/` → risposta di testo dal server.
2. Modifica il frontend per usare un **unico** indirizzo base (meglio tramite variabile **`VITE_API_URL`** in Netlify) oppure aggiorna i punti nel codice.
3. **Rifai il deploy** su Netlify dopo ogni modifica al frontend.

Finché questo non è fatto, il sito Netlify può aprirsi ma **login, gallerie e form** non funzioneranno contro il backend reale.

---

## 9. Checklist finale e problemi comuni

### Checklist

- [ ] Atlas: cluster attivo, utente DB, **Network Access** con IP consentiti (es. `0.0.0.0/0` per iniziare).
- [ ] Render: **Root Directory** = `server`, Build = `npm install`, Start = `npm start`.
- [ ] Tutte le variabili d’ambiente impostate su Render (vedi tabella).
- [ ] **`ALLOWED_ORIGINS`** contiene l’URL Netlify esatto.
- [ ] Test root URL Render nel browser.
- [ ] Frontend aggiornato con URL API di produzione e nuovo deploy Netlify.

### Problemi comuni

| Sintomo | Possibile causa |
|---------|-------------------|
| Build fallisce su Render | Root directory sbagliata, `package.json` non in `server`, dipendenze mancanti. |
| Server crasha all’avvio | `MONGO_URI` errata, Atlas blocca IP, `JWT_SECRET` mancante. |
| Errori CORS nel browser | `ALLOWED_ORIGINS` errata o assente; URL diversa (www vs non-www). |
| Form email non parte | `EMAIL_USER` / `EMAIL_PASS` errati; Gmail senza password per app. |
| Upload immagini fallisce | Chiavi Cloudinary errate o variabili non impostate. |
| Prima richiesta lentissima | Piano free Render: cold start dopo sleep. |

---

## Modifiche già previste nel codice del backend (riferimento)

Per Render e per la sicurezza di base sono state introdotte o verificate queste cose nel progetto:

- Script **`"start": "node src/server.js"`** in `server/package.json`.
- Dipendenza **`nodemailer`** nel `package.json` del server (usata dal form contatti).
- **CORS** con variabile **`ALLOWED_ORIGINS`** (lista separata da virgole) oltre ai localhost di sviluppo.

Assicurati che queste modifiche siano **committate e pushate** su GitHub prima di fare deploy su Render, così la build usa l’ultima versione.

---

*Documento generato per supportare il deploy del backend su Render.com in abbinamento al frontend su Netlify.*
