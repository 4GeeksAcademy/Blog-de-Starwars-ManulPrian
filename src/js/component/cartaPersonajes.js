import React, { useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

export const CartaPersonajes = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const cardContainerRef = useRef(null);

    useEffect(() => {
        actions.cargarPersonajes();
    }, []);

    const handleScrollRight = () => {
        if (cardContainerRef.current) {
            cardContainerRef.current.scrollLeft += 200;
        }
    };

    const handleScrollLeft = () => {
        if (cardContainerRef.current) {
            cardContainerRef.current.scrollLeft -= 200;
        }
    };

    const handleFav = (personaje) => {
        const favoritoExistente = store.favoritos.includes(personaje.name);

        if (favoritoExistente) {
            actions.eliminarFavoritos(personaje.name);
        } else {
            actions.añadirFavoritos(personaje.name);
        }
    };

    return (
        <>
            <div className="card-container" ref={cardContainerRef}>
                {store.personajes.map((personaje, index) => (
                    <div className="card" style={{ width: "18rem" }} key={personaje.uid}>
                        <img src={store.imagenesPersonajes[index]} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{personaje.name}</h5>
                            <button
                                className="button star-wars-button"
                                onClick={() => navigate(`/vista-personaje-individual/${personaje.uid}/${index}`)}>
                                <span className="actual-text">
                                    <i className="fas fa-space-shuttle"></i> Info
                                </span>
                                <span aria-hidden="true" className="hover-text">
                                    <i className="fas fa-space-shuttle"></i> Info
                                </span>
                            </button>

                            <div className="like" title="Like">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    id={`Give-It-An-Id-${personaje.uid}`}
                                    checked={store.favoritos.includes(personaje.name)}
                                    onChange={() => handleFav(personaje)}
                                />
                                <div className="svg-container">
                                    {store.favoritos.includes(personaje.name) ? (
                                        <svg viewBox="0 0 24 24" className="svg-filled" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" className="svg-outline" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                                        </svg>
                                    )}
                                    <svg className="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="10,10 20,20"></polygon>
                                        <polygon points="10,50 20,50"></polygon>
                                        <polygon points="20,80 30,70"></polygon>
                                        <polygon points="90,10 80,20"></polygon>
                                        <polygon points="90,50 80,50"></polygon>
                                        <polygon points="80,80 70,70"></polygon>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="botones-scroll">
                <button className="scroll left" onClick={handleScrollLeft}>
                    <svg height="1.2em" className="arrow" viewBox="0 0 512 512">
                        <path d="M278.6 406.6c-12.5 12.5-12.5 32.8 0 45.3 12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3l-192-192c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L418.7 256 278.6 406.6z" />
                    </svg>
                </button>
                <button className="scroll right" onClick={handleScrollRight}>
                    <svg height="1.2em" className="arrow" viewBox="0 0 512 512">
                        <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                    </svg>
                </button>
            </div>
        </>
    );
};