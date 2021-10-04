module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        "react/prop-types": 0,
        semi: [2, "always"],
        indent: ["error", 4, { SwitchCase: 1 }],
        "multiline-ternary": ["off"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],

        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true
            }
        ]
    }
};
