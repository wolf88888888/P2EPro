import { render, fireEvent, screen } from '@testing-library/react';
import CreateBook from '.';

test('renders BookList', async () => {
    const bookTitle = "TEST BOOK TITLE";
    const bookAuthor = "TEST AUTHOR";
    const onCreate = jest.fn((title, author) => ({title, author}));

    render(<CreateBook onCreate={onCreate}/>);
    
    const titleInputElement = screen.getByPlaceholderText(/Book Title/i) as HTMLInputElement;
    expect(titleInputElement).toBeInTheDocument();

    const authorInputElement = screen.getByPlaceholderText(/Author/i) as HTMLInputElement;
    expect(authorInputElement).toBeInTheDocument();
    
    fireEvent.change(titleInputElement, {target: {value: bookTitle}})
    expect(titleInputElement.value).toBe(bookTitle)

    fireEvent.change(authorInputElement, {target: {value: bookAuthor}})
    expect(authorInputElement.value).toBe(bookAuthor)

    fireEvent.click(await screen.findByText(/Create/i))
    expect(onCreate).toHaveBeenCalled();
    expect(onCreate.mock.results[0].value.title).toBe(bookTitle)
    expect(onCreate.mock.results[0].value.author).toBe(bookAuthor)
});

