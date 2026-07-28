"use client"

export default function Modal({ isOpen, onClose, onConfirm, title, children, confirmText = "Delete", cancelText = "Cancel" }){
    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="text-xl font-semibold text-red-600 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M1 21L12 2l11 19zm11.713-3.287Q13 17.425 13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18t.713-.288M11 15h2v-5h-2z"/>
                        </svg>
                        {title}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-lg">
                        ✕
                    </button>
                </div>

                <div className="mt-4">{children}</div>

                <div className="mt-6 flex justify-end gap-2">
                    <button onClick={onConfirm} className="rounded bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-800">
                        {confirmText}
                    </button>
                    <button onClick={onClose} className="rounded bg-gray-200 px-4 py-2 text-gray-800 font-semibold hover:bg-gray-300">
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    )
}