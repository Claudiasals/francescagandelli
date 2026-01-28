import { PhoneCall, EnvelopeOpen, InstagramLogo } from "phosphor-react";
import { useState } from "react";


const Contact = () => {

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    // Validazione lato client
    if (!form.name.value || !form.email.value || !form.message.value) {
      setErrorMessage("Compila tutti i campi mancanti");
      return;
    }

    try {
      const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
      };

      // Validazione email semplice
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.value)) {
        setErrorMessage("Inserisci un indirizzo email valido");
        return;
      }

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === "ok") {
        setSubmitted(true);
        form.reset();
        setErrorMessage("");
      } else {
        // Errore lato server, mostro il messaggio ricevuto
        setErrorMessage(result.message || "Errore invio messaggio dal server");
      }
    } catch (err) {
      console.error(err);
      // Errore tecnico
      setErrorMessage("Errore di connessione. Riprova più tardi.");
    }
  };


  return (

    <section className="contact-section p-8 max-w-2xl mx-auto space-y-18">

      <div className="flex flex-col justify-center items-center gap-6  ">
        <h2 className="text-3xl font-bold text-[var(--color-verdolight)] ">Contattami</h2>

        <p className="text-lg">
          Se desideri prenotare una sessione fotografica o
          discutere di un progetto, non esitare a contattarmi!
          Sarò felice di rispondere a tutte le tue domande e
          aiutarti a catturare i tuoi momenti speciali.
        </p>
      </div>

      <div className="flex flex-col items-center gap-18">

        {/* Form */}
        {errorMessage && (
          <p className="text-red-600 font-semibold">{errorMessage}</p>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className=" flex flex-col gap-4 ">
            <p className="text-lg font-bold">
              Compila il form, ti risponderò il prima possibile! </p>

            <label className="flex flex-col">
              <input type="text" name="name" className="border border-gray-300 rounded p-2 mt-1" placeholder="Nome" />
            </label>
            <label className="flex flex-col">
              <input type="email" name="email" className="border border-gray-300 rounded p-2 mt-1" placeholder="Email" />
            </label>
            <label className="flex flex-col">
              <textarea name="message" rows="5" className="border border-gray-300 rounded p-2 mt-1" placeholder="Messaggio" ></textarea>
            </label>

            <div className="flex justify-end">
              <button
                type="submit"
                className="p-4 gap-2 h-10 rounded-xl 
                   bg-[var(--color-verdolight)] text-white text-lg font-semibold
                   flex items-center justify-center
                   hover:bg-[var(--color-verdoscuro)]
                   transition-colors transform transition-transform duration-150 
                   active:scale-70 hover:scale-120 w-auto"
              >
                Invia
              </button>
            </div>

          </form>
        ) : (
          <p>Grazie per il messaggio!</p>
        )}


        {/* Contatti */}
        <div className="flex flex-col gap-6 mb-12">
          <a
            href="mailto:francescagandelli.photographer@gmail.com"
            className="flex flex-col items-center hover:scale-120 active:scale-75 transition-transform duration-200"
          >
            <EnvelopeOpen size={32} weight="duotone" color="#8CA576" />
            <span className="text-black text-lg">francescagandelli.ph@gmail.com</span>
          </a>

          <a
            href="tel:+393466106008"
            className="flex flex-col items-center hover:scale-120 active:scale-75 transition-transform duration-200"
          >
            <PhoneCall size={32} weight="duotone" color="#8CA576" />
            <span className="text-black text-lg">+39 346 610 6008</span>
          </a>

          <a
            href="https://www.instagram.com/francescagandelli_ph?igsh=bWZ6anl2bTdtcXc1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:scale-120 active:scale-75 transition-transform duration-200"
          >
            <InstagramLogo size={40} weight="duotone" color="#8CA576" />
            <span className="text-black text-lg">Instagram @francescagandelli_ph</span>
          </a>
        </div>

      </div>
    </section>

  );
};

export default Contact; 