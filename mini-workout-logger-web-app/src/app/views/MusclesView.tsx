import { useMuscles } from '../hooks/useMuscles';

export function MusclesView() {
    const { muscles, loading, error } = useMuscles();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Muscles</h1>
            <ul>
                {muscles.map(muscle => (
                    <li key={muscle.id}>{muscle.name}</li>
                ))}
            </ul>
        </div>
    );
}
