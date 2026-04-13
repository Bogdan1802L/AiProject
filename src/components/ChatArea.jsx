import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Sparkles, Code, Lightbulb, MessageCircle, X, File, Image as ImageIcon } from 'lucide-react';
import ModelSelector from './ModelSelector';
import Message from './Message';

export default function ChatArea({ activeChat, activeChatId, selectedModel, onModelChange, onSendMessage }) {
    const [inputValue, setInputValue] = useState('');
    const [attachedFiles, setAttachedFiles] = useState([]);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeChat?.messages]);

    // ✅ Убрал проверку `|| !activeChatId`, чтобы разрешить отправку при создании нового чата
    const handleSend = () => {
        if (!inputValue.trim() && attachedFiles.length === 0) return;

        onSendMessage({
            content: inputValue.trim(),
            files: attachedFiles
        });

        setInputValue('');
        setAttachedFiles([]);
    };

    const handleExampleClick = (text) => {
        setInputValue(text);
    };

    const handlePaperclipClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newFiles = files.map(file => ({
            file,
            id: `${Date.now()}-${Math.random()}`,
            name: file.name,
            size: file.size,
            type: file.type,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
        }));

        setAttachedFiles(prev => [...prev, ...newFiles]);
        e.target.value = '';
    };

    const removeFile = (fileId) => {
        setAttachedFiles(prev => {
            const fileToRemove = prev.find(f => f.id === fileId);
            if (fileToRemove?.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }
            return prev.filter(f => f.id !== fileId);
        });
    };

    const getFileIcon = (type) => {
        if (type?.startsWith('image/')) {
            return <ImageIcon className="w-4 h-4" />;
        }
        return <File className="w-4 h-4" />;
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    useEffect(() => {
        return () => {
            attachedFiles.forEach(file => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [attachedFiles]);

    const exampleCards = [
        { icon: <Sparkles className="w-5 h-5" />, title: "Помощь с React", desc: "Создай структуру компонентов" },
        { icon: <Code className="w-5 h-5" />, title: "Написание кода", desc: "Помоги с алгоритмом" },
        { icon: <Lightbulb className="w-5 h-5" />, title: "Идея для стартапа", desc: "Придумай концепцию" },
        { icon: <MessageCircle className="w-5 h-5" />, title: "Просто поболтать", desc: "Обсуди любую тему" },
    ];

    return (
        <div className="flex-1 flex flex-col bg-white h-full relative">
            <div className="h-16 border-b border-gray-200 flex items-center justify-start px-6 bg-white">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    <span className="font-bold text-xl text-gray-900">ReaChat</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {!activeChatId || activeChat?.messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center px-4">
                        <div className="max-w-2xl w-full">
                            <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-0">ReaChat</h1>
                            </div>

                            <div className="flex flex-col items-center mb-6">
                                <p className="text-lg font-semibold text-gray-800 mb-2">
                                    Выберите нейросеть для начала работы
                                </p>
                                <ModelSelector
                                    selectedModel={selectedModel}
                                    onSelectModel={onModelChange}
                                />
                            </div>

                            <p className="text-gray-500 text-center text-lg mb-8 max-w-md mx-auto">
                                Добро пожаловать в ReaChat — UI библиотеку для создания чатов с нейросетями
                            </p>

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
                                            <div className="font-medium text-gray-900 text-sm mb-0.5">{card.title}</div>
                                            <div className="text-xs text-gray-500">{card.desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
                        {activeChat.messages.map((msg) => (
                            <Message key={msg.id} role={msg.role} content={msg.content} timestamp={msg.timestamp} files={msg.files} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
                <div className="max-w-3xl mx-auto">
                    {attachedFiles.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                            {attachedFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg group"
                                >
                                    <div className="text-gray-500">
                                        {getFileIcon(file.type)}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                                            {file.name}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {formatFileSize(file.size)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="p-1 hover:bg-gray-200 rounded-md transition-colors ml-1"
                                    >
                                        <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all shadow-sm">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            multiple
                            accept="image/*,.pdf,.doc,.docx,.txt"
                            className="hidden"
                        />

                        <button
                            onClick={handlePaperclipClick}
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-1 transition-colors"
                            title="Прикрепить файл"
                        >
                            <Paperclip className="w-5 h-5" />
                        </button>

                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Напишите сообщение..."
                            className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-400 text-sm h-6 leading-6 py-0 my-auto"
                        />

                        {/* ✅ Убрал зависимость от activeChatId в disabled и className */}
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim() && attachedFiles.length === 0}
                            className={`p-2 rounded-xl transition-all ${
                                inputValue.trim() || attachedFiles.length > 0
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