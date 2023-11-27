export interface Album{
    _id: {
        $oid: string
    }
    name: string,
    date: string,
    image_url: string
}