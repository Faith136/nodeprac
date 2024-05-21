import http from 'http';

http.createServer((req, res) => {

    if (req.url == '/location') {
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({
            location: [
                { id: 1, locationName: 'Kenya' },
                { id: 2, locationName: 'Nairobi' },
                { id: 3, locationName: 'Kitale' },
                { id: 4, locationName: 'Kisumu' }
            ]
        }))
    } else
    if (req.url == '/Foods') {
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({
            Foods: [
                { id: 1, locationName: 'Breakfast' },
                { id: 2, locationName: 'Lunch' },
                { id: 3, locationName: 'Dinner' },
                { id: 4, locationName: 'Supper' }
            ]
        }))
    } else {
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({ response: "No data Found because i have written it this way" }));
    }

}).listen(5500);