type AppHeaderCardProps = {
    title: string
}
  
const AppHeader = ({title} : AppHeaderCardProps) => {
    return (
        <header className="header h-16 flex flex-col justify-center bg-indigo-600 px-4">
            <h1 className="text-3xl font-bold text-white">
                {title}
            </h1>
        </header>
    );
}

export default AppHeader;