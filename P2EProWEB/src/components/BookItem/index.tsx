type BookItemProps = {
    id?: string,
    title: string,
    author: string,
    onRemove: (id?: string) => void
}

const BookItem = ({id, title, author, onRemove}: BookItemProps) => {
    return (
        <div className="flex flex-col px-4 py-3 w-full gap-2" style={{ borderRadius: '8px', backgroundColor: '#fbefe3'}}>
            <div className="flex flex-row items-center justify-between">
                <div data-testid="book-title" className='text-lg flex-1 text-left font-bold'>{title}</div>
                <div className='cursor-pointer' onClick={() => onRemove(id)}>X</div>
            </div>
            <div data-testid="book-author" className='text-base w-full text-orange-500 text-left font-bold'>{author}</div>
        </div>
    );
};

export default BookItem;
