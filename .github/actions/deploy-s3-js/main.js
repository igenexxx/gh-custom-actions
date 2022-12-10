const core = require('@actions/core');
const exec = require('@actions/exec');

const inputs = {
    bucket: {
        name: 'bucket',
        required: true
    },
    bucketRegion: {
        name: 'bucket-region',
        required: true
    },
    distFolder: {
        name: 'dist-folder',
        required: true
    }
}

async function run() {
    const { bucket, bucketRegion, distFolder } = Object.entries(inputs).reduce((acc, [key, {name, required}]) => ({
        ...acc,
        [key]: core.getInput(name, {required})
    }), {});

    const s3Uri = `s3://${bucket}`;
    await exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    core.notice('Hello from JS actions!');
}

run();