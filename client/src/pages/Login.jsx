import { useState } from "react";
import { User, Lock, Eye, EyeClosed} from "phosphor-react";

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
                window.location.href = "/dashboard";
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
                        className=" pl-12 border-2 border-[var(--color-verdolight)] 
                rounded-xl p-2 bg-white focus:border-[var(--color-verdoscuro)] 
                outline-none peer"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <User size={32} weight="duotone"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA576] 
                    peer-focus:text-[var(--color-verdoscuro)]" />
                </div>

                <div className="relative gap-2 items-center">
                    <input
                        className=" pl-12 border-2 border-[var(--color-verdolight)] 
                rounded-xl p-2 bg-white focus:border-[var(--color-verdoscuro)] 
                outline-none peer"
                        // Aggiunta gestione mostra/nascondi password
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Lock size={32} weight="duotone"
                        className="absolute left-3 top-1/2 -translate-y-1/2 
                        text-[#8CA576] peer-focus:text-[var(--color-verdoscuro)]" />
                   
                    {showPassword ? (
                        <Eye
                            size={24} weight="bold"
                            className="absolute right-3 top-1/2 -translate-y-1/2 
               text-[#8CA576] cursor-pointer 
               hover:text-[var(--color-verdoscuro)] transition-colors"
                            onClick={() => setShowPassword(false)}
                        />
                    ) : (
                        <EyeClosed size={24} weight="bold"
                            className="absolute right-3 top-1/2 -translate-y-1/2 
                    text-[#8CA576] cursor-pointer 
                    hover:text-[var(--color-verdoscuro)] transition-colors"
                            onClick={() => setShowPassword(true)} /> // icona per mostrare
                        )}
                </div>

                <button type="submit" className="mx-auto shadow-md rounded-xl p-2 bg-[var(--color-verdolight)] 
            text-white w-32 hover:bg-[var(--color-verdoscuro)] active:bg-[var(--color-verdolight)] 
            active:text-[var(--color-verdoscuro)] transition-colors">
                    Accedi
                </button>

            </form>

        </div>
    );
};

export default Login;

//  bg-[var(--color-verdolight)] #8CA576   --color-verdoscuro: #1E431D;