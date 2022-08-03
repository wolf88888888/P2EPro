import { useState } from "react";

type CreateBookProps = {
    onCreate: (title: string, author: string) => void
}

const CreateBook = ({onCreate}: CreateBookProps) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const onClick = () => {
        onCreate(title, author);
        setTitle("");
        setAuthor("");
    };

    return (
        <>
            <div className='flex flex-col gap-2 py-2 w-full'>
                <label htmlFor='title'>
                    <input 
                        id="title" 
                        name="title" 
                        placeholder='Book Title' 
                        className='w-full border border-solid border-slate-400 p-2'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>
                <label htmlFor='author'>
                    <input 
                        id="author" 
                        name="author" 
                        placeholder='Author' 
                        className='w-full border border-solid border-slate-400 p-2' 
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                </label>
            </div>
            <div className='flex flex-row items-center justify-start'>
                <button className='px-9 py-2 bg-orange-600 rounded-3xl text-center text-base text-white font-bold' onClick={onClick}>Create</button>
            </div>
        </>
    );
};

export default CreateBook;

