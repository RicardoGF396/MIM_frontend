
function TopBar({icon, title} : {icon:string, title:string}) {
  return (
    <div className='h-[80px] border-b border-main-gray-300 flex items-center pl-8 gap-x-4'>
        <img className="filter-icon" src={icon} alt={icon} />
        <p className='font-semibold text-lg text-main-gray-900'> {title} </p>
    </div>
  )
}

export default TopBar