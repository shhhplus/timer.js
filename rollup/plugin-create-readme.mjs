import fs from 'fs';
import path from 'path';

export default ({ dist }) => {
  return {
    name: 'create-readme',
    writeBundle: (options, bundle) => {
      const src = path.join(process.cwd(), 'README.md');
      const dest = path.join(dist, 'README.md');
      fs.copyFileSync(src, dest);
    },
  };
};
