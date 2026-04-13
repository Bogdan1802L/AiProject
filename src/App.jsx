import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

function App() {
    return (
        <div className="flex h-screen w-screen bg-white overflow-hidden font-sans text-gray-900">
            <Sidebar />
            <ChatArea />
        </div>
    );
}

export default App;