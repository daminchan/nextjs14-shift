"use client"
// CardDemo/index.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import React, { useState } from 'react';
type Props = {
  cardTitle: string;
  cardDescription: string;
  shifts: { date: number; start_time: string; end_time: string; }[];
  
  
};



const generateWeekDates = () => {
  const start = new Date();
  let dates = [];

  for (let i = 0; i < 14; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    let cssClass = ''; // 初期化

    const dayOfWeek = date.toLocaleString('ja-JP', { weekday: 'long' });


    if (dayOfWeek === '土曜日') {
      cssClass = "bg-blue-100"; // 土曜日の場合のCSSクラス名
    }else if
    (dayOfWeek ==="日曜日"){
      cssClass="bg-red-100"

    };



    dates.push({
      month: date.getMonth() + 1, // 月
      date: date.getDate(), // 日付
      dayOfWeek: date.toLocaleString('ja-JP', { weekday: 'long' }), // 曜日
      cssClass: cssClass, // 土曜日の場合にCSSクラスを割り当て
      // 他の必要なデータもここに追加できます
    });
  }

  return dates;
};


export const AdminShiftSchedule: React.FC<Props> = (props) => {
  const dates = generateWeekDates();
  const [visibleDates, setVisibleDates] = useState(dates.slice(0, 5));
  const [isExpanded, setIsExpanded] = useState(false); // データ拡張状態
  
  const showMore = () => {
    setVisibleDates(dates);
    setIsExpanded(true);
  };
  const showLess = () => {
    setVisibleDates(dates.slice(0, 5));
    setIsExpanded(false);
  };
  
  
  return (
    
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden ">
    <CardHeader className="h-32">
      <CardTitle>{props.cardTitle}</CardTitle>
      <CardDescription>{props.cardDescription}</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-between ">
      
    </CardContent >
    <Table >
        <TableCaption>シフト表です</TableCaption>
        <TableHeader>
        <TableRow>
                <TableHead className="w-[100px]">Month</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>DayOfWeek</TableHead>
                <TableHead className="text-right">Schedule</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
  {visibleDates.map((shift, index) => (
    <TableRow key={index} className={`transition-all duration-500 ${shift.cssClass}`}>
      <TableCell className="font-medium">{shift.month}月</TableCell>
      <TableCell>{shift.date}日</TableCell>
      <TableCell>{shift.dayOfWeek}</TableCell>
      <TableCell className="text-right">
      {props.shifts.find((s) => s.date === shift.date) ? (
          <>
            <div> {props.shifts.find((s) => s.date === shift.date)?.start_time}</div>
            
          </>
        ) : (
          "休み"
        )}
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">○○時間</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end p-2">
      {isExpanded ? (
            <button onClick={showLess} className="mt-4 transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">閉じる</button>
          ) : (
            <button onClick={showMore} className="mt-4 transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">もっと見る </button>
          )}
    </div>
  </Card>
  
  );
};