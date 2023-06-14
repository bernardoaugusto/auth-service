/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Collection, MongoClient } from "mongodb";

export const MongoHelper = {
    client: null as unknown as MongoClient,

    async connect(uri: string): Promise<void> {
        this.client = await new MongoClient(uri).connect();
    },

    async disconnect(): Promise<void> {
        await this.client.close();
    },

    getCollection(name: string): Collection {
        return this.client.db().collection(name);
    },

    map: (collection: any): any => {
        const { _id, ...collectionWithoutId } = collection;
        return {
            ...collectionWithoutId,
            id: _id.toHexString(),
        };
    },
};
