const PortraitDashboard = () => {
    const photos = [
      { id: 1, caption: "Descrizione foto 1" },
      { id: 2, caption: "Descrizione foto 2" },
      { id: 3, caption: "Descrizione foto 3" },
    ];
  
    return (
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Personal Branding</h2>
  
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
  
  export default PortraitDashboard;
  