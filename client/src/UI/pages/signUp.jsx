import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import RegisterForm from '../components/Form';
import {
  patientFields,
  doctorFields,
  insuranceCompanyFields,
  laboratoryFields,
  pharmacyVendorFields,
} from '../../utils/FormFields.js';

const SignUp = () => {
  const location = useLocation();
  const { from } = location.state || { from: 'doctorReg' };

  let fields;

  switch (from) {
    case 'doctorReg':
      fields = doctorFields;
      break;
    case 'insuranceCompanyReg':
      fields = insuranceCompanyFields;
      break;
    case 'laboratoryReg':
      fields = laboratoryFields;
      break;
    case 'pharmacyVendorReg':
      fields = pharmacyVendorFields;
      break;
    case 'patientReg':
      fields = patientFields;
  }

  return <RegisterForm fields={fields} />;
};

export default SignUp;
