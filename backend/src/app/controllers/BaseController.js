import handleSqlzErrors from '../utils/handleSqlzErrors';
import '../../config/yup.locale.pt-br';

class BaseController {
  constructor(
    modelClass,
    keyField,
    fields,
    display,
    where,
    storeSchema,
    updateSchema,
    includes,
    afterStore,
    afterUpdate,
    afterRemove
  ) {
    this.where = where;
    this.modelClass = modelClass;
    this.keyField = keyField;
    this.storeSchema = storeSchema;
    this.updateSchema = updateSchema;
    this.display = display;
    this.fields = fields;
    this.includes = includes;
    this.index = this.index.bind(this);
    this.store = this.store.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.show = this.show.bind(this);
    this.afterStore = afterStore;
    this.afterUpdate = afterUpdate;
    this.afterRemove = afterRemove;
  }

  async index(req, res) {
    const page = req.query.page ? req.query.page : 1;
    const pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const result = {};
    result.page = parseInt(page, 10);
    result.pageSize = parseInt(pageSize, 10);
    result.recordCount = await this.modelClass.count({
      include: this.includes,
      where: this.where,
    });
    try {
      result.list = await this.modelClass.findAll({
        attributes: this.fields,
        include: this.includes,
        where: this.where,
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).send(handleSqlzErrors(error) + error);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const result = await this.modelClass.findOne({
        attributes: this.fields,
        include: this.includes,
        where: { id },
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).send(handleSqlzErrors(error) + error);
    }
  }

  async store(req, res) {
    if (this.storeSchema) {
      await this.storeSchema.validate(req.body).catch(error => {
        const response = [];
        error.errors.map(msg => response.push({ message: msg }));
        return res.status(400).send(response);
      });
    }

    if (this.keyField && req.body[this.keyField]) {
      const exists = await this.modelClass.findOne({
        where: { [this.keyField]: req.body[this.keyField] },
      });

      if (exists) {
        return res.status(400).json({
          error: `${this.display ? this.display : 'Register'} already exists`,
        });
      }
    }

    try {
      const register = await this.modelClass.create(req.body);
      const fields = {};

      req.newId = register.id;

      this.fields.map(field => {
        fields[field] = register[field];
        return '';
      });

      if (this.afterStore) {
        await this.afterStore(req, res);
      }

      return res.json(fields);
    } catch (error) {
      return res.status(400).send(handleSqlzErrors(error));
    }
  }

  async update(req, res) {
    if (!(await this.updateSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let register = await this.modelClass.findByPk(req.params.id);

    if (!register) {
      return res.status(400).json({
        error: `${this.display ? this.display : 'Register'} does not exists`,
      });
    }

    try {
      register = await register.update(req.body);
      const fields = {};
      this.fields.map(field => {
        fields[field] = register[field];
        return '';
      });

      if (this.afterUpdate) {
        this.afterUpdate(req, res);
      }

      return res.json(fields);
    } catch (error) {
      console.log(error);
      return res.status(400).send(handleSqlzErrors(error));
    }
  }

  async remove(req, res) {
    const register = await this.modelClass.findByPk(req.params.id);

    if (!register) {
      return res.status(400).json({
        error: `${this.display ? this.display : 'Register'} does not exists`,
      });
    }

    await this.modelClass.destroy({
      where: { id: req.params.id },
    });

    if (this.afterRemove) {
      this.afterRemove(req, res);
    }

    return res.status(200).json(true);
  }
}

export default BaseController;
