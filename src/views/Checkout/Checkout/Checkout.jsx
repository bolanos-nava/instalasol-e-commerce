/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  doc,
  documentId,
  getFirestore,
  where,
} from 'firebase/firestore';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CartContext } from '../../../contexts/CartContext';
import { BasicButton } from '../../../components/styled-components/BasicButton';
import { fetchCollection } from '../../../utils/utils';

const MySwal = withReactContent(Swal);

const FormGroupCustom = styled(FormGroup).attrs({
  className: 'd-flex align-items-center gap-2',
})``;
const LabelCustom = styled(Label).attrs({
  className: 'mb-0 font-semibold',
})``;

export function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    emailConfirmation: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [doEmailsMatch, setDoEmailsMatch] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    MySwal.fire({
      title: 'Procesando tu orden...',
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
    const db = getFirestore();
    e.preventDefault();

    const productsSnapshot = await fetchCollection('products', {
      filters: [where(documentId(), 'in', Object.keys(cart))],
    });
    const cartItems = productsSnapshot.docs;

    const order = {
      buyer: {
        name: formData.fullName,
        email: formData.email,
      },
      items: Object.entries(cart).map(([itemId, quantity]) => ({
        product_reference: doc(db, 'products', itemId),
        quantity,
      })),
      total: cartItems.reduce((accumulator, docu) => {
        const { price } = docu.data();
        const subtotal = cart[docu.id] * price;
        return accumulator + subtotal;
      }, 0),
    };

    const ordersRef = collection(db, 'orders');
    const newOrder = await addDoc(ordersRef, order);
    clearCart();
    MySwal.fire({
      title: '¡Orden procesada con éxito!',
      text: `El id de tu orden es ${newOrder.id}`,
      icon: 'success',
      showConfirmButton: true,
    }).then(() => navigate('/'));
  };

  useEffect(() => {
    const emailsMatch =
      (!formData.email && !formData.emailConfirmation) ||
      (formData.email && !formData.emailConfirmation) ||
      (formData.emailConfirmation &&
        formData.email === formData.emailConfirmation);
    setDoEmailsMatch(emailsMatch);

    setIsFormValid(
      Object.values(formData).every((value) => value !== '') && emailsMatch,
    );
  }, [formData]);

  return (
    <>
      <h1 className="mb-3">Checkout</h1>
      <Form onSubmit={onSubmit}>
        <FormGroupCustom>
          <LabelCustom for="fullName">Nombre</LabelCustom>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Escribe tu nombre completo"
            type="text"
            required
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </FormGroupCustom>
        <FormGroup className="d-flex flex-column">
          <div className="d-flex align-items-center gap-2">
            <LabelCustom for="emailConfirmation">Email</LabelCustom>
            <Input
              id="emailConfirmation"
              name="emailConfirmation"
              placeholder="Confirma tu email"
              type="email"
              required
              invalid={!doEmailsMatch}
              onChange={handleInputChange}
            />
          </div>
          {!doEmailsMatch && (
            <p className="text-red-500 text-sm">Los emails no coinciden</p>
          )}
        </FormGroup>
        <BasicButton
          as={Input}
          type="submit"
          value="Finalizar compra"
          disabled={!isFormValid}
        />
      </Form>
    </>
  );
}
