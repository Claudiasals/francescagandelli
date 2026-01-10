import Card from "../components/Card";

const StoryTelling = () => {
  const photos = [
    { id: 1, title: "Foto 1", description: "Descrizione foto 1" },
    { id: 2, title: "Foto 2", description: "Descrizione foto 2" },
    { id: 3, title: "Foto 3", description: "Descrizione foto 3" },
  ];

  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Story Telling</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map(photo => (
          <Card key={photo.id} {...photo} />
        ))}
      </div>
    </section>
  );
};

export default StoryTelling;
