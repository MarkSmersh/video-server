import { randomEmoji, randomName } from "./generators";

class Users {
    private users: User[] = [];

    add(id: string) {
        this.users.push({
            id: id,
            name: this.generataName()
        });
    }

    generataName(): string {
        return randomEmoji() + " " + randomName();
    }

    remove(id: string) {
        this.users = this.users.filter((u) => u.id !== id);
    }

    get() {
        return this.users;
    }
}

export const users = new Users()

interface User {
    name: string,
    id: string,
}