import home from '../views/home';
import FormFormik from '../views/Questions/Formik';

export default [
  {
    path: '/home',
    key: 'home',
    component: home
  },
  {
    path: '/questions/new',
    key: 'addQuestions',
    component: FormFormik
  }
];
