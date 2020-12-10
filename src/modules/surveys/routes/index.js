import CreateSurvey from '../views/create-survey';
import home from '../views/home';

export default [
  {
    path: '/home',
    key: 'home',
    component: home
  },
  {
    path: '/new',
    key: 'createSurvey',
    component: CreateSurvey
  }
];
