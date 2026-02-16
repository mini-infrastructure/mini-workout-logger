import {MusclesView} from "./app/views/MusclesView.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundView from "./app/views/error/not-found.view.tsx";
import DashboardView from "./app/views/dashboard/dashboard.view.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/muscles" element={<MusclesView />} />
                    <Route path="/" element={<DashboardView />} />
                    <Route path="*" element={<NotFoundView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
