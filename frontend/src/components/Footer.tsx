import { Textarea } from "./ui/textarea";

function Footer() {
  return (
    <div className="pb-4">
      <div className="flex justify-between px-4 items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Task.Co</h1>
          <p className="text-gray-500 max-w-96 my-4">
            Productiviy platform Task.co is always innvoating and improving by
            releasing new features and updates.
          </p>
          <p className="text-gray-500 ">connect@task.co.id</p>
        </div>
        <div>
            <Textarea placeholder="Send your message" className="w-[500px] h-40 border border-gray-300 shadow-2xl" />
        </div>
      </div>
      <div className="flex justify-between px-4 mt-8">
        <div className="text-black font-semibold">2024,Task.co. All Rights Reserved</div>
        <div>
            <div className="flex space-x-[26px]">
                <a href="/" className="text-gray-500">Privacy Policy</a>
                <a href="/" className="text-gray-500">Terms of Use</a>
                <a href="/" className="text-gray-500">Contact Us</a>
                <a href="/" className="text-gray-500">Cancellation & Refund</a>
            </div>    
        </div>
      </div>
    </div>
  );
}

export default Footer;
