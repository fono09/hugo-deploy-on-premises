const http = require('http')
const util = require('util')
const config = require('config')
const createHandler = require('github-webhook-handler')
const handler = createHandler(config.handler)
const childProcess = require('child_process');
const exec = util.promisify(childProcess.exec);

http.createServer((req, res) => {
    handler(req, res, err => {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(8088)

handler.on('push', async event => {
    try {
        let message = await exec('git clone $REPOSITORY project', {
            cwd: '/home/node/app',
            env: config.get('gitConfig')
        })
        console.log(message)

        message = await exec('pwd && ls', {
            cwd: '/home/node/app/project'
        })
        console.log(message)

        message = await exec('git submodule update --init --recursive', {
            cwd: '/home/node/app/project',
            env: config.get('gitConfig')
        })
        console.log(message)

        message = await exec('/home/node/app/hugo -d ../public', {
            cwd: '/home/node/app/project',
            env: config.get('gitConfig')
        })
        console.log(message)
        console.log('deployed')
    } catch(e) {
        console.log(e)
        console.trace()
    }
    await exec('rm -vfr project')
    console.log('clean up')
})
