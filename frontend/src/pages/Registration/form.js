/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { format, addMonths, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import Form from '../BasePage/form';
import AsyncSelect from '~/components/AsyncSelect';
import Label from '~/components/Label';
import Input from '~/components/Input';
import InfoInput from '~/components/InfoInput';
import { formatCurrencyBR, isValidDate } from '~/utils';
import api from '~/services/api';

export default function RegistrationForm({ ...props }) {
  const { formData } = props;
  const [startDate, setStartDate] = useState(null);
  const [plan, setPlan] = useState(null);
  const [student, setStudent] = useState(null);
  const [endDateFormatted, setEndDateFormatted] = useState('');
  const [priceFormatted, setPriceFormatted] = useState('');

  const schema = Yup.object().shape({
    student_id: Yup.string().required('Informa o estudante'),
    plan_id: Yup.number().required('Informe o plano'),
    start_date: Yup.date().required('Informe a data de início'),
  });

  useMemo(async () => {
    if (isValidDate(startDate) && plan) {
      const res = await api.get(`plans/${plan.id}`);
      const { duration, price } = res.data;

      const end = addMonths(startDate, duration);

      setEndDateFormatted(
        format(end, 'dd/MM/yyyy', {
          locale: pt,
        })
      );
      const priceCalc = duration * price;
      setPriceFormatted(formatCurrencyBR(priceCalc));
    }
  }, [startDate, plan]);

  async function loadStudents(value) {
    const res = await api.get('students', {
      params: {
        name: value || '',
        page: 1,
        perPage: 10,
      },
    });

    const { list } = res.data;

    return new Promise(resolve => {
      resolve(list);
    });
  }

  async function loadPlans(value) {
    const res = await api.get('plans', {
      params: {
        title: value || '',
        page: 1,
        pageSize: 10,
      },
    });

    const { list } = res.data;

    return new Promise(resolve => {
      resolve(list);
    });
  }

  const initialStudent = formData && {
    id: formData.student_id,
    name: formData.student.name,
  };

  const initialPlan = formData && {
    id: formData.plan_id,
    title: formData.plan.title,
  };

  const start_date = formData && formData.start_date;

  useEffect(() => {
    setPlan(initialPlan);
    setStudent(initialStudent);
    if (start_date) setStartDate(parseISO(start_date));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...props} schema={schema}>
      <Container>
        <Input name="id" hidden />
        <Row>
          <Col>
            <Label>Aluno</Label>
            <AsyncSelect
              placeholder="Digite o nome do aluno..."
              name="student_id"
              value={student}
              getOptionValue={option => option.id}
              getOptionLabel={option => option.name}
              onChange={e => setStudent(e)}
              loadOptions={loadStudents}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Label>Plano</Label>
            <AsyncSelect
              placeholder="Digite o plano..."
              name="plan_id"
              value={plan}
              getOptionValue={option => option.id}
              getOptionLabel={option => option.title}
              onChange={e => setPlan(e)}
              loadOptions={loadPlans}
            />
          </Col>
          <Col sm={3}>
            <Label>DATA DE INÍCIO</Label>
            <Input
              name="start_date"
              type="date"
              onChange={e => setStartDate(parseISO(e.target.value))}
            />
          </Col>
          <Col sm={3}>
            <Label>DATA DE TÉRMINO</Label>
            <InfoInput value={endDateFormatted} />
          </Col>
          <Col sm={3}>
            <Label>VALOR FINAL</Label>
            <InfoInput value={priceFormatted} />
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

RegistrationForm.propTypes = {
  formData: PropTypes.shape().isRequired,
};
