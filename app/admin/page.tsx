"use client"

import React, { useEffect, useState } from 'react';
import { getData } from '@/lib/data';
import { AdminShiftSchedule } from '@/components/shiftDataDisplay/AdminShiftSchedule';

type Employee = {
  employee_id: number;
  name: string;
  description: string;
  shifts: { date: number; start_time: string; end_time: string; }[];
};



const EditForm = () => {

  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [newStartTime, setNewStartTime] = useState('');
  const [newShiftDate, setNewShiftDate] = useState('');
  const [newShiftStartTime, setNewShiftStartTime] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const newShiftDateNumber = parseInt(newShiftDate, 10);
  
  useEffect(() => {
    // モックデータを非同期で取得
    const fetchMockData = async () => {
      try {
        const data = await getData(); // getData関数を使用してモックデータを取得
        setEmployeeData(data);
      } catch (error) {
        console.error('モックデータの取得に失敗しました:', error);
      }
    };

    fetchMockData(); // モックデータの取得を実行
  }, []);

  const handleStartTimeChange = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedEmployeeData = employeeData.map(emp => {
      if (emp.employee_id.toString() === selectedEmployeeId){ // 特定の従業員のID
        return {
          ...emp,
          shifts: emp.shifts.map(shift => {
            if (shift.date.toString() === selectedDate) {
              return { ...shift, start_time: newStartTime };
            }
            return shift;
          })
        };
      }
      return emp;
    });

    setEmployeeData(updatedEmployeeData);
    setNewShiftDate(''); // 日付入力欄をリセット
  };
  const handleRemoveStartTime = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedEmployeeData = employeeData.map(emp => {
      if (emp.employee_id.toString() === selectedEmployeeId) {
        return {
          ...emp,
          shifts: emp.shifts.map(shift => {
            if (shift.date.toString() === selectedDate) {
              return { ...shift, start_time: "休み" };
            }
            return shift;
          })
        };
      }
      return emp;
    });
  
    setEmployeeData(updatedEmployeeData);
    setNewShiftDate(''); // 日付入力欄をリセット
  };
  const handleAddShift = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 新しいシフトオブジェクトを作成
    const newShift = { date: newShiftDateNumber, start_time: newShiftStartTime, end_time: '' };
  
    // 従業員データを更新するためのマップ処理
    const updatedEmployeeData = employeeData.map(emp => {
      // 選択された従業員IDと一致する場合のみ処理
      if (emp.employee_id.toString() === selectedEmployeeId) {
        // シフトが存在するかどうかのフラグ
        let shiftExists = false;
  
        // シフトの更新（または追加）処理
        const updatedShifts = emp.shifts.map(shift => {
          // 既存のシフトと日付が一致する場合は更新
          if (shift.date === newShift.date) {
            shiftExists = true;
            return { ...shift, start_time: newShift.start_time };
          }
          return shift;
        });
  
        // 既存のシフトがあれば更新、なければ新しいシフトを追加
        return shiftExists ? { ...emp, shifts: updatedShifts } : { ...emp, shifts: [...emp.shifts, newShift] };
      }
      return emp;
    });
  
    // 従業員データの状態を更新
    setEmployeeData(updatedEmployeeData);
  
    // 入力フィールドをリセット
   
    
    setNewShiftStartTime('');
  };

  return (
<div className="container mx-auto">
      <div className="rounded-lg  text-card-foreground max-w-xs mx-auto  bg-slate-200 shadow-md">
    <form onSubmit={handleAddShift}  className="max-w-lg mx-auto space-y-1 p-4">
      <input className="p-2 rounded border outline-none w-full"type="number"placeholder="従業員IDを入力"value={selectedEmployeeId}onChange={(e) => setSelectedEmployeeId(e.target.value)}/>
      <input placeholder="日付を入力" type="number" value={newShiftDate} onChange={(e) => setNewShiftDate(e.target.value)} className="p-2 rounded border outline-none w-full" /> 
      <input placeholder="シフト入力欄" value={newShiftStartTime} onChange={(e) => setNewShiftStartTime(e.target.value)}  className=" p-2 rounded border outline-none w-full"/>
      <button type="submit"  className="bg-emerald-300 hover:bg-emerald-500 text-gray-600  hover:text-gray-100 font-bold py-2 rounded w-full ">追加</button>
    </form>
    {/* 休みの日付入力フォーム */}
    <form onSubmit={handleStartTimeChange} className="max-w-lg mx-auto space-y-4 p-4">
       <input  className="p-2 rounded-lg w-full"type="number"placeholder="休みにしたい日付"value={selectedDate}onChange={(e) => setSelectedDate(e.target.value)}/>
       <button type="button" onClick={handleRemoveStartTime} className="bg-orange-200 hover:bg-orange-500 text-gray-600 hover:text-gray-100 font-bold  py-2 w-full rounded">休み</button>
    </form>
  </div>
  <div className="container pt-32 grid grid-cols-1 gap-10 xl:grid-cols-3"> {employeeData.map((emp, index) => (
            <AdminShiftSchedule
            key={emp.employee_id} // ユニークなキーを設定
            cardTitle={emp.name}
            cardDescription={emp.description}
            shifts={emp.shifts} // 
            ></AdminShiftSchedule>
          ))}</div>

    </div>
  );
};

export default EditForm;