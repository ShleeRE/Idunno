export default function Search({text, textModifier}){

    function handleChange(event){
        textModifier(event.target.value)
    }

    return (
        <div className="fixed w-14 h-5 top-0.5 right-0.5 tablet:w-32">
            <input type="text" placeholder="Search..." className="text-xxs m-auto block w-full h-full tablet:text-xs
             text-center rounded border-pink-800 border-x-2 border-y-2" value={text} onChange={handleChange}/>
        </div>
    )

}