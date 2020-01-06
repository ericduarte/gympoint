import { subDays } from 'date-fns';
import Sequelize, { Op } from 'sequelize';
import BaseController from './BaseController';
import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController extends BaseController {
  constructor() {
    const modelClass = Checkin;
    const keyField = 'id';
    const fields = ['id', 'student_id', 'created_at'];
    const display = 'Checkin';
    const queryObject = null;
    const storeSchema = null;
    const updateSchema = null;
    super(
      modelClass,
      keyField,
      fields,
      display,
      queryObject,
      storeSchema,
      updateSchema
    );
  }

  async store(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);
    if (!student) {
      res.status(400).json([{ message: 'Student does not exists' }]);
    }
    const today = new Date();
    const priorDate = subDays(today, 7);

    const data = await Checkin.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'checkins']],
      where: {
        student_id: {
          [Op.eq]: student_id,
        },
        created_at: {
          [Op.between]: [priorDate, today],
        },
      },
    });

    const { checkins } = data[0].dataValues;

    if (checkins >= 5) {
      return res
        .status(400)
        .json([
          { message: 'Could not do more then five checkins in seven days' },
        ]);
    }

    req.body.student_id = student_id;

    return super.store(req, res);
  }
}

export default new CheckinController();
