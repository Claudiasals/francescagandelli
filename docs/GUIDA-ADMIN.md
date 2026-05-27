# Guida admin

Questo documento serve all’**admin** per capire **in che ordine** procedere, **dove cliccare** dopo il deploy e **come entrare** nel sito e nell’area di modifica.  
**Chi fa il deploy** compila la tabella in fondo (o una copia stampata / PDF privato) con **URL e email**; le **password** non vanno scritte in un file su GitHub se il repository è pubblico (usa un gestore di password o un canale privato).

---

## Ordine consigliato: prima il deploy, poi l’accesso

1. **Deploy** — Il team collega il progetto a Netlify e completa almeno un deploy andato a buon fine.
2. **Link** — In Netlify, in **Site overview**, compare l’indirizzo del sito (es. `https://qualcosa.netlify.app`). Quel valore va copiato nella **scheda accessi** qui sotto (o ti viene inviato per email / messaggio).
3. **Prova** — Apri il link nel browser: se vedi il sito, il passo è ok. *(Se le pagine sono vuote o il login non funziona, manca ancora il collegamento al server dei dati: è un intervento tecnico sul backend.)*
4. **Login al sito** — Per modificare testi e foto usi **`/login`** sullo **stesso** dominio del sito (vedi **Sezione 2**), con **email e password dell’amministratore del sito** (non necessariamente le stesse di Netlify).

---

## 1. Netlify — cos’è e a cosa serve (per orientarti)

**Netlify** è il servizio che **pubblica il sito vetrina** (quello che vedono i clienti).  
L’**account Netlify** serve ad accedere al **pannello di controllo** (dashboard) per vedere deploy, domini, eventuali errori di build: **non** è la stessa cosa del login “matita / impostazioni” dentro il sito.

Il **server con database e immagini** (API) può stare su **un altro** servizio: finché non è configurato e collegato, il sito su Netlify può aprirsi ma **contenuti o login potrebbero non funzionare**.

### 1.1 Aprire l’account Netlify (chi lo gestisce)

1. Vai su [https://www.netlify.com](https://www.netlify.com) e accedi con l’email (o GitHub) usata in registrazione.
2. Se l’account è condiviso con il team, l’**admin** può ricevere un invito da **Team settings → Members** con la propria email.
3. **Password del pannello Netlify:** conservala in un posto sicuro (non in questa guida se il file è pubblico).

### 1.2 Deploy del progetto (sintesi per chi sviluppa)

1. **Add new site → Import an existing project** e collega il repository (es. GitHub).
2. Impostazioni di build (frontend nella cartella `client`):
   - **Base directory:** `client`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist` *(relativa alla base `client` — output di Vite.)*
3. Avvia il deploy. Netlify assegna un URL tipo `https://nome-sito.netlify.app` (o si collega un dominio proprio).

### 1.3 Dopo ogni modifica al codice

Se il sito è collegato al branch giusto, un **push** su Git può **ridistribuire** automaticamente il sito (deploy continuo).

---

## 2. Come accedere al **sito** (admin)

### 2.1 Sito pubblico (come una visitatrice)

- Apri il browser (Chrome, Safari o Firefox).
- Vai all’**URL del sito** che trovi nella **scheda accessi** in **Sezione 6** (in fondo a questa guida, dopo il deploy).  
  Esempio di forma: `https://TUO-SITO.netlify.app`
- Da qui usi **Photography** (home), **Chi Sono**, **Contatti** e le **gallerie**; su schermi medi/piccoli il menu è l’**icona con le linee** (hamburger), pannello da destra.

### 2.2 Area riservata — **login del sito** (modifica contenuti)

- Sempre sul **dominio del sito**, apri la pagina aggiungendo **`/login`**, ad esempio:  
  **`https://TUO-SITO.netlify.app/login`**
- Inserisci **email** e **password amministratore del sito** (quelle configurate sul backend / comunicate dal team).
- Dopo l’accesso compaiono **matita**, **spunta**, **ingranaggio** (impostazioni), ecc.

### 2.3 Uscita

- In alto a destra: **logout** (icona uscita). Per modificare di nuovo, rifai login da `/login`.

---

## 3. Cosa puoi fare dopo il login (sintesi operativa)

### 3.1 Home (Photography)

- **Copertina:** matita sull’immagine grande → scegli file → **spunta azzurra** per confermare.
- **Card categorie:** matita (modifica), frecce (riordino), **+** (nuova categoria); **spunta** per salvare o chiudere il riordino.

### 3.2 Gallerie

- **Clic sulla foto** (senza modifica attiva): immagine a **schermo intero**; **X**, **Esc** o clic sullo sfondo per chiudere.
- **Matita:** didascalie in **MAIUSCOLO**, **+** carica foto, frecce riordino, cestino elimina.

### 3.3 Chi Sono, Contatti, pagine legali

- **Matita** per modificare; **spunta** salva, **X** annulla (dove previsto).

### 3.4 Impostazioni (ingranaggio)

- Email pubblica, Instagram, **password admin** del sito, link legali.

---

## 4. Suggerimenti

- Salva spesso con la **spunta** dopo modifiche importanti.
- Se la sessione scade, rifai login da `/login`.
- Dubbi su password o link: contatta chi segue il progetto tecnicamente.

---

## 5. Riepilogo per il team

- **Netlify** = hosting del **frontend**.
- **Backend/API** = deploy separato; senza di esso il sito Netlify può essere “vuoto” o senza login funzionante.
- **Login Netlify** ≠ **login `/login` del sito**.

---

## 6. Scheda accessi — **compila dopo il deploy**

Qui sotto trovi la **tabella da compilare** con link e email reali, quando il sito è online.

### Cosa significano i simboli usati qui e nel resto della guida

- **`/login`** — È la **fine dell’indirizzo web** per la pagina di accesso: non è un sito separato. Si aggiunge **dopo** il dominio del sito, con uno **slash** `/` davanti alla parola `login`.  
  *Esempio:* sito `https://miosito.netlify.app` → pagina login `https://miosito.netlify.app/login`.
- **Trattini bassi `________________________` nella tabella** — Sono solo **spazio da riempire a mano** (o in una copia stampata): cancellali e scrivi il link o l’email veri.
- **`TUO-SITO` negli esempi** — È un **segnaposto**: sostituiscilo con il nome reale che Netlify assegna al sito (la parte prima di `.netlify.app`).
- **Grassetto** (testo evidenziato come **questo**) — In questo file serve solo a **evidenziare** parole importanti; se stampi o copi in Word, puoi ignorare la formattazione tecnica.

*Copia la tabella in un foglio privato oppure compila solo i campi non sensibili qui; **non** inserire password in un repository pubblico.*

| Cosa | Valore (da compilare) |
|------|------------------------|
| **URL sito pubblico** (dopo deploy Netlify) | `https://________________________` |
| **URL login amministratore sito** | stesso URL + **`/login`** |
| **Email usata per l’account Netlify** (solo pannello) | ________________________ |
| **Nome / slug del sito in Netlify** (opzionale) | ________________________ |
| **Email amministratore del sito** (per `/login`) | ________________________ |
| **Password** | *non scriverla qui: usa gestore password o consegna separata* |

**Nota:** quando il deploy è fatto, il **primo link utile** è sempre l’**URL sito pubblico** riga sopra: aprilo nel browser; se tutto è collegato, poi userai **`/login`** per lavorare sui contenuti.

---

*Ultimo aggiornamento: guida strutturata deploy → link → accesso. Aggiorna la **Sezione 6** con gli URL reali appena Netlify è pronto.*
