const ContactPage = () => {

  
  

    return (
      <div className="flex flex-col items-center gap-100 p-12  md:flex-row ">
        <div className="flex-1 h-500px relative">
            画像
        </div>
        <div className="flex-1 bg-slate-200 shadow-md p-2 rounded-lg ">
          <form className="flex flex-col gap-30 ">
            <input type="text" placeholder="Name"  className=" m-1 p-6 rounded border outline-none"/>
            <input type="text" placeholder="Email Address" className=" m-1 p-6 rounded border outline-none"/>
            <input type="text" placeholder="Phone Number" className=" m-1 p-6 rounded border outline-none"/>
            <textarea
             name="" 
             id=""
             cols={30}
             rows={10}
            placeholder="Message"
            className="m-1 p-6 rounded border outline-none"></textarea>
           <button className="m-1 p-6 font-bold border-5 rounded cursor-pointer bg-orange-200 text-gray-600">Send</button>
          </form>
        </div>
        
      </div>
    )
  }
  
  export default ContactPage