import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { answeredHelpOrder } = data;
    console.log(data);
    await Mail.sendMail({
      to: `${answeredHelpOrder.student.name} <${answeredHelpOrder.student.email}>`,
      subject: 'Sua pedido de auxílio foi respondido',
      template: 'help_order',
      context: {
        student: answeredHelpOrder.student.name,
        question: answeredHelpOrder.question,
        answer: answeredHelpOrder.answer,
        answer_at: format(
          parseISO(answeredHelpOrder.answer_at),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

const HelpMail = new HelpOrderMail();

export default HelpMail;
