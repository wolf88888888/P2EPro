import { render, fireEvent, screen } from '@testing-library/react';
import BookItem from '.';

test('renders BookItem', async () => {
    const bookID = "testbookId";
    const bookTitle = "TEST BOOK TITLE";
    const bookAuthor = "TEST AUTHOR";
    const onRemove = jest.fn(id => id);
    render(<BookItem id={bookID} title = {bookTitle} author={bookAuthor} onRemove={onRemove}/>);
    const titleElement = screen.getByText(bookTitle);
    expect(titleElement).toBeInTheDocument();
    const authorElement = screen.getByText(bookAuthor);
    expect(authorElement).toBeInTheDocument();
    fireEvent.click(await screen.findByText(/X/i))
    expect(onRemove).toHaveBeenCalled();
    expect(onRemove.mock.results[0].value).toBe(bookID)
});

