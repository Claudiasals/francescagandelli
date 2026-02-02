const Family = () => {
  const photos = [
    { id: 1, caption: "Ricordi di famiglia" },
    { id: 2, caption: "Primi passi" },
    { id: 3, caption: "Attimi spontanei" },
  ];

  return (
    <section className="p-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map(photo => (
          <div key={photo.id} className="flex flex-col">
            {/* Placeholder immagine */}
            <div className="w-full h-64 bg-gray-200" />

            {/* Didascalia */}
            <p className="mt-2 text-center text-sm text-gray-700">
              {photo.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Family;
