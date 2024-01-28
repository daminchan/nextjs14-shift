

import React, { useEffect, useState } from 'react';
import { getData } from '@/lib/data';
import { AdminShiftSchedule } from '@/components/shiftDataDisplay/AdminShiftSchedule';
import EditForm from '@/components/editShiftForm/editForm';

type Employee = {
  employee_id: number;
  name: string;
  description: string;
  shifts: { date: number; start_time: string; end_time: string; }[];
};



const AdminPage = () => {



  return (
<div>
   <EditForm></EditForm>
    </div>
  );
};

export default AdminPage;