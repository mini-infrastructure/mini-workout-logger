import type {JSX} from '@emotion/react/jsx-runtime';
import {FcDatabase, FcIdea, FcSportsMode} from "react-icons/fc";

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
        { path: '/exercises',           label: 'Database',  icon: <FcDatabase /> },
        { path: '/exercises/favorites', label: 'Favorites', icon: <FcIdea />     },
    ]},
    { path: '/workouts',  label: 'Plan',      section: 'Main', children: [
        { path: '/workouts', label: 'Workouts', icon: <FcSportsMode /> },
    ]},
    { path: '/log',       label: 'Log',       section: 'Main'    },
    { path: '/analysis',  label: 'Analysis',  section: 'Main'    },
    { path: '/settings',  label: 'Settings',  section: 'Support' },
    { path: '/help',      label: 'Help',      section: 'Support' },
];
