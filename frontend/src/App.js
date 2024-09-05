import {useState} from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'
function App() {

  const [msg,setmsg]=useState()
  const[status,setstatus]=useState(false) 
  const[emailList,setemailList]=useState([]) 
  function handlemsg(evt)
  {
    setmsg(evt.target.value)
  }

function handlefile(evt)
{
  
  const file = evt.target.files[0]
  const reader=new FileReader()
  reader.onload = function(evt)
  {
  const data = evt.target.result
  const workbook = XLSX.read(data,{type:'binary'})
  const sheetName= workbook.SheetNames[0]
  const worksheet=workbook.Sheets[sheetName]
  console.log(worksheet)
  const emailList=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
  const totalemail = emailList.map(function(item){return item.A})
setemailList(totalemail)
  
  
  }
  reader.readAsBinaryString(file)
}

  function send()
  {
    setstatus(true)
axios.post('https://bulkmailer-1-4iih.onrender.com',{msg:msg,emailList:emailList})
.then(function(data)
{
  if(data.data === true)
  {
    alert('Email sent successfully')
    setstatus(false)
  }
  else{
    alert('email not sent')
  }
})
  }

  return (
    <div>
      <div className='bg-blue-950 text-white text-center'>
<h1 className='text-2xl font-medium px-5 py-3'>Bulk Mail</h1>
      </div>

      <div className='bg-blue-800 text-white text-center'>
<h1 className=' font-medium px-5 py-3'>We can help your business with sending multiple emails at once</h1>
      </div>
      <div className='bg-blue-600 text-white text-center'>
<h1 className=' font-medium px-5 py-3'>Drag and Drop</h1>
      </div>

<div className='bg-blue-400 flex flex-col items-center text-black px-5 py-3'>
  <textarea onChange={handlemsg} value={msg} className='w-[80%] h-32 py-2 outline-none px-2 border border-black rounded-md' placeholder="Enter the email text..."></textarea>
<div>
  <input onChange={handlefile} type="file"  className='border-4 border-dashed p-4 m-5' />
</div>
  <p>Total Emails in the file: {emailList.length}</p>
  
      <button onClick={send} className= 'bg-blue-950 mt-2 p-2 text-white font-medium rounded-md w-fit'>{status?'Sending...':'Send'}{status}</button>
</div>
<div className='bg-blue-300 text-white text-center p-8'>
      </div>
      <div className='bg-blue-200 text-white text-center p-8'>

      </div>
      <div className='bg-blue-100 p-8'>
      </div>
      <div className='bg-blue-50 p-8  '></div>
    </div>
  );
}

export default App;
