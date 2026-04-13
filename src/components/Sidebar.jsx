import { Plus, MessageSquare, Settings, Trash2 } from 'lucide-react';

export default function Sidebar({ chats, activeChatId, onSelectChat, onNewChat, onDeleteChat }) {
    return (
        <div className="w-[280px] h-full flex flex-col bg-gray-50 border-r border-gray-200 flex-shrink-0">
            {/* Кнопка нового чата */}
            <div className="p-3">
                <button
                    onClick={onNewChat}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Новый чат
                </button>
            </div>

            {/* Список чатов */}
            <div className="flex-1 overflow-y-auto px-3">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-2">
                    ИСТОРИЯ ЧАТОВ
                </div>

                <div className="space-y-1">
                    {chats.map((chat) => {
                        const isActive = activeChatId === chat.id;
                        return (
                            <div
                                key={chat.id}
                                className={`group relative flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                                    isActive
                                        ? 'bg-white border border-gray-200 shadow-md ring-1 ring-gray-100'
                                        : 'hover:bg-gray-100 border border-transparent'
                                }`}
                                onClick={() => onSelectChat(chat.id)}
                            >

                                {/* Контент: Заголовок + Модель/Дата */}
                                <div className="flex-1 min-w-0">
                                    <div className={`text-sm font-bold truncate ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                                        {chat.title}
                                    </div>

                                    {/* Подпись модели и даты */}
                                    <div className="text-xs text-gray-500 mt-0.5 truncate flex items-center gap-1">
                                        {/* Делаем первую букву модели заглавной для красоты (gpt-4o -> Gpt-4o) */}
                                        <span className="capitalize">{chat.model}</span>
                                        <span>•</span>
                                        <span>{new Date(chat.createdAt).toLocaleDateString('ru-RU')}</span>
                                    </div>
                                </div>

                                {/* Кнопка удаления (появляется при наведении) */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteChat(chat.id);
                                    }}
                                    className={`p-1.5 rounded-lg transition-all ${
                                        isActive
                                            ? 'opacity-0 group-hover:opacity-100 hover:bg-red-50'
                                            : 'opacity-0 group-hover:opacity-100 hover:bg-red-100'
                                    }`}
                                >
                                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                                </button>
                            </div>
                        );
                    })}
                </div>

                {chats.length === 0 && (
                    <div className="text-center py-8 px-4">
                        <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">История пуста</p>
                    </div>
                )}
            </div>

            {/* Настройки */}
            <div className="p-3 border-t border-gray-200">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                    <Settings className="w-5 h-5" />
                    Настройки
                </button>
            </div>
        </div>
    );
}