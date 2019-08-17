## Stack
NodeJS, Typescript, GraphQL, Redis, Docker
 

## Dependencies
Docker, Docker Compose, Make 

## Develoment set up 

Run:
1. make setup
2. make install
3. cp ./src/server/.env.example ./src/server/.env
4. make build
5. make up

## Example Query
    {
	    searchMovies (s:"ninja", page: 2, type:"movies") {
			movies{
				title
				type
				poster
			}
			nextPage
			prevPage
			totalPages
		}
	}
 