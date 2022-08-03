import { render, fireEvent, screen } from '@testing-library/react';
import BookList from '.';
import { IBookData } from '../../core/services/types/book.type';

test('renders BookList', async () => {
    const itemCnt = 3;
    const bookID = "testbookId";
    const bookTitle = "TEST BOOK TITLE";
    const bookAuthor = "TEST AUTHOR";
    const onRemove = jest.fn(id => id);
    const books: IBookData[] = [];

    for (let i = 0; i < itemCnt; i ++) {
        books.push({
            id: bookID + i,
            title: bookTitle + i,
            author: bookAuthor + i,
        })
    }
    render(<BookList books={books} onRemove={onRemove}/>);
    const titleElements = await screen.findAllByTestId(/book-title/i);
    expect(titleElements).toHaveLength(itemCnt)
    
    const authorElements = await screen.findAllByTestId(/book-author/i);
    expect(authorElements).toHaveLength(itemCnt)

    const removeElements = await screen.findAllByText(/X/i);
    expect(removeElements).toHaveLength(itemCnt)

    for (let i = 0; i < itemCnt; i ++) {
        expect(titleElements[i]).toBeInTheDocument();
        expect(authorElements[i]).toBeInTheDocument();

        fireEvent.click(removeElements[i])
        expect(onRemove).toHaveBeenCalled();
        expect(onRemove.mock.results[i].value).toBe(bookID + i)
    }
});

