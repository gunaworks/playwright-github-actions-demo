import { keyName } from '../faker/fakerUtils';
import { KeyType } from '../constants';

export function createKeyRequest(keyType: string) {
  const baseRequestBody = {
    key_name: keyName,
    platforms: [platform()],
  };
  switch (keyType) {
    case KeyType.PLAIN_KEY:
      return {
        keys: [
          {
            ...baseRequestBody,
          },
        ],
      };

    case KeyType.PLURAL_KEY:
      return {
        keys: [
          {
            ...baseRequestBody,
            is_plural: true,
          },
        ],
      };
  }
}

function platform() {
  let platforms = ['web', 'ios', 'android', 'other'];
  return platforms[Math.floor(Math.random() * platforms.length)];
}
