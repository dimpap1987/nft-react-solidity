const getMetadataFromIpfsById = async (id) => {
  return await (
    await fetch(
      `https://ipfs.io/ipfs/QmXWTYxHaEeVPrXa7FoC5sQzdnyBTtDoziTPtgmrceXrCf/${id}.json`
    )
  ).json();
};

const getMetadataFromIpfs = async (url) => {
  return await (await fetch(url)).json();
};

export { getMetadataFromIpfs, getMetadataFromIpfsById };
