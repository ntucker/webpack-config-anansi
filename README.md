# @anansi/webpack-config
A webpack configuration for fast development and production ready optimizations

## Usage

webpack.config.base.babel.js

```javascript
import { makeConfig } from '@anansi/webpack-config'

export const options = {
  basePath: 'src',
  buildDir: 'generated_assets/',
}

export default makeConfig(options)
```

webpack.config.dev.babel.js

```javascript
import { makeDevConfig } from '@anansi/webpack-config'

import baseConfig, { options } from './webpack.config.base.babel'

export default makeDevConfig(baseConfig, options)
```

webpack.config.prod.babel.js

```javascript
import { makeProdConfig } from '@anansi/webpack-config'

import baseConfig, { options } from './webpack.config.base.babel'

export default makeProdConfig(baseConfig, options)
```
