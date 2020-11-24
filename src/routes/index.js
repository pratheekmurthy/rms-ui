import routes from 'src/modules/dashboard-360/routes';
import surveyRoutes from 'src/modules/surveys/routes';
//import telephonyRoutes from 'src/modules/telephony/routes';
import views from 'src/modules/dashboard-360/views';
import surveys from 'src/modules/surveys';

export default [
    {
        path: '/dash360',
        routes,
        key: 'dash360',
        component: views
    },
    {
        path: '/surveys',
        routes: surveyRoutes,
        key: 'surveys',
        component: surveys
    },
    // {
    //     path: '/telephony',
    //     telephonyRoutes,
    //     key: 'telephony',
    //     component: views
    // }
];
