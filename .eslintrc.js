module.exports = {
  env: {
    "browser": true,
    "es2021": true,
    "jest": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX / Permite a análise de JSX
    }, // Allows for the parsing of modern ECMAScript features / Permite a análise de recursos modernos do ECMAScript
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react"],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use (default)
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};
