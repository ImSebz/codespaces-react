import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DataTable.css';


const DataTable = ({ onLogout }) => {
    const [albums, setAlbums] = useState([]);
    const [displayedAlbums, setDisplayedAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // Obtiene los datos de la API al montar el componente
    useEffect(() => {
        fetchAlbums();
    }, []);


    // Actualiza los álbumes mostrados cuando cambia la página

    useEffect(() => {
        const startIndex = 0;
        const endIndex = currentPage * ITEMS_PER_PAGE;
        setDisplayedAlbums(albums.slice(startIndex, endIndex));
    }, [currentPage, albums]);

    // Consumir Api
    const fetchAlbums = async () => {
        setIsLoading(true);
        setError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
            setAlbums(response.data);
            setDisplayedAlbums(response.data.slice(0, ITEMS_PER_PAGE));
            setIsLoading(false);
        } catch (err) {
            setError('Error al cargar los datos.');
            setIsLoading(false);
            console.error('Error:', err);
        }
    };

    const loadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const hasMore = displayedAlbums.length < albums.length;

    if (isLoading) {
        return (
            <div className="data-container">
                <div className="loading-state">
                    <div className="spinner-large"></div>
                    <p>Cargando datos...</p>
                </div>
            </div>
        );
    }
    // Manejo de errores con estado
    if (error) {
        return (
            <div className="data-container">
                <div className="error-state">
                    <p>{error}</p>
                    <button onClick={fetchAlbums} className="retry-button">
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="data-container">
            <div className="data-header">
                <div>
                    <h2>Lista de Álbumes</h2>
                    <p>Mostrando {displayedAlbums.length} de {albums.length} registros</p>
                </div>
                <button onClick={onLogout} className="logout-button">
                    Cerrar Sesión
                </button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario ID</th>
                            <th>Título</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedAlbums.map((album) => (
                            <tr key={album.id}>
                                <td>{album.id}</td>
                                <td>{album.userId}</td>
                                <td>{album.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {hasMore && (
                <div className="load-more-container">
                    <button onClick={loadMore} className="load-more-button">
                        Ver más
                    </button>
                </div>
            )}

            {!hasMore && (
                <div className="end-message">
                    <p>No hay más registros para mostrar</p>
                </div>
            )}
        </div>
    );
};

export default DataTable;
