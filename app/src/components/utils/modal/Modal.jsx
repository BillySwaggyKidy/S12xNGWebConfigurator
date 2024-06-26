
export default function Modal({title, body, buttonName, close}) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-60 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <svg
                            className="h-6 w-6 text-green-600"
                            fill="none"
                            strokeWidth="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                    </div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Successful!</h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-500">
                            Account has been successfully registered!
                        </p>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button
                            id="ok-btn"
                            className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                            onClick={close}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}