import fs from 'fs';
import path from 'path';

export default ({ dist, basic, extra }) => {
  return {
    name: 'create-package-json',
    writeBundle: async (options, bundle) => {
      const sortPackageJson = await import('sort-package-json');
      const keys = new Set(Object.keys(basic.data));
      const obj = basic.keys.reduce((acc, cur) => {
        if (keys.has(cur)) {
          return {
            ...acc,
            [cur]: basic.data[cur],
          };
        } else {
          return acc;
        }
      }, {});

      const newData = sortPackageJson.default({
        ...obj,
        ...extra,
      });
      fs.writeFileSync(
        path.join(dist, 'package.json'),
        JSON.stringify(newData, null, 2),
      );
    },
  };
};
