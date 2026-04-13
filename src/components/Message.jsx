import { File, Image as ImageIcon } from 'lucide-react';

export default function Message({ role, content, timestamp, files = [] }) {
    const isUser = role === 'user';

    const formattedTime = timestamp
        ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="w-full flex flex-col mb-8 items-start">
            {isUser ? (
                <div className="max-w-3xl w-full">
                    <div className="bg-gray-100 px-6 py-4 rounded-2xl border border-gray-200 flex flex-col gap-3">
                        {content && (
                            <p className="text-[17px] font-bold text-gray-900 leading-relaxed">
                                {content}
                            </p>
                        )}

                        {files && files.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg"
                                    >
                                        {file.type?.startsWith('image/') ? (
                                            <ImageIcon className="w-4 h-4 text-blue-500" />
                                        ) : (
                                            <File className="w-4 h-4 text-gray-500" />
                                        )}
                                        <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                        {file.name}
                      </span>
                                            <span className="text-xs text-gray-400">
                        {formatFileSize(file.size)}
                      </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {timestamp && (
                        <div className="text-[11px] text-gray-400 mt-1.5 ml-1">
                            {formattedTime}
                        </div>
                    )}
                </div>
            ) : (
                <div className="max-w-3xl w-full bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border border-blue-100 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between px-6 pt-4 pb-2 border-b border-blue-100/50">
             <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
               Session 1
             </span>
                        {timestamp && <span className="text-[10px] text-gray-400">{formattedTime}</span>}
                    </div>

                    <div className="px-6 py-4">
                        <p className="text-sm text-gray-800 leading-relaxed">
                            {content}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}