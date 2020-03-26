from aiohttp import web

from handlers import handle_songs


def setup() -> web.Application:
    app = web.Application()
    app.add_routes(
        [
            web.get('/songs', handle_songs),
            # web.post('/vote', handle),  # --> 201 || 400 (saves to DB, generates validation code, sends email)
            # web.get('/validate', handle),  # --> 201 || 401
            # web.get('/results', handle),  # -->
        ]
    )

    return app


if __name__ == '__main__':
    web.run_app(setup())
