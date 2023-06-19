import { Collection, MongoClient } from "mongodb";

export const MongoHelper = {
    client: null as unknown as MongoClient,
    uri: null as unknown as string,

    async connect(uri: string): Promise<void> {
        this.uri = uri;
        this.client = await new MongoClient(uri).connect();
    },

    async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.close();
            this.client = null as unknown as MongoClient;
        }
    },

    async getCollection(name: string): Promise<Collection> {
        if (!this.client) {
            await this.connect(this.uri);
        }
        return this.client.db().collection(name);
    },

    map: (collection: any): any => {
        if (!collection) return null;

        const { _id, ...collectionWithoutId } = collection;
        return {
            ...collectionWithoutId,
            id: _id.toHexString(),
        };
    },
};
