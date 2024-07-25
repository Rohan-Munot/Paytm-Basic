// eslint-disable-next-line react/prop-types
export function Button({label, onClick}) {
    return (
        <div >
            <button onClick={onClick} type={"button"} className={'w-full text-white bg-gray-800 font-medium py-2.5 px-5 me-2 mb-2'}>
                {label}
            </button>
        </div>
    )
}