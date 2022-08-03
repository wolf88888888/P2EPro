import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";
import BookList from "../components/BookList";
import CreateBook from "../components/CreateBook";
import { IRootState } from "../core/store";
import BooksAction from '../core/store/books/actions';

function App() {
    const dispatch = useDispatch();

    const bookState = useSelector((state: IRootState) => {
        return state.book;
    });

    useEffect(() => {
        dispatch({ type: BooksAction.FETCH_BOOKS });
    }, [dispatch]);

    const onCreate = (title: string, author: string) => {
        dispatch({type: BooksAction.CREATE_BOOK, title, author});
    }

    const onRemove = (id?: string) => {
        if (!!id) {
            dispatch({ type: BooksAction.REMOVE_BOOK, id });
        }
    }

    return (
        <div className="App flex flex-col min-h-screen">
            <AppHeader title="My Reading List" />
            <div className='content flex flex-col px-4 py-2 grow overflow-y-auto'>
                <BookList books={bookState.books} onRemove={onRemove} />
                <CreateBook onCreate={onCreate}/>
            </div>
        </div>
    );
}

export default App;
