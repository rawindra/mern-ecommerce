// fileHandling.ts

import fs from 'fs';
import util from 'util';

const unlinkAsync = util.promisify(fs.unlink);

export async function deleteFile(filePath: string): Promise<void> {
    try {
        await unlinkAsync(filePath);
        console.log(`File deleted successfully: ${filePath}`);
    } catch (error) {
        console.error(`Error deleting file: ${error}`);
        throw new Error('Failed to delete file');
    }
}
