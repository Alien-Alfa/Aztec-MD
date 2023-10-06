//BY DIEGOSON 

//@AZTEC MD

const { getUrls, getInfo } = require('instagram-url-direct');
const axios = require('axios');
const fs = require('fs');

module.exports = {
  name: 'insta',
  alias: ['instagram'],
  category: 'Downloads',
  description: 'Download Instagram videos and extract URLs',
  async xstart(vorterx, m, { xReact, text, args }) {
   
        try {
        if (!args[0]) { await xReact('😐');
        await vorterx.sendMessage(m.from, { text: 'Please provide an Instagram video link.'});
        return;
        }

        const postUrl = args[0];
        const urls = await getUrls(postUrl);
        const info = await getInfo(postUrl);

        const title = info.title;
        const views = info.views;
        const likes = info.likes;
        const published = info.published;

        await xReact('📤');
        const promptMessage = await vorterx.sendMessage(
        'Choose the quality of the extracted media URLs:\n' +
        '1. Low Quality\n' +
        '2. Medium Quality\n' +
        '3. High Quality'
        );

          const filter = (response) => {
          return response.author.id === m.author.id && /^[1-3]$/.test(response.content);
          };
          const collector = vorterx.createMessageCollector(filter, { max: 1 });
          collector.on('collect', async (response) => {
          const quality = parseInt(response.content);

          let selectedUrls = [];

          switch (quality) {
          case 1:
          selectedUrls = urls.filter((url) => url.includes('low quality'));
          break;
          case 2:
          selectedUrls = urls.filter((url) => url.includes('medium quality'));
          break;
          case 3:
          selectedUrls = urls.filter((url) => url.includes('high quality'));
          break;
          }

          for (let i = 0; i < selectedUrls.length; i++) {
          const url = selectedUrls[i];
          const fileName = `video_${i + 1}.mp4`;
          const response = await axios({
          method: 'GET',
          url: url,
          responseType: 'stream',
         });

         response.data.pipe(fs.createWriteStream(fileName));
         await new Promise((resolve, reject) => {
         response.data.on('end', () => {
         resolve();
         });

        response.data.on('error', (error) => {
        reject(error);
        });
        });

       await vorterx.sendMessage(url, {
       caption: `*🌳Title:* ${title}\n*👀Views:* ${views}\n*👍Likes:* ${likes}\n*🙌Published:* ${published}`,
       });
       }
      });

      collector.on('end', () => {
      promptMessage.delete();
      });
      } catch (error) {
      m.reply('An error occurred while downloading the video.');
     }
   },
  };
