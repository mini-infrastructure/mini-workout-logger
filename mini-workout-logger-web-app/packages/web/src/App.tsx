import { Routes, Route, Navigate } from 'react-router-dom';

import ExercisesView from './app/views/Exercises';
import PlansView from './app/views/Plans';
import NotFoundView from './app/views/NotFound';
import ShowcaseView from './app/views/Showcase';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/exercises" replace />} />
            <Route path="/exercises" element={<ExercisesView />} />
            <Route path="/plans" element={<PlansView />} />
            <Route path="/components" element={<ShowcaseView />} />
            <Route path="*" element={<NotFoundView />} />
        </Routes>
    );
};

export default App;
