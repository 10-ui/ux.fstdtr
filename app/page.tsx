'use client';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
  const handleWeekChange = (offset: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + offset * 7);
      return newDate;
    });
  };
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const handleCopy = () => {
    if (phoneNumberRef.current) {
      navigator.clipboard.writeText(phoneNumberRef.current.value);
    }
  };
  return (
    <div className='max-w-3xl mx-auto p-4 sm:p-6 space-y-4'>
      <div className='flex items-center justify-between mb-4'>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
          onClick={() => handleWeekChange(-1)}>
          <ChevronLeftIcon className='w-5 h-5' />
          <span className='sr-only'>前週</span>
        </Button>
        <div className='text-lg font-medium'>
          {currentDate.toLocaleDateString('ja-JP', {
            month: 'long',
            year: 'numeric',
          })}
          {`第${Math.ceil(currentDate.getDate() / 7)}週`}
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
          onClick={() => handleWeekChange(1)}>
          <ChevronRightIcon className='w-5 h-5' />
          <span className='sr-only'>次週</span>
        </Button>
      </div>
      <div className='grid grid-cols-7 gap-4'>
        {[
          '一昨々日',
          '一昨日',
          '昨日',
          '今日',
          '明日',
          '明後日',
          '明々後日',
        ].map((day, index) => {
          const today = new Date();
          const targetDate = new Date(currentDate);
          targetDate.setDate(currentDate.getDate() + index - 3); // 今日を中心に曜日を調整
          const dayNumber = targetDate.getDate();
          const dayOfWeek = dayNames[targetDate.getDay()];
          const isWithinRange =
            Math.abs(today.getDate() - targetDate.getDate()) <= 3 &&
            today.getMonth() === targetDate.getMonth() &&
            today.getFullYear() === targetDate.getFullYear();
          return (
            <div
              key={index}
              className='flex flex-col items-center gap-1'>
              <span className='text-xs font-medium text-gray-400 dark:text-gray-500'>
                {dayOfWeek}
              </span>
              <span className='text-2xl font-medium'>
                {dayNumber}
              </span>
              {isWithinRange && (
                <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className='flex items-center justify-center gap-4 w-1/2'>
        <Input placeholder='電話番号' ref={phoneNumberRef} />
        <Button onClick={handleCopy}>コピー</Button>
      </div>
    </div>
  );
}
