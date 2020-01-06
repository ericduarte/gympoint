import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentSessionController from './app/controllers/StudentSessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';
import CheckinController from './app/controllers/CheckinController';

import authMiddleware from './app/middlewares/auth';
import authorizeMiddleware from './app/middlewares/authorize';

const routes = new Router();

// Open Routes
routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);
routes.post('/students/sessions', StudentSessionController.store);

// Restricted routes
routes.use(authMiddleware);

routes.get('/users',authorizeMiddleware(['admin']), UserController.index);
routes.put('/users',authorizeMiddleware(['admin']), UserController.update);

routes.get('/students',authorizeMiddleware(['admin']), StudentController.index);
routes.put('/students/:id',authorizeMiddleware(['admin']), StudentController.update);
routes.post('/students',authorizeMiddleware(['admin']), StudentController.store);
routes.delete('/students/:id',authorizeMiddleware(['admin']), StudentController.remove);
routes.get('/students/:id',authorizeMiddleware(['admin']), StudentController.show);

routes.get('/plans',authorizeMiddleware(['admin']), PlanController.index);
routes.put('/plans/:id',authorizeMiddleware(['admin']), PlanController.update);
routes.post('/plans',authorizeMiddleware(['admin']), PlanController.store);
routes.delete('/plans/:id',authorizeMiddleware(['admin']), PlanController.remove);
routes.get('/plans/:id',authorizeMiddleware(['admin']), PlanController.show);

routes.get('/registrations',authorizeMiddleware(['admin']), RegistrationController.index);
routes.put('/registrations/:id',authorizeMiddleware(['admin']), RegistrationController.update);
routes.post('/registrations',authorizeMiddleware(['admin']), RegistrationController.store);
routes.delete('/registrations/:id',authorizeMiddleware(['admin']), RegistrationController.remove);
routes.get('/registrations/:id',authorizeMiddleware(['admin']), RegistrationController.show);

routes.get('/students/:student_id/checkins',authorizeMiddleware(['student']), CheckinController.index);
routes.post('/students/:student_id/checkins',authorizeMiddleware(['student']), CheckinController.store);

// routes.get('/students/:student_id/help-orders', HelpOrderController.index);
routes.post('/students/:student_id/help-orders',authorizeMiddleware(['student']), HelpOrderController.store);
routes.get('/students/:student_id/help-orders',authorizeMiddleware(['student']), StudentHelpOrderController.index);
routes.post('/help-orders/:id/answer', authorizeMiddleware(['student']), HelpOrderController.update);
routes.get('/help-orders',authorizeMiddleware(['admin']), HelpOrderController.index);

export default routes;
