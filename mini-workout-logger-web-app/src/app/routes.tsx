import type { JSX } from '@emotion/react/jsx-runtime';
import { FiDatabase } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

export type RouteSection = 'Main' | 'Support';

export type AppRouteChild = {
    path: string;
    label: string;
    icon?: JSX.Element;
};

export type AppRoute = {
    path: string;
    label: string;
    section: RouteSection;
    icon?: JSX.Element;
    children?: AppRouteChild[];
};

export const routes: AppRoute[] = [
    { path: '/',          label: 'Dashboard', section: 'Main'    },
    { path: '/exercises', label: 'Exercises', section: 'Main', children: [
        { path: '/exercises',           label: 'Database',  icon: <FiDatabase /> },
        { path: '/exercises/favorites', label: 'Favorites', icon: <FaStar />     },
    ]},
    { path: '/workouts',  label: 'Workouts',  section: 'Main'    },
    { path: '/log',       label: 'Log',       section: 'Main'    },
    { path: '/calendar',  label: 'Calendar',  section: 'Main'    },
    { path: '/analysis',  label: 'Analysis',  section: 'Main'    },
    { path: '/settings',  label: 'Settings',  section: 'Support' },
    { path: '/help',      label: 'Help',      section: 'Support' },
];
