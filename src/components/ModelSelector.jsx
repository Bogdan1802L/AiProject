import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

// Данные моделей с логотипами
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

export default function ModelSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(models[0]);

    return (
        <div className="relative z-50">
            {/* Кнопка выбора - более заметная */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
            >
                <div className="w-6 h-6 flex items-center justify-center">
                    <img src={selected.logo} alt={selected.name} className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-gray-900 text-sm">{selected.name}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* Выпадающий список - БОЛЬШОЙ и с картинками */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Затемнение фона при открытии */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[320px] bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden"
                        >
                            {/* Заголовок списка */}
                            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/80">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Выберите модель</p>
                            </div>

                            <div className="p-2 space-y-1">
                                {models.map((model) => (
                                    <motion.button
                                        key={model.id}
                                        whileHover={{ backgroundColor: '#f9fafb' }}
                                        onClick={() => {
                                            setSelected(model);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 border-2
                      ${selected.id === model.id
                                            ? 'border-blue-100 bg-blue-50'
                                            : 'border-transparent hover:border-gray-100'
                                        }`}
                                    >
                                        {/* Блок с логотипом */}
                                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 p-2 flex items-center justify-center shadow-sm flex-shrink-0">
                                            <img src={model.logo} alt={model.name} className="w-full h-full object-contain" />
                                        </div>

                                        {/* Информация */}
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-sm font-bold ${selected.id === model.id ? 'text-blue-900' : 'text-gray-900'}`}>
                                                {model.name}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-0.5 truncate">
                                                {model.desc}
                                            </div>
                                        </div>

                                        {/* Галочка выбора */}
                                        {selected.id === model.id && (
                                            <div className="bg-blue-600 rounded-full p-1 shadow-sm">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}