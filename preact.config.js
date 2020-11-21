// export default {
//   webpack(config, env, helpers, options) {
// 		{
//       [
//         {
//           test: /\.(png|woff|woff2|eot|ttf|svg|otf)$/i,
//           loader: 'url-loader?limit=100000'
//         },
//       ]
//     }
// 	},
// };

export default (config, env, helpers, options) => {
  const rules = config.module.rules;
  const fontLoaderIndex = rules.findIndex(({loader}) => loader === 'file-loader' || loader === 'url-loader')
  rules[fontLoaderIndex].test = /\.(svg|woff2?|ttf|otf|eot|jpe?g|png|gif|mp4|mov|ogg|webm|ttc)(\?.*)?$/i;
}

