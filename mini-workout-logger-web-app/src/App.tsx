import {MusclesView} from "./app/views/MusclesView.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/muscles" element={<MusclesView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
