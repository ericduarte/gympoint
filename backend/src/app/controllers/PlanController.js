import * as Yup from 'yup';
import { Op } from 'sequelize';
import BaseController from './BaseController';
import Plan from '../models/Plan';

class PlanController extends BaseController {
  constructor() {
    const modelClass = Plan;
    const keyField = null;
    const fields = ['id', 'title', 'duration', 'price'];
    const display = 'Plan';
    const where = null;
    const storeSchema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });
    const updateSchema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
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
      title: {
        [Op.like]: `%${req.query.title}%`,
      },
    };
    return super.index(req, res);
  }
}

export default new PlanController();
