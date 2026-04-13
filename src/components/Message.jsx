export default function Message({ role, content }) {
    const isUser = role === 'user';

    return (
        <div className={`flex gap-4 mb-6 ${isUser ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
                {isUser ? 'U' : 'AI'}
            </div>

            <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    isUser
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                }`}>
                    {content}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
            </div>
        </div>
    );
}