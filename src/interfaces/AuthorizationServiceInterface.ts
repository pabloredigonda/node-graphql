export default interface AuthorizationServiceInterface {
	getUser(token: string)
	login(userId: number)
}