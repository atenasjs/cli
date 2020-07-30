import { exists, join } from '../../../deps.ts';
import eConsole from '../../utils/Console.ts';
import { sendFeedback } from '../../operators/sendFeedback.ts'

export const New = async () => {

  const config = {
    name: 'atenas'
  }

  if(Deno.args[1]) {
    switch (Deno.args[1]) {
      case '--name':
        if(Deno.args[2]) {
          config.name = Deno.args[2].replace(/ /g,"_")
        } else {
          eConsole.log('Argument of --name not is provided');
          Deno.exit()
        }
        break;
      default:
        break;
    }
  }

  const isCloned = await exists(join(Deno.cwd(), config.name));

  if (isCloned) {
    eConsole.error(`Folder "${config.name}" already exists`);
    Deno.exit(1)
  }

  /**
   * Base script:
   * 'git', 'clone', '--depth', '1', '--single-branch', '--branch', 'stable',
   */

  const clone =Deno.run({
    cmd: ['git', 'clone', '--depth', '1', 'git@github.com:atenasjs/starter.git', config.name]
  })
  const cloneResult = await clone.status();

  if (!cloneResult.success) {
    throw new Error("Failed to clone.");
  }

  await sendFeedback('new')

  // eConsole.log('Fetching releases')

  // soxa.get('https://api.github.com/repos/atenasjs/atenas/releases')
  // .then(function (response: any) {
  //   eConsole.log('Searching for download file');
  //   response = response.data;

  //   let release: any;

  //   if(Array.isArray(response) && response.length > 0) {
  //     let releases = response.filter((item: any) => item.prerelease === false);

  //     if(releases.length === 0) {
  //       releases = response;
  //       eConsole.warn('Downloading prerelease version')
  //     }

  //     release = releases[0];

  //   } else {
  //     release = {
  //       zipball_url: 'https://api.github.com/repos/User/repo/zipball/master'
  //     };
  //   }
  //   soxa.get(release.zipball_url)
  //   .then(function (respons: any) {const decoded = gzipDecode(respons.data);
  //     console.log(decoded)
  //   });
  //   download(release.zipball_url)
  // .then(async (fileObj: any) => {
  //   console.log(fileObj)
  //   await tar.uncompress('C:\\atenasjs-atenas-0.0.1-0-g988b431.tar.gz', '.');
  // })
  // .catch((err: any) => {
  //   console.log(err)
  // });

//   }):
//   .catch(function (error: any) {
//     eConsole.error(error);
//     Deno.exit()
//   })

}

