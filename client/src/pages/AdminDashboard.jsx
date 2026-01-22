import Card from "../components/Card";
import cover from "../assets/images/cover.png";
import { Pencil, Trash, ArrowsClockwise, Plus, Check } from "phosphor-react";

const AdminDashboard = () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    // Se non c’è token, rimanda al login
    window.location.href = "/login";
    return null; // evita di renderizzare la dashboard
  }

  const categories = [
    { id: 1, title: "Famiglia", description: "Momenti in famiglia", link: "/family" },
    { id: 2, title: "Ritratti", description: "Scatti professionali", link: "/portrait" },
    { id: 3, title: "Storytelling", description: "Racconti fotografici", link: "/storytelling" },
    { id: 4, title: "Personal Branding", description: "Immagini per il tuo brand", link: "/personal-branding" },
  ];

  return (
    <>
      <section className=" md:h-96 ">

        <div className=" flex gap-2 p-4 justify-end">
          <button
            type="button"
            className=" 
    w-9 h-9 rounded-full 
    bg-[var(--color-verdolight)] 
    flex items-center justify-center
    hover:bg-[var(--color-verdoscuro)]
    transition-colors "
          >
            <Pencil
              size={24}
              className="text-white"
            />
          </button>
          <button type="button"
            className="
    w-9 h-9 rounded-full 
    bg-[var(--color-verdolight)] 
    flex items-center justify-center
    hover:bg-[var(--color-verdoscuro)]
    transition-colors" >
            <Trash size={24} className="text-white" />
          </button>
        </div>
        <img src={cover} alt="Copertina" className="w-full h-full object-cover" />
      </section>

      <section className="p-8 mt-1 md:mt-15">

        <div className=" flex gap-2 p-2 justify-between">
          <h2 className=" text-3xl font-bold mb-6">Portfolio</h2>
          <div className="flex gap-2 p-2 justify-end">
            <button
              type="button"
              className=" 
    w-9 h-9 rounded-full 
    bg-[var(--color-verdolight)] 
    flex items-center justify-center
    hover:bg-[var(--color-verdoscuro)]
    transition-colors "
            >
              <Pencil
                size={24}
                className="text-white"
              />
            </button>
            <button type="button"
              className="
    w-9 h-9 rounded-full 
    bg-[var(--color-verdolight)] 
    flex items-center justify-center
    hover:bg-[var(--color-verdoscuro)]
    transition-colors" >
              <ArrowsClockwise size={24} className="text-white" />
            </button>
            <button type="button"
              className="
    w-9 h-9 rounded-full 
    bg-[var(--color-verdolight)] 
    flex items-center justify-center
    hover:bg-[var(--color-verdoscuro)]
    transition-colors" >
              <Plus size={24} className="text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
          {categories.map(cat => (
            <Card key={cat.id} {...cat} />
          ))}
        </div>

        <div className=" flex gap-2 p-2 justify-end m-6">
          <button
            type="button"
            className=" 
    p-4 gap-2 h-10 rounded-xl 
    bg-[var(--color-verdolight)] 
    flex items-center justify-center
    hover:bg-[var(--color-verdoscuro)]
    transition-colors "
          >
            <span className="text-white font-semibold">Salva</span>
            <Check
              size={24}
              className="text-white"
              weight="bold"
            />
          </button>
        </div>

      </section>





    </>
  );
};

export default AdminDashboard;