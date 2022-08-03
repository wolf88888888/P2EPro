import http from "./http-common";
import * as BookType from "./types/book.type";

class BookDataService {
    getAll() {
        return http.get<Array<BookType.IBookData>>("/books");
    }
    get(id: string) {
        return http.get<BookType.IBookData>(`/books/${id}`);
    }
    create(title: string, author: string) {
        return http.post<string>("/books", {title, author});
    }
    update(id: string, title: string, author: string) {
        return http.put<any>(`/books/${id}`, {title, author});
    }
    delete(id: any) {
        return http.delete<any>(`/books/${id}`);
    }
}
export default new BookDataService();
