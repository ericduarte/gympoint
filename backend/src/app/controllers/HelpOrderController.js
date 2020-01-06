import * as Yup from 'yup';
import { Op } from 'sequelize';
import BaseController from './BaseController';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import HelpOrderMail from '../jobs/HelpOrderMail';
import Queue from '../../lib/Queue';

const sendHelpOrderMail = async req => {
  const { id } = req.params;
  const answeredHelpOrder = await HelpOrder.findByPk(id, {
    include: [
      {
        model: Student,
        as: 'student',
        attributes: ['name', 'email'],
      },
    ],
  });

  await Queue.add(HelpOrderMail.key, {
    answeredHelpOrder,
  });
};

class HelpOrderController extends BaseController {
  constructor() {
    const modelClass = HelpOrder;
    const keyField = 'id';
    const fields = ['id', 'student_id', 'question', 'answer', 'answer_at'];
    const display = 'HelpOrder';
    const queryObject = null;
    const storeSchema = Yup.object().shape({
      question: Yup.string().required(),
    });
    const updateSchema = Yup.object().shape({
      answer: Yup.string().required(),
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
      null,
      sendHelpOrderMail
    );
  }

  /* async index(req, res) {
    this.queryObject = {
      student_id: req.params.student_id,
    };
    return super.index(req, res);
  } */

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
    ];
    return super.index(req, res);
  }

  async store(req, res) {
    await this.storeSchema.validate(req.body).catch(error => {
      const response = [];
      error.errors.map(msg => response.push({ message: msg }));
      return res.status(400).send(response);
    });

    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json([{ message: 'Student does not exists' }]);
    }

    req.body.student_id = student_id;

    return super.store(req, res);
  }

  async update(req, res) {
    await this.updateSchema.validate(req.body).catch(error => {
      const response = [];
      error.errors.map(msg => response.push({ message: msg }));
      return res.status(400).send(response);
    });

    req.body.answer_at = new Date();

    return super.update(req, res);
  }
}

export default new HelpOrderController();
