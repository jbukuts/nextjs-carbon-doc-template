import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import IBM from 'ibm-cos-sdk';
import { Image } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import { CONTINUE, visit } from 'unist-util-visit';
console.log('hello world');

const { IBM_S3_ENDPOINT, IBM_S3_KEY, IBM_S3_INSTANCE_ID } = process.env;

const cos = new IBM.S3({
  region: 'us-south',
  endpoint: IBM_S3_ENDPOINT,
  apiKeyId: IBM_S3_KEY,
  apiVersion: 'iam',
  serviceInstanceId: IBM_S3_INSTANCE_ID
});

const bucketList = await cos.listBuckets().promise();
console.log(bucketList.Buckets);

const bucket = await cos
  .listObjects({ Bucket: 'vest-images', MaxKeys: 50000 })
  .promise();
console.log(bucket.Contents?.length);

/**
 * Upload image to IBM COS Bucket
 *
 * @returns {Promise<string>} URL of uploaded item
 */
const uploadImage = (imagePath: string) => {
  const iBuffer = fs.readFileSync(imagePath);

  return cos
    .upload({
      Bucket: 'vest-images',
      Key: imagePath,
      Body: iBuffer
    })
    .promise()
    .then((r) => {
      const { Location } = r;
      return Location;
    });
};

const files = fg.sync(['content/**/*.{md,mdx}'], {});

let totalSize = 0;
let totalImages = 0;

for await (const fPath of files) {
  const { dir } = path.posix.parse(fPath);
  const raw = fs.readFileSync(fPath, { flag: 'r' });
  const tree = fromMarkdown(raw);
  const matches: Image[] = [];

  // get all image nodes
  visit(tree, 'image', (node) => {
    matches.push(node);
    return CONTINUE;
  });

  await Promise.all(
    matches.map(async (node) => {
      const imagePath = path.posix.join(dir, node.url);

      // ensure image exists
      const exists = fs.existsSync(imagePath);
      if (!exists) return;

      const { size } = fs.lstatSync(imagePath);
      totalSize += size;
      totalImages++;
      // upload image

      const newURL = await uploadImage(imagePath);

      node.url = newURL;
      return;
    })
  );

  const newRaw = toMarkdown(tree);

  fs.writeFileSync(fPath, newRaw);
}

console.log(totalImages + ' toal images');
console.log(totalSize * 1e-9 + ' GB');
