import * as Yup from 'yup';
import { Op } from 'sequelize';
import BaseController from './BaseController';
import Student from '../models/Student';

class StudentController extends BaseController {
  constructor() {
    const modelClass = Student;
    const keyField = null;
    const fields = ['id', 'name', 'email', 'age', 'weight', 'height'];
    const display = 'Pessoa';
    const where = null;
    const storeSchema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });
    const updateSchema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });
    super(
      modelClass,
      keyField,
      fields,
      display,
      where,
      storeSchema,
      updateSchema
    );
  }

  async index(req, res) {
    this.where = {
      name: {
        [Op.like]: `%${req.query.name}%`,
      },
    };
    return super.index(req, res);
  }
}

export default new StudentController();
