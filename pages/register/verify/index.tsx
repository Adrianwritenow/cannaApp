import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/assets/logos/logo.png';
import React, { useEffect } from 'react';
import RegisterVerifyForm from '../../../src/components/forms/RegisterVerifyForm';
import { useRouter } from 'next/router';

export default function RegisterVerify() {
  const router = useRouter();
  let emailAddress = router.query.email || '';

  return (
    <div className="flex flex-col justify-center max-w-3xl mx-auto py-12 bg-white px-4">
      <div className="grid grid-cols-6 gap-0">
        <div className="h-12 w-12 relative col-span-1">
          <Image src={Logo} alt="CannaPages" layout={'responsive'} />
        </div>
      </div>

      <div className="max-w-md mr-auto">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          We need to verify your e-mail address
        </h2>
        <p className="text-base font-normal text-gray-600 pt-2">
          A one time passcode has been sent to{' '}
          <span className="font-bold">{emailAddress}</span>.
        </p>
        <p className="text-base font-normal text-gray-600 pt-2">
          Please enter the passcode below to verify your email address. Make
          sure to check your spam folder if you do not see the email.
        </p>
      </div>

      <div className="pt-8">
        <RegisterVerifyForm emailAddress={emailAddress} />
      </div>
    </div>
  );
}
