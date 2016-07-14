"use strict";

module.exports = {
	devtool: 'eval-source-map',
	devServer: {
		hot: true,
		progress: true,
		historyApiFallback: true,
		stats: 'errors-only'
	}
};
