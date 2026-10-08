/** Free screenshot service, used when a site has no og:image. The server downloads the image and stores it locally. */
export function screenshotUrl(siteUrl: string) {
    return `https://image.thum.io/get/width/1200/crop/750/noanimate/${siteUrl}`;
}
