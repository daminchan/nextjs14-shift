
type Employee = {
    employee_id: number;
    name: string;
    description: string;
    shifts: { date: number; start_time: string; end_time: string; }[];
  };
  

export const getData  = async ():Promise<Employee[]>=>{
    const res = await fetch('http://localhost:3004/EmployeeData',{next:{revalidate:0}});
  
    if(!res.ok){
      throw new Error("Something went wrong");
    }
    return res.json();
  };
  
  
  