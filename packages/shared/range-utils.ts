async function fetchRange(
    url: string,
    start: string,
    end: string,
): Promise<Uint8Array> {
    const response = await fetch(url, {
        headers: {
            Range: `bytes=${start}-${end}`,
        },
    });

    if (!response.ok && response.status !== 206) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return new Uint8Array(await response.arrayBuffer());
}

function createImageFromBlob(blob: Blob, url: string): Promise<HTMLImageElement> {
    const imgUrl = URL.createObjectURL(blob);
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = imgUrl;
    });
}

export async function createBlobFromUrl(url: string): Promise<Blob> {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const start = urlParams.get('start');
    const end = urlParams.get('end');
    console.log(`5 Start: ${start}, End: ${end}`);
    const buffer = await fetchRange(url, start, end);
    const blob = new Blob([buffer], { type: 'image/jpeg' });
    return blob;
}

export async function loadImage(url: string): Promise<HTMLImageElement> {
    const blob = await createBlobFromUrl(url);
    return createImageFromBlob(blob, url);
}
