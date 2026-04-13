import { useState } from 'react';
import { Send, Paperclip, Sparkles, Code, Lightbulb, MessageCircle } from 'lucide-react';
import ModelSelector from './ModelSelector';
import Message from './Message';

export default function ChatArea() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    const exampleCards = [
        { icon: <Sparkles className="w-5 h-5" />, title: "Помощь с React", desc: "Создай структуру компонентов" },
        { icon: <Code className="w-5 h-5" />, title: "Написание кода", desc: "Помоги с алгоритмом" },
        { icon: <Lightbulb className="w-5 h-5" />, title: "Идея для стартапа", desc: "Придумай концепцию" },
        { icon: <MessageCircle className="w-5 h-5" />, title: "Просто поболтать", desc: "Обсуди любую тему" },
    ];

    const handleSend = () => {
        if (!inputValue.trim()) return;
        setMessages([...messages, { id: Date.now(), role: 'user', content: inputValue }]);
        setInputValue('');
    };

    const handleExampleClick = (text) => {
        setInputValue(text);
    };

    return (
        <div className="flex-1 flex flex-col bg-white h-full relative">
            {/* Хедер - только логотип */}
            <div className="h-16 border-b border-gray-200 flex items-center justify-start px-6 bg-white">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    <span className="font-bold text-xl text-gray-900">ReaChat</span>
                </div>
            </div>

            {/* Основная область */}
            <div className="flex-1 overflow-y-auto">
                {messages.length === 0 ? (
                    /* Начальный экран с приветствием */
                    <div className="h-full flex flex-col items-center justify-center px-4">
                        <div className="max-w-2xl w-full">
                            {/* Логотип и приветствие */}
                            <div className="text-center mb-2">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-0">ReaChat</h1>
                            </div>

                            {/* Выбор нейросети - ПОД логотипом */}
                            <div className="flex flex-col items-center mb-6">
                                <p className="text-base font-semibold text-gray-600 mb-2">
                                    Выберите нейросеть для начала работы
                                </p>
                                <ModelSelector />
                            </div>

                            {/* Приветственный текст */}
                            <p className="text-gray-500 text-center text-lg mb-10 max-w-md mx-auto">
                                Добро пожаловать в ReaChat — UI библиотеку для создания чатов с нейросетями
                            </p>

                            {/* Карточки-примеры */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
                                {exampleCards.map((card, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleExampleClick(card.title)}
                                        className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-left group shadow-sm hover:shadow-md"
                                    >
                                        <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                                            {card.icon}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 text-sm mb-0.5">
                                                {card.title}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {card.desc}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Сообщения чата */
                    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
                        {messages.map((msg) => (
                            <Message key={msg.id} role={msg.role} content={msg.content} />
                        ))}
                    </div>
                )}
            </div>

            {/* Поле ввода */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <div className="max-w-3xl mx-auto">
                    <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all shadow-sm">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>

                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Напишите сообщение..."
                            className="flex-1 bg-transparent border-0 focus:ring-0 text-gray-900 placeholder-gray-400 text-sm"
                        />

                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className={`p-2 rounded-xl transition-all ${
                                inputValue.trim()
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-200 text-gray-400'
                            }`}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-center text-[10px] text-gray-400 mt-2">
                        ReaChat может допускать ошибки. Проверяйте важную информацию.
                    </p>
                </div>
            </div>
        </div>
    );
}