/* eslint-disable react/jsx-props-no-spreading */
import { cloneElement } from 'react';
import { Col, Form, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import { BasicButton } from '../../../components/styled-components/BasicButton';

// function FormGroupCustom({ children, className, ...props }) {
//   return (
//     <FormGroup
//       className={`${className} d-flex align-items-center gap-2`}
//       {...props}
//     >
//       {children}
//     </FormGroup>
//   );
// }

const FormGroupCustom = styled(FormGroup).attrs({
  className: 'd-flex align-items-center gap-2',
})``;
const LabelCustom = styled(Label).attrs({
  className: 'mb-0 font-semibold',
})``;

export function Checkout() {
  return (
    <>
      <h1 className="mb-3">Checkout</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroupCustom>
          <LabelCustom for="fullName">Nombre</LabelCustom>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Escribe tu nombre completo"
            type="text"
            required
          />
        </FormGroupCustom>
        <FormGroupCustom>
          <LabelCustom for="email">Email</LabelCustom>
          <Input
            id="email"
            name="email"
            placeholder="Escribe tu email"
            type="email"
            required
          />
        </FormGroupCustom>
        <FormGroupCustom>
          <LabelCustom for="emailConfirmation">Email</LabelCustom>
          <Input
            id="emailConfirmation"
            name="emailConfirmation"
            placeholder="Confirma tu email"
            type="email"
            required
          />
        </FormGroupCustom>
        <BasicButton as={Input} type="submit" value="Finalizar compra" />
      </Form>
    </>
  );
}
