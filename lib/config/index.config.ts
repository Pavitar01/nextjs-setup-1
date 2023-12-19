
const config = {
    APP_WRITE_URL: String(process.env.NEXT_PUBLIC_APP_WRITE_URL),
    PROJECT_ID: String(process.env.NEXT_PUBLIC_PROJECT_URL),
    DATABASE_ID: String(process.env.NEXT_PUBLIC_DATABASE_ID),
    COLLECTION_ID: String(process.env.NEXT_PUBLIC_COLLECTION_ID),
    BUCKET_ID: String(process.env.NEXT_PUBLIC_BUCKET_ID)
}
export default config