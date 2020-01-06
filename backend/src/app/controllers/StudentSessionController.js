import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Student from '../models/Student';
import authConfig from '../../config/auth';

class StudentSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id } = req.body;

    const student = await Student.findOne({
      where: { id: student_id },
    });

    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    const { id, name } = student;

    return res.json({
      student: {
        id,
        name,
      },
      token: jwt.sign({ id, profile:'student' }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new StudentSessionController();
