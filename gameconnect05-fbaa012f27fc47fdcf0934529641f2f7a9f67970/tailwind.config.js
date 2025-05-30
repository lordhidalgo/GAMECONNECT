export default {
    content: [
        './src/**/*.{html,js}',
        './*.html'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // https://tailwindcss.com/docs/customizing-colors
            },
            container: {
                center: true,
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}