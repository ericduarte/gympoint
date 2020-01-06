import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import BaseController from './BaseController';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Registration from '../models/Registration';
import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

const sendRegistrationMail = async (req, res) => {
  const { newId } = req;
  try {
    const registration = await Registration.findByPk(newId, {
      attributes: ['price', 'end_date'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'price'],
        },
      ],
    });

    await Queue.add(RegistrationMail.key, {
      registration,
    });
    return true;
  } catch (error) {
    return res.status(500).json({
      message:
        'Matricula efetuada com sucesso, mas houve um erro ao tentar enviar email de confirmação',
      error,
    });
  }
};

class RegistrationController extends BaseController {
  constructor() {
    const modelClass = Registration;
    const keyField = 'id';
    const fields = [
      'id',
      'student_id',
      'plan_id',
      'start_date',
      'end_date',
      'price',
      'active',
    ];
    const display = 'Registration';
    const queryObject = null;
    const storeSchema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });
    const updateSchema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });
    super(
      modelClass,
      keyField,
      fields,
      display,
      queryObject,
      storeSchema,
      updateSchema,
      null,
      sendRegistrationMail
    );
  }

  async index(req, res) {
    this.includes = [
      {
        model: Student,
        as: 'student',
        where: {
          name: {
            [Op.like]: `%${req.query.name}%`,
          },
        },
      },
      {
        model: Plan,
        as: 'plan',
        attributes: ['title', 'price'],
      },
    ];
    return super.index(req, res);
  }

  async store(req, res) {
    await this.storeSchema.validate(req.body).catch(error => {
      const response = [];
      error.errors.map(msg => response.push({ message: msg }));
      return res.status(400).send(response);
    });

    const { student_id, plan_id, start_date } = req.body;

    const parsedStartDate = parseISO(start_date);

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json([{ message: 'Student does not exists' }]);
    }

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json([{ message: 'Plan does not exists' }]);
    }
    const { duration, price } = plan;
    const end_date = addMonths(parsedStartDate, duration);
    req.body.price = price * duration;
    req.body.end_date = end_date;
    req.body.start_date = parsedStartDate;

    return super.store(req, res);
  }

  async update(req, res) {
    await this.updateSchema.validate(req.body).catch(error => {
      const response = [];
      error.errors.map(msg => response.push({ message: msg }));
      return res.status(400).send(response);
    });
    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const parsedStartDate = parseISO(start_date);

    const registration = await Registration.findByPk(id);
    if (!registration) {
      res.status(400).json([{ message: 'Registration does not exists' }]);
    }

    if (student_id && student_id !== registration.student_id) {
      const student = await Student.findByPk(student_id);
      if (!student) {
        res.status(400).json([{ message: 'Student does not exists' }]);
      }
    }

    let plan = {};

    if (plan_id && plan_id !== registration.plan_id) {
      plan = await Plan.findByPk(plan_id);
      if (!plan) {
        res.status(400).json([{ message: 'Plan does not exists' }]);
      }
    } else {
      plan = await Plan.findByPk(registration.plan_id);
    }

    const { duration, price } = plan;
    req.body.price = price;

    if (start_date) {
      const end_date = addMonths(parsedStartDate, duration);
      req.body.end_date = end_date;
    }

    return super.update(req, res);
  }
}

export default new RegistrationController();
