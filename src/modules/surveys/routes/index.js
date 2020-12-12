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
    path: '/questions/new',
    key: 'addQuestions',
    component: FormFormik,
    crumb: 'Add Question'
  },
  {
    path: '/new',
    key: 'createSurvey',
    component: CreateSurvey,
    crumb: 'Create Survey'
  },
  {
    path: '/questions/new',
    key: 'addQuestions',
    component: FormFormik,
    crumb: 'Create Question'
  }
];
