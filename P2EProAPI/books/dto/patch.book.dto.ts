import { BookDto } from './book.dto';

export interface PatchBookDto extends Partial<BookDto> {}
