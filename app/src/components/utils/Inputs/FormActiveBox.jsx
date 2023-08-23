import React, { useState, useEffect } from 'react';

// this component represent a custom field very similar to a checkbox except that it is displayed as a button with custom color support
export default function FormActiveBox({id, required, label, colorVariantObject = {red: "bg-red-500",green: "bg-green-500"}, toggleItems, readOnly, value, onChange, variant="outlined", width="auto"})
{
    const [activeBoxIndex, setActiveBoxIndex] = useState(toggleItems.findIndex((item)=>item.value == value)); // this hook represent the current value of the button
    const notifDesign = {
        color: Object.keys(colorVariantObject)[activeBoxIndex], // this property define the overall color of the button
    }; // this state define the design of the buttons notification button
    const isTableMode = variant === "table"; // this check if the variant parameter value is table or not
    const bgColorVariants = colorVariantObject; // this object define the variant color of the background of the item

    // this function handle the toggle action
    const handleToggle = () => {
        const newActiveIndex = 1 - activeBoxIndex; // we change the index value of the button, 1 to 0 or 0 to 1
        setActiveBoxIndex(newActiveIndex); // we set the new index value to the hook
        onChange(id, toggleItems[newActiveIndex].value, true); // we then send the new change to the parent using the onChange function props
    }

    // this function check if the user holding the mouse down while being over the element
    const detectMouseDown = (e) => {
        if (e.buttons == 1) { // if the left mouse button is hold while hover then
            handleToggle(); // we trigger the toggle action
        }
    };

    useEffect(()=>{
        const newActiveIndex = toggleItems.findIndex((item)=>item.value == value);
        setActiveBoxIndex(newActiveIndex); // we set the new index value to the hook
        onChange(id, toggleItems[newActiveIndex].value, true); // we then send the new change to the parent using the onChange function props
    }, [value])


    return (
        <div id={id} className='flex flex-col justify-center items-center'>
            {
                activeBoxIndex != -1 &&
                <>
                    {label && <p>{label}</p>}
                    <button
                        style={{width:width}}
                        className={`${bgColorVariants[notifDesign.color]} text-white cursor-default py-1 px-2 ${isTableMode ? 'm-0' : 'm-0.5'} rounded ${!readOnly ? 'hover:opacity-75' : 'opacity-75'}`}
                        onMouseDown={!readOnly ? handleToggle : undefined}
                        onMouseOver={!readOnly ? detectMouseDown : undefined}
                    >
                        {toggleItems[activeBoxIndex].label}
                    </button>
                </>
            }
        </div>
    );
}