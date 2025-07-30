import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div >
      <div className='h-screen bg-center bg-cover bg-[url(/start_background.png)] pt-8 w-full flex justify-between flex-col'>
        <img className='w-16 ml-8 scale-[1.5]' src="\saarthi_pages_logo.png" alt="" />
        <div className='bg-[#D4932D] pb-7 py-4 px-4'>
          <h2 className='text-3xl font-bold  text-[#FAF6EF]'>Begin Your Journey with Sarthi</h2>
          <Link to='/login' className='flex items-center justify-center font-[700] w-full bg-[#1D2A44] hover:bg-[#162033] text-white py-3 rounded-[8px] mt-4 transition duration-300'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
