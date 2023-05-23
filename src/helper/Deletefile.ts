import path from "path";
import fs from "fs";

export const DeleteFile = (fileAddressArray: [string]) => {
    fileAddressArray.map((fileAddress) => {
        const filePath = path.join(__dirname, `../../${fileAddress}`);

        // Use the fs.unlink() method to delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    })
}