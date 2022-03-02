import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "egb4d8up",
  dataset: "production", 
  apiVersion: "2022-02-01",
  useCdn: true, 
  token:
    "skKLNG8Leohd6GMut15a8thLh7rkexnE5gPmccXURioeWQqDXgG5QDXj8Z2gyzo26zkFTnvZ9yaVRAX25oUbn8AkSDABF4bKmG1EZl8kKn26Hmz3COzzruCHNlUSJ0h1FWCz9t9xV5jqYgxfF9Spl6C1FDtZkW6wDEHuRNo9H9s47zmtL9zk",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
