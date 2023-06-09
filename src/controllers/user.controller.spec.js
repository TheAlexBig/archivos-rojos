import { insertUser } from './user.controller';
import db from "../models/index.js";
const User = db.user;
import logger from '../config/logger.js';

jest.mock('../config/logger.js', () => ({
    error: jest.fn(),
}));

describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new user and return a 201 status', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'john@example.com',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the database insert
        const mockCreate = jest.spyOn(User, 'create').mockResolvedValue({
            toJSON: jest.fn().mockReturnValue({ name: 'John Doe', email: 'john@example.com' }),
        });


        await insertUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User created successfully',
            user: {
                name: 'John Doe',
                email: 'john@example.com',
            },
        });

        // Check if the user is created in the database
        expect(mockCreate).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
        });

        mockCreate.mockRestore();
    });

    it('should handle an error and return a 500 status', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'john@example.com',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Force an error by rejecting the create() promise
        jest.spyOn(db.user, 'create').mockRejectedValue(new Error('Failed to create user'));

        await insertUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create user' });
        expect(logger.error).toHaveBeenCalledWith('Error inserting user:', expect.any(Error));

        // Restore the original implementation of create()
        jest.spyOn(db.user, 'create').mockRestore();
    });
});