import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <main className="min-h-screen flex w-screen ">
      <Sidebar/>
      <div className="max-w-[calc(100%-16rem)] w-full bg-white ">
        
        <h1 className="text-3xl font-semibold text-black p-4">Dashboard</h1>
        <div className="p-4">
          <p className="font-semibold text-black text-lg">Welcome to Task.Co</p>
          <p className="text-gray-500">This is a simple task management app that helps you keep track of your tasks.</p>
        </div>                        
      </div>
    </main>
  );
}

export default Dashboard;
