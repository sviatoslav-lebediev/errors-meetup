import { DatabaseError } from '../errors/external/db-error';

const findUser = async (id: string) => {
    throw new Error(`findUser general error -> internal error (findUser ${id})`);
};

const createUser = async ({ email, password }: { email: string; password: string }) => {
    console.log(`creating a new user ${email}:${password}`);

    if (email === 'db-error@mail.com') {
        throw new DatabaseError(`DB error during creating a user `);
    }

    return { email, id: Date.now() };
};

export { findUser, createUser };
