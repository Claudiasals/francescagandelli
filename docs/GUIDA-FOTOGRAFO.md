# Guida — uso del sito e accesso

Questa guida spiega **come entrare nel sito** dopo la pubblicazione online, **cosa puoi gestire** dall’area riservata e, per chi prepara il progetto, **come impostare Netlify**.  
Gli indirizzi precisi (URL del sito e dell’API) te li comunicherà **chi completa il deploy**: quando leggi qui sotto, sostituiscili con il link reale del tuo sito.

---

## 1. Netlify — indicazioni per chi crea l’account e pubblica il sito

Netlify ospita il **sito pubblico** (le pagine che vedono i visitatori). Il **server con i dati** (immagini, testi salvati, login) è un programma separato: va messo online su un altro servizio (es. Render, Railway, un VPS) e il suo indirizzo deve essere collegato al frontend. *Finché questo passaggio non è completato, il sito su Netlify può aprirsi, ma il caricamento dei contenuti e il login potrebbero non funzionare.*

### 1.1 Creare l’account Netlify

1. Vai su [https://www.netlify.com](https://www.netlify.com) e registrati (email o account GitHub consigliati).
2. Se il team crea l’account **per la fotografa**, dopo la registrazione si può invitare la sua email come membro del team dal pannello Netlify (**Team settings → Members**), così entrambe le parti vedono lo stesso sito.
3. Conserva email e password di accesso a Netlify in un posto sicuro (ad esempio un gestore di password).

### 1.2 Collegare il progetto e fare il deploy (sintesi)

Operazioni tipiche (chi sviluppa il progetto le completa con i dettagli del repository):

1. **Add new site → Import an existing project** e collega il repository Git (es. GitHub).
2. **Impostazioni di build** (frontend nella cartella `client`):
   - **Base directory:** `client`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist` *(Netlify la intende **relativa** alla base: dentro `client` viene pubblicata la cartella `dist` prodotta da Vite.)*
3. Avvia il deploy. Al termine Netlify assegna un indirizzo del tipo `https://nome-scelto.netlify.app` (oppure si collega un **dominio personalizzato**, es. `www.tuodominio.it`).

### 1.3 Dopo il deploy

- **URL pubblico del sito:** è quello mostrato in Netlify in **Site overview** (es. `https://….netlify.app`). È il link da usare per navigare il portfolio e da condividere con i clienti.
- **Aggiornamenti:** ogni volta che si caricano modifiche sul branch collegato, Netlify può **ridistribuire automaticamente** il sito (deploy continuo).

*(Nota tecnica: quando il backend sarà online, il codice del sito dovrà usare quell’indirizzo API al posto di `localhost`: è un intervento per chi gestisce il codice, non per la fotografa.)*

---

## 2. Come accedere alla piattaforma (fotografa)

### 2.1 Sito pubblico

- Apri il browser (Chrome, Safari o Firefox sono adatti).
- Vai all’indirizzo del sito pubblicato, ad esempio:  
  **`https://TUO-SITO.netlify.app`**  
  (oppure il dominio personalizzato che avrete configurato).

Da qui navighi come una visitatrice: **Photography** (home), **Chi Sono**, **Contatti** e le varie **gallerie** (categorie di lavori).

### 2.2 Area riservata (login amministratore)

- Sul tuo dominio, apri la pagina di accesso aggiungendo **`/login`** all’indirizzo, ad esempio:  
  **`https://TUO-SITO.netlify.app/login`**
- Inserisci **email** e **password** che ti sono state comunicate alla configurazione.
- Dopo l’accesso resti nel sito con privilegi di modifica: compaiono pulsanti e icone aggiuntive (matita, ingranaggio, ecc.).

### 2.3 Uscita

- In alto a destra, quando sei loggata, usa l’icona per **uscire** (logout). Per modificare di nuovo dovrai effettuare di nuovo il login da `/login`.

---

## 3. Cosa puoi fare sulla piattaforma (dopo il login)

Tutto ciò che segue è disponibile **solo come amministratrice**, visitando le pagine normali del sito.

### 3.1 Home (pagina principale / Photography)

- **Immagine di copertina:** icona a matita sull’immagine grande in alto → scegli un file; poi conferma con l’icona **spunta (✓)** azzurra.
- **Blocchi galleria (categorie):**
  - **Modifica:** matita verde → puoi cambiare foto, titolo e sottotitolo di ogni card; **spunta azzurra** per salvare tutto insieme.
  - **Riordino:** icona con frecce circolari → trascina le card per cambiare ordine; **spunta** per chiudere la modalità (l’ordine si salva a ogni rilascio).
  - **Nuova categoria:** icona **+** → compila titolo, testo e immagine; **spunta** per creare (l’indirizzo web della galleria viene generato dal sistema in base al titolo).

### 3.2 Pagine galleria (singolo progetto / raccolta foto)

- Apri una categoria dalla home (stesso sito: link tipo `/gallery/...` o percorsi dedicati come `/family`).
- **Visualizzazione a schermo intero:** quando **non** sei in modalità modifica né in riordino, **clic** sulla foto (o tocco su smartphone/tablet) per aprirla **a tutto schermo**. Clic sullo sfondo scuro, pulsante **X** in alto a destra o tasto **Esc** sulla tastiera per chiudere.
- **Modifica didascalie:** matita → modifica il testo sotto le foto; didascalie in **MAIUSCOLO**; **spunta** per salvare.
- **Caricare foto:** icona **+** → scegli immagine e didascalia, poi **Carica foto**.
- **Riordino foto:** frecce circolari → trascina una foto su un’altra per scambiare posto; **spunta** per uscire dalla modalità.
- **Eliminare una foto:** icona cestino sulla foto (in modalità modifica).

### 3.3 Chi Sono

- **Matita** accanto al titolo → modifichi il testo della pagina; **spunta** per salvare, **X** rossa per annullare.

### 3.4 Contatti

- Stessa logica: **matita** per modificare i testi introduttivi e il messaggio sopra il modulo; **spunta** / **X** per salvare o annullare.  
- Il modulo «Invia» è quello che usano le visitatrici per scriverti (non richiede login).

### 3.5 Privacy, Cookie, Termini di servizio

- Pagine legali raggiungibili dai link in fondo al sito (footer) o da **Impostazioni**.
- Con **matita** modifichi i testi (dove abilitato); segui le indicazioni in pagina (es. segnaposto per l’email in Privacy).

### 3.6 Impostazioni (icona ingranaggio in alto a destra)

Solo da loggata:

- **Email pubblica**, **Instagram**, **telefono** (formato con prefisso italiano +39 e dieci cifre, come indicato in pagina).
- **Password** di accesso all’area amministratore.
- Link alle pagine legali (se configurati).

Salva i moduli in fondo alle sezioni quando modifichi dati sensibili.

---

## 4. Suggerimenti pratici

- Dopo modifiche importanti, usa sempre **Salva (spunta)**; se chiudi il browser prima, il lavoro non salvato può andare perso.
- Se la sessione scade, il sito può chiederti di **effettuare di nuovo il login** da `/login`.
- Per **password dimenticata** o **URL esatti** dopo il deploy, rivolgiti a chi segue il sito dal punto di vista tecnico.

---

## 5. Riepilogo per il team (sintesi)

**Netlify** ospita il **sito pubblico (frontend)**. L’**API e il database sul server** vanno pubblicati a parte e collegati all’app: finché non è fatto, l’indirizzo Netlify può aprirsi, ma contenuti e login potrebbero non funzionare.

**Accesso fotografa**

- Sito pubblico: `https://TUO-SITO.netlify.app` (o dominio personalizzato).
- Area admin: aggiungi **`/login`** a quell’indirizzo.
- Dopo il login compaiono le stesse pagine dei visitatori, con controlli extra (matita, ingranaggio, ecc.).

**Cosa può fare la fotografa (loggata)**

- **Home:** copertina; creare, modificare, riordinare e salvare le card delle categorie.
- **Gallerie:** caricare foto, modificare didascalie (maiuscolo), riordinare, eliminare; **fuori da modifica e riordino**, **clic o tocco sulla foto** per aprirla **a schermo intero** (sfondo scuro, **X** o **Esc** per chiudere).
- **Chi sono / Contatti / pagine legali:** testi dove c’è la matita.
- **Impostazioni (ingranaggio):** email pubblica, Instagram, telefono, password admin, link legali.

Conserva URL e credenziali in modo sicuro; sostituisci gli esempi sopra con quelli reali quando il sito è online.

---

*Documento destinato alla fotografa e al team che cura pubblicazione e dominio. Aggiorna gli URL di esempio con quelli reali non appena il sito è online.*
