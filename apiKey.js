// module.exports = apiKey;
//
// function apiKey(){
//
//   const options = {
//     method: 'POST',
//     'auth': 'user:cafd43bbcb5099977c0c271e64bec2a5-us20'
//   }
//   return options;
// }

module.exports = apiUrl;

function apiUrl(){
  const dc = `us20`
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/7bd83ce600`

  return url;
}
