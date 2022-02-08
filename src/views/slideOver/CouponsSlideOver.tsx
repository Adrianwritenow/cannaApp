import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/outline';
import { Coupon } from '@/interfaces/coupon';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import { SlideOverProps } from '@/interfaces/props/SlideOverProps';

export default function CouponSlideOver(props: {
  label: string;
  list: Coupon[];
}) {
  const { label, list } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className="desktop:border-b-2 border-gray-200 pb-6">
      <ProductResultsSection
        list={list}
        sponsored={false}
        label={label ? label : 'Results'}
        buttonLabel={'See more'}
        hideButton={true}
        stateFunction={setOpen}
        type={'COUPON'}
      />
    </div>
  );
}
