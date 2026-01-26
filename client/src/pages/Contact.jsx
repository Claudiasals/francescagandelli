import { PhoneCall, EnvelopeOpen } from "phosphor-react";

const Contact = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };
  
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
      if(result.status === "ok") {
        alert("Messaggio inviato!");
        form.reset(); // pulisce il form
      } else {
        alert("Errore invio messaggio");
      }
    } catch (err) {
      console.error(err);
      alert("Errore invio messaggio");
    }
  };
  
  
  return (

    
    <section className="contact-section p-8 max-w-3xl mx-auto space-y-18">

      <div className="flex flex-col justify-center items-center gap-6  ">
        <h2 className="text-3xl font-bold ">Contattami</h2>

        <p className="text-lg">
          Se desideri prenotare una sessione fotografica o
          discutere di un progetto, non esitare a contattarmi!
        </p>
        <p className="text-lg">
          Puoi raggiungermi via email o telefono.
          Sarò felice di rispondere a tutte le tue domande e
          aiutarti a catturare i tuoi momenti speciali.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3 ">
          <EnvelopeOpen size={32} color="#8CA576" />
          <a href="mailto:francescagandelli.photographer@gmail.com" className="text-lg hover:underline">
            francescagandelli.photographer@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-3">
          <PhoneCall size={32} color="#8CA576" />
          <a href="tel:+393466106008" className="text-lg hover:underline">
            +39 346 610 6008
          </a>
        </div>
      </div>

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
        <button type="submit" className="bg-[var(--color-verdolight)] text-white rounded p-2 hover:bg-[var(--color-verdoscuro)] transition-colors">
          Invia
        </button>
      </form>

    </section>

  );
};

export default Contact; 