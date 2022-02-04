import { useEffect, useState } from 'react';

import { ResultWithLocationHours } from '@/interfaces/locationData';
import moment from 'moment-timezone';

export default function OpenIndicator(props: any) {
  const { dispensary } = props;
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);
  const [willOpenToday, setWillOpenToday] = useState(false);
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [dispensaryTimezone, setDispensaryTimezone] = useState('');
  const [tomorrowOpenTime, setTomorrowOpenTime] = useState('');
  let now = moment();

  //check to see if current time in timezone of dispensary is within open hours
  const currentTimeIsBetweenTzTime = (
    currentTime = new Date(),
    tmz: string,
    startTime: string,
    endTime: string,
    fmt = 'h:mma'
  ) => {
    if (endTime) {
      const time = moment.tz(currentTime, tmz);
      const start = moment.tz(startTime, fmt, tmz);
      //If end time falls on next day, add 24 hours to end time to determine if location is open still
      const end = endTime.endsWith('am')
        ? moment.tz(endTime, fmt, tmz).add(1, 'days')
        : moment.tz(endTime, fmt, tmz);

      return (
        time.isBetween(start, end) ||
        time.isBetween(start.subtract(1, 'day'), end.subtract(1, 'day')) ||
        time.isBetween(start.add(2, 'day'), end.add(2, 'day'))
      );
    }
  };

  // function to associate dispensary._source key with correct day time string
  function getSourceValue(key: keyof ResultWithLocationHours['_source']) {
    if (dispensary && Object.keys(dispensary._source).includes(key)) {
      return key as keyof ResultWithLocationHours['_source'];
    }
    throw Error('key not found');
  }

  useEffect(() => {
    if (dispensary && dispensaryTimezone === '') {
      const entityTimeZone = dispensary?._source.time_zone || [''];
      switch (entityTimeZone[0].toLowerCase()) {
        case 'est':
          setDispensaryTimezone('America/New_York');
          break;
        case 'cst':
          setDispensaryTimezone('America/Chicago');
          break;
        case 'mst':
          setDispensaryTimezone('America/Denver');
          break;
        case 'pst':
          setDispensaryTimezone('America/Los_Angeles');
          break;
        case 'cet':
          setDispensaryTimezone('Europe/Berlin');
          break;
      }
    } else if (dispensary && dispensaryTimezone) {
      const todayKey = getSourceValue(
        `${now
          .tz(dispensaryTimezone)
          .format('dddd')
          .toLowerCase()}_hours` as keyof ResultWithLocationHours['_source']
      );
      const tomorrowKey = getSourceValue(
        `${moment()
          .add(1, 'days')
          .tz(dispensaryTimezone)
          .format('dddd')
          .toLowerCase()}_hours` as keyof ResultWithLocationHours['_source']
      );

      const todayHours = (dispensary?._source[todayKey][0] as string).split(
        ' - '
      );
      const tomorrowHours = (
        dispensary?._source[tomorrowKey][0] as string
      ).split(' - ');
      const todayOpenTimeString = todayHours[0];
      const todayCloseTimeString = todayHours[1];
      const tomorrowOpenTimeString = tomorrowHours[0];
      const todayOpenMoment = moment.tz(
        todayOpenTimeString,
        'h:mmA',
        dispensaryTimezone
      );

      setOpenTime(todayOpenTimeString);
      setCloseTime(todayCloseTimeString);
      setTomorrowOpenTime(tomorrowOpenTime);

      setIsOpen(
        currentTimeIsBetweenTzTime(
          new Date(),
          dispensaryTimezone,
          todayOpenTimeString,
          todayCloseTimeString
        )
      );

      if (moment().tz(dispensaryTimezone).isBefore(todayOpenMoment)) {
        setWillOpenToday(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispensary, dispensaryTimezone]);

  if (openTime === '24 Hours') {
    return <span className="text-normal text-blue-500">Open 24 Hours</span>;
  }

  return (
    <div className="flex">
      {isOpen ? (
        <p className="text-normal text-blue-500">Open</p>
      ) : (
        <p className="text-normal text-red-500">Closed</p>
      )}
      <span className="px-1 text-normal text-gray-500">&#8226;</span>
      {!isOpen &&
      !willOpenToday &&
      tomorrowOpenTime.toLowerCase() === 'closed' ? (
        // if dispensary is closed and will not open tomorrow
        <p className="text-sm">
          <em>See hours</em>
        </p>
      ) : (
        <>
          <p className="text-gray-500">
            {!isOpen && willOpenToday
              ? `Opens ${openTime}`
              : !isOpen && !willOpenToday
              ? `Opens ${tomorrowOpenTime}`
              : ` Closes ${closeTime}`}
          </p>
        </>
      )}
    </div>
  );
}
