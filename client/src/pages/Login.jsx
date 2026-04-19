import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock, Eye, EyeClosed, Wrench } from "phosphor-react";

const Login = () => {

    // Stati per input
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // stato per mostrare/nascondere password
    const [showPassword, setShowPassword] = useState(false);


    // Funzione di submit
    const handleLogin = async (e) => {
        e.preventDefault(); // evita il reload della pagina

        // Logica di login
        try {
            // Chiamata al backend per fare il login
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Diciamo al server che mandiamo JSON
                },
                body: JSON.stringify({
                    username, // username e psw presi dallo state React
                    password,
                }),
            });

            // Convertiamo la risposta del server da JSON a oggetto JS
            // res non contiene direttamente i dati utili, contiene solo la busta della risposta.
            // Per leggere il contenuto vero, devi convertirlo con res.json().
            const data = await res.json();

            // Se la risposta HTTP è OK (status 200–299)
            if (res.ok) {
                // Salviamo il token JWT nel browser (persistente)
                localStorage.setItem("adminToken", data.token);

                // Redirect alla dashboard admin
                window.location.href = "/";
                /* Importante: la dashboard deve leggere il token 
                dal localStorage per capire se l’utente è loggato.
                */

            } else {
                // Caso: credenziali sbagliate o errore gestito dal backend
                alert(data.message || "Errore login");
                // resetta i campi se le credenziali sono errate
                setUsername("");
                setPassword("");

            }
        } catch (err) {
            // Caso: errore tecnico (server spento, rete KO, crash fetch)
            console.error(err);
            // Messaggio generico all’utente
            alert("Errore server");
        }

    };

    return (
        <div className="flex flex-col p-6 gap-6 min-h-screen items-center justify-center">

            <form className="flex flex-col gap-6 " onSubmit={handleLogin}>

                <div className="relative gap-2 items-center">
                    <input
                        className=" pl-12 border border-[var(--color-verdoscuro)] 
                p-2 bg-white focus:border-[var(--color-verdolight)] 
                outline-none peer"
                        type="text"
                        placeholder="USERNAME"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <User size={26}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1E431D] 
                    peer-focus:text-[var(--color-verdolight)]" />
                </div>

                <div className="relative gap-2 items-center">
                    <input
                        className="font-family pl-12 border border-[var(--color-verdoscuro)] 
                p-2 bg-white focus:border-[var(--color-verdolight)] 
                outline-none peer"
                        // Aggiunta gestione mostra/nascondi password
                        type={showPassword ? "text" : "password"}
                        placeholder="PASSWORD"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Lock size={26}
                        className="absolute left-3 top-1/2 -translate-y-1/2 
                        text-[#1E431D] peer-focus:text-[var(--color-verdolight)]" />

                    {showPassword ? (
                        <EyeClosed
                            size={22} weight="duotone"
                            className="absolute right-3 top-1/2 -translate-y-1/2 
               text-[#1E431D] cursor-pointer 
               peer-focus:text-[var(--color-verdolight)] 
                                   "
                            onClick={() => setShowPassword(false)}
                        />
                    ) : (
                        <Eye size={22} weight="duotone"
                            className="absolute right-3 top-1/2 -translate-y-1/2 
                    text-[#1E431D] cursor-pointer peer-focus:text-[var(--color-verdolight)]
                   "
                            onClick={() => setShowPassword(true)} /> // icona per mostrare
                    )}
                </div>

                <div className="flex flex-row items-center justify-center gap-4 w-full max-w-md">
                    {!!localStorage.getItem("adminToken") && (
                        <Link
                            to="/settings"
                            className="btn-edit-gallery shrink-0"
                            title="Impostazioni"
                            aria-label="Impostazioni"
                        >
                            <Wrench size={20} weight="duotone" className="text-white" />
                        </Link>
                    )}
                    <button
                        type="submit"
                        className="underline underline-offset-4 p-4 gap-2 h-10
                   text-[var(--color-verdoscuro)] text-lg
                   flex items-center justify-center
                   hover:text-[var(--color-verdolight)]
                   transition-colors duration-150
                   w-auto shrink-0"
                    >
                        Accedi
                    </button>
                </div>

            </form>

        </div>
    );
};

export default Login;

//  bg-[var(--color-verdolight)] #8CA576   --color-verdoscuro: #1E431D;