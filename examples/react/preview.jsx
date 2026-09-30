import { createContext, memo, useContext, useEffect, useId, useRef, useState } from 'react';

const UserContext = createContext('Guest');
const UI = {
    Badge: memo(function Badge({ label }) {
        return <strong className="badge">{label}</strong>;
    }),
};

function useCounter(initialValue) {
    const [count, setCount] = useState(initialValue);
    return { count, increment: () => setCount(value => value + 1) };
}

function ItemCard({ item, onSelect, children, ...props }) {
    const user = useContext(UserContext);
    return (
        <article {...props}>
            <button type="button" onClick={() => onSelect(item)}>{item.name}</button>
            <small>Selected by {user} &amp; friends</small>
            {children}
        </article>
    );
}

export default function ReactPreview() {
    const inputId = useId();
    const inputRef = useRef(null);
    const [query, setQuery] = useState('');
    const { count, increment } = useCounter(0);
    const item = { id: 1, name: 'Ada' };
    const extraProps = { 'aria-label': 'Item details' };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    function handleChange(event) {
        setQuery(event.currentTarget.value);
    }

    return (
        <UserContext.Provider value="Ada">
            <>
                <label htmlFor={inputId}>Search</label>
                <input id={inputId} ref={inputRef} value={query} onChange={handleChange} />
                <button type="button" onClick={increment}>Clicks: {count}</button>
                {count > 0 && <UI.Badge label={`Count: ${count}`} />}
                <ItemCard key={item.id} item={item} onSelect={() => setQuery(item.name)} {...extraProps}>
                    <UI.Badge label={item.name} />
                </ItemCard>
                {/* JSX comment with <tags> and {braces} */}
                <p>{query ? 'Results' : 'No results'}</p>
            </>
        </UserContext.Provider>
    );
}
