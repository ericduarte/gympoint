import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { registration } = data;
    await Mail.sendMail({
      to: `${registration.student.name} <${registration.student.email}>`,
      subject: 'Matrícula efetuada',
      template: 'registration',
      context: {
        student: registration.student.name,
        plan: registration.plan.title,
        price: registration.price.toLocaleString('pt-BR', 'BRL'),
        end_date: format(
          parseISO(registration.end_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

const RegEmail = new RegistrationMail();

export default RegEmail;
