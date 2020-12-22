import CreateSurvey from '../views/create-survey';
import home from '../views/home';
import FormFormik from '../views/Questions/Formik';
import ViewQuestions from '../views/view-questions';

export default [
  {
    path: '/home',
    key: 'home',
    component: home
  },
  {
    path: '/new',
    key: 'createSurvey',
    component: CreateSurvey,
    crumb: 'Create Survey'
  },
  {
    path: '/:surveyId/view',
    key: 'viewSurvey',
    component: CreateSurvey,
    crumb: 'View Survey'
  },
  {
    path: '/questions',
    key: 'questions',
    component: ViewQuestions,
    crumb: 'Questions'
  },
  {
    path: '/questions/new',
    key: 'addQuestions',
    component: FormFormik,
    crumb: 'Create Question'
  }
];
