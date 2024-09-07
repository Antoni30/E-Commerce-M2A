
function NavbarItem({ name, Icon, link}) {
    return (
        <div className="text-white flex items-center gap-3 text-[20px] font-semibold cursor-pointer hover:underline underline-offset-8
        mb-2">
            <Icon />     
            <a href={link}><p className="">{name}</p></a>
        </div>
    );
}

export default NavbarItem;