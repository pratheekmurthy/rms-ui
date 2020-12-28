import CreateSurvey from '../views/create-survey';
import home from '../views/home';
import FormFormik from '../views/Questions/Formik';
import ViewQuestions from '../views/view-questions';
import EditQuestions from '../views/edit-questions';
import EndUserForm from '../views/end-user-form';

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
    exact: true,
    key: 'questions',
    component: ViewQuestions,
    crumb: 'Questions'
  },
  {
    path: '/questions/new',
    exact: true,
    key: 'addQuestions',
    component: FormFormik,
    crumb: 'Create Question'
  },
  {
    path: '/questions/:questionId/view',
    key: 'editQuestions',
    component: EditQuestions,
    crumb: 'Edit Question'
  },
  {
    path: '/form',
    exact: true,
    key: 'endUserForm',
    component: EndUserForm,
    crumb: 'View Form'
  }
];
