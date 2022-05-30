import { useState } from 'react';
import Header from './components/Header';
import CatList from './components/CatList';

function App() {
    const [favorite, setFavorites] = useState(false)
    return (
        <div className="App">
            <Header favorite={favorite} setFavorites={setFavorites} />
            <CatList favorite={favorite} />
        </div>

    );
}

export default App;
