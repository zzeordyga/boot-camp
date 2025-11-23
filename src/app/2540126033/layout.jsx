export default function Layout({ children }) {
  const nama = "Yohanes Andrew Wijaya"
    const nim = "2540126033"
  return (
<div className=" profile flex flex-row items-center bg-blue-600">
        <div className='personInfo m-36'>
          <h1 id="name" className='text-white font-weight-800'>{nama}</h1>
          <h2 id="email" className='italic text-white'>{nim}</h2>
        </div>
        {children}
      </div>
      
  );
}
