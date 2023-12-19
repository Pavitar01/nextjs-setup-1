import config from "@/lib/config/index.config";
import { Client, Databases, ID, Storage, Query } from "appwrite"
import { userInterface } from "../type"

export class Service {
    client = new Client();
    databases: any;
    bucket: any;
    constructor() {
        this.client.setEndpoint(config.APP_WRITE_URL).setProject(config.PROJECT_ID)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.bucket)
    }
    // createArticle

    async createArticle({ title, slug, content, featuredImage, status, userId }: userInterface) {
        try {
            return await this.databases.createDocument(
                config.DATABASE_ID,
                config.COLLECTION_ID,
                slug, {
                title,
                content,
                status,
                userId,
                featuredImage
            }
            )
        } catch (err) {
            console.log(err)
        }
    }
    // updateArticle

    async updateArticle(slug: string, { title, content, featuredImage, status }: userInterface) {
        try {
            return await this.databases.updateDocument(
                config.DATABASE_ID,
                config.COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage
                }
            )
        } catch (err) {
            console.log(err)
        }
    }
    // deleteArticle

    async deleteArticle(slug: string) {
        try {
            await this.databases.deleteDocument(
                config.DATABASE_ID,
                config.COLLECTION_ID,

            ); return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
    // getArticle
    
    async getArticle(slug: string) {
        try {
            await this.databases.getDocument(
                config.DATABASE_ID,
                config.COLLECTION_ID,
                slug
            ); return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
    // getArticles

    async getArticles(queries = [Query.equal("status", true)]) {
        try {
            return await this.databases.listsDocument(
                config.DATABASE_ID,
                config.COLLECTION_ID,
                [
                    queries
                ]
            );
        } catch (err) {
            console.log(err)
            return false
        }

    }
    // uploadFile

    async uploadFile(file: any) {
        try {
            return await this.bucket.uploadFile(
                config.BUCKET_ID,
                ID.unique(),
                file
            );
        } catch (err) {
            console.log(err)
            return false
        }
    }
    //deleteFile 

    async deleteFile(fileId: string) {
        try {
            await this.bucket.deleteFile(
                config.BUCKET_ID,
                fileId
            ); return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
    //getFilePreview

    async getFilePreview(fileId: string) {
        return this.bucket.getFilePreview(
            config.BUCKET_ID,
            fileId
        )
    }
}