import * as BookType from "../../core/services/types/book.type";
import BookItem from "../BookItem";

type BookListProps = {
    books: BookType.IBookData[],
    onRemove: (id?: string) => void
}

const BookList = ({books, onRemove}: BookListProps) => {
    return (
        <div className="flex flex-col gap-4 py-4 w-full">
            {(books || []).map((book: BookType.IBookData) => 
                <BookItem key={book.id} id={book.id} title={book.title} author={book.author} onRemove={onRemove}/>
            )}
        </div>
    );
};

export default BookList;