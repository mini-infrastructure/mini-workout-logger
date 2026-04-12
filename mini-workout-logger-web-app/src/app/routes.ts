import type { ReactNode } from 'react';

export type RouteSection = 'Main' | 'Support';

export type AppRoute = {
    path: string;
    label: string;
    section: RouteSection;
    icon?: ReactNode;
};

export const routes: AppRoute[] = [
    { path: '/',          label: 'Dashboard', section: 'Main'    },
    { path: '/exercises', label: 'Exercises', section: 'Main'    },
    { path: '/workouts',  label: 'Workouts',  section: 'Main'    },
    { path: '/calendar',  label: 'Calendar',  section: 'Main'    },
    { path: '/analysis',  label: 'Analysis',  section: 'Main'    },
    { path: '/settings',  label: 'Settings',  section: 'Support' },
    { path: '/help',      label: 'Help',      section: 'Support' },
];
