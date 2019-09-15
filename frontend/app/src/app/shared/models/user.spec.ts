import { User } from './user';

describe('User', () => {
    it('should create an instance', () => {
        expect(new User('yeet', 'yeet', 'yeet', 12)).toBeTruthy();
    });
});
