import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Book {
    id: string;
    title: string;
    author: string;
    status: string;
    rating: number;
    notes?: string;
}

interface BookState {
    books: Book[];
}

const initialState: BookState = {
    books: []
};

export const bookSlice = createSlice({
    name: 'books',
        initialState,
        reducers: {
            setBooks: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload;
        },

        addBook: (state, action: PayloadAction<Book>) => {
            state.books.push(action.payload);
        },

        updateBook: (state, action: PayloadAction<Book>) => {
            const index = state.books.findIndex((book) => book.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        },

        deleteBook: (state, action: PayloadAction<string>) => {
            state.books = state.books.filter((book) => book.id !== action.payload);
        },
    },
});

export const { setBooks, addBook, updateBook, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;
