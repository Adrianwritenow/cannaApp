import Image from 'next/image';

const incentives = [
  {
    name: 'Free shipping',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
    description:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: '10-year warranty',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
    description:
      "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: 'Exchanges',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
];
export default function Home() {
  return (
    <div className="mx-auto ">
      {/* Hero section */}
      <div className="relative ">
        <div className="absolute inset-x-0 bottom-0 bg-gray-100" />
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative h-96 shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <Image
                className={'h-full w-full object-cover'}
                src={
                  'https://images.unsplash.com/photo-1597266028990-0d03b2e9a2a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2503&q=80'
                }
                alt="Marijuana Bud"
                layout="fill"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-700 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="mx-auto ">
        <div className="bg-gray-100 py-16 ">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                We built our business on customer service
              </h2>
            </div>
            <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 gap-y-10 gap-x-8  lg:grid-cols-3">
              {incentives.map(incentive => (
                <div
                  key={incentive.name}
                  className="text-center sm:flex sm:text-left lg:block lg:text-center"
                >
                  <div className="sm:flex-shrink-0">
                    <div className="flow-root">
                      <div className="w-16 h-16 mx-auto relative ">
                        <Image
                          src={incentive.imageSrc}
                          layout="fill"
                          alt="incentive"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                    <h3 className="text-sm font-medium text-gray-900">
                      {incentive.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {incentive.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
