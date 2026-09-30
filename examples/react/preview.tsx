import {
    createContext, Fragment, memo, useCallback, useContext, useEffect,
    useId, useMemo, useRef, useState,
    type ChangeEvent, type ReactNode,
} from 'react';

interface Item { readonly id: number; name: string }
interface ItemCardProps {
    item: Item;
    onSelect: (item: Item) => void;
    children?: ReactNode;
    'aria-label'?: string;
}

const UserContext = createContext<string>('Guest');

const UI = {
    Badge: memo(function Badge({ label }: { label: string }) {
        return <strong className="badge">{label}</strong>;
    }),
};

function useCounter(initialValue: number) {
    const [count, setCount] = useState(initialValue);
    const increment = useCallback(() => setCount(value => value + 1), []);
    return { count, increment };
}

function ItemCard({ item, onSelect, children, ...props }: ItemCardProps) {
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
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('');
    const { count, increment } = useCounter(0);
    const items = useMemo<Item[]>(() => [{ id: 1, name: 'Ada' }], []);
    const filteredItems = useMemo(() => items.filter(item => item.name.includes(query)), [items, query]);
    const extraProps = { 'aria-label': 'Item details' };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setQuery(event.currentTarget.value);
    }

    const handleSelect = useCallback((item: Item) => setQuery(item.name), []);

    return (
        <UserContext.Provider value="Ada">
            <>
                <label htmlFor={inputId}>Search</label>
                <input id={inputId} ref={inputRef} value={query} onChange={handleChange} />
                <button type="button" onClick={increment}>Clicks: {count}</button>
                {count > 0 && <UI.Badge label={`Count: ${count}`} />}
                {filteredItems.map(item => (
                    <Fragment key={item.id}>
                        <ItemCard item={item} onSelect={handleSelect} {...extraProps}>
                            <UI.Badge label={item.name} />
                        </ItemCard>
                    </Fragment>
                ))}
                {/* JSX comment with <tags> and {braces} */}
                <p>{filteredItems.length ? 'Results' : 'No results'}</p>
            </>
        </UserContext.Provider>
    );
}
