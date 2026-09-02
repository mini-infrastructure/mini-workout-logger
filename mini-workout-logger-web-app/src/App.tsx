import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundView from "./app/views/NotFound/index.tsx";
import DashboardView from "./app/views/Dashboard/index.tsx";
import WorkoutsView from "./app/views/Workouts/index.tsx";
import WorkoutView from "./app/views/Workout/index.tsx";
import WorkoutExecutionView from "./app/views/WorkoutExecution/index.tsx";
import ExercisesView from "./app/views/Exercises/index.tsx";
import ExercisesFavoritesView from "./app/views/ExercisesFavorites/index.tsx";
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
                        <Route path="/workouts/:id" element={<WorkoutView />} />
                        <Route path="/workouts/:id/executions/:executionId" element={<WorkoutExecutionView />} />
                        <Route path="*" element={<NotFoundView />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AlertProvider>
    );
}

export default App;
