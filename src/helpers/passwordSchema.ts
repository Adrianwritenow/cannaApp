import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string()
    .email('Email address does not look complete')
    .required('Email address is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .test('len', 'Must be exactly 8 or more characters', val =>
      val ? val?.length >= 8 : false
    )
    .matches(/(?=.*[a-z])/, 'Must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/, 'Must contain at least one Uppercase letter')
    .matches(/(?=.*[0-9])/, 'Must contain at least one Number')
    .matches(
      /(?=.*[^a-zA-Z0-9])/,
      'Must contain at least one Special character'
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    "That doesn't match your New Password"
  ),
});
