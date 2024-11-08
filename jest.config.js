export default {
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
