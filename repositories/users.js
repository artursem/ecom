const fs = require('fs');

class UsersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }
        this.filename = filename;
        try {
            fs.assessSync(this.filename);
        } catch {
            fs.writeFileSync(this.filename, '[]');
        }
    }
}

new UsersRepository('users.json');