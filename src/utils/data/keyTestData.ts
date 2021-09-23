import { keyName } from '../faker/fakerUtils';
import { KeyType, PLATFORM } from '../constants';

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
  const platforms = [
    PLATFORM.WEB,
    PLATFORM.IOS,
    PLATFORM.ANDROID,
    PLATFORM.OTHER,
  ];
  return platforms[Math.floor(Math.random() * platforms.length)];
}
