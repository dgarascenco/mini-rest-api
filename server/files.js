const fs = require("fs")

function readHTMLPage(fileName, cb) {

	fs.readFile(`./server/public/${fileName}.html`, 'utf8', function (error, data) {
		if (error) {
			return console.log(`The ${fileName} was not found!`);
		}
		cb(data)
	})
}

function readJSONFile(fileName, cb) {

	fs.readFile(`./server/data/${fileName}.json`, 'utf8', function (error, data) {
		if (error) {
			return console.log(`The ${fileName} was not found!`);
		}
		cb(JSON.parse(data))
	})
}

module.exports.readHTMLPage = readHTMLPage;
module.exports.readJSONFile = readJSONFile;