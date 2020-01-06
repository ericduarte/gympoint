import HelpOrder from '../models/HelpOrder';

class StudentHelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      attributes: ['id','question', 'answer', 'answer_at','created_at'],
      where : {
        student_id : req.params.student_id
      }
    });
    return res.status(200).json(helpOrders);
  }
}

export default new StudentHelpOrderController();
