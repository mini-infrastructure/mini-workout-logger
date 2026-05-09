import type {PropsWithChildren} from 'react';
import {createContext, useCallback, useContext, useState} from 'react';
import type {AlertItem, AlertVariant} from '../components/alert/alert.component.tsx';
import AlertContainer from '../components/alert/alert.component.tsx';

type PushAlert = (message: string, variant?: AlertVariant, duration?: number) => void;

const AlertContext = createContext<PushAlert>(() => {});

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: PropsWithChildren) => {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);

    const push: PushAlert = useCallback((message, variant = 'info', duration) => {
        const id = crypto.randomUUID();
        setAlerts((prev) => [...prev, { id, message, variant, duration }]);
    }, []);

    const remove = useCallback((id: string) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, []);

    return (
        <AlertContext.Provider value={push}>
            {children}
            <AlertContainer alerts={alerts} onRemove={remove} />
        </AlertContext.Provider>
    );
};
