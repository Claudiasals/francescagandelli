import { Pencil, Trash, ArrowsClockwise, Plus, Check } from "phosphor-react";


const FamilyDashboard = () => {
    const photos = [
        { id: 1, caption: "Ricordi di famiglia" },
        { id: 2, caption: "Primi passi" },
        { id: 3, caption: "Attimi spontanei" },
    ];

    return (
        <section className="p-8">
            <div className=" flex gap-2 p-2 justify-between">
                <h2 className=" text-3xl font-bold mb-6">Famiglia</h2>
                <div className="flex gap-2 p-2 justify-end">
                    <button
                        type="button"
                        className="btn-edit-gallery"
                    >
                        <Pencil
                            size={24}
                            className="text-white"
                        />
                    </button>
                    <button type="button"
                        className="btn-edit-gallery" >
                        <ArrowsClockwise size={24} className="text-white" />
                    </button>
                    <button type="button"
                        className="btn-edit-gallery" >
                        <Plus size={24} className="text-white" />
                    </button>
                </div>
            </div>

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

export default FamilyDashboard;
