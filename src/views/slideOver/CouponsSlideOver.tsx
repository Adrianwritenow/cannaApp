import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/outline';
import { Coupon } from '@/interfaces/coupon';
import ProductResultsSection from '../../components/sections/ProductsResultsSection';
import { SlideOverProps } from '../../interfaces/props/SlideOverProps';
import { coupons } from '../../helpers/mockData';

export default function CouponSlideOver(props: {
  label: string;
  list: Coupon[];
}) {
  const { label, list } = props;
  const [open, setOpen] = useState(false);
  return (
    <ProductResultsSection
      list={list}
      sponsored={false}
      label={label ? label : 'Results'}
      buttonLabel={'See more'}
      hideButton={true}
      stateFunction={setOpen}
      type={'COUPON'}
    />
  );
}
