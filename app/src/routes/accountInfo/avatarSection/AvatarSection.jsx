import Avatar from "@mui/material/Avatar";

export default function AvatarSection({name, profile}) {
    return (
        <div className="w-full h-full flex flex-row justify-start items-center">
            <div id="profile" className='flex flex-row items-center justify-around'>
                <Avatar className='mr-3 w-20 h-20 text-4xl'>{name ? name.charAt(0) : ""}</Avatar>
                <div className="flex flex-col justify-center items-start ">
                    <p className="text-2xl text-blue-500 font-bold">{name}</p>
                    <p className="text-lg text-blue-300 ">{profile}</p>
                </div>
            </div>
        </div>
    );
}