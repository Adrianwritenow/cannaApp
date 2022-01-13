import moment from 'moment';

export const website =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
export const phoneNumber = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
export const ssn = /^\d{3}-?\d{2}-?\d{4}$/;

export function checkIfFilesAreTooBig(value: any): boolean {
  let valid = true;
  if (value) {
    value.forEach((file: File) => {
      const size = file.size / 1024 / 1024;
      if (size > 10) {
        valid = false;
      }
    });
  }
  return valid;
}

export function checkIfFilesArePdf(value: any): boolean {
  let valid = true;
  if (value) {
    value.forEach((file: File) => {
      if (file.type !== 'application/pdf') {
        valid = false;
      }
    });
  }
  return valid;
}

export function validateDate(value: any): boolean {
  const allowedDateFormats = [
    'MM/DD/YYYY',
    'MM/DD/YY',
    'M/D/YYYY',
    'M/D/YY',
    'MM-DD-YYYY',
    'MM-DD-YY',
    'M-D-YYYY',
    'M-D-YY',
    'MM.DD.YYYY',
    'MM.DD.YY',
    'M.D.YYYY',
    'M.D.YY',
  ];
  const multiDateValidator = (entered: any) => {
    return moment(entered, allowedDateFormats, true).isValid();
  };
  const dateIsValid = multiDateValidator(value);
  return dateIsValid ? true : false;
}
