import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundView from "./app/views/error/not-found.view.tsx";
import DashboardView from "./app/views/dashboard/dashboard.view.tsx";
import WorkoutsView from "./app/views/workouts/workouts.view.tsx";
import ExercisesView from "./app/views/exercises/exercises.view.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/" element={<DashboardView />} />
                    <Route path="/exercises" element={<ExercisesView />} />
                    <Route path="/workouts" element={<WorkoutsView />} />
                    <Route path="*" element={<NotFoundView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
