import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundView from "./app/views/error/not-found.view.tsx";
import DashboardView from "./app/views/dashboard/dashboard.view.tsx";
import WorkoutsView from "./app/views/workouts/workouts.view.tsx";
import ExercisesView from "./app/views/exercises/exercises.view.tsx";
import ExercisesFavoritesView from "./app/views/exercises/exercises-favorites.view.tsx";
import { AlertProvider } from "./app/context/alert.context.tsx";

function App() {
    return (
        <AlertProvider>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path="/" element={<DashboardView />} />
                        <Route path="/exercises" element={<ExercisesView />} />
                        <Route path="/exercises/favorites" element={<ExercisesFavoritesView />} />
                        <Route path="/workouts" element={<WorkoutsView />} />
                        <Route path="*" element={<NotFoundView />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AlertProvider>
    );
}

export default App;
