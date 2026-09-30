export enum UserRole { Reader, Editor, Admin }

export interface User {
    readonly id: number;
    name: string;
    role: UserRole;
    email?: string;
}

export type UserField = keyof User;
export type ReadonlyUser<T extends User> = Readonly<T>;

/** Formats a user.
 * @param user The user to display.
 * @returns A readable label.
 */
export function formatUser<T extends User>(user: T): string {
    const email = user.email?.toLowerCase() ?? "missing";
    return `${user.name}: ${email}\nRole: ${UserRole[user.role]}`;
}

export class UserStore {
    static readonly maxUsers = 100;
    private users: User[] = [];

    async find(id: number): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    add(user: User): void {
        this.users.push(user);
    }
}

const user = {
    id: 1,
    name: "Ada",
    role: UserRole.Admin,
} satisfies User;

const emailPattern = /^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i;
console.log(formatUser(user), emailPattern.test("ada@example.com"));
