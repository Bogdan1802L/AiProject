import { Plus, MessageSquare, Settings } from 'lucide-react';

export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full flex-shrink-0">
            {/* Кнопка Новый чат */}
            <div className="p-4">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm">
                    <Plus className="w-5 h-5" />
                    <span>Новый чат</span>
                </button>
            </div>

            {/* Список чатов */}
            <div className="flex-1 overflow-y-auto px-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
                    СЕГОДНЯ
                </div>

                <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-left hover:shadow-md transition-shadow">
                        <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div className="overflow-hidden">
                            <div className="text-sm font-medium text-gray-900 truncate">
                                Помощь с React
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                                GPT-4o • 5 мин назад
                            </div>
                        </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-200 rounded-xl text-left transition-colors">
                        <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div className="overflow-hidden">
                            <div className="text-sm font-medium text-gray-700 truncate">
                                Идея для стартапа
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                                Claude • Вчера
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Настройки внизу */}
            <div className="p-4 border-t border-gray-200">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                    <Settings className="w-5 h-5" />
                    Настройки
                </button>
            </div>
        </div>
    );
}