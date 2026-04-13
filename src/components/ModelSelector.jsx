import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

const models = [
    {
        id: 'gpt-4o',
        name: 'GPT-4o',
        desc: 'Самая быстрая и умная модель от OpenAI',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/500px-ChatGPT_logo.svg.png'
    },
    {
        id: 'claude',
        name: 'Claude 3.5',
        desc: 'Лучший код и работа с длинными текстами',
        logo: 'https://yt3.googleusercontent.com/_AYZE3VGGjlD8tLScyYLu9jQ_mUQYpCoeUNb4mP1hjGO-xaZr5_X4bhL3Zv9wHdnuU4rnycSTg=s900-c-k-c0x00ffffff-no-rj'
    },
    {
        id: 'gemini',
        name: 'Gemini Pro',
        desc: 'Мультимодальная модель от Google',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/1200px-Google_Gemini_icon_2025.svg.png'
    },
];

export default function ModelSelector({ selectedModel, onSelectModel }) {
    const [isOpen, setIsOpen] = useState(false);
    const selected = models.find(m => m.id === selectedModel) || models[0];

    return (
        <div className="relative z-50">
            {/* Кнопка триггер */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 px-3 py-2 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
            >
                <div className="w-5 h-5 flex items-center justify-center bg-gray-50 rounded-md p-0.5">
                    <img src={selected.logo} alt={selected.name} className="w-full h-full object-contain" />
                </div>
                <span className="font-semibold text-gray-800 text-sm">{selected.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* Выпадающее меню */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Бэкдроп для закрытия по клику вне */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute top-full right-0 mt-2 w-[280px] bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden ring-1 ring-black/5"
                        >
                            {/* Заголовок дропдауна */}
                            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Модели</p>
                            </div>

                            <div className="p-1.5 space-y-0.5">
                                {models.map((model) => {
                                    const isSelected = selected.id === model.id;
                                    return (
                                        <motion.button
                                            key={model.id}
                                            whileHover={{ backgroundColor: '#f9fafb' }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => {
                                                onSelectModel(model.id);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200 ${
                                                isSelected ? 'bg-blue-50 ring-1 ring-blue-100' : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            {/* Логотип модели */}
                                            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${
                                                isSelected ? 'bg-white border-blue-200 shadow-sm' : 'bg-white border-gray-100'
                                            }`}>
                                                <img src={model.logo} alt={model.name} className="w-full h-full object-contain p-1" />
                                            </div>

                                            {/* Текст */}
                                            <div className="flex-1 min-w-0">
                                                <div className={`text-sm font-semibold ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                                                    {model.name}
                                                </div>
                                                <div className="text-[11px] text-gray-500 mt-0.5 truncate leading-tight">
                                                    {model.desc}
                                                </div>
                                            </div>

                                            {/* Индикатор выбора */}
                                            {isSelected && (
                                                <div className="bg-blue-600 rounded-full p-0.5 shadow-sm flex-shrink-0">
                                                    <Check className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}