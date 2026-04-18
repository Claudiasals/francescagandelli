import { useParams } from "react-router-dom";

/**
 * Galleria per categorie aggiunte dalla dashboard (slug dinamico).
 * Le quattro categorie originali usano ancora le route dedicate (/family, …).
 */
const CategoryGallery = () => {
  const { slug } = useParams();

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h2 className="font-display font-extralight text-2xl tracking-widest uppercase text-verdoscuro mb-4">
        Portfolio
      </h2>
      <p className="text-gray-600 text-sm mb-8">
        Sezione: <span className="font-medium text-black">{slug}</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="w-full h-64 bg-gray-200 rounded" />
        <div className="w-full h-64 bg-gray-200 rounded" />
        <div className="w-full h-64 bg-gray-200 rounded" />
      </div>
      <p className="mt-6 text-sm text-gray-500">
        Qui potrai collegare le foto da backend quando sarà pronta la galleria per questa categoria.
      </p>
    </section>
  );
};

export default CategoryGallery;
