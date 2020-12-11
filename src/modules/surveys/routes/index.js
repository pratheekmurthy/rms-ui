import CreateSurvey from '../views/create-survey';
import home from '../views/home';
import FormFormik from '../views/Questions/Formik';

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
  },
  {
    path: '/questions/new',
    key: 'addQuestions',
    component: FormFormik
  }
];
