import fs from 'fs';
import path from 'path';

export default ({ folder, requirements }) => {
  return {
    name: 'clear-declaration',
    writeBundle: (options, bundle) => {
      const oldFolder = path.join(process.cwd(), folder);
      const tempFolder = path.join(process.cwd(), `${folder}-${Date.now()}`);

      fs.mkdirSync(tempFolder);

      for (let filePath of requirements) {
        fs.copyFileSync(
          path.join(folder, filePath),
          path.join(tempFolder, filePath),
        );
      }

      fs.rmSync(oldFolder, { recursive: true });
      fs.renameSync(tempFolder, oldFolder);
    },
  };
};
