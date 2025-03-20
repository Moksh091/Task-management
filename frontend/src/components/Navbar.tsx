
function Navbar() {
    
    return <div className="flex justify-between items-center">
        <div>
            <a href="/" className="text-black text-xl">Task.Co</a>
        </div>
        <div className="flex text-md text-gray-600 space-x-8">
            <a href="/" className="p-2">Product</a>
            <a href="/" className="p-2">Solutions</a>
            <a href="/" className="p-2">Pricing</a>
        </div>
        <div className="gap-4 flex">
            <a href="/login" className="p-2">Login</a>
            <a href="/" className="p-2 bg-[#938def] text-white rounded-lg">Get Started</a>
        </div>
    </div>
}

export default Navbar;