
function Sidebar() {
  return (
    <div className="fixed top-28 w-64 h-[calc(100vh-7rem)] bg-black text-white flex flex-col">
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul>
          <li className="mb-4">
            <a href="#" className="block py-5 hover:text-gray-300">
              Home
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="block py-5 hover:text-gray-300">
              About
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="block py-5 hover:text-gray-300">
              Services
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="block py-5 hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar