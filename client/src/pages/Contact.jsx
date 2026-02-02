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

      <div className="flex flex-col justify-center gap-6  ">
        <h2 className="font-display font-extralight text-2xl tracking-widest uppercase text-verdoscuro">Contattami</h2>

        <p className="font-display font-extralight tracking-widest uppercase ">
          Se desideri prenotare una sessione fotografica o
          discutere di un progetto, non esitare a contattarmi!
          Sarò felice di rispondere a tutte le tue domande e
          aiutarti a catturare i tuoi momenti speciali.
        </p>
      </div>

      <div className="flex flex-col gap-16">

        {/* Form */}
        {errorMessage && (
          <p className="text-red-600 font-semibold">{errorMessage}</p>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
            <p className="text-lg text-verdoscuro">
              Compila il form, ti risponderò il prima possibile! </p>

            <label className="flex flex-col">
              <input type="text" name="name" className="border border-gray-300 rounded p-2 mt-1" placeholder="NOME" />
            </label>
            <label className="flex flex-col">
              <input type="email" name="email" className="border border-gray-300 rounded p-2 mt-1" placeholder="EMAIL" />
            </label>
            <label className=" flex flex-col">
              <textarea name="message" rows="5" className="border border-gray-300 rounded p-2 mt-1" placeholder="MESSAGGIO" ></textarea>
            </label>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary"
              >
                Invia
              </button>
            </div>

          </form>
        ) : (
          <p>Grazie per il messaggio!</p>
        )}


        {/* Contatti */}
        <div className="flex flex-col gap-2 mb-12">
          <a
            href="mailto:francescagandelli.photographer@gmail.com"
            className="flex flex-col hover:scale-120 active:scale-75 transition-transform duration-200"
          >
            <span className="text-black text-lg">email: francescagandelli.ph@gmail.com</span>
          </a>

          <a
            href="tel:+393466106008"
            className="flex flex-col hover:scale-120 active:scale-75 transition-transform duration-200"
          >
            <span className="text-black text-lg">telefono: +39 346 610 6008</span>
          </a>

          <a
            href="https://www.instagram.com/francescagandelli_ph?igsh=bWZ6anl2bTdtcXc1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col hover:scale-120 active:scale-75 transition-transform duration-200"
          >
            <span className="text-black text-lg">Instagram: @francescagandelli_ph</span>
          </a>
        </div>

      </div>
    </section>

  );
};

export default Contact; 