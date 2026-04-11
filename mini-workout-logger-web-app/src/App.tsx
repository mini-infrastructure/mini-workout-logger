import {MusclesView} from "./app/views/MusclesView.tsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundView from "./app/views/error/not-found.view.tsx";
import DashboardView from "./app/views/dashboard/dashboard.view.tsx";
import ExercisesDatabaseView from "./app/views/exercises/exercises.view.tsx";
import WorkoutsView from "./app/views/workouts/workouts.view.tsx";
import SettingsView from "./app/views/settings/settings.view.tsx";
import ExerciseView from "./app/views/exercise/exercise.view.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/muscles" element={<MusclesView />} />
                    <Route path="/" element={<DashboardView />} />
                    <Route path="/exercises" element={<ExercisesDatabaseView />} />
                    <Route path="/exercises/:id" element={<ExerciseView />} />
                    <Route path="/workouts" element={<WorkoutsView />} />
                    <Route path="/settings" element={<SettingsView />} />
                    <Route path="*" element={<NotFoundView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
