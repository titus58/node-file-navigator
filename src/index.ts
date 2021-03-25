import express from "express";
import fs from "fs";

const app = express();
const port = 8080; // default port to listen

app.set('view engine', 'ejs');

// define a route handler for the default home page
app.get("/", ( req, res ) => {
	const path = req.query.path;
	if (path) {
		fs.readdir(path as string, {withFileTypes: true}, (err, objs) => {
			const dirs = objs.filter((o) => o.isDirectory()).map((o) => o.name);
			const files = objs.filter((o) => o.isFile()).map((o) => o.name);
			res.render('index', { path, dirs, files });
		});
	} else {
		res.render('index', { path, dirs: [], files: []});
	}
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
