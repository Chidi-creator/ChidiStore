// import {persistentMap} from '@nanostores/persistent'

// export const userStore = persistentMap('userInfo', {})

import { persistentAtom } from '@nanostores/persistent';

// Initialize userStore with an empty object instead of null
export const userStore = persistentAtom('userInfo', {}, {
  encode: JSON.stringify,
  decode: JSON.parse,
});
