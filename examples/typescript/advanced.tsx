interface User { readonly id: number; name: string }

type Unwrap<T> = T extends Promise<infer U> ? U : never;
type Getters<T> = {
    -readonly [K in keyof T as `get${Capitalize<string & K>}`]-?: T[K]
};
type Result = { kind: "ok"; value: User } | { kind: "error"; error: Error };
type Names = Array<User>;

const user = { id: 1, name: "Ada" } as const satisfies User;
const { name: label, ...rest } = user;
enum Role { Reader, Admin = "admin" }

class Store {
    constructor(public readonly user: User, private role: Role) {}
}

declare function dec(...args: any[]): any;
declare function factory(...args: any[]): any;

@dec(factory("direct"), { nested: factory(1) }, () => factory(2))
class Decorated {}

/** @param user Input; see {@link User}. */
function format<T extends User>(user: T) {
    return `${user.name.toUpperCase()}\n`;
}

const rx = /^(?<word>[a-z]+)\s+\k<word>$/giu;

declare function Card<T extends User>(props: { user: T }): any;
const view = <div title={format(user)}><Card<User> user={user} />{label}</div>;
