const GATEWAY_PREFIX = process.env.NODE_ENV === 'production' ? '/survey' : ''; // '/survey' for production, empty for local
export const GET_SURVEYS = GATEWAY_PREFIX + '/surveys';
export const CRUD_SURVEY = GATEWAY_PREFIX + '/survey';
export const CRUD_QUESTIONS = GATEWAY_PREFIX + '/survey/questions';
export const SEARCH_QUESTION = GATEWAY_PREFIX + '/survey/question/search';
