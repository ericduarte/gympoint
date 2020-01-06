import Sequelize from 'sequelize';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Checkin from '../app/models/Checkin';
import HelpOrder from '../app/models/HelpOrder';
import Registration from '../app/models/Registration';
import databaseConfig from '../config/database';

const models = [User, Student, Plan, Checkin, HelpOrder, Registration];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  async shutdown() {
    this.connection.close();
  }
}

export default new Database();
