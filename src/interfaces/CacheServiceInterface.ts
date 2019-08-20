export default interface CacheServiceInterface {
	get (key),
	set (key, data: JSON): void
}