module.exports = ({ config, mode }) => {
    config.module.rules.splice(2, 1);
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve("babel-loader"),
        options: {
            presets: [["react-app", { flow: false, typescript: true }]],
        },
    });
    config.module.rules.push({
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
    });
    config.module.rules.push({
        test: /\.inline.svg$/,
        use: "svg-react-loader",
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
};
