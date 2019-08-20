export default interface OmdbServiceInterface {
    search(s: String, type: String, page: number): Object
}