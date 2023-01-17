
export const Modals = ({visibleModals}) => {
    return(
        (visibleModals.waitingModal && <WaitingModal/>) ||
        (visibleModals.errorModal && <ErrorModal/>)
    )
}

const WaitingModal = () => {
    return(
        <div className="absolute opacity-90 flex items-center justify-center left-1/2 -translate-x-1/2
         top-3/4 w-40 h-40">
            <div className="w-14 h-14 animate-spin-slow border-orange-500 border-4 rounded-full border-dotted"></div>
        </div>
    )
}

const ErrorModal = () => {
    return(
        <div className="absolute bg-black flex items-center justify-center left-1/2 -translate-x-1/2
         top-3/4 w-20 h-20 text-white">
            <p>Error <br/> to do</p>
        </div>
    )
}
