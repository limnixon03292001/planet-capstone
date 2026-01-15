import * as yup from 'yup';

//Validatin schema/logic

export const validationSchemaRegistration = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(5, 'Password should be of minimum 5 characters length')
      .required('Password is required'),
    confirmPassword: yup
      .string('Enter your Confirm password')
      .min(5, 'Confirm Password should be of minimum 5 characters length')  
      .required('Password is required')
      .oneOf([yup.ref('password')], 'Your password do not match.'),
    firstName: yup
        .string('Enter your firstname')
        .min(2, 'Firstname should be of minimum 2 characters length')
        .required('Firstname is required'),
    lastName: yup
        .string('Enter your lastname')
        .min(2, 'Lastname should be of minimum 2 characters length')
        .required('Lastname is required'),
    baranggay: yup
        .string('Enter your baranggay')
        .min(2, 'Baranggay should be of minimum 2 characters length')
        .required('Baranggay is required'),
    city: yup
        .string('Enter your city')
        .min(2, 'City should be of minimum 2 characters length')
        .required('City is required'),
    birthday: yup
        .string('Enter your birthday')
        // .min(8, 'Birthday should be of minimum 5 characters length')
        .required('Birthday is required'),
    age: yup
        .number('Enter your age')
        // .max(11, 'You contact number should be of max of 11 numbers length')
        .required('Age number is required'),
    phoneNumber: yup
        .number('Enter your Phone number')
        // .max(11, 'You contact number should be of max of 11 numbers length')
        .required('Phone number is required'),
});

export const validationSchemaLogin = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(5, 'Password should be of minimum 5 characters length')
        .required('Password is required'),
});